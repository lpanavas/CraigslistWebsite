AFRAME.registerComponent("move-to-click", {
  dependencies: ["position"],
  schema: {
    offset: { type: "vec3" },
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    this.originalPos = this.el.getAttribute("position");
    this.el.addEventListener("click", function () {
      el.object3D.scale.copy(data.to);
    });
  },
});
