import { Dom } from "./Libs.js"

class Wire {
  /**
   * @param {Dom} point1_image
   * @param {Dom} point2_image
   * @param {Dom} targetPlace
   */
  constructor(point1_image, point2_image, targetPlace, bezierWeight = -0.675) {
    this.point1 = new Dom(".point-1").attr('src', point1_image.attr('src'))
    this.point2 = new Dom(".point-2").attr('src', point1_image.attr('src'))
    this.targetPlace = targetPlace;
    this.bezierWeight = bezierWeight;

    this.point1.attr("src", )

    this.wirePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.wirePath.classList.add("wire-path");
    document.body.appendChild(this.wirePath); // Adjust the parent element as needed

    this.initialize();
  }

  initialize() {
    // Set initial positions and images for points
    TweenLite.set(this.point1, { x: 100, y: 50 });
    TweenLite.set(this.point2, { x: 100, y: 200 });

    // Create Draggable instances
    Draggable.create([this.point1, this.point2], {
      onDrag: () => {
        this.updatePath();
        if (this.hitTest(this.targetPlace)) {
          this.disable();
        }
      },
    });
  }

  updatePath() {
    const x1 = this.point2._gsTransform.x;
    const y1 = this.point2._gsTransform.y;
    const x4 = this.point1._gsTransform.x;
    const y4 = this.point1._gsTransform.y;
    const dx = Math.abs(x4 - x1) * this.bezierWeight;
    const x2 = x1 - dx;
    const x3 = x4 + dx;
    const data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;
    this.wirePath.setAttribute("d", data);
  }

  hitTest(target) {
    // Implement hit testing logic here, e.g., using a library or custom algorithm
  }

  disable() {
    // Disable dragging and other actions as needed
  }

  static create(point1, point2, targetPlace, bezierWeight) {
    return new Wire(point1, point2, targetPlace, bezierWeight);
  }
}

// trying to make wire with it
function wireSetup() {
  function wireHTMLCreator(wireNum) {
    let HTMLWire = `
    <svg class="wire-box-${wireNum}">
      <path class="wire-path" />
      
      <img src="" class="points point-1-${wireNum}" />
      
      <img src="" class="points point-2-${wireNum}" />
      
      
      <div class="target-place-${wireNum}">
        <span></span>
      </div>
    </svg>
    `;
    return HTMLWire;
  }

  let boxes = Util.getAll(".wire-box");
  let wirePaths = Util.getAll(".wire-path");
  let points1 = Util.getAll(".wire-point-1");
  let points1Positions = [
    {
      left: 0,
      top: 0,
    },
    {
      left: 0,
      top: 0,
    },
  ]
  let points2 = Util.getAll(".wire-point-2");
  let points2Positions = [
    {
      left: 0,
      top: 0,
    },
    {
      left: 0,
      top: 0,
    },
  ]  
  let targetPlaces = Util.getAll(".target-place");
  let bezierWeight = -0.675;
  let wireNum = 0
  let box = null
  let point1 = null
  let point2 = null
  let targetPlace = null
  let wirePath = null
  let targetSt = {
    border: "2px dashed black"
  }

  // ! wire 1
  wireNum = 0
  box = new Dom(boxes[wireNum])
  point1 = new Dom(points1[wireNum])
  point2 = new Dom(points2[wireNum])
  wirePath = new Dom(wirePaths[wireNum])
  targetPlace = new Dom(targetPlaces[wireNum])
  let wireColor = "red"
  
  point1.attr("src", Src.problem2_issue2_gluepoint.attr("src"));
  point2.attr("src", Src.problem2_issue2_soldpoint.attr("src"));
  wirePath.styles({
    fill: wireColor
  })
  targetPlace.set(700, 200,100,100).styles(targetSt)

  TweenLite.set(points1[wireNum], { x: points1Positions[wireNum].left, y: points1Positions[wireNum].top });
  TweenLite.set(points2[wireNum], { x: points2Positions[wireNum].left, y: points2Positions[wireNum].top });

  Draggable.create([points1[wireNum], points2[wireNum]], {
    // onDrag: updatePath

    onDrag: function (e) {
      
      var x1 = points2[wireNum]._gsTransform.x;
      var y1 = points2[wireNum]._gsTransform.y;

      var x4 = points1[wireNum]._gsTransform.x;
      var y4 = points1[wireNum]._gsTransform.y;

      var dx = Math.abs(x4 - x1) * bezierWeight;

      var x2 = x1 - dx;
      var x3 = x4 + dx;

      var data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;

      wirePaths[wireNum].setAttribute("d", data);

      // target hit
      if (this.hitTest(targetPlaces[wireNum], "100%")) {
        this.vars.onDragEnd = null;
        this.disable();
      }
    },
  });
}
// wireSetup();