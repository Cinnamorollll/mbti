(function () {
  "use strict";

  var enabled = true;
  var audioContext = null;
  var elements = {};
  var desiredMusic = null;
  var currentMusic = null;
  var desiredRain = false;
  var desiredMiao = false;
  var miaoTimer = null;
  var unlocked = false;

  var TRACKS = {
    rain: { src: "./audio/rain.wav", volume: 0.28, loop: true },
    seven: { src: "./audio/7lx.wav", volume: 0.22, loop: true },
    music: { src: "./audio/music.wav", volume: 0.38, loop: true },
    miao: { src: "./audio/miao.wav", volume: 0.34, loop: false }
  };

  var MUSIC_SCENES = {
    s01: "seven",
    s03: "music",
    s04: "music",
    s05: "seven",
    s10: "music",
    s11: "music",
    s12: "music",
    s13: "music",
    s14: "music",
    s16: "music",
    s17: "music",
    s18: "music",
    s19: "music",
    s20: "music",
    s21: "music",
    s22: "music",
    end1: "seven",
    end2: "seven",
    end3: "seven",
    end4: "seven",
    end5: "seven"
  };

  var RAIN_SCENES = {
    s02a: true,
    s02b: true,
    s02c: true,
    s02d: true,
    s06: true,
    s07: true,
    s08: true,
    s09: true
  };

  var MIAO_SCENES = {
    s02a: true,
    s02b: true,
    s02c: true,
    s02d: true,
    s15: true
  };

  function createElement(key) {
    if (elements[key]) return elements[key];
    var track = TRACKS[key];
    if (!track) return null;
    var el = new Audio(track.src);
    el.loop = !!track.loop;
    el.preload = "auto";
    el.volume = track.volume;
    el.setAttribute("playsinline", "true");
    elements[key] = el;
    return el;
  }

  function safePlay(el) {
    if (!el || !enabled) return;
    var promise = el.play();
    if (promise && promise.catch) promise.catch(function () {});
  }

  function pauseElement(key, reset) {
    var el = elements[key];
    if (!el) return;
    try { el.pause(); } catch (err) {}
    if (reset) {
      try { el.currentTime = 0; } catch (err2) {}
    }
  }

  function clearMiaoTimer() {
    if (miaoTimer) {
      window.clearTimeout(miaoTimer);
      miaoTimer = null;
    }
  }

  function scheduleMiao() {
    clearMiaoTimer();
    if (!enabled || !desiredMiao) return;
    miaoTimer = window.setTimeout(playMiaoOnce, 1500);
  }

  function playMiaoOnce() {
    clearMiaoTimer();
    if (!enabled || !desiredMiao) return;
    var el = createElement("miao");
    if (!el) return;
    el.onended = scheduleMiao;
    try { el.currentTime = 0; } catch (err) {}
    var promise = el.play();
    if (promise && promise.catch) promise.catch(function () { scheduleMiao(); });
  }

  function setMiao(on) {
    desiredMiao = !!on;
    clearMiaoTimer();
    if (!desiredMiao || !enabled) {
      pauseElement("miao", true);
      return;
    }
    playMiaoOnce();
  }

  function setRain(on) {
    desiredRain = !!on;
    if (!desiredRain || !enabled) {
      pauseElement("rain", false);
      return;
    }
    safePlay(createElement("rain"));
  }

  function setMusic(key) {
    desiredMusic = key || null;
    if (currentMusic && currentMusic !== desiredMusic) {
      pauseElement(currentMusic, false);
    }
    currentMusic = desiredMusic;
    if (!enabled || !currentMusic) return;
    safePlay(createElement(currentMusic));
  }

  function pauseAll() {
    Object.keys(elements).forEach(function (key) {
      pauseElement(key, false);
    });
    clearMiaoTimer();
  }

  function resumeDesired() {
    if (!enabled) return;
    if (desiredMusic) safePlay(createElement(desiredMusic));
    if (desiredRain) safePlay(createElement("rain"));
    if (desiredMiao) playMiaoOnce();
  }

  function unlock() {
    var first = !unlocked;
    unlocked = true;
    var ac = ensureAudioContext();
    if (ac && ac.state === "suspended" && ac.resume) ac.resume();
    if (first) resumeDesired();
  }

  function ensureAudioContext() {
    if (audioContext) return audioContext;
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
    return audioContext;
  }

  function blip(freq, gainValue, duration) {
    if (!enabled) return;
    var ac = ensureAudioContext();
    if (!ac) return;
    if (ac.state === "suspended" && ac.resume) ac.resume();
    var oscillator = ac.createOscillator();
    var gain = ac.createGain();
    var now = ac.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(ac.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  window.GameAudio = {
    get enabled() {
      return enabled;
    },
    toggle: function () {
      enabled = !enabled;
      if (enabled) resumeDesired();
      else pauseAll();
      return enabled;
    },
    unlock: function () {
      unlock();
    },
    setMode: function (mode) {
      if (mode === "cover") {
        setMusic("music");
        setRain(false);
        setMiao(false);
      } else if (mode === "prologue") {
        setMusic(null);
        setRain(true);
        setMiao(false);
      }
    },
    setScene: function (sceneId) {
      setMusic(MUSIC_SCENES[sceneId] || null);
      setRain(!!RAIN_SCENES[sceneId]);
      setMiao(!!MIAO_SCENES[sceneId]);
    },
    click: function () {
      blip(620, 0.025, 0.055);
    },
    confirm: function () {
      blip(740, 0.030, 0.070);
    },
    transition: function () {
      blip(520, 0.018, 0.080);
    },
    secret: function () {
      blip(880, 0.035, 0.100);
    }
  };
})();
