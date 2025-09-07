import {Dom} from './Libs.js';

class DragAndDrop {
  // private vars
  #draggable;
  #droppable;
  #dropPosLeft;
  #dropPosTop;
  toleranceLeft = null
  toleranceTop = null
  droppableBgColor = "rgb(255 255 255 / 75%)"
  droppableHoverBgColor = "#ffff003b"

  constructor() {
    this.setTolerance()
  }
  // Droppable Area
  setDroppable(left = null, top = null, height = null, width = null) {
    this.#droppable = new Dom("#droppable");
    let dropPosition = [left, top, height, width];

    if (left === null) {
      let defaultPos = [300, 150, 150, 150];
      dropPosition = defaultPos;
    }

    this.#droppable
      .set(...dropPosition)
      .styles({
        border: "dashed 3px black",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "text-align": "center",
        "background": this.droppableBgColor,
      })
      .zIndex(200)
      .fadeShow();
    return this;
  }

  // Draggable Component and Drop Positions
  setDraggable(draggableComponent, dropPosLeft, dropPosTop) {
    this.#draggable = draggableComponent;
    this.#dropPosLeft = dropPosLeft;
    this.#dropPosTop = dropPosTop;

    this.#draggable.styles({
      cursor: "grab",
    });
    return this;
  }

  // Set Default Tolerance
  setTolerance(toleranceLeft = 100, toleranceTop = 100) {
    this.toleranceLeft = toleranceLeft;
    this.toleranceTop = toleranceTop;
    return this;
  }

  // Attach Drang And Drop
  active(onComplete = () => {}, toleranceLeft = null, toleranceTop = null) {
    const droppableBgColor = this.droppableBgColor
    const droppableHoverBgColor = this.droppableHoverBgColor

    let draggable_component = this.#draggable;
    let droppable = this.#droppable;

    const targetLeft = this.#dropPosLeft;
    const targetTop = this.#dropPosTop;

    toleranceLeft = toleranceLeft || this.toleranceLeft
    toleranceTop = toleranceTop || this.toleranceTop

    $(draggable_component.item).draggable({
      start: function () {
        draggable_component.styles({
          cursor: "grab",
        });
        Dom.setBlinkArrowRed().reset();
      },
      drag: function (event, ui) {
        draggable_component.styles({
          cursor: "grabbing",
        });
        droppable.styles({
          scale: 1.1,
          "border-color": "white",
          "background": droppableHoverBgColor,
        });
      },
      stop: function (event, ui) {
        droppable.styles({
          scale: 1,
          "border-color": "black",
          "background": droppableBgColor,
        });
        draggable_component.styles({
          cursor: "default",
        });

        if (
          // pixel to tolerance
          Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
          Math.abs(ui.position.top - targetTop) <= toleranceTop
        ) {
          // hide droppable
          $(this).draggable("destroy");
          droppable.hide();

          // Snap to final position
          $(this).delay(50).animate(
            {
              left: targetLeft,
              top: targetTop,
            },
            500,
            function () {
              onComplete();
            }
          );
        } else {
          // Return to original position
          $(this).animate(
            {
              left: draggable_component.left,
              top: draggable_component.top,
            },
            500
          );
          draggable_component.styles({
            cursor: "grab",
          });
        }
      },
    });

    return this;
  }
}

export default DragAndDrop