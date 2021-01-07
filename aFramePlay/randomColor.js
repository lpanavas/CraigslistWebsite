AFRAME.registerComponent("random-color", {
  schema: {
    color: { default: "#666" },
  },
  init: function () {
    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    var el = this.el;
    this.el.setAttribute("color", getRandomColor());
  },
});
