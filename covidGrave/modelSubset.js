AFRAME.registerComponent("modelgroup", {
  schema: {
    target: { default: "", type: "selector" },
    name: { default: "" },
    graveNum: { default: 10 },
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    var sceneEl = document.querySelector("a-scene");
    var data = this.data;
    data.target.addEventListener("mouseenter", function (e) {
      //   var model = e.detail.model;
      console.log(e);
      var graves = document.querySelector("#graveStone").object3D;

      console.log(graves);
      //   var subset = model.getObjectByName(data.name);
      for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
          var clone = graves.clone();
          //   clone.children.appendChild(clone);
          //   console.log(clone.children);
          console.log("here");
          var entity = document.createElement("a-entity");
          sceneEl.appendChild(entity);
          clone.scale.x = 0.05;
          clone.scale.y = 0.05;
          clone.scale.z = 0.05;
          clone.rotation.set(
            THREE.Math.degToRad(0),
            THREE.Math.degToRad(90),
            THREE.Math.degToRad(00)
          );
          clone.visible = true;

          clone.position.x += i;
          clone.position.y += 0.5;
          clone.position.z = j * -1;
          //   entity.setObject3D("clone", clone);
          container = new THREE.Object3D();
          entity.setObject3D("container", container);
          container.add(clone);
        }
      }
    });
  },
});
