(function () {
  "use strict";

  var enabled = true;

  window.GameAudio = {
    get enabled() {
      return enabled;
    },
    toggle: function () {
      enabled = !enabled;
      return enabled;
    },
    click: function () {},
    confirm: function () {},
    transition: function () {},
    secret: function () {}
  };
})();
