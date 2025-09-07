import {
  Dom,
  Util,
  Layout,
  Sliders,
  Src,
  Elements,
  DeveloperTools,
} from "./Libs.js";

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(443, 216, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(700, 352).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ];

    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },
  plotGraphBar(ctx, graphIdx, startEmpty = false, xLabel = "", yLabel = "") {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(289, 310, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(663, 409).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
      fontSize: "18px",
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let data = {
      labels: ["220", "470", "1000"],
      datasets: [
        {
          label: "1",
          backgroundColor: "rgba(0, 128, 0, 1)",
          borderColor: "rgba(0, 128, 0, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "10",
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "40",
          backgroundColor: "rgba(0, 0, 255, 1)",
          borderColor: "rgba(0, 0, 255, 1)",
          borderWidth: 1,
          data: [],
        },
      ],
    };

    let options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              display: true,
              fontSize: 17,
              fontWeight: "bold",
              fontColor: "black",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: true,
              beginAtZero: true,
              // fontSize: 17,
              // fontWeight: 'bold',
              // fontColor: 'black',
              // beginAtZero: true,
              // autoSkip: false,
              // position: "right",
              // maxRotation: 90, // Rotate labels to 90 degrees
              // minRotation: 90,
              // callback: function(value) {
              //   return value // You can add custom formatting here if needed
              // }
            },
          },
        ],
      },
    };
    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart) {
      return chart.data.datasets.length;
    },
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  // ! for handeling current load selection in EE16
  currentLoad: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  hideStepHeading() {
    document.querySelector(".step-heading").style.visibility = "hidden";
  },
  experimentHeading(text, style = {}) {
    let expHeader = new Dom(".anime-header > p");
    expHeader.styles({
      textTransform: "upprcase",
      position: "relative",
      textAlign: "center",
      fontSize: "30px",
      ...style,
    });
    expHeader.setContent(text);
  },
  // todo udpate this video box in template
  videoBox(vBoxLeft, vBoxTop, srcVideo, vHeight, videoTitle) {
    let videoBox = new Dom(".video-box").set(vBoxLeft, vBoxTop);
    let video = new Dom(".video-box video");
    let videoTitleText = new Dom(".video-box .title").setContent(videoTitle);
    let btnRestart = new Dom(".video-box .controls button");

    // src video is a Dom element
    video.set(null, null, vHeight);
    video.item.src = srcVideo.item.src;

    btnRestart.item.onclick = () => {
      video.item.currentTime = 0;
      video.item.play();
    };

    return videoBox;
  },
  // todo update this also
  stepModal(
    boxContent,
    callBackOnClose = () => {},
    mBoxLeft = null,
    mBoxTop = null,
    mBoxWidth = null,
    mBoxHeight = null
  ) {
    let content = {
      title: boxContent.title ? boxContent.title : "",
      description: boxContent.description ? boxContent.description : "",
      btnText: boxContent.btnText ? boxContent.btnText : "Close",
    };

    let modalBox = new Dom(".modal-box");
    let modalTitle = new Dom(".modal-box .header .title");
    let modalContent = new Dom(".modal-box .content");
    let modalClose = new Dom(".modal-box .footer .btn1");

    let btn2 = new Dom(".modal-box .footer .btn2");
    let btn1 = new Dom(".modal-box .footer .btn1");
    btn2.hide();
    btn1.setContent(content.btnText);

    if (content.title == "") {
      modalTitle.hide();
    } else {
      modalTitle.show();
      modalTitle.setContent(content.title);
    }
    modalContent.setContent(content.description);
    modalClose.item.onclick = () => {
      modalBox.hide();
      callBackOnClose();
    };

    modalBox.set(mBoxLeft, mBoxTop, mBoxHeight, mBoxWidth).show("flex");

    return modalBox;
  },
  stepModalChoice(
    boxContent,
    btn1Text = "",
    btn1onClick = () => {},
    btn2Text = "",
    btn2onClick = () => {},
    mBoxLeft = null,
    mBoxTop = null,
    mBoxWidth = null,
    mBoxHeight = null
  ) {
    let content = {
      title: boxContent.title ? boxContent.title : "",
      description: boxContent.description ? boxContent.description : "",
    };

    let modalBox = new Dom(".modal-box");
    let modalTitle = new Dom(".modal-box .header .title");
    let modalContent = new Dom(".modal-box .content");

    let btn1 = new Dom(".modal-box .footer .btn1").setContent(btn1Text);
    btn1.onClick(() => {
      btn1onClick();
    });

    let btn2 = new Dom(".modal-box .footer .btn2").set().setContent(btn2Text);
    btn2.onClick(() => {
      btn2onClick();
    });

    if (content.title == "") {
      modalTitle.hide();
    } else {
      modalTitle.show();
      modalTitle.setContent(content.title);
    }
    modalContent.setContent(content.description);

    modalBox.set(mBoxLeft, mBoxTop, mBoxHeight, mBoxWidth).show("flex");

    return modalBox;
  },
  maskClick(
    onClick,
    leftAndDevMode = false,
    top = 0,
    height = 100,
    width = 100,
    rotate = 0
  ) {
    let maskImg = Src.mask;
    // default px
    let leftPx = typeof leftAndDevMode === "boolean" ? 0 : leftAndDevMode;
    maskImg.set(leftPx, top, height, width).rotate(rotate).zIndex(1000);
    maskImg.styles({ cursor: "pointer" }).onClick(() => {
      maskImg.styles({ cursor: "unset" });
      maskImg.zIndex(0);
      Dom.setBlinkArrowRed().reset();
      maskImg.onClick(); // it will null
      if (onClick) {
        onClick();
      }
    });

    if (leftAndDevMode === true) {
      DeveloperTools.init();
    }
    return maskImg;
  },
  // for typing hello text
  student_name: "",
  optionsDone: [0, 0],
  tabsDone: [0, 0],
  fcIssueDone: [0, 0],
  receiverIssueDone: [0, 0],
  // ! for handeling current load selection in EE16
  operationAndWaveformDone: 0,

  // Todo create type object of steps like
  /* 

  steps: {
    intro: ()=>{},
    step1: ()=>{},
    step2: ()=>{},
    step3: ()=>{},
  }

  * And convert it to array in next 
  stepsArray = []
  for(let key in steps){
    stepsArray.push(steps[key])
  }

  */
  steps: [
    // * Step0
    //! Menu page
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Drone is not responding – III");
      Util.setCC("...");

      if (Scenes.tabsDone.indexOf(1) == -1) {
        Src.drone_3d_img.set(1002, -30, 184).zIndex(1);
        let items = [
          Src.bgimag.set(0, -48, 500, 950),
          // Src.drone_3d_img.set(17,130,280).zIndex(1).hide()
        ];

        anime
          .timeline({
            duration: 6000,
            easing: "linear",
          })
          .add({
            targets: Src.drone_3d_img.item,
            left: 25,
            top: 100,
            height: 280,
            complete() {
              Scenes.stepModal(
                {
                  title: "Quadcopter 450",
                  description: ` <b>Quadcopter</b> is an unmanned aerial vehicle
                  (UAV) or drone with four rotors, each with a motor and propeller. A quadcopter can be manually controlled
                  or can be autonomous. It is also called quadrotor helicopter or quadrotor. It belongs to a more general
                  class of aerial vehicles called multicopter or multirotor. Quadcopters provide stable flight performance,
                  making them ideal for surveillance and aerial photography.`,
                  btnText: "Start",
                },
                () => {
                  items.forEach((ele) => ele.fadeHide());
                  menu();
                },
                433,
                106,
                483
              ).fadeShow(2000);

              setTimeout(() => {
                Util.setCC("Click on 'Start' to start the experiment.");
              }, 4000);
            },
          });
      }else{
        menu()
      }

      function menu() {
        let styles = {
          rightTick: {
            filter: "hue-rotate(282deg)",
            zIndex: 1,
          },
        };

        // * Required images
        Src.drone_3d_img.set(11 + 60, 11, 260).zIndex(1);
        let tabs = [
          Src.tab_3.set(28, -29, 68).opacity(0.4).zIndex(1),
          Src.tab_4
            .set(28 + 230 * 1, -29, 68)
            .opacity(0.4)
            .zIndex(1),
        ];

        let issues = [
          Src.issue_fc.set(34, 146, 187, 418).hide(),
          Src.issue_rreceiver.set(34, 146, 187, 418).hide(),
        ];

        let btns = [
          Src.btn_start_tracing_1.set(295, 282, 37, 120).zIndex(1).hide(),
          Src.btn_start_tracing_2.set(295, 282, 37, 120).zIndex(1).hide(),
        ];

        let right_ricks = [
          Src.right_tick_1
            .set(42, -11, 20)
            .styles(styles.rightTick)
            .zIndex(2)
            .hide(),
          Src.right_tick_2
            .set(42 + 230 * 1, -11, 20)
            .styles(styles.rightTick)
            .zIndex(2)
            .hide(),
        ];

        let droneAnime = null;
        let droneFullAnime = anime({
          duration: 3000,
          easing: "linear",
          targets: Src.drone_3d_img.item,
          left: 560,
          right: 124,
          autoplay: false,
          complete() {
            droneAnime = anime({
              targets: Src.drone_3d_img.item,
              keyframes: [{ translateY: 105 }, { translateY: 11 }],
              loop: true,
              easing: "linear",
              duration: 3000,
            });
          },
          keyframes: [{ translateY: 105 }, { translateY: 11 }],
        });

        if(Scenes.tabsDone.indexOf(1) == -1){
          droneFullAnime.play()
        }else{
          Src.drone_3d_img.set(560, 94);
        }

        if (Scenes.tabsDone.indexOf(0) == -1) {
          right_ricks[0].show();
          right_ricks[1].show();
          tabs[0].opacity(1);
          tabs[1].opacity(1);
          Util.setCC(
            "We have successfully rectify both the components of the drone."
          );
          setTimeout(() => {
            Scenes.stepModal(
              {
                description:
                  "We have successfully rectify both the components of the drone.",
              },
              () => {},
              133,
              182,
              324
            );
          }, 3200);
          return true;
        } else if (Scenes.tabsDone[0]) {
          setTimeout(() => {
            Util.setCC("Click on the Receiver issues and start rectifying.");
            Dom.setBlinkArrowOnElement(tabs[1], "bottom").play();
          }, 100);
          right_ricks[0].show();
          tabs[0].opacity(1);

          tabs[1].item.onclick = () => {
            Dom.setBlinkArrowRed().reset();
            Util.setCC("Click on the start tracing to start tracing.");
            Dom.setBlinkArrowRed(336, 323).play();
            tabs[1].opacity(1);
            issues[1].show();
            btns[1].show();
          };

          btns[1].item.onclick = ops2;

          function ops2() {
            Scenes.StepProcess.setIsProcessRunning(false);
            Scenes.currentStep = 4;
            Scenes.next();
          }
        } else {
          setTimeout(() => {
            Util.setCC(
              "Click on the Flight controller issues and start rectifying."
            );
            Dom.setBlinkArrowOnElement(tabs[0], "bottom").play();
          }, 3000);
          tabs[0].item.onclick = () => {
            Dom.setBlinkArrowRed().reset();
            Util.setCC("Click on the start tracing to start tracing.");
            Dom.setBlinkArrowRed(336, 323).play();
            tabs[0].opacity(1);
            issues[0].show();
            btns[0].show();
          };

          btns[0].item.onclick = ops1;

          function ops1() {
            Scenes.StepProcess.setIsProcessRunning(false);
            Scenes.currentStep = 1;
            Scenes.next();
          }
        }
      }

      return true;
    },

    // * step1
    //!  FLIGHT CONTROLLER HOMEPAGE
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Flight controller issues");

      // Required images
      Src.homepage_battery_issue.set(387, 99 - 60, 257);
      Src.btn_check_physical_damage.set(471, 148 - 60, 66).zIndex(1);
      Src.btn_check_connection.set(471, 148 + 100 - 60, 66).zIndex(1);
      Src.naza.set(112, 72, 190);

      let styles = {
        rightTick: {
          filter: "hue-rotate(282deg)",
          zIndex: 1,
        },
      };

      let rightTicks = [
        Src.right_tick_1
          .set(442, 170 - 60, 20)
          .zIndex(1)
          .styles(styles.rightTick)
          .hide(),
        Src.right_tick_2
          .set(441, 170 + 94 - 60, 20)
          .zIndex(1)
          .styles(styles.rightTick)
          .hide(),
      ];

      //functionality

      let options = [Src.btn_check_physical_damage, Src.btn_check_connection];

      if (Scenes.fcIssueDone.indexOf(0) == -1) {
        Scenes.tabsDone[0] = 1;
        rightTicks[0].show();
        rightTicks[1].show();
        Util.setCC("We have done with all the Flight controller issues.");
        Scenes.stepModal(
          {
            description:
              "We have seen all the possible issues with the Flight controller.",
          },
          () => {
            Scenes.StepProcess.done();
            Scenes.currentStep = 0;
          },
          233,
          334,
          424
        );
      } else if (Scenes.fcIssueDone[0]) {
        rightTicks[0].show();
        Util.setCC("Click on check connections.");
        options[1].item.onclick = () => {
          Scenes.currentStep = 3;
          Scenes.StepProcess.done();
          Scenes.next();
        };
      } else {
        Util.setCC("Click on check physical damage.");
        options[0].item.onclick = () => {
          Scenes.currentStep = 2;
          Scenes.StepProcess.done();
          Scenes.next();
        };
      }

      return true;
    },

    //! FC issue 1
    // * step2
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Flight controller issues - Physical damage");
      Util.setCC("...");

      const frames = () => {
        let videoBox = null;
        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the flight controller is physically damaged or not."
          ).onend(() => {
            Src.fc_led_full.set(632, 175, 210).fadeShow();
            Scenes.stepModal(
              {
                description: "Here we use LED to check the flight controller .",
              },
              () => {
                frame2();
              },
              628,
              58,
              278
            );
          });
        }

        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
          Src.fc_led_full.fadeHide(200);
          Scenes.stepModal(
            {
              description:
                "Firstly, Ensure the flight controller is disconnected from power source.",
            },
            () => {
              // frame3();.
            },
            528,
            158,
            400
          ).fadeShow();
          Util.setCC(
            "Ensure that the flight controller is disconnected from power source."
          );
          Util.setCC("Click on the dean plug to unplug it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.fullfinal_drone.hide();
                  frame3();
                });
            },
            200,
            140,
            26,
            22,
            0
          );
        }

        function frame3() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "To check flight controller with LED, we have to remove the above listed components."
          ).onend(() => {});

          Scenes.stepModal(
            {
              description: `<p>Procedure:</p>
                  <ol>
                    <li>Remove the GPS</li>
                    <li>Remove the Battery</li>
                    <li>Remove the Upper Plate</li>
                  </ol>`,
            },
            () => {
              frame2_1();
            },
            541,
            149,
            378
          );
        }

        function frame2_1() {
          videoBox = new Dom("");
          Util.setCC("Remove the battery as shown in the video.").onend(() => {
            videoBox = Scenes.videoBox(
              575,
              206,
              Src.battery_remove,
              200,
              "Battery removal"
            );
            Scenes.stepModal(
              {
                description: "Video explaining how to remove the battery.",
              },
              () => {
                videoBox.hide();
                frame2_3();
              },
              585,
              127,
              340
            );
          });
        }

        function frame2_3() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444).zIndex(1);
          Util.setCC("Click on the GPS to detach it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_gps_sided
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(800, () => {
                  Src.problem2_issue2_dean_plug_unpluged.hide();
                  frame2_4();
                });
            },
            271,
            151,
            46,
            39,
            0
          );
        }

        function frame2_4() {
          Src.problem2_issue2_gps_sided.set(5, -20, 444).zIndex(1);
          Util.setCC("Click on the battery strip to open it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_belt_opend
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(800, () => {
                  Src.problem2_issue2_gps_sided.hide();
                  frame2_5();
                });
            },
            249,
            182,
            51,
            23,
            0
          );
        }

        function frame2_5() {
          Src.problem2_issue2_belt_opend.hide();
          Src.problem2_issue2_battery_removed_drone.set(5, -20, 444).zIndex(1);
          Src.problem2_issue2_battery_only.set(5, -20, 444).zIndex(2);
          Src.blank_box.set(609, 130, 208, 262).fadeShow();

          Util.setCC("Drag the battery to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              // Src.problem2_issue2_battery_removed_drone.hide()
            },
            197,
            181,
            41,
            117,
            0
          );

          // battery draggable like we did in step 4
          let droppable = new Dom("#droppable");
          droppable
            .set(657, 39, 89, 216)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            })
            .fadeShow();

          Src.problem2_issue2_battery_only.styles({
            cursor: "grab",
          });

          $(Src.problem2_issue2_battery_only.item).draggable({
            start: function () {
              Src.problem2_issue2_battery_only.styles({
                cursor: "grab",
              });
              Dom.setBlinkArrowRed().reset();
            },
            drag: function (event, ui) {
              Src.problem2_issue2_battery_only.styles({
                cursor: "grabbing",
              });
              droppable.styles({
                scale: 1.1,
                "border-color": "green",
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
                "border-color": "black",
              });
              Src.problem2_issue2_battery_only.styles({
                cursor: "default",
              });
              const targetLeft = 515;
              const targetTop = -19;
              const toleranceLeft = 40; // Pixels of tolerance
              const toleranceTop = 120; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    $(this).draggable("destroy");
                    droppable.fadeHide(200);
                    frame2_6();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 5,
                    top: -20,
                  },
                  500
                );
                Src.problem2_issue2_battery_only.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame2_6() {
          Src.blank_box.hide();
          Src.problem2_issue2_battery_removed_drone.hide();
          Src.problem2_issue2_battery_only.hide();
          Src.fullfinal_drone.hide();

          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_upper_plate_only.set(5, -20, 444).zIndex(2);

          Util.setCC("Video explaining how to remove the upper plate.").onend(
            () => {
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.remove_upper_plate,
                200,
                "Upper plate removal"
              );
              Scenes.stepModal(
                {
                  description:
                    "Video explaining how to remove the upper plate using the alan key.",
                },
                () => {
                  videoBox.hide();
                  frame2_7();
                },
                585,
                108,
                340
              );
            }
          );
        }

        function frame2_7() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_upper_plate_only.set(5, -20, 444).zIndex(2);
          Src.blank_box.set(609, 130, 208, 262);
          Src.problem2_issue2_battery_only.set(515, -19, 444);

          Util.setCC("Drag the upper plate to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              // Src.problem2_issue2_upper_plate_removed_drone.hide()
            },
            214,
            159,
            92,
            91,
            0
          );

          let droppable = new Dom("#droppable");
          droppable
            .set(657, 39, 89, 216)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            })
            .fadeShow();

          let draggable_component = Src.problem2_issue2_upper_plate_only;

          draggable_component.styles({
            cursor: "grab",
          });

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
                "border-color": "green",
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
                "border-color": "black",
              });
              draggable_component.styles({
                cursor: "default",
              });
              const targetLeft = 489;
              const targetTop = -13;
              const toleranceLeft = 100; // Pixels of tolerance
              const toleranceTop = 120; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    $(this).draggable("destroy");
                    droppable.fadeHide(200);
                    frame4();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 5,
                    top: -20,
                  },
                  500
                );
                draggable_component.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame4() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_zoom_1_upper_plate_removed_drone
            .set(129, 55, 260)
            .zIndex(2)
            .hide();
          Src.fc_led_full.set(720, -19, 130).zIndex(5);

          anime({
            targets: [
              Src.blank_box.item,
              Src.problem2_issue2_battery_only.item,
              Src.problem2_issue2_upper_plate_only.item,
            ],
            translateY: 80,
            duration: 500,
            easing: "linear",
            complete() {
              Util.setCC(
                "Click on the Flight controller to see the zoom view."
              ).onend(() => {
                Dom.setBlinkArrowOnElement(Src.mask, "right").play();
              });
              Scenes.maskClick(
                () => {
                  Src.problem2_issue2_zoom_1_upper_plate_removed_drone.fadeShow(
                    800,
                    () => {
                      frame5();
                    }
                  );
                  Src.naza_upper_layer
                    .set(261, 168, 25)
                    .zIndex(6)
                    .fadeShow(800);
                },
                235,
                171,
                70,
                50
              );
            },
          });
        }

        function frame5() {
          Util.setCC("Drag the LED near the flight controller.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.fc_led_full, "left").play();
          });
          let droppable = new Dom("#droppable");
          droppable
            .set(110, 14, 125, 138)
            .zIndex(3)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
              background: "rgb(255,255,255,0.4)",
              padding: "10px",
              color: "black",
            })
            .fadeShow();

          // * draggable component
          let draggable_component = Src.fc_led_full;

          //* on drag complete
          const dragComplete = () => {
            droppable.fadeHide(200);
            anime({
              targets: Src.fc_led_full.item,
              rotate: 90,
              duration: 1000,
              easing: "linear",
              delay: 800,
              complete() {
                anime({
                  targets: Src.fc_led_full.item,
                  translateY: 55,
                  easing: "easeInOutExpo",
                  duration: 2000,
                  complete() {
                    Src.naza_upper_layer.fadeHide(300);
                    Src.fc_led_full.fadeHide(300);
                    Src.problem2_issue2_zoom_1_upper_plate_removed_drone.fadeHide(
                      300
                    );
                    // Src.full_final_drone_with_led.set(5, -20, 444);
                    frame6();
                  },
                });
              },
            });
          };

          draggable_component.styles({
            cursor: "grab",
          });

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
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
              });
              draggable_component.styles({
                cursor: "default",
              });
              const targetLeft = 145;
              const targetTop = -7;
              const toleranceLeft = 40; // Pixels of tolerance
              const toleranceTop = 40; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    dragComplete();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 680,
                    top: -19,
                  },
                  500
                );
                draggable_component.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame6() {
          Src.full_final_drone_with_led.set(5, -20, 444);
          Util.setCC("Click on the LED to see the zoom view.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });
          Scenes.maskClick(
            () => {
              Src.fc_led_zoom_img.set(162, -43, 185).fadeShow(300).zIndex(5);
              frame7();
            },
            202,
            104,
            40,
            74
          );
        }

        function frame7() {
          Util.setCC("Click on the battery to start drag.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });
          Scenes.maskClick(
            () => {
              Src.problem2_issue2_battery_only.zIndex(8);
              frame8();
            },
            763,
            266,
            40,
            74
          );
        }

        function frame8() {
          Util.setCC("Drag the battery and attach it with dean plug.");
          let droppable = new Dom("#droppable");
          droppable
            .set(195, 156, 125, 138)
            .zIndex(7)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
              background: "rgb(255,255,255,0.4)",
              padding: "10px",
              color: "black",
            })
            .fadeShow();

          // * draggable component
          let draggable_component = Src.problem2_issue2_battery_only.zIndex(8);

          //* on drag complete
          const dragComplete = () => {
            droppable.fadeHide(200);
            Src.greenlight.set(221, 52, 12).zIndex(9).fadeShow(200);

            anime({
              targets: [
                Src.blank_box.item,
                Src.problem2_issue2_upper_plate_only.item,
              ],
              translateX: 500,
              duration: 2000,
              easing: "linear",
              complete() {
                frame9();
              },
            });
          };

          draggable_component.styles({
            cursor: "grab",
          });

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
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
              });
              draggable_component.styles({
                cursor: "default",
              });
              const targetLeft = 11;
              const targetTop = -104;
              const toleranceLeft = 40; // Pixels of tolerance
              const toleranceTop = 40; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    dragComplete();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 515,
                    top: -19,
                  },
                  500
                );
                draggable_component.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame9() {
          Src.full_final_drone_with_led.set(5, -20, 444);
          Util.setCC(
            "The LED light is green and stable Hence, there is no physical damage."
          );

          Scenes.stepModal(
            {
              description:
                "If the LED light is green and stable it means there is no physical damage.",
            },
            () => {
              Src.fc_led_zoom_img.fadeHide(200);
              Src.greenlight.fadeHide(200);
              Src.full_final_drone_with_led.fadeHide(200);
              Src.full_final_drone_with_led_and_green_light
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(200);
              frame10();
            },
            528,
            158,
            400
          ).fadeShow();
        }

        function frame10() {
          Src.full_final_drone_with_led_and_green_light.set(5, -20, 444);
          videoBox = new Dom("");
          Util.setCC(
            "If LED light is not blinking, then in this case you need to replace it."
          ).onend(
            Util.setCC(
              "Video explains how to replace the Flight controller with the new one."
            ).onend(() => {
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.fc_replace,
                200,
                "Flight controller connection"
              );
              Scenes.stepModal(
                {
                  description:
                    "Video explains how to connect Flight controller.",
                },
                () => {
                  //to go to next step
                  Scenes.fcIssueDone[0] = 1;
                  Scenes.StepProcess.done();
                  Scenes.currentStep = 1;
                },
                573,
                124,
                366
              );
            })
          );
        }

        //* frame calling
        frame1();
      };

      frames();

      return true;
    },

    //! FC issue 2
    // * step3
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Flight controller issues - Check connections");
      Util.setCC("...");

      const frames = () => {
        let videoBox = null;

        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the flight controller connections are appropriate or not."
          );
          Scenes.stepModal(
            {
              description:
                "Check that the flight controller and PMU wires are connected properly or not.",
            },
            () => {
              frame2();
            },
            528,
            158,
            378
          );
        }

        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
          Src.fc_led_full.fadeHide(200);
          Scenes.stepModal(
            {
              description:
                "Firstly, Ensure the flight controller is disconnected from power source.",
            },
            () => {
              // frame3();
            },
            528,
            158,
            400
          ).fadeShow();
          Util.setCC(
            "Ensure that the flight controller is disconnected from power source."
          );
          Util.setCC("Click on the dean plug to unplug it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.fullfinal_drone.hide();
                  frame3();
                });
            },
            200,
            140,
            26,
            22,
            0
          );
        }

        function frame3() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "To check the wires, we have to remove the above listed components."
          ).onend(() => {});

          Scenes.stepModal(
            {
              description: `<p>Procedure:</p>
                  <ol>
                    <li>Remove the GPS</li>
                    <li>Remove the Battery</li>
                    <li>Remove the Upper Plate</li>
                  </ol>`,
            },
            () => {
              frame2_1();
            },
            541,
            149,
            378
          );
        }

        function frame2_1() {
          videoBox = new Dom("");
          Util.setCC("Remove the battery as shown in the video.").onend(() => {
            videoBox = Scenes.videoBox(
              575,
              206,
              Src.battery_remove,
              200,
              "Battery removal"
            );
            Scenes.stepModal(
              {
                description: "Video explaining how to remove the battery.",
              },
              () => {
                videoBox.hide();
                frame2_3();
              },
              585,
              127,
              340
            );
          });
        }

        function frame2_3() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444).zIndex(1);
          Util.setCC("Click on the GPS to detach it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_gps_sided
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(800, () => {
                  Src.problem2_issue2_dean_plug_unpluged.hide();
                  frame2_4();
                });
            },
            271,
            151,
            46,
            39,
            0
          );
        }

        function frame2_4() {
          Src.problem2_issue2_gps_sided.set(5, -20, 444).zIndex(1);
          Util.setCC("Click on the battery strip to open it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_belt_opend
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(800, () => {
                  Src.problem2_issue2_gps_sided.hide();
                  frame2_5();
                });
            },
            249,
            182,
            51,
            23,
            0
          );
        }

        function frame2_5() {
          Src.problem2_issue2_belt_opend.hide();
          Src.problem2_issue2_battery_removed_drone.set(5, -20, 444).zIndex(1);
          Src.problem2_issue2_battery_only.set(5, -20, 444).zIndex(2);
          Src.blank_box.set(609, 130, 208, 262).fadeShow();

          Util.setCC("Drag the battery to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              // Src.problem2_issue2_battery_removed_drone.hide()
            },
            197,
            181,
            41,
            117,
            0
          );

          // battery draggable like we did in step 4
          let droppable = new Dom("#droppable");
          droppable
            .set(657, 39, 89, 216)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            })
            .fadeShow();

          Src.problem2_issue2_battery_only.styles({
            cursor: "grab",
          });

          $(Src.problem2_issue2_battery_only.item).draggable({
            start: function () {
              Src.problem2_issue2_battery_only.styles({
                cursor: "grab",
              });
              Dom.setBlinkArrowRed().reset();
            },
            drag: function (event, ui) {
              Src.problem2_issue2_battery_only.styles({
                cursor: "grabbing",
              });
              droppable.styles({
                scale: 1.1,
                "border-color": "green",
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
                "border-color": "black",
              });
              Src.problem2_issue2_battery_only.styles({
                cursor: "default",
              });
              const targetLeft = 515;
              const targetTop = -19;
              const toleranceLeft = 40; // Pixels of tolerance
              const toleranceTop = 120; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    $(this).draggable("destroy");
                    droppable.fadeHide(200);
                    frame2_6();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 5,
                    top: -20,
                  },
                  500
                );
                Src.problem2_issue2_battery_only.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame2_6() {
          Src.blank_box.hide();
          Src.problem2_issue2_battery_removed_drone.hide();
          Src.problem2_issue2_battery_only.hide();
          Src.fullfinal_drone.hide();

          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_upper_plate_only.set(5, -20, 444).zIndex(2);

          Util.setCC("Video explaining how to remove the upper plate.").onend(
            () => {
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.remove_upper_plate,
                200,
                "Upper plate removal"
              );
              Scenes.stepModal(
                {
                  description:
                    "Video explaining how to remove the upper plate using the alan key.",
                },
                () => {
                  videoBox.hide();
                  frame2_7();
                },
                585,
                108,
                340
              );
            }
          );
        }

        function frame2_7() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_upper_plate_only.set(5, -20, 444).zIndex(2);
          Src.blank_box.set(609, 130, 208, 262);
          Src.problem2_issue2_battery_only.set(515, -19, 444);

          Util.setCC("Drag the upper plate to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              // Src.problem2_issue2_upper_plate_removed_drone.hide()
            },
            214,
            159,
            92,
            91,
            0
          );

          let droppable = new Dom("#droppable");
          droppable
            .set(657, 39, 89, 216)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            })
            .fadeShow();

          let draggable_component = Src.problem2_issue2_upper_plate_only;

          draggable_component.styles({
            cursor: "grab",
          });

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
                "border-color": "green",
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
                "border-color": "black",
              });
              draggable_component.styles({
                cursor: "default",
              });
              const targetLeft = 489;
              const targetTop = -13;
              const toleranceLeft = 100; // Pixels of tolerance
              const toleranceTop = 120; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    $(this).draggable("destroy");
                    droppable.fadeHide(200);
                    frame4();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 5,
                    top: -20,
                  },
                  500
                );
                draggable_component.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame4() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_zoom_1_upper_plate_removed_drone
            .set(129, 55, 260)
            .zIndex(2)
            .hide();

          anime({
            targets: [
              Src.blank_box.item,
              Src.problem2_issue2_battery_only.item,
              Src.problem2_issue2_upper_plate_only.item,
            ],
            translateX: 800,
            duration: 2500,
            easing: "linear",
            complete() {
              Util.setCC(
                "Click on the Flight controller to see the zoom view so that the connections are visible."
              ).onend(() => {
                Dom.setBlinkArrowOnElement(Src.mask, "right").play();
              });
              Scenes.maskClick(
                () => {
                  Src.problem2_issue2_zoom_1_upper_plate_removed_drone.fadeShow(
                    800,
                    () => {
                      frame5();
                    }
                  );
                  Src.naza_upper_layer
                    .set(261, 168, 25)
                    .zIndex(6)
                    .fadeShow(800);
                },
                235,
                171,
                70,
                50
              );
            },
          });
        }

        function frame5() {
          Src.table_fc_pmu.set(600, 185, 150).fadeShow(200);
          Util.setCC(
            "Cross verify the connection between the flight controller and the PMU according to above given table."
          );
          Scenes.stepModal(
            {
              description:
                "The following table shows the PMU's connections to the flight controller.",
            },
            () => {
              Src.table_fc_pmu.fadeHide(200);
              frame6();
            },
            568,
            82,
            311
          );
        }

        function frame6() {
          videoBox = new Dom("");
          Util.setCC(
            "Video explaining the PMU's connection to the flight controller."
          ).onend(() => {
            videoBox = Scenes.videoBox(
              575,
              206,
              Src.pmu_to_fc_connections,
              200,
              "Flight Controller Connection"
            );
            Scenes.stepModal(
              {
                description:
                  "Video explaining the PMU's connection to the flight controller.",
              },
              () => {
                videoBox.hide();
                frame7();
              },
              585,
              102,
              340
            );
          });
        }

        function frame7() {
          Src.table_fc_esc.set(600, 185, 221).fadeShow(200);
          Util.setCC(
            "Cross verify the connection between the flight controller and the ESC according to above given table."
          );
          Scenes.stepModal(
            {
              description:
                "The following table shows the ESC's signal wire connections to the flight controller.",
            },
            () => {
              Src.table_fc_esc.fadeHide(200);
              frame8();
            },
            568,
            82,
            335
          );
        }

        function frame8() {
          videoBox = new Dom("");
          Util.setCC(
            "Video explaining the ESC's connection to the flight controller."
          ).onend(() => {
            videoBox = Scenes.videoBox(
              575,
              206,
              Src.esc_to_fc_connections,
              200,
              "Flight Controller Connection"
            );
            Scenes.stepModal(
              {
                description:
                  "Video explaining the ESC's connection to the flight controller.",
              },
              () => {
                Src.naza_upper_layer.hide();
                Src.problem2_issue2_zoom_1_upper_plate_removed_drone.fadeHide(
                  300
                );
                // to go to next step
                Scenes.fcIssueDone[1] = 1;
                Scenes.StepProcess.done();
                Scenes.currentStep = 1;
                // videoBox.hide();
              },
              585,
              102,
              340
            );
          });
        }
        //* frame calling
        frame1();
      };

      frames();

      return true;
    },

    //! RECEIVER ISSUES START
    // * step4
    //! Recciver ISSUE HOMEPAGE
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Receiver issues");

      // Required images
      Src.homepage_battery_issue.set(387, 99 - 60, 257);
      Src.btn_check_physical_damage.set(471, 148 - 60, 66).zIndex(1);
      Src.btn_check_connection.set(471, 148 + 100 - 60, 66).zIndex(1);
      Src.reciver.set(48, 93, 138);

      let styles = {
        rightTick: {
          filter: "hue-rotate(282deg)",
          zIndex: 1,
        },
      };

      let rightTicks = [
        Src.right_tick_1
          .set(442, 170 - 60, 20)
          .zIndex(1)
          .styles(styles.rightTick)
          .hide(),
        Src.right_tick_2
          .set(441, 170 + 94 - 60, 20)
          .zIndex(1)
          .styles(styles.rightTick)
          .hide(),
      ];

      //functionality

      let options = [Src.btn_check_physical_damage, Src.btn_check_connection];

      if (Scenes.receiverIssueDone.indexOf(0) == -1) {
        Scenes.tabsDone[1] = 1;
        rightTicks[0].show();
        rightTicks[1].show();
        Util.setCC("We have done with all the Receiver issues.");
        Scenes.stepModal(
          {
            description:
              "We have seen all the possible issues with the Receiver.",
          },
          () => {
            Scenes.StepProcess.done();
            Scenes.currentStep = 0;
          },
          233,
          334,
          424
        );
      } else if (Scenes.receiverIssueDone[0]) {
        rightTicks[0].show();
        Util.setCC("Click on check connections.");
        options[1].item.onclick = () => {
          Scenes.currentStep = 6;
          Scenes.StepProcess.done();
          Scenes.next();
        };
      } else {
        Util.setCC("Click on check physical damage.");
        options[0].item.onclick = () => {
          Scenes.currentStep = 5;
          Scenes.StepProcess.done();
          Scenes.next();
        };
      }

      return true;
    },

    //! Receiver issue 1
    // * step5
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Receiver issues - Physical damage");
      Util.setCC("...");

      const frames = () => {
        let videoBox = null;

        function frame1() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          // Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC("Check whether the Receiver is physically damage or not.");
          Scenes.stepModal(
            {
              description:
                "Check whether the Receiver is physically damage or not.",
            },
            () => {
              frame2();
            },
            528,
            158,
            330
          );
        }

        function frame2() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          Util.setCC("Click on the Receiver to see the zoom view.").onend(
            () => {
              Dom.setBlinkArrowOnElement(Src.mask, "left").play();
            }
          );
          Scenes.maskClick(
            () => {
              Src.rx_zoom_img
                .set(6, 102 + 74, 260)
                .zIndex(2)
                .fadeShow(800);
              frame3();
            },
            165,
            171,
            70,
            50
          );
        }

        function frame3() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444).zIndex(1);
          Src.fc_led_full.fadeHide(200);
          Scenes.stepModal(
            {
              description: "Give power supply to the Receiver.",
            },
            () => {
              frame4();
            },
            528,
            158,
            315
          ).fadeShow();
          Util.setCC(" Give power supply to the Receiver.");
          Util.setCC("Click on the dean plug to plug it to the battery.").onend(
            () => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            }
          );

          Scenes.maskClick(
            () => {
              Src.fullfinal_drone
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.problem2_issue2_dean_plug_unpluged.hide();
                  frame4();
                });
            },
            200,
            140,
            26,
            22,
            0
          );
        }

        function frame4() {
          Src.redlight.set(139, 271, 10).zIndex(3).hide();
          anime({
            begin() {
              Src.redlight.show().opacity(0);
            },
            targets: Src.redlight.item,
            keyframes: [{ opacity: 0 }, { opacity: 1 }],
            loop: 5,
            duration: 1000,
            complete() {
              Src.redlight.opacity(1);
              frame5();
            },
          });
        }

        function frame5() {
          Util.setCC(
            "As you can see the LED is blinking, this is the sign that Receiver is not physically damage."
          );
          Scenes.stepModal(
            {
              description:
                "As you can see the LED light is stable, it means the receiver is receiving the signal from the transmitter.",
            },
            () => {
              Src.redlight.hide();
              Src.rx_zoom_img.fadeHide(200);
              frame6();
            },
            528,
            158,
            335
          );
        }

        function frame6() {
          Util.setCC(
            "If LED is not blinking and not stable, it means the receiver is physically damaged and In this case you need to replace the Receiver."
          ).onend(
            Util.setCC(
              "Video explains how to replace the Receiver with the new one."
            ).onend(() => {
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.rx_replace,
                200,
                "Receiver connection"
              );
              Scenes.stepModal(
                {
                  description: "Video explains how to connect Receiver.",
                },
                () => {
                  //to go to next step
                  Scenes.receiverIssueDone[0] = 1;
                  Scenes.StepProcess.done();
                  Scenes.currentStep = 4;
                },
                585,
                127,
                340
              );
            })
          );
        }

        //* frame calling
        frame1();
      };

      frames();

      return true;
    },

    //! Reciver issue 2
    // * Step6
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Receiver issues - Check connections");
      Util.setCC("...");
      const frames = () => {
        let videoBox = null;

        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the Receiver connections are appropriate or not."
          );
          Scenes.stepModal(
            {
              description:
                "Check that the Receiver and flight controller are connected properly or not.",
            },
            () => {
              frame2();
            },
            528,
            158,
            378
          );
        }

        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
          Src.fc_led_full.fadeHide(200);
          Scenes.stepModal(
            {
              description:
                "Firstly, Ensure tha the Receiver is disconnected from power source.",
            },
            () => {
              frame3();
            },
            528,
            158,
            400
          ).fadeShow();
          Util.setCC(
            "Ensure that the Receiver is disconnected from power source."
          );
          Util.setCC("Click on the dean plug to unplug it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.fullfinal_drone.hide();
                  frame3();
                });
            },
            200,
            140,
            26,
            22,
            0
          );
        }

        function frame3() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "To check the Receiver, we have to remove the above listed components."
          ).onend(() => {});

          Scenes.stepModal(
            {
              description: `<p>Procedure:</p>
                  <ol>
                    <li>Remove the GPS</li>
                    <li>Remove the Battery</li>
                    <li>Remove the Upper Plate</li>
                  </ol>`,
            },
            () => {
              frame2_1();
            },
            541,
            149,
            378
          );
        }

        function frame2_1() {
          videoBox = new Dom("");
          Util.setCC("Remove the battery as shown in the video.").onend(() => {
            videoBox = Scenes.videoBox(
              575,
              206,
              Src.battery_remove,
              200,
              "Battery removal"
            );
            Scenes.stepModal(
              {
                description: "Video explaining how to remove the battery.",
              },
              () => {
                videoBox.hide();
                frame2_3();
              },
              585,
              127,
              340
            );
          });
        }

        function frame2_3() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444).zIndex(1);
          Util.setCC("Click on the GPS to detach it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_gps_sided
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(800, () => {
                  Src.problem2_issue2_dean_plug_unpluged.hide();
                  frame2_4();
                });
            },
            271,
            151,
            46,
            39,
            0
          );
        }

        function frame2_4() {
          Src.problem2_issue2_gps_sided.set(5, -20, 444).zIndex(1);
          Util.setCC("Click on the battery strip to open it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_belt_opend
                .set(5, -20, 444)
                .zIndex(2)
                .fadeShow(800, () => {
                  Src.problem2_issue2_gps_sided.hide();
                  frame2_5();
                });
            },
            249,
            182,
            51,
            23,
            0
          );
        }

        function frame2_5() {
          Src.problem2_issue2_belt_opend.hide();
          Src.problem2_issue2_battery_removed_drone.set(5, -20, 444).zIndex(1);
          Src.problem2_issue2_battery_only.set(5, -20, 444).zIndex(2);
          Src.blank_box.set(609, 130, 208, 262).fadeShow();

          Util.setCC("Drag the battery to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              // Src.problem2_issue2_battery_removed_drone.hide()
            },
            197,
            181,
            41,
            117,
            0
          );

          // battery draggable like we did in step 4
          let droppable = new Dom("#droppable");
          droppable
            .set(657, 39, 89, 216)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            })
            .fadeShow();

          Src.problem2_issue2_battery_only.styles({
            cursor: "grab",
          });

          $(Src.problem2_issue2_battery_only.item).draggable({
            start: function () {
              Src.problem2_issue2_battery_only.styles({
                cursor: "grab",
              });
              Dom.setBlinkArrowRed().reset();
            },
            drag: function (event, ui) {
              Src.problem2_issue2_battery_only.styles({
                cursor: "grabbing",
              });
              droppable.styles({
                scale: 1.1,
                "border-color": "green",
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
                "border-color": "black",
              });
              Src.problem2_issue2_battery_only.styles({
                cursor: "default",
              });
              const targetLeft = 515;
              const targetTop = -19;
              const toleranceLeft = 40; // Pixels of tolerance
              const toleranceTop = 120; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    $(this).draggable("destroy");
                    droppable.fadeHide(200);
                    frame2_6();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 5,
                    top: -20,
                  },
                  500
                );
                Src.problem2_issue2_battery_only.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame2_6() {
          Src.blank_box.hide();
          Src.problem2_issue2_battery_removed_drone.hide();
          Src.problem2_issue2_battery_only.hide();
          Src.fullfinal_drone.hide();

          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_upper_plate_only.set(5, -20, 444).zIndex(2);

          Util.setCC("Video explaining how to remove the upper plate.").onend(
            () => {
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.remove_upper_plate,
                200,
                "Upper plate removal"
              );
              Scenes.stepModal(
                {
                  description:
                    "Video explaining how to remove the upper plate using the alan key.",
                },
                () => {
                  videoBox.hide();
                  frame2_7();
                },
                585,
                108,
                340
              );
            }
          );
        }

        function frame2_7() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_upper_plate_only.set(5, -20, 444).zIndex(2);
          Src.blank_box.set(609, 130, 208, 262);
          Src.problem2_issue2_battery_only.set(515, -19, 444);

          Util.setCC("Drag the upper plate to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              // Src.problem2_issue2_upper_plate_removed_drone.hide()
            },
            214,
            159,
            92,
            91,
            0
          );

          let droppable = new Dom("#droppable");
          droppable
            .set(657, 39, 89, 216)
            .styles({
              border: "dashed 2px black",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            })
            .fadeShow();

          let draggable_component = Src.problem2_issue2_upper_plate_only;

          draggable_component.styles({
            cursor: "grab",
          });

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
                "border-color": "green",
              });
            },
            stop: function (event, ui) {
              droppable.styles({
                scale: 1,
                "border-color": "black",
              });
              draggable_component.styles({
                cursor: "default",
              });
              const targetLeft = 489;
              const targetTop = -13;
              const toleranceLeft = 100; // Pixels of tolerance
              const toleranceTop = 120; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= toleranceLeft &&
                Math.abs(ui.position.top - targetTop) <= toleranceTop
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    $(this).draggable("destroy");
                    droppable.fadeHide(200);
                    frame4();
                  }
                );
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 5,
                    top: -20,
                  },
                  500
                );
                draggable_component.styles({
                  cursor: "grab",
                });
              }
            },
          });
        }

        function frame4() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.problem2_issue2_zoom_1_upper_plate_removed_drone
            .set(129, 55, 260)
            .zIndex(2)
            .hide();
          Src.rx_connection_zoom_img.set(107, 60, 294).zIndex(2).hide();

          anime({
            targets: [
              Src.blank_box.item,
              Src.problem2_issue2_battery_only.item,
              Src.problem2_issue2_upper_plate_only.item,
            ],
            translateX: 800,
            duration: 2500,
            easing: "linear",
            complete() {
              Util.setCC(
                "Click on the Receiver's connection to see the zoom view so that the connections are visible."
              ).onend(() => {
                Dom.setBlinkArrowOnElement(Src.mask, "left").play();
              });
              Scenes.maskClick(
                () => {
                  Src.rx_connection_zoom_img.fadeShow(200);
                  frame5();
                },
                210,
                171,
                70,
                50
              );
            },
          });
        }

        function frame5() {
          Src.table_rx_fc.set(600, 185, 232).fadeShow(200);
          Util.setCC(
            "Cross verify the connection between the Receiver and the flight controller according to above given table."
          );
          Scenes.stepModal(
            {
              description:
                "The following table shows the Receiver's connections to the flight controller.",
            },
            () => {
              Src.table_fc_pmu.fadeHide(200);
              Src.rx_connection_zoom_img.fadeHide(300);
              // frame6();

              // to go to next step
              Scenes.receiverIssueDone[1] = 1;
              Scenes.StepProcess.done();
              Scenes.currentStep = 4;
            },
            568,
            82,
            340
          );
        }

        //* frame calling
        frame1();
      };

      frames();

      return true;
    },
  ],
  // ! Scenes Process
  StepProcess: {
    isRunning: false,
    setIsProcessRunning(value) {
      // calling toggle the next
      if (value != this.isRunning) {
        Util.toggleNextBtn();
      }

      this.isRunning = value;
      if (value) {
        Util.cancelSpeech();
        Dom.hideAll();
      }
    },

    start() {
      this.setIsProcessRunning(true);
    },

    done(message = "Click 'Next' to go to next step") {
      Util.setCC(message);
      Dom.setBlinkArrow(true, 804, 546).play();
      this.setIsProcessRunning(false);
    },
  },

  // ! For adding realcurrentstep in every step
  // ! For tracking the current step accuratly
  realCurrentStep: null,
  setRealCurrentStep() {
    let count = 0;
    this.steps.forEach((step, idx) => {
      const constCount = count;
      let newStep = () => {
        this.realCurrentStep = constCount;
                // console.log(`RealCurrentStep: ${this.realCurrentStep}`);

        return step();
      };

      count++;
      this.steps[idx] = newStep;
    });
  },
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      this.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = () => {};
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      Layout.Drawer.backDrawerItem();
      Layout.ProgressBar.backProgressBar();
    }
  },
  next() {
    if (!this.realCurrentStep) {
      Scenes.setRealCurrentStep();
    }
    //! animation isRunning
    if (this.StepProcess.isRunning) {
      return;
    } else if (this.currentStep < this.steps.length) {
      this.StepProcess.start();
      this.steps[this.currentStep]();
      Layout.Drawer.nextDrawerItem();
      Layout.ProgressBar.nextProgressBar();
      this.currentStep++;
    }
  },
};

// stepcalling
Scenes.currentStep = 1;
// Scenes.next();

export default Scenes;
