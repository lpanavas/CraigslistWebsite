AFRAME.registerComponent("create-graves", {
  schema: {
    width: { default: 0.5 },
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var graves = document.querySelector("#smallGraves");
    this.el.addEventListener("mouseenter", function () {
      graves.setAttribute(
        "modelgroup",
        "target: #graveStone; name: graveStone; graveNum: 10"
      );
      //   console.log(graves.attributes);
      //   graves.components.modelgroup.value.graveNum = 0;
      //   console.log(graves.components.modelgroup.value.graveNum);
      //   console.log(graves.attributes);
      //   console.log(graves.modelgroup);

      //   console.log("here");
      //   var modelGroup = (this.modelGroup = document.createElement("a-entity"));

      //   modelGroup.setAttribute("model-subset", {
      //     target: "#graveStone",
      //     name: "graveStone",
      //     graveNum: "10",
      //   });
      //   modelGroup.setAttribute("rotation", {
      //     x: 90,
      //     y: 0,
      //     z: 0,
      //   });

      //   console.log(modelGroup);
    });
  },
});
