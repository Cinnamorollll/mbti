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

  function createAppState() {
    return {
      screen: "intro",
      eventIndex: 0,
      sceneIntroIndex: 0,
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      lastPick: { EI: null, SN: null, TF: null, JP: null },
      choices: [],
      hiddenChoices: [],
      triggeredSecrets: {},
      selectedChoice: null,
      feedback: null,
      secret: null,
      assets: {},
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

  function currentEvent() {
    return DATA.events[app.eventIndex] || null;
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
    var event = currentEvent();
    if (event) {
      return sceneById(event.sceneId);
    }
    return DATA.scenes[DATA.scenes.length - 1];
  }

  function sceneIndexForEvent(event) {
    for (var i = 0; i < DATA.scenes.length; i += 1) {
      if (DATA.scenes[i].id === event.sceneId) {
        return i;
      }
    }
    return 0;
  }

  function secretForCurrentEvent() {
    var event = currentEvent();
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

  function startGame() {
    app.screen = "sceneIntro";
    app.eventIndex = 0;
    app.sceneIntroIndex = 0;
    app.feedback = null;
    app.secret = null;
    audio.confirm();
  }

  function resetGame() {
    var oldAssets = app.assets;
    app = createAppState();
    app.assets = oldAssets;
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
    applyScore(choice.score);
    app.selectedChoice = choice;
    app.choices.push({
      eventId: currentEvent().id,
      eventTitle: currentEvent().title,
      choiceText: choice.text,
      score: choice.score
    });
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
      app.screen = "explore";
      return;
    }

    app.eventIndex += 1;
    app.feedback = null;
    app.selectedChoice = null;

    if (app.eventIndex >= DATA.events.length) {
      app.screen = "result";
      audio.transition();
      return;
    }

    if (app.eventIndex % 4 === 0) {
      app.sceneIntroIndex = sceneIndexForEvent(currentEvent());
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
    ctx.drawImage(asset.image, x, y, w, h);
    ctx.restore();
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

  function drawSceneBackground(scene) {
    if (!drawAsset(scene.asset, 0, 0, W, H, 1)) {
      drawFallbackBackground(scene);
    }
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.fillRect(0, 0, W, H);
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

    var normalDone = Math.min(app.eventIndex + (app.screen === "result" ? 0 : 1), DATA.config.normalEventTotal);
    if (app.screen === "result") {
      normalDone = DATA.config.normalEventTotal;
    }
    var progress = "事件 " + normalDone + "/" + DATA.config.normalEventTotal + " · 隐藏 " + app.hiddenChoices.length + "/" + DATA.config.hiddenEventTotal;
    fillRoundRect(20, 60, 154, 28, 8, "rgba(255,255,255,0.62)");
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
    drawHotspotObject(hotspot, active);

    if (active) {
      var pad = 10 + Math.sin(app.time * 4) * 4;
      strokeRoundRect(hotspot.x - pad, hotspot.y - pad, hotspot.w + pad * 2, hotspot.h + pad * 2, 8, "rgba(47,139,134,0.48)", 2);
      fillRoundRect(hotspot.x + hotspot.w / 2 - 42, hotspot.y + hotspot.h + 14, 84, 28, 8, "rgba(255,255,255,0.82)");
      ctx.font = "600 13px sans-serif";
      ctx.fillStyle = "#315b58";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(event.objectLabel || hotspot.label, hotspot.x + hotspot.w / 2, hotspot.y + hotspot.h + 28);
    }
  }

  function addCurrentHotspot(event) {
    var secret = secretForCurrentEvent();
    var hotspot = event.hotspot;
    app.hotspots.push({
      id: hotspot.id,
      kind: "hotspot",
      x: hotspot.x - 18,
      y: hotspot.y - 18,
      w: hotspot.w + 36,
      h: hotspot.h + 52,
      onTap: function () {
        app.screen = "dialogue";
      },
      onLong: secret ? function () {
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
    var event = currentEvent();
    var scene = currentScene();
    drawSceneBackground(scene);
    drawTopHud(scene);
    drawAudioButton();
    drawHotspot(event, true);
    addCurrentHotspot(event);

    var hasSecretHint = event.hint && secretForCurrentEvent();
    fillRoundRect(28, 586, 334, hasSecretHint ? 150 : 122, 8, "rgba(255,255,255,0.88)");
    ctx.font = "700 18px sans-serif";
    ctx.fillStyle = "#245b56";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(event.title, 48, 610);
    drawWrapped("点击高亮处，看看这件事会把你带向哪里。", 48, 648, 292, 22, "15px sans-serif", "#496966", 2);
    if (hasSecretHint) {
      drawWrapped(event.hint, 48, 698, 292, 22, "14px sans-serif", "#d26262", 2);
    }
  }

  function drawDialogue() {
    var event = currentEvent();
    drawSceneBackground(currentScene());
    drawTopHud(currentScene());
    drawAudioButton();
    drawHotspot(event, false);
    drawDialoguePanel(event, true);
  }

  function drawFeedback() {
    var event = currentEvent();
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
    bindEvents();
    window.requestAnimationFrame(loop);
  }

  try {
    boot();
  } catch (err) {
    showError(err);
  }
})();
