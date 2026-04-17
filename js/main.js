(function () {
  "use strict";

  var ERROR_TEXT = "哎呀，出错了，请重启试试吧~";
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

  var PAIRS = {
    E: "EI",
    I: "EI",
    S: "SN",
    N: "SN",
    T: "TF",
    F: "TF",
    J: "JP",
    P: "JP"
  };

  var RAIN_RECT = { x: 60, y: 54, w: 150, h: 170 };
  var WIND_RECT = { x: 270, y: 294, w: 112, h: 170 };
  var STEAM_RECT = { x: 54, y: 214, w: 150, h: 156 };

  function createAppState() {
    return {
      screen: "intro",
      eventIndex: 0,
      activeEventIndex: null,
      sceneIntroIndex: 0,
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      lastPick: { EI: null, SN: null, TF: null, JP: null },
      choices: [],
      hiddenChoices: [],
      completedEvents: {},
      triggeredSecrets: {},
      selectedChoice: null,
      feedback: null,
      secret: null,
      assets: {},
      sceneDrawRect: null,
      rainDrops: [],
      rainStreaks: [],
      rainSparkles: [],
      windGusts: [],
      windMotes: [],
      steamWisps: [],
      steamPuffs: [],
      buttons: [],
      hotspots: [],
      pointer: null,
      time: 0,
      broken: false
    };
  }

  function showError(err) {
    if (app) {
      app.broken = true;
    }
    if (window.console && console.error) {
      console.error(err);
    }
    if (errorPanel) {
      errorPanel.textContent = ERROR_TEXT;
      errorPanel.style.display = "block";
    }
  }

  function safeCall(fn) {
    return function (event) {
      try {
        fn(event);
      } catch (err) {
        showError(err);
      }
    };
  }

  function fitCanvas() {
    var viewportW = Math.max(1, window.innerWidth);
    var viewportH = Math.max(1, window.innerHeight);
    var scale = Math.min(viewportW / W, viewportH / H);
    var cssW = Math.floor(W * scale);
    var cssH = Math.floor(H * scale);
    DPR = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function loadAssets() {
    Object.keys(DATA.assets).forEach(function (key) {
      var img = new Image();
      app.assets[key] = { image: img, ready: false, failed: false };
      img.onload = function () {
        app.assets[key].ready = true;
      };
      img.onerror = function () {
        app.assets[key].failed = true;
      };
      img.src = DATA.assets[key];
    });
  }

  function seededRandom(seed) {
    var value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  }

  function initRainEffect() {
    app.rainDrops = [];
    app.rainStreaks = [];
    app.rainSparkles = [];
    app.windGusts = [];
    app.windMotes = [];
    app.steamWisps = [];
    app.steamPuffs = [];

    for (var i = 0; i < 34; i += 1) {
      app.rainDrops.push({
        x: seededRandom(i + 1) * RAIN_RECT.w,
        baseY: seededRandom(i + 41) * (RAIN_RECT.h + 48),
        length: 12 + seededRandom(i + 81) * 22,
        speed: 42 + seededRandom(i + 121) * 72,
        drift: 0.8 + seededRandom(i + 161) * 1.4,
        phase: seededRandom(i + 201) * Math.PI * 2,
        alpha: 0.30 + seededRandom(i + 241) * 0.22,
        slant: 1.4 + seededRandom(i + 281) * 3.2
      });
    }

    for (var j = 0; j < 10; j += 1) {
      app.rainStreaks.push({
        x: seededRandom(j + 321) * RAIN_RECT.w,
        baseY: seededRandom(j + 361) * (RAIN_RECT.h + 70),
        length: 20 + seededRandom(j + 401) * 46,
        speed: 14 + seededRandom(j + 441) * 22,
        alpha: 0.13 + seededRandom(j + 481) * 0.12,
        phase: seededRandom(j + 521) * Math.PI * 2
      });
    }

    for (var k = 0; k < 8; k += 1) {
      app.rainSparkles.push({
        x: seededRandom(k + 561) * RAIN_RECT.w,
        y: seededRandom(k + 601) * RAIN_RECT.h,
        radius: 1 + seededRandom(k + 641) * 1.7,
        alpha: 0.08 + seededRandom(k + 681) * 0.14,
        freq: 1.2 + seededRandom(k + 721) * 2.2,
        phase: seededRandom(k + 761) * Math.PI * 2
      });
    }

    for (var m = 0; m < 13; m += 1) {
      app.windGusts.push({
        baseX: seededRandom(m + 801) * (WIND_RECT.w + 80),
        y: seededRandom(m + 841) * WIND_RECT.h,
        width: 32 + seededRandom(m + 881) * 52,
        speed: 20 + seededRandom(m + 921) * 46,
        amp: 3 + seededRandom(m + 961) * 8,
        alpha: 0.16 + seededRandom(m + 1001) * 0.22,
        phase: seededRandom(m + 1041) * Math.PI * 2
      });
    }

    for (var n = 0; n < 8; n += 1) {
      app.windMotes.push({
        baseX: seededRandom(n + 1081) * (WIND_RECT.w + 70),
        y: seededRandom(n + 1121) * WIND_RECT.h,
        speed: 18 + seededRandom(n + 1161) * 34,
        radius: 1 + seededRandom(n + 1201) * 1.4,
        alpha: 0.12 + seededRandom(n + 1241) * 0.18,
        phase: seededRandom(n + 1281) * Math.PI * 2
      });
    }

    for (var p = 0; p < 9; p += 1) {
      app.steamWisps.push({
        x: seededRandom(p + 1321) * STEAM_RECT.w,
        baseY: seededRandom(p + 1361) * (STEAM_RECT.h + 60),
        height: 42 + seededRandom(p + 1401) * 48,
        speed: 12 + seededRandom(p + 1441) * 18,
        sway: 7 + seededRandom(p + 1481) * 14,
        alpha: 0.12 + seededRandom(p + 1521) * 0.18,
        phase: seededRandom(p + 1561) * Math.PI * 2
      });
    }

    for (var q = 0; q < 7; q += 1) {
      app.steamPuffs.push({
        x: seededRandom(q + 1601) * STEAM_RECT.w,
        baseY: seededRandom(q + 1641) * (STEAM_RECT.h + 42),
        speed: 8 + seededRandom(q + 1681) * 16,
        radius: 7 + seededRandom(q + 1721) * 12,
        alpha: 0.06 + seededRandom(q + 1761) * 0.10,
        phase: seededRandom(q + 1801) * Math.PI * 2
      });
    }
  }

  function currentEvent() {
    if (app.activeEventIndex == null) {
      return null;
    }
    return DATA.events[app.activeEventIndex] || null;
  }

  function sceneById(sceneId) {
    for (var i = 0; i < DATA.scenes.length; i += 1) {
      if (DATA.scenes[i].id === sceneId) {
        return DATA.scenes[i];
      }
    }
    return DATA.scenes[0];
  }

  function currentScene() {
    return DATA.scenes[app.sceneIntroIndex] || DATA.scenes[DATA.scenes.length - 1];
  }

  function sceneIndexForEvent(event) {
    for (var i = 0; i < DATA.scenes.length; i += 1) {
      if (DATA.scenes[i].id === event.sceneId) {
        return i;
      }
    }
    return 0;
  }

  function eventIndexById(eventId) {
    for (var i = 0; i < DATA.events.length; i += 1) {
      if (DATA.events[i].id === eventId) {
        return i;
      }
    }
    return null;
  }

  function eventsForSceneIndex(sceneIndex) {
    var scene = DATA.scenes[sceneIndex];
    if (!scene) {
      return [];
    }
    var events = [];
    for (var i = 0; i < DATA.events.length; i += 1) {
      if (DATA.events[i].sceneId === scene.id) {
        events.push(DATA.events[i]);
      }
    }
    return events;
  }

  function countCompletedEvents() {
    var total = 0;
    for (var i = 0; i < DATA.events.length; i += 1) {
      if (app.completedEvents[DATA.events[i].id]) {
        total += 1;
      }
    }
    return total;
  }

  function countCompletedInScene(sceneIndex) {
    var events = eventsForSceneIndex(sceneIndex);
    var total = 0;
    for (var i = 0; i < events.length; i += 1) {
      if (app.completedEvents[events[i].id]) {
        total += 1;
      }
    }
    return total;
  }

  function isSceneComplete(sceneIndex) {
    var events = eventsForSceneIndex(sceneIndex);
    return events.length > 0 && countCompletedInScene(sceneIndex) >= events.length;
  }

  function secretForEvent(event) {
    if (!event) {
      return null;
    }
    for (var i = 0; i < DATA.secrets.length; i += 1) {
      var secret = DATA.secrets[i];
      if (secret.eventId === event.id && !app.triggeredSecrets[secret.id]) {
        return secret;
      }
    }
    return null;
  }

  function secretForCurrentEvent() {
    return secretForEvent(currentEvent());
  }

  function startGame() {
    app.screen = "sceneIntro";
    app.eventIndex = 0;
    app.activeEventIndex = null;
    app.sceneIntroIndex = 0;
    app.feedback = null;
    app.secret = null;
    audio.confirm();
  }

  function resetGame() {
    var oldAssets = app.assets;
    app = createAppState();
    app.assets = oldAssets;
    initRainEffect();
    audio.confirm();
  }

  function enterExplore() {
    app.screen = "explore";
    app.feedback = null;
    app.secret = null;
    audio.transition();
  }

  function applyScore(score) {
    Object.keys(score).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(app.scores, key)) {
        app.scores[key] += score[key];
        app.lastPick[PAIRS[key]] = key;
      }
    });
  }

  function chooseOption(choice) {
    var event = currentEvent();
    if (!event || app.completedEvents[event.id]) {
      return;
    }
    applyScore(choice.score);
    app.selectedChoice = choice;
    app.choices.push({
      eventId: event.id,
      eventTitle: event.title,
      choiceText: choice.text,
      score: choice.score
    });
    app.completedEvents[event.id] = true;
    app.eventIndex = countCompletedEvents();
    app.feedback = {
      title: "选择之后",
      text: choice.feedback,
      hidden: false
    };
    app.screen = "feedback";
    audio.confirm();
  }

  function triggerSecret(secret) {
    app.secret = secret;
    app.screen = "secret";
    audio.secret();
  }

  function acceptSecret() {
    var secret = app.secret;
    if (!secret || app.triggeredSecrets[secret.id]) {
      app.screen = "explore";
      return;
    }
    applyScore(secret.score);
    app.triggeredSecrets[secret.id] = true;
    app.hiddenChoices.push({
      id: secret.id,
      title: secret.title,
      score: secret.score
    });
    app.feedback = {
      title: secret.title,
      text: secret.feedback,
      hidden: true
    };
    app.secret = null;
    app.screen = "feedback";
    audio.confirm();
  }

  function advanceAfterFeedback() {
    if (app.feedback && app.feedback.hidden) {
      app.feedback = null;
      app.activeEventIndex = null;
      app.screen = "explore";
      return;
    }

    app.feedback = null;
    app.selectedChoice = null;
    app.activeEventIndex = null;

    if (countCompletedEvents() >= DATA.config.normalEventTotal) {
      app.screen = "result";
      audio.transition();
      return;
    }

    if (isSceneComplete(app.sceneIntroIndex)) {
      app.sceneIntroIndex += 1;
      app.screen = "sceneIntro";
      audio.transition();
      return;
    }

    app.screen = "explore";
  }

  function getPointerPoint(event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * W / rect.width,
      y: (event.clientY - rect.top) * H / rect.height
    };
  }

  function hitTest(list, x, y) {
    for (var i = list.length - 1; i >= 0; i -= 1) {
      var item = list[i];
      if (x >= item.x && x <= item.x + item.w && y >= item.y && y <= item.y + item.h) {
        return item;
      }
    }
    return null;
  }

  function clearLongPress() {
    if (app.pointer && app.pointer.timer) {
      window.clearTimeout(app.pointer.timer);
      app.pointer.timer = null;
    }
  }

  function onPointerDown(event) {
    event.preventDefault();
    var point = getPointerPoint(event);
    var target = hitTest(app.buttons, point.x, point.y) || hitTest(app.hotspots, point.x, point.y);
    app.pointer = {
      x: point.x,
      y: point.y,
      target: target,
      longFired: false,
      timer: null
    };

    if (target && target.kind === "hotspot" && target.onLong) {
      app.pointer.timer = window.setTimeout(function () {
        if (!app.pointer || app.pointer.target !== target || app.pointer.longFired) {
          return;
        }
        app.pointer.longFired = true;
        target.onLong();
      }, DATA.config.longPressMs);
    }
  }

  function onPointerMove(event) {
    if (!app.pointer) {
      return;
    }
    var point = getPointerPoint(event);
    var dx = point.x - app.pointer.x;
    var dy = point.y - app.pointer.y;
    if (Math.sqrt(dx * dx + dy * dy) > DATA.config.moveCancelPx) {
      clearLongPress();
      app.pointer.target = null;
    }
  }

  function onPointerUp(event) {
    if (!app.pointer) {
      return;
    }
    event.preventDefault();
    clearLongPress();
    var point = getPointerPoint(event);
    var target = app.pointer.target;
    var longFired = app.pointer.longFired;
    app.pointer = null;

    if (!target || longFired) {
      return;
    }

    if (point.x < target.x || point.x > target.x + target.w || point.y < target.y || point.y > target.y + target.h) {
      return;
    }

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

  function drawWrapped(text, x, y, maxWidth, lineHeight, font, color, maxLines) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    var allLines = [];
    String(text).split("\n").forEach(function (paragraph) {
      var line = "";
      Array.from(paragraph).forEach(function (ch) {
        var test = line + ch;
        if (line && ctx.measureText(test).width > maxWidth) {
          allLines.push(line);
          line = ch;
        } else {
          line = test;
        }
      });
      allLines.push(line);
    });

    if (maxLines && allLines.length > maxLines) {
      allLines = allLines.slice(0, maxLines);
      var last = allLines[allLines.length - 1];
      while (last.length > 0 && ctx.measureText(last + "…").width > maxWidth) {
        last = last.slice(0, -1);
      }
      allLines[allLines.length - 1] = last + "…";
    }

    for (var i = 0; i < allLines.length; i += 1) {
      ctx.fillText(allLines[i], x, y + i * lineHeight);
    }
    return y + allLines.length * lineHeight;
  }

  function drawAsset(key, x, y, w, h, alpha) {
    var asset = app.assets[key];
    if (!asset || !asset.ready) {
      return false;
    }
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(asset.image, x, y, w, h);
    ctx.restore();
    return true;
  }

  function hexToRgb(hex) {
    var value = String(hex || "#4f9f8f").replace("#", "");
    if (value.length === 3) {
      value = value.split("").map(function (ch) { return ch + ch; }).join("");
    }
    var num = parseInt(value, 16);
    if (Number.isNaN(num)) {
      return { r: 79, g: 159, b: 143 };
    }
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function sceneFill(color) {
    var rgb = hexToRgb(color);
    var gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.28)");
    gradient.addColorStop(0.54, "rgba(255,255,255,0.38)");
    gradient.addColorStop(1, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.22)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);
  }

  function drawCoverImage(img, alpha, blurPx) {
    var scale = Math.max(W / img.width, H / img.height);
    var dw = img.width * scale;
    var dh = img.height * scale;
    var dx = (W - dw) / 2;
    var dy = (H - dh) / 2;

    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.imageSmoothingEnabled = false;
    if (blurPx && "filter" in ctx) {
      ctx.filter = "blur(" + blurPx + "px)";
    }
    ctx.drawImage(img, dx - 12, dy - 12, dw + 24, dh + 24);
    ctx.restore();
  }

  function drawSmartSceneAsset(key, color) {
    var asset = app.assets[key];
    if (!asset || !asset.ready) {
      return false;
    }
    var img = asset.image;
    var coverScale = Math.max(W / img.width, H / img.height);
    var coverW = img.width * coverScale;
    var coverH = img.height * coverScale;
    var cropX = Math.max(0, (coverW - W) / coverW / 2);
    var cropY = Math.max(0, (coverH - H) / coverH / 2);
    var canCoverSafely = cropX <= 0.08 && cropY <= 0.10;
    var scale;
    var dw;
    var dh;
    var dx;
    var dy;

    sceneFill(color);
    drawCoverImage(img, 0.28, 0);

    if (canCoverSafely) {
      scale = coverScale;
      dw = coverW;
      dh = coverH;
      dx = (W - dw) / 2;
      dy = (H - dh) / 2;
      app.sceneDrawRect = {
        x: dx,
        y: dy,
        w: dw,
        h: dh,
        scale: scale,
        sx: 0,
        sy: 0,
        sw: img.width,
        sh: img.height
      };
    } else {
      scale = Math.min(W / img.width, H / img.height);
      dw = img.width * scale;
      dh = img.height * scale;
      dx = (W - dw) / 2;
      dy = 0;
      app.sceneDrawRect = {
        x: dx,
        y: dy,
        w: dw,
        h: dh,
        scale: scale,
        sx: 0,
        sy: 0,
        sw: img.width,
        sh: img.height
      };
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();

    if (!canCoverSafely && dy + dh < H) {
      var rgb = hexToRgb(color);
      var fade = ctx.createLinearGradient(0, Math.max(0, dy + dh - 56), 0, H);
      fade.addColorStop(0, "rgba(255,255,255,0)");
      fade.addColorStop(0.34, "rgba(255,255,255,0.42)");
      fade.addColorStop(1, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.20)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, Math.max(0, dy + dh - 56), W, H - Math.max(0, dy + dh - 56));
    }

    return true;
  }

  function drawFallbackBackground(scene) {
    var base = scene.color || "#4f9f8f";
    ctx.fillStyle = "#f8fbff";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = base;
    ctx.globalAlpha = 0.16;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    for (var i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.ellipse(40 + i * 58, 120 + Math.sin(i) * 18, 42, 12, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(80, 188, 173, 0.16)";
    ctx.beginPath();
    ctx.moveTo(0, 652);
    ctx.bezierCurveTo(100, 610, 198, 690, 390, 628);
    ctx.lineTo(390, 844);
    ctx.lineTo(0, 844);
    ctx.closePath();
    ctx.fill();
  }

  function drawMorningRain() {
    var rect = RAIN_RECT;
    var margin = 44;
    var time = app.time || 0;

    ctx.save();
    roundRectPath(rect.x + 4, rect.y + 4, rect.w - 8, rect.h - 8, 8);
    ctx.clip();

    ctx.lineCap = "round";
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = "rgb(78, 132, 151)";
    for (var i = 0; i < app.rainDrops.length; i += 1) {
      var drop = app.rainDrops[i];
      var y = rect.y + ((drop.baseY + time * drop.speed) % (rect.h + margin)) - margin;
      var x = rect.x + drop.x + Math.sin(time * drop.drift + drop.phase) * 2;
      var alpha = drop.alpha + Math.sin(time * 1.8 + drop.phase) * 0.04;

      ctx.globalAlpha = Math.max(0.14, alpha);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + drop.slant, y + drop.length);
      ctx.stroke();
    }

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgb(104, 155, 166)";
    for (var j = 0; j < app.rainStreaks.length; j += 1) {
      var streak = app.rainStreaks[j];
      var sy = rect.y + ((streak.baseY + time * streak.speed) % (rect.h + margin + 36)) - margin;
      var sx = rect.x + streak.x + Math.sin(time * 0.65 + streak.phase) * 1.2;
      var sAlpha = streak.alpha + Math.sin(time * 1.1 + streak.phase) * 0.03;

      ctx.globalAlpha = Math.max(0.08, sAlpha);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 1.5, sy + streak.length);
      ctx.stroke();
    }

    ctx.fillStyle = "rgb(235, 252, 255)";
    for (var k = 0; k < app.rainSparkles.length; k += 1) {
      var sparkle = app.rainSparkles[k];
      var sparkleAlpha = sparkle.alpha + Math.sin(time * sparkle.freq + sparkle.phase) * 0.08;
      ctx.globalAlpha = Math.max(0.02, sparkleAlpha);
      ctx.beginPath();
      ctx.arc(rect.x + sparkle.x, rect.y + sparkle.y, sparkle.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawStageWind() {
    var rect = WIND_RECT;
    var time = app.time || 0;

    ctx.save();
    roundRectPath(rect.x, rect.y, rect.w, rect.h, 8);
    ctx.clip();
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(238, 255, 248)";

    for (var i = 0; i < app.windGusts.length; i += 1) {
      var gust = app.windGusts[i];
      var x = rect.x + ((gust.baseX + time * gust.speed) % (rect.w + 86)) - 46;
      var y = rect.y + gust.y + Math.sin(time * 1.6 + gust.phase) * gust.amp;
      var alpha = gust.alpha + Math.sin(time * 1.25 + gust.phase) * 0.06;

      ctx.globalAlpha = Math.max(0.05, alpha);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + gust.width * 0.32, y - gust.amp, x + gust.width * 0.62, y + gust.amp, x + gust.width, y);
      ctx.stroke();
    }

    ctx.fillStyle = "rgb(255, 255, 255)";
    for (var j = 0; j < app.windMotes.length; j += 1) {
      var mote = app.windMotes[j];
      var mx = rect.x + ((mote.baseX + time * mote.speed) % (rect.w + 70)) - 35;
      var my = rect.y + mote.y + Math.sin(time * 2 + mote.phase) * 4;
      var mAlpha = mote.alpha + Math.sin(time * 1.7 + mote.phase) * 0.05;

      ctx.globalAlpha = Math.max(0.04, mAlpha);
      ctx.beginPath();
      ctx.arc(mx, my, mote.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawDinerSteam() {
    var rect = STEAM_RECT;
    var time = app.time || 0;
    var margin = 44;

    ctx.save();
    roundRectPath(rect.x, rect.y, rect.w, rect.h, 8);
    ctx.clip();
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(255, 248, 226)";

    for (var i = 0; i < app.steamWisps.length; i += 1) {
      var wisp = app.steamWisps[i];
      var progress = ((wisp.baseY + time * wisp.speed) % (rect.h + margin)) / (rect.h + margin);
      var y = rect.y + rect.h - progress * (rect.h + margin) + 14;
      var x = rect.x + wisp.x + Math.sin(time * 1.1 + wisp.phase) * 5;
      var sway = Math.sin(time * 1.4 + wisp.phase) * wisp.sway;
      var alpha = (1 - progress) * wisp.alpha + Math.sin(time * 1.3 + wisp.phase) * 0.03;

      ctx.globalAlpha = Math.max(0.03, alpha);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + sway, y - wisp.height * 0.32, x - sway * 0.5, y - wisp.height * 0.68, x + sway * 0.35, y - wisp.height);
      ctx.stroke();
    }

    ctx.fillStyle = "rgb(255, 250, 232)";
    for (var j = 0; j < app.steamPuffs.length; j += 1) {
      var puff = app.steamPuffs[j];
      var puffProgress = ((puff.baseY + time * puff.speed) % (rect.h + margin)) / (rect.h + margin);
      var px = rect.x + puff.x + Math.sin(time * 0.9 + puff.phase) * 9;
      var py = rect.y + rect.h - puffProgress * (rect.h + margin) + 6;
      var pAlpha = (1 - puffProgress) * puff.alpha + Math.sin(time * 1.2 + puff.phase) * 0.02;

      ctx.globalAlpha = Math.max(0.02, pAlpha);
      ctx.beginPath();
      ctx.ellipse(px, py, puff.radius * 0.72, puff.radius, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawSceneEffects(scene) {
    if (scene && scene.id === "morning") {
      drawMorningRain();
    } else if (scene && scene.id === "stage") {
      drawStageWind();
    } else if (scene && scene.id === "diner") {
      drawDinerSteam();
    }
  }

  function drawSceneBackground(scene) {
    if (!drawSmartSceneAsset(scene.asset, scene.color)) {
      app.sceneDrawRect = { x: 0, y: 0, w: W, h: H, scale: 1, sx: 0, sy: 0, sw: W, sh: H };
      drawFallbackBackground(scene);
    }
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.fillRect(0, 0, W, H);
    drawSceneEffects(scene);
  }

  function addButton(id, x, y, w, h, label, variant, onTap) {
    var button = { id: id, x: x, y: y, w: w, h: h, label: label, variant: variant || "primary", onTap: onTap, kind: "button" };
    app.buttons.push(button);
    drawButton(button);
    return button;
  }

  function drawButton(button) {
    var isGhost = button.variant === "ghost";
    var isSoft = button.variant === "soft";
    var fill = isGhost ? "rgba(255,255,255,0.68)" : isSoft ? "rgba(255,255,255,0.88)" : "#2f8b86";
    var stroke = isGhost ? "rgba(47,139,134,0.20)" : isSoft ? "rgba(47,139,134,0.18)" : "rgba(255,255,255,0.55)";
    var text = isGhost || isSoft ? "#315b58" : "#ffffff";

    fillRoundRect(button.x, button.y, button.w, button.h, 8, fill);
    strokeRoundRect(button.x, button.y, button.w, button.h, 8, stroke, 1);
    ctx.font = button.h > 52 ? "600 16px sans-serif" : "600 14px sans-serif";
    ctx.fillStyle = text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(button.label, button.x + button.w / 2, button.y + button.h / 2);
  }

  function drawAudioButton() {
    var label = audio.enabled ? "音开" : "音关";
    addButton("audio", 312, 18, 54, 34, label, "ghost", function () {
      audio.toggle();
    });
  }

  function drawTopHud(scene) {
    fillRoundRect(20, 18, 156, 34, 8, "rgba(255,255,255,0.72)");
    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "#315b58";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(scene.title + " · " + scene.name, 32, 35);

    var normalDone = app.screen === "result" ? DATA.config.normalEventTotal : countCompletedEvents();
    var sceneDone = countCompletedInScene(app.sceneIntroIndex);
    var sceneTotal = eventsForSceneIndex(app.sceneIntroIndex).length || 4;
    var progress = "总 " + normalDone + "/" + DATA.config.normalEventTotal + " · 本幕 " + sceneDone + "/" + sceneTotal + " · 隐藏 " + app.hiddenChoices.length + "/" + DATA.config.hiddenEventTotal;
    fillRoundRect(20, 60, 210, 28, 8, "rgba(255,255,255,0.62)");
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#4d6d69";
    ctx.fillText(progress, 32, 74);
  }

  function drawHotspotObject(hotspot, active) {
    var x = hotspot.x;
    var y = hotspot.y;
    var w = hotspot.w;
    var h = hotspot.h;
    var pulse = active ? 1 + Math.sin(app.time * 4) * 0.08 : 1;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-x - w / 2, -y - h / 2);

    if (hotspot.asset && drawAsset(hotspot.asset, x, y, w, h, 1)) {
      ctx.restore();
      return;
    }

    if (hotspot.kind === "window") {
      fillRoundRect(x, y, w, h, 8, "rgba(232,248,255,0.86)");
      strokeRoundRect(x, y, w, h, 8, "rgba(69,120,133,0.35)", 2);
      ctx.strokeStyle = "rgba(69,120,133,0.28)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 8);
      ctx.lineTo(x + w / 2, y + h - 8);
      ctx.moveTo(x + 8, y + h / 2);
      ctx.lineTo(x + w - 8, y + h / 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(47,139,134,0.28)";
      for (var r = 0; r < 5; r += 1) {
        ctx.fillRect(x + 18 + r * 18, y + 26 + r * 18, 3, 16);
      }
    } else if (hotspot.kind === "mirror") {
      fillRoundRect(x, y, w, h, 48, "rgba(232,248,255,0.92)");
      strokeRoundRect(x, y, w, h, 48, "rgba(60,140,143,0.36)", 3);
      ctx.fillStyle = "rgba(255,255,255,0.58)";
      ctx.beginPath();
      ctx.ellipse(x + w * 0.38, y + h * 0.36, w * 0.18, h * 0.28, -0.25, 0, Math.PI * 2);
      ctx.fill();
    } else if (hotspot.kind === "letter") {
      fillRoundRect(x, y, w, h, 6, "#fff7f0");
      strokeRoundRect(x, y, w, h, 6, "rgba(210,98,98,0.32)", 2);
      ctx.strokeStyle = "rgba(210,98,98,0.34)";
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 10);
      ctx.lineTo(x + w / 2, y + h / 2);
      ctx.lineTo(x + w - 8, y + 10);
      ctx.stroke();
    } else if (hotspot.kind === "table" || hotspot.kind === "meeting" || hotspot.kind === "bar") {
      fillRoundRect(x, y + h * 0.35, w, h * 0.42, 8, "rgba(255,255,255,0.82)");
      strokeRoundRect(x, y + h * 0.35, w, h * 0.42, 8, "rgba(49,91,88,0.18)", 1);
      ctx.fillStyle = "rgba(250,113,103,0.32)";
      ctx.beginPath();
      ctx.ellipse(x + w * 0.28, y + h * 0.54, 18, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(80,188,173,0.32)";
      ctx.beginPath();
      ctx.ellipse(x + w * 0.66, y + h * 0.54, 20, 11, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (hotspot.kind === "notes") {
      fillRoundRect(x + 10, y + 4, 50, 54, 6, "#fff6a5");
      fillRoundRect(x + 48, y + 26, 54, 56, 6, "#b8eadf");
      fillRoundRect(x + 4, y + 48, 60, 44, 6, "#ffc6bf");
      strokeRoundRect(x + 10, y + 4, 50, 54, 6, "rgba(49,91,88,0.14)", 1);
    } else if (hotspot.kind === "person") {
      ctx.fillStyle = "rgba(49,91,88,0.18)";
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h - 12, 34, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      fillRoundRect(x + w * 0.28, y + h * 0.36, w * 0.44, h * 0.42, 8, "#6ab8ac");
      ctx.fillStyle = "#ffd4c9";
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h * 0.25, w * 0.18, 0, Math.PI * 2);
      ctx.fill();
    } else if (hotspot.kind === "screen" || hotspot.kind === "glass" || hotspot.kind === "projection") {
      fillRoundRect(x, y, w, h, 8, "rgba(236,249,255,0.90)");
      strokeRoundRect(x, y, w, h, 8, "rgba(47,139,134,0.32)", 2);
      ctx.fillStyle = "rgba(250,113,103,0.28)";
      fillRoundRect(x + 16, y + 18, w - 32, 12, 6, "rgba(250,113,103,0.28)");
      fillRoundRect(x + 16, y + 42, w * 0.55, 10, 5, "rgba(80,188,173,0.32)");
    } else if (hotspot.kind === "cup" || hotspot.kind === "soup") {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h * 0.35, w * 0.34, h * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
      fillRoundRect(x + w * 0.24, y + h * 0.34, w * 0.52, h * 0.38, 8, "#ffffff");
      strokeRoundRect(x + w * 0.24, y + h * 0.34, w * 0.52, h * 0.38, 8, "rgba(49,91,88,0.14)", 1);
      ctx.strokeStyle = "rgba(47,139,134,0.28)";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.42, y + 4);
      ctx.quadraticCurveTo(x + w * 0.35, y + 18, x + w * 0.46, y + 30);
      ctx.moveTo(x + w * 0.58, y + 0);
      ctx.quadraticCurveTo(x + w * 0.52, y + 18, x + w * 0.64, y + 32);
      ctx.stroke();
    } else if (hotspot.kind === "map") {
      fillRoundRect(x, y, w, h, 6, "#f7fbf4");
      strokeRoundRect(x, y, w, h, 6, "rgba(49,91,88,0.18)", 1);
      ctx.strokeStyle = "rgba(47,139,134,0.42)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 16, y + h - 22);
      ctx.bezierCurveTo(x + 44, y + 24, x + 86, y + h - 8, x + w - 14, y + 18);
      ctx.stroke();
    } else if (hotspot.kind === "light") {
      ctx.fillStyle = "rgba(255,242,163,0.64)";
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, w * 0.45, h * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
      fillRoundRect(x + w * 0.22, y + h * 0.42, w * 0.56, 14, 7, "#fff7c9");
    } else if (hotspot.kind === "wind") {
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 5;
      for (var j = 0; j < 4; j += 1) {
        ctx.beginPath();
        ctx.moveTo(x + 6, y + 18 + j * 24);
        ctx.bezierCurveTo(x + 34, y + 4 + j * 24, x + 52, y + 42 + j * 24, x + w - 6, y + 18 + j * 24);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function drawHotspot(event, active) {
    var hotspot = event.hotspot;
    var secret = secretForEvent(event);
    var pulse = active ? Math.sin(app.time * 4) : 0;
    var pad = active ? 7 + pulse * 3 : 4;
    var x = hotspot.x - pad;
    var y = hotspot.y - pad;
    var w = hotspot.w + pad * 2;
    var h = hotspot.h + pad * 2;

    ctx.save();
    ctx.globalAlpha = active ? 1 : 0.72;
    fillRoundRect(x, y, w, h, 8, active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)");
    strokeRoundRect(x, y, w, h, 8, active ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.56)", active ? 3 : 2);
    strokeRoundRect(x + 3, y + 3, w - 6, h - 6, 8, active ? "rgba(47,139,134,0.48)" : "rgba(47,139,134,0.24)", 1);
    ctx.restore();

    if (active) {
      ctx.font = "600 13px sans-serif";
      var label = event.objectLabel || hotspot.label;
      var labelW = Math.max(72, Math.min(122, ctx.measureText(label).width + 28));
      var labelX = Math.max(14, Math.min(W - labelW - 14, hotspot.x + hotspot.w / 2 - labelW / 2));
      var labelY = hotspot.y + hotspot.h + 12;
      if (labelY + 28 > 574) {
        labelY = Math.max(96, hotspot.y - 36);
      }
      fillRoundRect(labelX, labelY, labelW, 28, 8, "rgba(255,255,255,0.88)");
      strokeRoundRect(labelX, labelY, labelW, 28, 8, "rgba(47,139,134,0.18)", 1);
      ctx.font = "600 13px sans-serif";
      ctx.fillStyle = "#315b58";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, labelX + labelW / 2, labelY + 14);

      if (secret) {
        var hintW = 66;
        var hintX = Math.max(14, Math.min(W - hintW - 14, labelX + labelW - 18));
        var hintY = Math.max(96, labelY - 32);
        fillRoundRect(hintX, hintY, hintW, 24, 8, "rgba(210,98,98,0.90)");
        ctx.font = "600 12px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("长按", hintX + hintW / 2, hintY + 12);
      }
    }
  }

  function drawCompletedMark(event) {
    var hotspot = event.hotspot;
    fillRoundRect(hotspot.x + hotspot.w - 36, hotspot.y - 8, 56, 26, 8, "rgba(47,139,134,0.88)");
    ctx.font = "600 12px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("已完成", hotspot.x + hotspot.w - 8, hotspot.y + 5);
  }

  function addSceneHotspot(event) {
    var secret = secretForEvent(event);
    var hotspot = event.hotspot;
    app.hotspots.push({
      id: hotspot.id,
      kind: "hotspot",
      x: hotspot.x - 18,
      y: hotspot.y - 18,
      w: hotspot.w + 36,
      h: hotspot.h + 52,
      onTap: function () {
        app.activeEventIndex = eventIndexById(event.id);
        app.screen = "dialogue";
      },
      onLong: secret ? function () {
        app.activeEventIndex = eventIndexById(event.id);
        triggerSecret(secret);
      } : null
    });
  }

  function drawDialoguePanel(event, showChoices) {
    fillRoundRect(20, 492, 350, 326, 8, "rgba(255,255,255,0.94)");
    strokeRoundRect(20, 492, 350, 326, 8, "rgba(47,139,134,0.18)", 1);

    fillRoundRect(34, 508, 92, 28, 8, "rgba(47,139,134,0.12)");
    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "#2f615d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(event.speaker, 80, 522);

    drawWrapped(event.prompt, 36, 548, 318, 22, "15px sans-serif", "#2d4542", 4);

    if (showChoices) {
      var startY = 644;
      for (var i = 0; i < event.choices.length; i += 1) {
        (function (choice, index) {
          addButton("choice-" + index, 36, startY + index * 56, 318, 46, choice.text, "soft", function () {
            chooseOption(choice);
          });
        })(event.choices[i], i);
      }
    }
  }

  function drawIntro() {
    drawSceneBackground(DATA.scenes[0]);
    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.fillRect(0, 0, W, H);

    fillRoundRect(30, 96, 330, 176, 8, "rgba(255,255,255,0.78)");
    ctx.font = "700 34px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(DATA.title, W / 2, 126);
    drawWrapped(DATA.subtitle, 62, 180, 266, 24, "15px sans-serif", "#496966", 3);

    fillRoundRect(44, 318, 302, 188, 8, "rgba(255,255,255,0.70)");
    drawWrapped(DATA.concept, 66, 346, 258, 26, "17px sans-serif", "#2d4542", 4);
    drawWrapped("五幕，二十个选择，两段藏在长按里的回声。", 66, 452, 258, 22, "14px sans-serif", "#5d7471", 3);

    addButton("start", 74, 688, 242, 54, "开始这一天", "primary", startGame);
    drawAudioButton();
  }

  function drawSceneIntro() {
    var scene = DATA.scenes[app.sceneIntroIndex];
    drawSceneBackground(scene);
    ctx.fillStyle = "rgba(255,255,255,0.30)";
    ctx.fillRect(0, 0, W, H);
    drawTopHud(scene);

    fillRoundRect(32, 190, 326, 302, 8, "rgba(255,255,255,0.84)");
    ctx.font = "700 24px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(scene.title, W / 2, 224);
    ctx.font = "700 32px sans-serif";
    ctx.fillText(scene.name, W / 2, 262);
    fillRoundRect(146, 318, 98, 32, 8, "rgba(47,139,134,0.12)");
    ctx.font = "600 14px sans-serif";
    ctx.fillStyle = "#2f615d";
    ctx.textBaseline = "middle";
    ctx.fillText(scene.time, W / 2, 334);
    drawWrapped(scene.intro, 58, 382, 274, 24, "16px sans-serif", "#385a56", 4);

    addButton("scene-next", 92, 676, 206, 52, "继续", "primary", enterExplore);
    drawAudioButton();
  }

  function drawExplore() {
    var scene = currentScene();
    var events = eventsForSceneIndex(app.sceneIntroIndex);
    var remaining = events.length - countCompletedInScene(app.sceneIntroIndex);
    var hasSecretHint = false;
    drawSceneBackground(scene);
    drawTopHud(scene);
    drawAudioButton();

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      var done = !!app.completedEvents[event.id];
      var eventSecret = secretForEvent(event);
      if (!done && event.hint && eventSecret) {
        hasSecretHint = true;
      }
      drawHotspot(event, !done);
      if (done) {
        drawCompletedMark(event);
      } else {
        addSceneHotspot(event);
      }
    }

    fillRoundRect(28, 586, 334, hasSecretHint ? 158 : 132, 8, "rgba(255,255,255,0.88)");
    ctx.font = "700 18px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(scene.name, 48, 610);
    drawWrapped("本幕有 " + remaining + " 个未完成物件。你可以按自己的顺序点击，先点哪个，就先进入哪个事件。", 48, 648, 292, 22, "15px sans-serif", "#496966", 3);
    if (hasSecretHint) {
      drawWrapped("提示：有些物件长按 650ms 会出现隐藏反应。", 48, 724, 292, 22, "14px sans-serif", "#d26262", 2);
    }
  }

  function drawDialogue() {
    var event = currentEvent();
    if (!event) {
      app.screen = "explore";
      return;
    }
    drawSceneBackground(currentScene());
    drawTopHud(currentScene());
    drawAudioButton();
    drawHotspot(event, false);
    drawDialoguePanel(event, true);
  }

  function drawFeedback() {
    var event = currentEvent();
    if (!event && !(app.feedback && app.feedback.hidden)) {
      app.screen = "explore";
      return;
    }
    drawSceneBackground(currentScene());
    drawTopHud(currentScene());
    drawAudioButton();
    if (event) {
      drawHotspot(event, false);
    }

    var isHidden = app.feedback && app.feedback.hidden;
    var y = isHidden ? 314 : 452;
    var h = isHidden ? 256 : 276;
    fillRoundRect(26, y, 338, h, 8, "rgba(255,255,255,0.94)");
    strokeRoundRect(26, y, 338, h, 8, isHidden ? "rgba(210,98,98,0.24)" : "rgba(47,139,134,0.18)", 1);

    ctx.font = "700 22px sans-serif";
    ctx.fillStyle = isHidden ? "#b24f58" : "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(app.feedback.title, W / 2, y + 30);
    drawWrapped(app.feedback.text, 52, y + 82, 286, 25, "16px sans-serif", "#385a56", 5);

    addButton("feedback-next", 74, y + h - 76, 242, 50, isHidden ? "继续探索" : "进入下一刻", "primary", advanceAfterFeedback);
  }

  function drawSecret() {
    var event = currentEvent();
    var secret = app.secret;
    if (!event || !secret) {
      app.screen = "explore";
      return;
    }
    drawSceneBackground(currentScene());
    drawTopHud(currentScene());
    drawHotspot(event, false);

    ctx.fillStyle = "rgba(36, 91, 86, 0.24)";
    ctx.fillRect(0, 0, W, H);

    var glow = 0.4 + Math.sin(app.time * 5) * 0.12;
    ctx.strokeStyle = "rgba(255,255,255," + glow + ")";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(W / 2, 320, 86 + Math.sin(app.time * 4) * 6, 0, Math.PI * 2);
    ctx.stroke();

    fillRoundRect(30, 246, 330, 316, 8, "rgba(255,255,255,0.96)");
    strokeRoundRect(30, 246, 330, 316, 8, "rgba(210,98,98,0.28)", 1);
    ctx.font = "700 23px sans-serif";
    ctx.fillStyle = "#b24f58";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(secret.title, W / 2, 282);
    drawWrapped(secret.prompt, 56, 336, 278, 25, "16px sans-serif", "#385a56", 5);
    addButton("secret-accept", 70, 482, 250, 52, secret.actionText, "primary", acceptSecret);
  }

  function pickDimension(a, b, pair) {
    if (app.scores[a] > app.scores[b]) {
      return a;
    }
    if (app.scores[b] > app.scores[a]) {
      return b;
    }
    return app.lastPick[pair] || DATA.defaultTie[pair];
  }

  function resultType() {
    return [
      pickDimension("E", "I", "EI"),
      pickDimension("S", "N", "SN"),
      pickDimension("T", "F", "TF"),
      pickDimension("J", "P", "JP")
    ].join("");
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

  function drawResultBadgeFallback() {
    ctx.fillStyle = "#e8f8f4";
    ctx.beginPath();
    ctx.arc(W / 2, 136, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2f8b86";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.strokeStyle = "rgba(250,113,103,0.58)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 34, 150);
    ctx.bezierCurveTo(W / 2 - 14, 104, W / 2 + 12, 164, W / 2 + 36, 112);
    ctx.stroke();
  }

  function drawResult() {
    var scene = DATA.scenes[DATA.scenes.length - 1];
    drawSceneBackground(scene);
    drawAudioButton();

    var type = resultType();
    var result = DATA.results[type];

    fillRoundRect(24, 54, 342, 708, 8, "rgba(255,255,255,0.94)");
    strokeRoundRect(24, 54, 342, 708, 8, "rgba(47,139,134,0.20)", 1);
    if (!drawAsset("badgeResult", 137, 78, 116, 116, 1)) {
      drawResultBadgeFallback();
    }

    ctx.font = "700 44px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(type, W / 2, 188);
    ctx.font = "700 22px sans-serif";
    ctx.fillText(result.name, W / 2, 238);

    drawWrapped(result.description, 48, 286, 294, 22, "15px sans-serif", "#385a56", 4);

    fillRoundRect(48, 386, 294, 104, 8, "rgba(47,139,134,0.08)");
    ctx.font = "700 15px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("适合的学习 / 工作方式", 66, 404);
    drawWrapped(result.work, 66, 432, 258, 19, "13px sans-serif", "#496966", 3);

    fillRoundRect(48, 506, 294, 112, 8, "rgba(210,98,98,0.08)");
    ctx.font = "700 15px sans-serif";
    ctx.fillStyle = "#8c4c51";
    ctx.fillText("今天这一天", 66, 524);
    drawWrapped(result.summary, 66, 552, 258, 19, "13px sans-serif", "#5d7471", 4);

    drawDimensionBar(65, 642, "E", "I", "外向 / 内向");
    drawDimensionBar(65, 674, "S", "N", "实感 / 直觉");
    drawDimensionBar(65, 706, "T", "F", "思考 / 情感");
    drawDimensionBar(65, 738, "J", "P", "判断 / 知觉");

    addButton("restart", 74, 776, 242, 48, "再测一次", "primary", resetGame);
  }

  function render() {
    if (app.broken) {
      return;
    }
    app.buttons = [];
    app.hotspots = [];
    ctx.clearRect(0, 0, W, H);

    if (app.screen === "intro") {
      drawIntro();
    } else if (app.screen === "sceneIntro") {
      drawSceneIntro();
    } else if (app.screen === "explore") {
      drawExplore();
    } else if (app.screen === "dialogue") {
      drawDialogue();
    } else if (app.screen === "feedback") {
      drawFeedback();
    } else if (app.screen === "secret") {
      drawSecret();
    } else if (app.screen === "result") {
      drawResult();
    }
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
    canvas.addEventListener("pointercancel", safeCall(function () {
      clearLongPress();
      app.pointer = null;
    }));
    window.addEventListener("error", function (event) {
      showError(event.error || event.message);
    });
    window.addEventListener("unhandledrejection", function (event) {
      showError(event.reason || event);
    });
  }

  function boot() {
    if (!DATA.config || !DATA.assets || !DATA.scenes || !DATA.events || !DATA.results || !canvas || !ctx) {
      throw new Error(ERROR_TEXT);
    }
    app = createAppState();
    fitCanvas();
    loadAssets();
    initRainEffect();
    bindEvents();
    window.requestAnimationFrame(loop);
  }

  try {
    boot();
  } catch (err) {
    showError(err);
  }
})();
