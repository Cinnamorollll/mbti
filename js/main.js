(function () {
  "use strict";

  var ERROR_TEXT = "\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u542f\u8bd5\u8bd5\u5427~";
  var DATA = window.GAME_DATA || {};
  var audio = window.GameAudio || {
    enabled: true,
    toggle: function () { return true; },
    click: function () {},
    confirm: function () {},
    transition: function () {},
    secret: function () {}
  };
  var canvas = document.getElementById("gameCanvas");
  var errorPanel = document.getElementById("errorPanel");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var W = DATA.config ? DATA.config.width : 390;
  var H = DATA.config ? DATA.config.height : 844;
  var DPR = 1;
  var app = null;
  var PAIRS = { E: "EI", I: "EI", S: "SN", N: "SN", T: "TF", F: "TF", J: "JP", P: "JP" };

  function createAppState() {
    return {
      screen: "cover",
      currentSceneId: DATA.startSceneId,
      textPage: 0,
      activeEventId: null,
      resultEndingKey: null,
      memory: {},
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      lastPick: { EI: null, SN: null, TF: null, JP: null },
      choices: [],
      assets: {},
      buttons: [],
      hotspots: [],
      pointer: null,
      time: 0,
      broken: false
    };
  }

  function showError(err) {
    if (app) app.broken = true;
    if (window.console && console.error) console.error(err);
    if (errorPanel) {
      errorPanel.textContent = ERROR_TEXT;
      errorPanel.style.display = "block";
    }
  }

  function safeCall(fn) {
    return function (event) {
      try { fn(event); } catch (err) { showError(err); }
    };
  }

  function fitCanvas() {
    var viewportW = Math.max(1, window.innerWidth);
    var viewportH = Math.max(1, window.innerHeight);
    var scale = Math.min(viewportW / W, viewportH / H);
    DPR = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = Math.floor(W * scale) + "px";
    canvas.style.height = Math.floor(H * scale) + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function loadAssets() {
    Object.keys(DATA.assets || {}).forEach(function (key) {
      var img = new Image();
      app.assets[key] = { image: img, ready: false, failed: false };
      img.onload = function () { app.assets[key].ready = true; };
      img.onerror = function () { app.assets[key].failed = true; };
      img.src = DATA.assets[key];
    });
  }

  function sceneById(id) {
    for (var i = 0; i < DATA.scenes.length; i += 1) {
      if (DATA.scenes[i].id === id) return DATA.scenes[i];
    }
    return DATA.scenes[0];
  }

  function currentScene() {
    return sceneById(app.currentSceneId || DATA.startSceneId);
  }

  function eventForScene(sceneId) {
    for (var i = 0; i < DATA.events.length; i += 1) {
      if (DATA.events[i].sceneId === sceneId) return DATA.events[i];
    }
    return null;
  }

  function eventById(id) {
    for (var i = 0; i < DATA.events.length; i += 1) {
      if (DATA.events[i].id === id) return DATA.events[i];
    }
    return null;
  }

  function goToScene(id) {
    var scene = sceneById(id);
    app.currentSceneId = scene.id;
    app.activeEventId = null;
    app.textPage = 0;
    if (scene.endingKey) app.resultEndingKey = scene.endingKey;
    app.screen = scene.interactionMode === "continueToNext" || scene.interactionMode === "ending" ? "scenePreview" : "sceneIntro";
    audio.transition();
  }

  function startGame() {
    app.currentSceneId = DATA.startSceneId;
    app.textPage = 0;
    app.activeEventId = null;
    app.screen = "explore";
    audio.confirm();
  }

  function enterPrologue() {
    app.textPage = 0;
    app.screen = "intro";
    audio.confirm();
  }

  function resetGame() {
    var oldAssets = app.assets;
    app = createAppState();
    app.assets = oldAssets;
    audio.confirm();
  }

  function resolveSceneNext(scene) {
    if (scene.nextSceneId) return scene.nextSceneId;
    if (scene.memoryNext) {
      var value = app.memory[scene.memoryNext.key];
      return scene.memoryNext.routes[value] || scene.memoryNext.fallback;
    }
    return null;
  }

  function activeEvent() {
    return eventById(app.activeEventId) || eventForScene(app.currentSceneId);
  }

  function openChoice(event) {
    if (!event) return;
    app.activeEventId = event.id;
    app.screen = "choice";
    audio.transition();
  }

  function applyScore(score) {
    if (!score) return;
    Object.keys(score).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(app.scores, key)) {
        app.scores[key] += score[key];
        app.lastPick[PAIRS[key]] = key;
      }
    });
  }

  function chooseOption(choice) {
    var event = activeEvent();
    if (!event) return;
    applyScore(choice.score);
    if (choice.setMemory) app.memory[choice.setMemory.key] = choice.setMemory.value;
    app.choices.push({ eventId: event.id, sceneId: event.sceneId, label: choice.label, text: choice.text, score: choice.score, nextSceneId: choice.nextSceneId });
    goToScene(choice.nextSceneId);
  }

  function pickDimension(a, b, pair) {
    if (app.scores[a] > app.scores[b]) return a;
    if (app.scores[b] > app.scores[a]) return b;
    return app.lastPick[pair] || DATA.defaultTie[pair];
  }

  function resultType() {
    return [pickDimension("E", "I", "EI"), pickDimension("S", "N", "SN"), pickDimension("T", "F", "TF"), pickDimension("J", "P", "JP")].join("");
  }

  function getPointerPoint(event) {
    var rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (W / rect.width), y: (event.clientY - rect.top) * (H / rect.height) };
  }

  function hitTest(list, x, y) {
    for (var i = list.length - 1; i >= 0; i -= 1) {
      var item = list[i];
      if (x >= item.x && x <= item.x + item.w && y >= item.y && y <= item.y + item.h) return item;
    }
    return null;
  }

  function onPointerDown(event) {
    event.preventDefault();
    var p = getPointerPoint(event);
    app.pointer = { x: p.x, y: p.y, target: hitTest(app.buttons, p.x, p.y) || hitTest(app.hotspots, p.x, p.y) };
  }

  function onPointerMove(event) {
    if (!app.pointer) return;
    var p = getPointerPoint(event);
    var dx = p.x - app.pointer.x;
    var dy = p.y - app.pointer.y;
    if (Math.sqrt(dx * dx + dy * dy) > DATA.config.moveCancelPx) app.pointer.target = null;
  }

  function onPointerUp(event) {
    if (!app.pointer) return;
    event.preventDefault();
    var p = getPointerPoint(event);
    var target = app.pointer.target;
    app.pointer = null;
    if (!target) return;
    if (p.x < target.x || p.x > target.x + target.w || p.y < target.y || p.y > target.y + target.h) return;
    audio.click();
    target.onTap();
  }

  function roundRectPath(x, y, w, h, r) {
    var radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function fillRoundRect(x, y, w, h, r, color) {
    ctx.fillStyle = color;
    roundRectPath(x, y, w, h, r);
    ctx.fill();
  }

  function strokeRoundRect(x, y, w, h, r, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth || 1;
    roundRectPath(x, y, w, h, r);
    ctx.stroke();
  }

  function hexToRgb(hex) {
    var value = String(hex || "#6aa3a0").replace("#", "");
    if (value.length === 3) value = value.split("").map(function (ch) { return ch + ch; }).join("");
    var num = parseInt(value, 16);
    if (Number.isNaN(num)) return { r: 106, g: 163, b: 160 };
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function sceneFill(color) {
    var rgb = hexToRgb(color);
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.34)");
    g.addColorStop(0.55, "rgba(255,255,255,0.42)");
    g.addColorStop(1, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.26)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function drawAsset(key, x, y, w, h, alpha) {
    var asset = app.assets[key];
    if (!asset || !asset.ready) return false;
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(asset.image, x, y, w, h);
    ctx.restore();
    return true;
  }

  function drawAssetContain(key, x, y, w, h, alpha) {
    var asset = app.assets[key];
    if (!asset || !asset.ready) return false;
    var img = asset.image;
    var scale = Math.min(w / img.width, h / img.height);
    var dw = img.width * scale;
    var dh = img.height * scale;
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    ctx.restore();
    return true;
  }

  function drawBackgroundImage(key, color) {
    var asset = app.assets[key];
    sceneFill(color);
    if (!asset || !asset.ready) return;
    var img = asset.image;
    var isFullSceneImage = key === "firstCover" || /^story\d+$/.test(key) || /^endImage\d+$/.test(key);
    var scale = isFullSceneImage ? Math.min(W / img.width, 500 / img.height) : Math.max(W / img.width, H / img.height);
    var dw = img.width * scale;
    var dh = img.height * scale;
    var dx = (W - dw) / 2;
    var dy = isFullSceneImage ? 24 : (H - dh) / 2;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (isFullSceneImage) {
      var coverScale = Math.max(W / img.width, H / img.height);
      var coverW = img.width * coverScale;
      var coverH = img.height * coverScale;
      ctx.globalAlpha = 0.24;
      ctx.drawImage(img, (W - coverW) / 2, (H - coverH) / 2, coverW, coverH);
      ctx.globalAlpha = 0.96;
    }
    ctx.globalAlpha = 0.96;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  function drawSceneBackground(scene) {
    drawBackgroundImage(scene.asset, scene.color);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(0, 0, W, H);
    var objects = scene.objects || [];
    for (var i = 0; i < objects.length; i += 1) {
      var item = objects[i];
      if (!drawAsset(item.asset, item.x, item.y, item.w, item.h, item.alpha)) {
        fillRoundRect(item.x, item.y, item.w, item.h, 8, "rgba(255,255,255,0.58)");
        strokeRoundRect(item.x, item.y, item.w, item.h, 8, "rgba(47,139,134,0.20)", 1);
      }
    }
  }

  function wrapLines(text, maxWidth, font) {
    ctx.font = font;
    var lines = [];
    String(text || "").split("\n").forEach(function (paragraph, idx, arr) {
      if (!paragraph) {
        lines.push("");
        return;
      }
      var line = "";
      Array.from(paragraph).forEach(function (ch) {
        var test = line + ch;
        if (line && ctx.measureText(test).width > maxWidth) {
          lines.push(line);
          line = ch;
        } else {
          line = test;
        }
      });
      lines.push(line);
      if (idx < arr.length - 1) lines.push("");
    });
    return lines;
  }

  function paginateText(text, maxWidth, font, maxLines) {
    var rawLines = wrapLines(text, maxWidth, font);
    var pages = [];
    var page = [];
    rawLines.forEach(function (line) {
      if (page.length >= maxLines) {
        pages.push(page);
        page = [];
      }
      page.push(line);
    });
    if (page.length || !pages.length) pages.push(page);
    return pages;
  }

  function drawLines(lines, x, y, lineHeight, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    for (var i = 0; i < lines.length; i += 1) {
      if (lines[i]) ctx.fillText(lines[i], x, y + i * lineHeight);
    }
  }

  function addButton(id, x, y, w, h, label, variant, onTap) {
    var button = { id: id, x: x, y: y, w: w, h: h, label: label, variant: variant || "primary", onTap: onTap, kind: "button" };
    app.buttons.push(button);
    drawButton(button);
    return button;
  }

  function drawButton(button) {
    var ghost = button.variant === "ghost";
    var soft = button.variant === "soft";
    var fill = ghost ? "rgba(255,255,255,0.70)" : soft ? "rgba(255,255,255,0.90)" : "#2f8b86";
    var stroke = ghost || soft ? "rgba(47,139,134,0.20)" : "rgba(255,255,255,0.55)";
    var text = ghost || soft ? "#315b58" : "#ffffff";
    fillRoundRect(button.x, button.y, button.w, button.h, 8, fill);
    strokeRoundRect(button.x, button.y, button.w, button.h, 8, stroke, 1);
    ctx.font = button.h > 52 ? "600 16px sans-serif" : "600 14px sans-serif";
    ctx.fillStyle = text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(button.label, button.x + button.w / 2, button.y + button.h / 2);
  }

  function drawAudioButton() {
    addButton("audio", 312, 18, 54, 34, audio.enabled ? "\u97f3\u5f00" : "\u97f3\u5173", "ghost", function () { audio.toggle(); });
  }

  function drawCover() {
    drawBackgroundImage("firstCover", "#6f9d91");
    var titleY = 74;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.28)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.font = "700 34px sans-serif";
    ctx.fillStyle = "#fffdf4";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("\u8c37\u96e8-\u672a\u5bc4\u4fe1", W / 2, titleY);
    ctx.restore();
    addButton("cover-start", 74, 746, 242, 54, "\u5f00\u59cb\u6e38\u620f", "primary", enterPrologue);
    drawAudioButton();
  }

  function prologuePages() {
    var text = (DATA.introProloguePages || []).join("\n\n");
    return paginateText(text, 286, "13px sans-serif", 18);
  }

  function advancePrologue() {
    var pages = prologuePages();
    if (app.textPage < pages.length - 1) {
      app.textPage += 1;
      audio.click();
      return;
    }
    startGame();
  }

  function drawIntro() {
    var pages = prologuePages();
    var pageIndex = Math.min(app.textPage, pages.length - 1);
    var isLast = pageIndex >= pages.length - 1;
    drawBackgroundImage("firstCover", "#6f9d91");
    ctx.fillStyle = "rgba(255,255,255,0.36)";
    ctx.fillRect(0, 0, W, H);
    fillRoundRect(28, 96, 334, 590, 8, "rgba(255,255,255,0.92)");
    strokeRoundRect(28, 96, 334, 590, 8, "rgba(47,139,134,0.18)", 1);
    ctx.font = "700 22px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("\u7b2c\u96f6\u5e55", W / 2, 122);
    ctx.font = "700 25px sans-serif";
    ctx.fillText("\u4fe1\u30fb\u672a\u5bc4\u30fb\u8c37\u96e8\u524d\u591c", W / 2, 158);
    drawLines(pages[pageIndex], 52, 212, 20, "13px sans-serif", "#385a56");
    ctx.font = "600 12px sans-serif";
    ctx.fillStyle = "#6a7b78";
    ctx.textBaseline = "middle";
    ctx.fillText((pageIndex + 1) + " / " + pages.length, W / 2, 656);
    addButton("prologue-next", 92, 716, 206, 52, isLast ? "\u8fdb\u5165\u8c37\u96e8\u6e05\u6668" : "\u7ee7\u7eed\u9605\u8bfb", "primary", advancePrologue);
  }

  function advanceSceneIntro() {
    var scene = currentScene();
    var pages = paginateText(scene.intro, 286, "13px sans-serif", 20);
    if (app.textPage < pages.length - 1) {
      app.textPage += 1;
      audio.click();
      return;
    }
    if (scene.interactionMode === "ending") {
      app.screen = "result";
      audio.transition();
      return;
    }
    if (scene.interactionMode === "continueToChoice") {
      openChoice(eventForScene(scene.id));
      return;
    }
    if (scene.interactionMode === "continueToNext") {
      var next = resolveSceneNext(scene);
      if (next) goToScene(next);
      return;
    }
    app.screen = "explore";
    audio.transition();
  }

  function drawSceneIntro() {
    var scene = currentScene();
    var pages = paginateText(scene.intro, 286, "13px sans-serif", 20);
    var pageIndex = Math.min(app.textPage, pages.length - 1);
    var isLast = pageIndex >= pages.length - 1;
    var label = isLast ? "\u7ee7\u7eed" : "\u7ee7\u7eed\u9605\u8bfb";
    if (isLast && scene.interactionMode === "hotspot") label = "\u8fdb\u5165\u573a\u666f";
    if (isLast && scene.interactionMode === "continueToChoice") label = "\u505a\u51fa\u9009\u62e9";
    if (isLast && scene.interactionMode === "ending") label = "\u67e5\u770b\u4eba\u683c\u7ed3\u679c";
    drawSceneBackground(scene);
    drawSceneCatAnimation(scene);
    ctx.fillStyle = "rgba(255,255,255,0.30)";
    ctx.fillRect(0, 0, W, H);
    fillRoundRect(28, 112, 334, 552, 8, "rgba(255,255,255,0.90)");
    strokeRoundRect(28, 112, 334, 552, 8, "rgba(47,139,134,0.18)", 1);
    ctx.font = "700 22px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(scene.title, W / 2, 136);
    ctx.font = "700 27px sans-serif";
    ctx.fillText(scene.name, W / 2, 172);
    fillRoundRect(72, 218, 246, 30, 8, "rgba(47,139,134,0.12)");
    ctx.font = "600 12px sans-serif";
    ctx.fillStyle = "#2f615d";
    ctx.textBaseline = "middle";
    ctx.fillText(scene.time, W / 2, 233);
    drawLines(pages[pageIndex], 52, 276, 19, "13px sans-serif", "#385a56");
    ctx.font = "600 12px sans-serif";
    ctx.fillStyle = "#6a7b78";
    ctx.fillText((pageIndex + 1) + " / " + pages.length, W / 2, 638);
    addButton("scene-next", 92, 690, 206, 52, label, "primary", advanceSceneIntro);
  }

  function drawScenePreview() {
    var scene = currentScene();
    drawSceneBackground(scene);
    drawSceneCatAnimation(scene);
    fillRoundRect(74, 762, 242, 52, 8, "rgba(255,255,255,0.88)");
    strokeRoundRect(74, 762, 242, 52, 8, "rgba(47,139,134,0.20)", 1);
    addButton("scene-preview-next", 92, 770, 206, 40, "\u7ee7\u7eed", "primary", function () {
      app.textPage = 0;
      app.screen = "sceneIntro";
      audio.click();
    });
  }

  function isCatEvent(event) {
    return event && /^e02/.test(event.id || "");
  }

  function catFrameKey() {
    return Math.floor(app.time / 0.7) % 2 === 0 ? "catSit" : "catStand";
  }

  function drawCatFrame(x, y, w, h) {
    var key = catFrameKey();
    if (!drawAssetContain(key, x, y, w, h, 1)) drawAssetContain("cat", x, y, w, h, 1);
  }

  function drawCatHotspotAnimation(h) {
    var x = h.x - 6;
    var y = h.y - 10;
    var w = h.w + 12;
    var height = h.h + 18;
    ctx.save();
    roundRectPath(h.x - 4, h.y - 8, h.w + 8, h.h + 16, 8);
    ctx.clip();
    drawCatFrame(x, y, w, height);
    ctx.restore();
  }

  function sceneCatRect(scene) {
    if (scene && scene.id === "s15") return { x: 176, y: 220, w: 76, h: 92 };
    return null;
  }

  function drawSceneCatAnimation(scene) {
    var rect = sceneCatRect(scene);
    if (!rect) return;
    var pulse = Math.sin(app.time * 4) * 2;
    fillRoundRect(rect.x - 8 - pulse, rect.y - 8 - pulse, rect.w + 16 + pulse * 2, rect.h + 16 + pulse * 2, 8, "rgba(255,255,255,0.16)");
    ctx.save();
    roundRectPath(rect.x - 8, rect.y - 8, rect.w + 16, rect.h + 16, 8);
    ctx.clip();
    drawCatFrame(rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
    strokeRoundRect(rect.x - 8 - pulse, rect.y - 8 - pulse, rect.w + 16 + pulse * 2, rect.h + 16 + pulse * 2, 8, "rgba(255,255,255,0.82)", 2);
  }

  function drawChoiceCatAnimation(event) {
    if (!isCatEvent(event) || !event.hotspot) return;
    var h = event.hotspot;
    var pulse = Math.sin(app.time * 4) * 2;
    fillRoundRect(h.x - 8 - pulse, h.y - 8 - pulse, h.w + 16 + pulse * 2, h.h + 16 + pulse * 2, 8, "rgba(255,255,255,0.16)");
    drawCatHotspotAnimation(h);
    strokeRoundRect(h.x - 8 - pulse, h.y - 8 - pulse, h.w + 16 + pulse * 2, h.h + 16 + pulse * 2, 8, "rgba(255,255,255,0.82)", 2);
  }

  function drawHotspot(event) {
    var h = event.hotspot;
    var pulse = Math.sin(app.time * 4) * 3;
    fillRoundRect(h.x - 8 - pulse, h.y - 8 - pulse, h.w + 16 + pulse * 2, h.h + 16 + pulse * 2, 8, "rgba(255,255,255,0.18)");
    if (isCatEvent(event)) drawCatHotspotAnimation(h);
    strokeRoundRect(h.x - 8 - pulse, h.y - 8 - pulse, h.w + 16 + pulse * 2, h.h + 16 + pulse * 2, 8, "rgba(255,255,255,0.88)", 3);
    fillRoundRect(Math.max(16, h.x + h.w / 2 - 24), h.y + h.h + 12, 48, 18, 8, "rgba(255,255,255,0.82)");
    strokeRoundRect(Math.max(16, h.x + h.w / 2 - 24), h.y + h.h + 12, 48, 18, 8, "rgba(47,139,134,0.24)", 1);
    app.hotspots.push({ id: h.id, kind: "hotspot", x: h.x - 18, y: h.y - 18, w: h.w + 36, h: h.h + 48, onTap: function () { openChoice(event); } });
  }

  function drawExplore() {
    var scene = currentScene();
    var event = eventForScene(scene.id);
    drawSceneBackground(scene);
    if (event && event.hotspot) drawHotspot(event);
    fillRoundRect(28, 612, 334, 116, 8, "rgba(255,255,255,0.88)");
    ctx.font = "700 18px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(scene.name, 48, 634);
    drawLines(wrapLines("\u70b9\u51fb\u9ad8\u4eae\u7684\u7269\u4ef6\u6216\u89d2\u8272\uff0c\u8fdb\u5165\u8fd9\u4e00\u5e55\u7684\u5173\u952e\u9009\u62e9\u3002", 292, "15px sans-serif"), 48, 670, 22, "15px sans-serif", "#496966");
  }

  function choiceLayout(choices) {
    var font = "12px sans-serif";
    var lineHeight = 15;
    var layouts = choices.map(function (choice) {
      var lines = wrapLines(choice.text, 286, font);
      return { choice: choice, lines: lines, h: Math.max(44, lines.length * lineHeight + 20) };
    });
    var total = layouts.reduce(function (sum, item) { return sum + item.h + 8; }, 0);
    if (total > 236) {
      font = "11px sans-serif";
      lineHeight = 14;
      layouts = choices.map(function (choice) {
        var lines = wrapLines(choice.text, 292, font);
        return { choice: choice, lines: lines, h: Math.max(40, lines.length * lineHeight + 18) };
      });
    }
    return { layouts: layouts, font: font, lineHeight: lineHeight };
  }

  function drawChoice() {
    var scene = currentScene();
    var event = activeEvent();
    if (!event) { app.screen = "sceneIntro"; return; }
    drawSceneBackground(scene);
    drawChoiceCatAnimation(event);
    var layout = choiceLayout(event.choices);
    var contentHeight = layout.layouts.reduce(function (sum, item) { return sum + item.h + 8; }, 0) - 8;
    var panelHeight = Math.min(386, Math.max(306, contentHeight + 86));
    var panelY = H - panelHeight - 14;
    fillRoundRect(20, panelY, 350, panelHeight, 8, "rgba(255,255,255,0.90)");
    strokeRoundRect(20, panelY, 350, panelHeight, 8, "rgba(47,139,134,0.18)", 1);
    fillRoundRect(36, panelY + 18, 124, 28, 8, "rgba(47,139,134,0.12)");
    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "#2f615d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(event.title, 98, panelY + 32);
    drawLines(wrapLines(event.prompt, 182, "12px sans-serif"), 174, panelY + 18, 16, "12px sans-serif", "#2d4542");
    var y = panelY + 62;
    for (var i = 0; i < layout.layouts.length; i += 1) {
      (function (item, index) {
        var choice = item.choice;
        var x = 36;
        var h = item.h;
        fillRoundRect(x, y, 318, h, 8, "rgba(255,255,255,0.92)");
        strokeRoundRect(x, y, 318, h, 8, "rgba(47,139,134,0.18)", 1);
        fillRoundRect(x + 10, y + 9, 24, 24, 8, "rgba(47,139,134,0.13)");
        ctx.font = "700 13px sans-serif";
        ctx.fillStyle = "#2f615d";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(choice.label, x + 22, y + 21);
        drawLines(item.lines, x + 44, y + 9, layout.lineHeight, layout.font, "#315b58");
        app.buttons.push({ id: "choice-" + index, kind: "button", x: x, y: y, w: 318, h: h, onTap: function () { chooseOption(choice); } });
        y += h + 8;
      })(layout.layouts[i], i);
    }
  }

  function drawDimensionBar(x, y, left, right, pair) {
    var total = app.scores[left] + app.scores[right];
    var ratio = total ? app.scores[left] / total : 0.5;
    fillRoundRect(x, y, 260, 12, 6, "rgba(47,139,134,0.12)");
    fillRoundRect(x, y, Math.max(8, 260 * ratio), 12, 6, "#2f8b86");
    ctx.font = "600 12px sans-serif";
    ctx.fillStyle = "#496966";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(left + " " + app.scores[left], x, y - 12);
    ctx.textAlign = "right";
    ctx.fillText(app.scores[right] + " " + right, x + 260, y - 12);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(pair, x + 130, y + 6);
  }

  function drawResult() {
    var scene = currentScene();
    drawSceneBackground(scene);
    var type = resultType();
    var result = DATA.results[type] || DATA.results.INFP;
    var story = DATA.storyEndings[app.resultEndingKey] || DATA.storyEndings.end3;
    fillRoundRect(24, 50, 342, 742, 8, "rgba(255,255,255,0.94)");
    strokeRoundRect(24, 50, 342, 742, 8, "rgba(47,139,134,0.20)", 1);
    if (!drawAssetContain(type, 137, 72, 116, 116, 1)) drawAssetContain("badgeResult", 137, 72, 116, 116, 1);
    ctx.font = "700 42px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(type, W / 2, 184);
    ctx.font = "700 21px sans-serif";
    ctx.fillText(result.name, W / 2, 232);
    drawLines(wrapLines(result.description, 294, "13px sans-serif"), 48, 270, 18, "13px sans-serif", "#385a56");
    fillRoundRect(48, 344, 294, 72, 8, "rgba(210,98,98,0.08)");
    ctx.font = "700 14px sans-serif";
    ctx.fillStyle = "#8c4c51";
    ctx.textAlign = "left";
    ctx.fillText("\u5267\u60c5\u7ed3\u5c40 \u00b7 " + story.shortName, 66, 362);
    drawLines(wrapLines(story.description, 258, "12px sans-serif"), 66, 388, 16, "12px sans-serif", "#5d7471");
    fillRoundRect(48, 430, 294, 92, 8, "rgba(47,139,134,0.08)");
    ctx.font = "700 14px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.fillText("\u9002\u5408\u7684\u5b66\u4e60 / \u5de5\u4f5c\u65b9\u5f0f", 66, 448);
    drawLines(wrapLines(result.work, 258, "12px sans-serif"), 66, 474, 16, "12px sans-serif", "#496966");
    fillRoundRect(48, 536, 294, 92, 8, "rgba(250,113,103,0.08)");
    ctx.font = "700 14px sans-serif";
    ctx.fillStyle = "#8c4c51";
    ctx.fillText("\u4eca\u5929\u8fd9\u4e00\u5929", 66, 554);
    drawLines(wrapLines(result.summary, 258, "12px sans-serif"), 66, 580, 16, "12px sans-serif", "#5d7471");
    drawDimensionBar(65, 656, "E", "I", "E / I");
    drawDimensionBar(65, 686, "S", "N", "S / N");
    drawDimensionBar(65, 716, "T", "F", "T / F");
    drawDimensionBar(65, 746, "J", "P", "J / P");
    addButton("restart", 74, 770, 242, 44, "\u518d\u6d4b\u4e00\u6b21", "primary", resetGame);
  }

  function render() {
    if (app.broken) return;
    app.buttons = [];
    app.hotspots = [];
    ctx.clearRect(0, 0, W, H);
    if (app.screen === "cover") drawCover();
    else if (app.screen === "intro") drawIntro();
    else if (app.screen === "scenePreview") drawScenePreview();
    else if (app.screen === "sceneIntro") drawSceneIntro();
    else if (app.screen === "explore") drawExplore();
    else if (app.screen === "choice") drawChoice();
    else if (app.screen === "result") drawResult();
  }

  function loop(now) {
    try {
      app.time = now / 1000;
      render();
      window.requestAnimationFrame(loop);
    } catch (err) {
      showError(err);
    }
  }

  function bindEvents() {
    window.addEventListener("resize", safeCall(fitCanvas));
    window.addEventListener("orientationchange", safeCall(fitCanvas));
    canvas.addEventListener("pointerdown", safeCall(onPointerDown));
    canvas.addEventListener("pointermove", safeCall(onPointerMove));
    canvas.addEventListener("pointerup", safeCall(onPointerUp));
    canvas.addEventListener("pointercancel", safeCall(function () { app.pointer = null; }));
    window.addEventListener("error", function (event) { showError(event.error || event.message); });
    window.addEventListener("unhandledrejection", function (event) { showError(event.reason || event); });
  }

  function boot() {
    if (!DATA.config || !DATA.assets || !DATA.scenes || !DATA.events || !DATA.results || !canvas || !ctx) throw new Error(ERROR_TEXT);
    app = createAppState();
    fitCanvas();
    loadAssets();
    bindEvents();
    window.requestAnimationFrame(loop);
  }

  try { boot(); } catch (err) { showError(err); }
})();
