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
    let videoBoxEle = new Dom(".video-box").set(vBoxLeft, vBoxTop);
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

    return videoBoxEle;
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
  optionsDone: [0, 0, 0, 0],
  tabsDone: [0, 0],
  motorIssueDone: [0, 0],
  escIssueDone: [0, 0],
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
      Scenes.experimentHeading("Drone is not responding – II");

      Util.setCC("...")

      if(Scenes.tabsDone.indexOf(1) == -1){
        Src.drone_3d_img.set(1002,-30,184).zIndex(1)
        let items = [
          Src.bgimag.set(0,-48,500,950)
          // Src.drone_3d_img.set(17,130,280).zIndex(1).hide()

        ]

        anime.timeline({
          duration: 6000,
          easing: "linear",
        })
        .add({
          targets: Src.drone_3d_img.item,
          left: 25,
          top: 100,
          height: 280,
          complete(){
            Scenes.stepModal({
              title: "Quadcopter 450",
              description: ` <b>Quadcopter</b> is an unmanned aerial vehicle
                    (UAV) or drone with four rotors, each with a motor and propeller. A quadcopter can be manually controlled
                    or can be autonomous. It is also called quadrotor helicopter or quadrotor. It belongs to a more general
                    class of aerial vehicles called multicopter or multirotor. Quadcopters provide stable flight performance,
                    making them ideal for surveillance and aerial photography.`,
              btnText: "Start"
            }, ()=>{
              items.forEach((ele)=>ele.fadeHide())
              menu()
            }, 433,106,483).fadeShow(2000)

            setTimeout(() => {
              Util.setCC("Click on 'Start' to start the experiment.")
            }, 4000);
          }
        })
      }
      else{
        menu()
      }
      
      function menu(){
        let styles = {
          rightTick: {
            filter: "hue-rotate(282deg)",
            zIndex: 1,
          },
        };
  
        // * Required images
        Src.drone_3d_img.set(11 + 60, 11, 260).zIndex(1);
        let tabs = [
          Src.tab_5.set(28, -29, 68).opacity(0.4).zIndex(1),
          Src.tab_6
            .set(28 + 230 * 1, -29, 68)
            .opacity(0.4)
            .zIndex(1),
        ];
  
        let issues = [
          Src.issue_motor.set(34, 146, 187, 418).hide(),
          Src.issue_esc.set(34, 146, 187, 418).hide(),
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
        let droneAnimeFull = anime({
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
  
        if (Scenes.tabsDone.indexOf(1) == -1){
          droneAnimeFull.play()
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
            Util.setCC("Click on the ESC issues and start rectifying.");
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
            Util.setCC("Click on the Motor issues and start rectifying.");
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

    //! Motor Issues start

    // * step1
    //! MOTOR ISSUE HOMEPAGE
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Motor issues");

      // Required images
      Src.homepage_battery_issue.set(387, 99 - 60, 257);
      Src.btn_check_physical_damage.set(471, 148 - 60, 66).zIndex(1);
      Src.btn_check_connection.set(471, 148 + 100 - 60, 66).zIndex(1);
      Src.motor.set(20, 16, 280);

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

      if (Scenes.motorIssueDone.indexOf(0) == -1) {
        Scenes.tabsDone[0] = 1;
        rightTicks[0].show();
        rightTicks[1].show();
        Util.setCC("We have done with all the Motor issues.");
        Scenes.stepModal(
          {
            description:
              "We have seen all the possible issues with the Motor.",
          },
          () => {
            Scenes.StepProcess.done();
            Scenes.currentStep = 0;
          },
          233,
          334,
          424
        );
      } else if (Scenes.motorIssueDone[0]) {
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

    //! Motor issue 1
    // * Step 2
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Motor issues - Physical damage");

      const multimeterReadingAnime = () => {
        let readings = [
          Src.red1.set(793, 184, 29, 78).hide().zIndex(12),
          Src.red006.set(793, 184, 29, 78).hide().zIndex(12),
          Src.red005.set(793, 184, 29, 78).hide().zIndex(12),
          Src.red002.set(793, 184, 29, 78).hide().zIndex(12),
          Src.red001.set(793, 184, 29, 78).hide().zIndex(12),
          Src.red000.set(793, 184, 29, 78).hide().zIndex(12),
        ];

        function animate(i=0, n=readings.length){
          if(i>=n) {
            return
          }
          anime({
            targets: readings[i].item,
            begin(){
              readings[i].show().opacity(0)
            },
            duration: 800,
            opacity: 1,
            easing: "linear",
            complete(){
              if(i>0) readings[i-1].hide()
              animate(i+1)
            }
          })
        }

        return {
          animate(){
            animate()
          },
          reset(){
            Src.red000.hide()
            Src.red1.show()
          }

        }
      };

      const frames = () => {
        Util.setCC("...");

        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the motor is physically damaged or not."
          ).onend(() => {
            Src.DE2_porblem1_issue1_multi_meter_full.set(
              657,
              160,
              253
            ).fadeShow();
            Scenes.stepModal(
              {
                description: "Here we use a multimeter to check the motor.",
              },
              () => {
                Src.DE2_porblem1_issue1_multi_meter_full.hide()
                frame2();
              },
              628,
              58,
              278
            );
          });
        }

        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444);
          
          Util.setCC("Ensure the motor is disconnected from power source.");
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
                  frame3_0();
                });
            },
            200,
            140,
            26,
            22,
            0
          );
        }

        function frame3_0() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444).zIndex("unset");
          Util.setCC("Disconnect the motor with the ESC").onend(() => {
            Scenes.stepModal(
              {
                description:
                  "To check the motor using multimeter, we need to disconnect the motor from the ESC.",
              },
              () => {
                frame3_1();
              },
              528, 148, 378
            ).fadeShow();
          });
        }

        function frame3_1() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);

          Scenes.maskClick(
            () => {
              frame3_2();
            },
            156,
            60,
            110,
            28,
            -45
          );

          Util.setCC("Click on the frame arm to see the zoom view").onend(
            () => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            }
          );
        } 

        function frame3_2() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          Src.problem1_issue1_zoom_1_motor_front.set(30, -15, 272).zIndex(1);

          Util.setCC("Click on the arm to see the back view of it.").onend(
            () => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            }
          );

          Scenes.maskClick(
            () => {
              Src.problem1_issue1_zoom_2_motor_back
                .set(30, -15, 272)
                .zIndex(2)
                .fadeShow(1000, () => {
                  Src.problem1_issue1_zoom_1_motor_front.hide();
                  frame3_3();
                });
            },
            165,
            60,
            180,
            46,
            -47
          );
        }

        function frame3_3() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          Src.problem1_issue1_zoom_2_motor_back.set(30, -15, 272).zIndex(1);

          Scenes.stepModal(
            {
              description: "Detach the wire of esc from the motor.",
            },
            () => {
              Util.setCC("Click on the yellow wire to detach it.").onend(() => {
                Dom.setBlinkArrowOnElement(Src.mask, "left").play();
              });
            },
            556, 168, 343
          );

          Scenes.maskClick(
            () => {
              Src.problem1_issue1_zoom_3_motor_yellow_wire_moved
                .set(30, -15, 272)
                .zIndex(2)
                .fadeShow(1000, () => {
                  Src.problem1_issue1_zoom_2_motor_back.hide();
                  frame3_4();
                });
            },
            169,
            116,
            61,
            10,
            -41
          );
        }

        function frame3_4() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          Src.problem1_issue1_zoom_3_motor_yellow_wire_moved
            .set(30, -15, 272)
            .zIndex(1);

          Util.setCC("Click on the black wire to detach it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "left").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem1_issue1_zoom_4_motor_black_wire_moved
                .set(30, -15, 272)
                .zIndex(2)
                .fadeShow(1000, () => {
                  Src.problem1_issue1_zoom_3_motor_yellow_wire_moved.hide();
                  frame3_5();
                });
            },
            181,
            103,
            81,
            10,
            -42
          );
        }

        function frame3_5() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          Src.problem1_issue1_zoom_4_motor_black_wire_moved
            .set(30, -15, 272)
            .zIndex(1);

          Util.setCC("Click on the red wire to detach it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "left").play();
          });

          Scenes.maskClick(
            () => {
              Src.problem1_issue1_zoom_5_motor_red_wire_moved
                .set(30, -15, 272)
                .zIndex(2)
                .fadeShow(1000, () => {
                  Src.problem1_issue1_zoom_4_motor_black_wire_moved.hide();
                  frame3_6();
                });
            },
            187,
            88,
            94,
            10,
            -46
          );
        }

        function frame3_6() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444);
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.DE2_porblem1_issue1_multi_meter_full.set(657, 160, 253).hide();

          setTimeout(() => {
            Src.DE2_porblem1_issue1_multi_meter_full.fadeShow();
          }, 2000);

          Scenes.stepModal(
            {
              description: "Multimeter is used to check the continuity of the motor's wire",
            },
            () => {
              frame3_7();
            },
            628,
            58,
            278
          );
        }

        function frame3_7() {
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.DE2_porblem1_issue1_multi_meter_full.set(657, 160, 253)
          Src.red1.set(793, 184, 29, 78).hide().zIndex(2)
          // multimeter position
          // Src.mmb.set(792, 253, 68, 71).rotate(204) 
          Src.mmb.set(792, 253, 68, 71).rotate(46) 

          // multimeterReadingAnime().animate()

          Util.setCC(
            "Click on the knob to turn the multimeter on and set it to continuity mode"
          ).onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask,"right").play()
          }) 

          Scenes.maskClick(()=>{
            anime({
              targets: Src.mmb.item,
              rotate: 204,
              duration: 1000,
              easing: "easeInOutQuad",
              complete(){
                Src.red1.show()
                frame3_8()
              }
            })
          }, 803, 250, 72, 49, 0)
        }

        function frame3_8(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.DE2_porblem1_issue1_multi_meter_full.set(657, 160, 253)
          Src.red1.set(793, 184, 29, 78).zIndex(10)
          // multimeter position
          Src.mmb.set(792, 253, 68, 71).rotate(204).zIndex(10) 

          // multimeterReadingAnime().animate()

          Util.setCC("Connect each probe with the motor wires to check the continuity")

          Util.setCC(
            "Click on the red probe to connect it with yellow wire"
          ).onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask,"left").play()
          }) 

          Scenes.maskClick(()=>{
            Src.DE2_porblem1_issue1_multi_meter_full.hide()
            Src.problem1_issue1_motor_check_multimeter_probe_moved_1.set(0,-48,null,950).zIndex(5)

            frame3_9()
          }, 656, 203, 121, 27, 0)
        }

        function frame3_9(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.problem1_issue1_motor_check_multimeter_probe_moved_1.set(0,-48,null,950).zIndex(5)
          Src.red1.set(793, 184, 29, 78).zIndex(10)
          // multimeter position
          Src.mmb.set(792, 253, 68, 71).rotate(204).zIndex(10) 

          // multimeterReadingAnime().animate()

          Util.setCC(
            "Click on the black probe to connect it with black wire"
          ).onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask,"left").play()
          }) 

          Scenes.maskClick(()=>{
            Src.problem1_issue1_motor_check_multimeter_probe_moved_1.hide()
            Src.problem1_issue1_motor_check_multimeter_probe_moved_2.set(0,-48,null,950).zIndex(5)

            multimeterReadingAnime().animate()
            Util.setCC("You can hear the beep sound means the continuity is good")
            setTimeout(() => {
              frame3_10()
            }, 5000);
            
          }, 688, 205, 89, 27, 0)
        }

        function frame3_10(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.problem1_issue1_motor_check_multimeter_probe_moved_2.set(0,-48,null,950).zIndex(5)
          // Src.red1.set(793, 184, 29, 78).zIndex(10)
          // multimeter position
          Src.mmb.set(792, 253, 68, 71).rotate(204).zIndex(10) 

          // multimeterReadingAnime().animate()

          Util.setCC(
            "Click on the black probe to connect it with red wire"
          ).onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask,"right").play()
          }) 

          Scenes.maskClick(()=>{
            Src.problem1_issue1_motor_check_multimeter_probe_moved_2.hide()
            Src.problem1_issue1_motor_check_multimeter_probe_moved_3.set(0,-48,null,950).zIndex(5)

            multimeterReadingAnime().animate()
            setTimeout(() => {
              frame3_11()
            }, 5000);
          }, 178, 139, 112, 30, 0)
        }

        function frame3_11(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.problem1_issue1_motor_check_multimeter_probe_moved_3.set(0,-48,null,950).zIndex(5)
          // Src.red1.set(793, 184, 29, 78).zIndex(10)
          // multimeter position
          Src.mmb.set(792, 253, 68, 71).rotate(204).zIndex(10) 

          // multimeterReadingAnime().animate()

          Util.setCC(
            "Click on the red probe to connect it with black wire"
          ).onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask,"left").play()
          }) 

          Scenes.maskClick(()=>{
            Src.problem1_issue1_motor_check_multimeter_probe_moved_3.hide()
            Src.problem1_issue1_motor_check_multimeter_probe_moved_4.set(0,-48,null,950).zIndex(5)

            multimeterReadingAnime().animate()
            setTimeout(() => {
              Util.setCC("Click on the probe to remove the probe").onend(()=>{
                Dom.setBlinkArrowOnElement(Src.mask,"right").play()
              })

              Scenes.maskClick(()=>{
                frame3_12()
              }, 172, 133, 111, 37, 0)

            }, 5000);
          }, 170, 160, 98, 31, 0)
        }

        function frame3_12(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.problem1_issue1_motor_check_multimeter_probe_moved_4.hide()
          Src.DE2_porblem1_issue1_multi_meter_full.set(657, 160, 253 ).zIndex(5)
          // Src.red1.set(793, 184, 29, 78).zIndex(10)
          // multimeter position
          Src.red000.hide()
          Src.red1.set(793, 184, 29, 78).zIndex(10)

          Src.mmb.set(792, 253, 68, 71).rotate(204).zIndex(10) 

          Util.setCC("All the phases of the motor works properly.")
          // Todo Add video box and else case if motor binding is burnt or etc
          
          Util.setCC("Click on the knob to switch off the multimeter").onend(()=>{
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(()=>{
            anime({
              targets: Src.mmb.item,
              rotate: 46,
              duration: 1000,
              easing: "easeInOutQuad",
              complete(){
                Src.red1.hide()
                frame3_13()
              }
            })
          }, 798, 245, 77, 60, 0)
          
        }


        function frame3_13(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_5_motor_red_wire_moved
            .set(30, -15, 272)
            .zIndex(1);
          Src.DE2_porblem1_issue1_multi_meter_full.set(657, 160, 253)
          Src.mmb.set(792, 253, 68, 71).rotate(46).zIndex(10) 


          anime.timeline({
            delay: 200,
            duration: 2000,
            easing: "easeInOutExpo",
          })
          .add({
            targets: Src.DE2_porblem1_issue1_multi_meter_full.item,
            left: 1000,
            complete(){
              Src.DE2_porblem1_issue1_multi_meter_full.hide()
            }
          },0)
          .add({
            targets: Src.mmb.item,
            left: 1145,
            complete(){
              Src.mmb.hide()
            }
          },0)

          Util.setCC("Click on the motor wire to attach with ESC").onend(()=>{
            Dom.setBlinkArrowOnElement(Src.mask, "left").play()
          })
          
          Scenes.maskClick(()=>{
            Src.problem1_issue1_zoom_2_motor_back
            .set(30, -15, 272).zIndex(2).fadeShow(1000,()=>{
              Src.problem1_issue1_zoom_5_motor_red_wire_moved.hide()
              frame3_14()
            })
          }, 144, 72, 127, 49, -46)

        }

        function frame3_14(){
          Src.fullfinal_drone.set(5, -20, 444)
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444).zIndex(1)
          Src.problem1_issue1_zoom_2_motor_back
            .set(30, -15, 272)
            .zIndex(3);
          Src.problem1_issue1_zoom_1_motor_front
            .set(30, -15, 272)
            .zIndex(2);
          

          Util.setCC("means there is no physical damage in the motor.").onend(()=>{
            Src.problem1_issue1_zoom_2_motor_back.fadeHide(1000, ()=>{
              Src.problem1_issue1_zoom_1_motor_front.fadeHide(1000,()=>{
                Src.problem2_issue2_dean_plug_unpluged.fadeHide(1000)

                // Todo end of this issue
                //to go to next step
                Scenes.motorIssueDone[0] = 1
                Scenes.StepProcess.done();
                Scenes.currentStep = 1;

              })
            })            
          })

        }

        frame1();
      };

      frames();
    },

    //! Motor issue 2
    // * Step 3
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Motor issues - Check connections");
      Util.setCC("...");
      let videoBox = null
      
      const frames = () => {
        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the motor connections are appropriate or not."
          )
            Scenes.stepModal(
              {
                description: "Check motor wires are appropriately connected with ESC's socket or not.",
              },
              () => {
                frame2();
              },
              528, 158, 378
            );
        }

        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
          Scenes.stepModal(
            {
              description: "Firstly, Ensure the motor is disconnected from power source.",
            },
            () => {
              // frame3();
            },
            528, 158, 390
          ).fadeShow()
          Util.setCC("Firstly, Ensure the motor is disconnected from power source.")
          Util.setCC("Click on the dean plug to unplug it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.fullfinal_drone.hide();
                  frame3()
                  // todo to click close button of stepmodal
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
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          
          Scenes.maskClick(()=>{
            frame4()
          }, 156, 60, 110, 28, -45)

          Util.setCC("Click on the frame arm to see the zoom view").onend(()=>{
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

        }

        function frame4(){
          Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          Src.problem1_issue1_zoom_1_motor_front.set(30, -15, 272).zIndex(3)

          Util.setCC("Click on the arm to flip it so that connections are visible.").onend(()=>{
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(()=>{
            Src.problem1_issue1_zoom_3_motor_yellow_wire_moved.set(30,-15, 272).zIndex(3).fadeShow(1000, ()=>{
              Src.problem1_issue1_zoom_1_motor_front.hide()
              frame5()
            })
          }, 165, 60, 180, 46, -47)
        }

        function frame5() {
          Scenes.stepModal(
            {
              description: "All the three wires of the motor should be properly connected with the ESC's socket.",
            },
            () => {
              frame6();
            },
            528, 158, 378
          ).fadeShow()
          Util.setCC("As you can see yellow wire is disconnected from ESC's socket, so you have to connect it again.")
        }

        function frame6() {
          Util.setCC("Connect the motor's yellow wire to the ESC's socket as shown in the video.")
          Scenes.stepModal(
            {
              description: "The video explains how they are connected.",
            },
            () => {
              videoBox.hide()
              //todo to make it 7
              // frame7();
              frame7();
            },
            539, 108, 355
          ).fadeShow()

          videoBox = Scenes.videoBox(528, 197, Src.motor_yellow_wire, 210, "How they are connected.")
        }

        //todo to add animation 
        function frame7(){

          Util.setCC("Click on the yellow wire to attach it with ESC's socket.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "left").play()
          })

          Scenes.maskClick(
            () => {
              Src.problem1_issue1_zoom_2_motor_back
                .zIndex(4)
                .set(30, -15, 272)
                .fadeShow(800, () => {
                  frame8()
                });
            },
            153, 122,
            26,
            22,
            -47
          );
          

        }

        function frame8() {
          Src.problem1_issue1_zoom_3_motor_yellow_wire_moved.fadeHide(200)
          Util.setCC("As similar check for the remaining motors.")
          Scenes.stepModal(
            {
              description: "As similar check for the remaining motors.",
            },
            () => {
              Src.problem1_issue1_zoom_2_motor_back.hide()
              //to go to next step
              Scenes.motorIssueDone[1] = 1;
              Scenes.StepProcess.done()
              Scenes.currentStep = 1
            },
            528, 158, 378
          )


        }
        

        //* Frame calling
        frame1();
        // frame4();
      }


      frames();
      return true
    },



    //! ESC ISSUES START

    // * step3
    //! ESC ISSUE HOMEPAGE
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("ESC (Electronic speed controller) issues");

      // Required images
      Src.homepage_battery_issue.set(387, 99 - 60, 257);
      Src.btn_check_physical_damage.set(471, 148 - 60, 66).zIndex(1);
      Src.btn_check_connection.set(471, 148 + 100 - 60, 66).zIndex(1);
      Src.esc.set(168, -8, 400).rotate(-90);

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

      if (Scenes.escIssueDone.indexOf(0) == -1) {
        Scenes.tabsDone[1] = 1;
        rightTicks[0].show();
        rightTicks[1].show();
        Util.setCC("We have done with all the ESC issues.");
        Scenes.stepModal(
          {
            description: "We have seen all the possible issues with the ESC.",
          },
          () => {
            Scenes.StepProcess.done();
            Scenes.currentStep = 0;
          },
          233,
          334,
          424
        );
      } else if (Scenes.escIssueDone[0]) {
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

    //! ESC issue 1
    // * Step5
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("ESC issues - Physical damage");
      Util.setCC("...");

      let videoBox = null
      
      const animations = () => {
        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the ESC is physically damaged or not."
          ).onend(() => {
            frame2()
            // Src.DE2_porblem1_issue1_multi_meter_full.set(
            //   657,
            //   160,
            //   253
            // ).fadeShow();
            // Scenes.stepModal(
            //   {
            //     description: "Here we use a multimeter to check the ESC.",
            //   },
            //   () => {
            //     Src.DE2_porblem1_issue1_multi_meter_full.hide()
            //     frame2();
            //   },
            //   628,
            //   58,
            //   278
            // );
          });
        }
        
        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
          Scenes.stepModal(
            {
              description: "Firstly, Ensure the ESC is disconnected from power source.",
            },
            () => {
              // frame3_1();
            },
            528, 158, 358
          ).fadeShow()
          Util.setCC("Firstly, Ensure the ESC is disconnected from power source.")
          Util.setCC("Click on the dean plug to unplug it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.fullfinal_drone.hide();
                  frame3()
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
          Src.problem2_issue2_dean_plug_unpluged.zIndex(1).set(5, -20, 444)
          Src.ESC1_zoom_1_esc_front.set(47, 4, 214).zIndex(3).hide()
          Util.setCC("Click on the frame arm to see the zoom view.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .show()
                Src.fullfinal_drone.hide();
              Src.ESC1_zoom_1_esc_front.fadeShow(1000, ()=>{
                frame4()
              })
            },
            153, 50, 135, 37, -44
          );

          Scenes.stepModal(
            {
              description: "To verify ESC, we have to see the zoom view of ESC.",
            },
            () => {
              
            },
            528, 158, 358
          ).fadeShow()
          
     

        }

        function frame4(){
          Src.problem2_issue2_dean_plug_unpluged.zIndex(1).set(5, -20, 444)
          Src.ESC1_zoom_1_esc_front.set(47, 4, 214).zIndex(3)
          Src.ESC1_zoom_2_esc_back.set(47, 4, 214).zIndex(4).hide()
          Util.setCC("Click on the frame arm to see the back view of it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .show()
              Src.fullfinal_drone.hide();
              Src.ESC1_zoom_2_esc_back.fadeShow(1000, ()=>{
                Src.ESC1_zoom_1_esc_front.hide()
                setTimeout(() => {
                  frame5()
                }, 2000);
              })
            },
            153, 50, 135, 37, -44
          );

        }

        function frame5(){
          Src.problem2_issue2_dean_plug_unpluged.zIndex(2).set(5, -20, 444)
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1)
          Src.ESC1_zoom_2_esc_back.set(47, 4, 214).zIndex(3)

          anime({
            delay: 1000,
            targets: Src.ESC1_zoom_2_esc_back.item,
            translateX: 600,
            duration: 2000,
            easing: 'linear',
            complete(){
              Util.setCC("Click on the dean plug to attach with battery.").onend(() => {
                Dom.setBlinkArrowOnElement(Src.mask, "right").play()
              })
            }
          })

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged.fadeHide(1000, ()=>{
                Src.problem2_issue2_dean_plug_unpluged.hide()
                frame6()    
              })
            },
            195,135,38,33,0
          );

          
        }

        function frame6(){
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1)
          Src.ESC1_zoom_2_esc_back.set(647, 4, 214).zIndex(3)

          Util.setCC("If beep sound is coming it means there is no physical damage in the ESC.").onend(() => {

            Scenes.stepModal({
                description: "If beep sound is coming it means there is no physical damage in the ESC.",
              },
              () => {
                frame7(); 
              },
              580,226, 352
            ).fadeShow()

          })
        }

        function frame7(){
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1)
          Src.ESC1_zoom_2_esc_back.set(647, 4, 214).zIndex(3)
          Src.esc.set(734,-32,414).rotate(-90).hide()


          Util.setCC("If beep sound is not coming it means ESC might have physical damage so check properly. ").onend(() => {

            Src.ESC1_zoom_2_esc_back.fadeHide(1000)
            Src.esc.fadeShow(1000)

            Scenes.stepModal({
                description: "Check ESC manually for any damage",
              },
              () => {
                frame8()
              },
              612,232,300
            ).fadeShow()

          })
        }

        function frame8(){
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1)
          Src.esc.set(734,-32,414).rotate(-90)
          Src.ESC1_capacitor_of_esc.set(666, 180,108).hide()


          Util.setCC("In this ESC check whether the capacitor is neither burnt nor damaged.").onend(() => {

            Scenes.stepModal({
                description: "In this ESC check whether the capacitor is neither burnt nor damaged.",
              },
              () => {
                anime({
                  targets: Src.esc.item,
                  top: -102,
                  duration: 1000,
                  easing: 'easeInOutExpo',
                  complete(){
                    Src.ESC1_capacitor_of_esc.fadeShow(1000)
                  }
                })

                Scenes.stepModal({
                  description: "This is the capacitor inside the ESC.",
                },
                () => {
                  frame9()
                },582,299,345).fadeShow()

              },
              600,232,338
            ).fadeShow()

          })
        }

        function frame9(){
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1)
          Src.esc.set(734,-102,414).rotate(-90)
          Src.ESC1_capacitor_of_esc.set(666, 180,108)

          Util.setCC("If capacitor is burnt or have any damage then replace ESC with a new one.").onend(() => {
           Src.esc.fadeHide(1000)
           Src.ESC1_capacitor_of_esc.fadeHide(1000)          
          })

          Util.setCC("Video explains how to replace ESC.").onend(() => {
            Scenes.stepModal(
              {
                description: "The video explains how to replace ESC.",
              },
              () => {
                videoBox.hide()

                Util.setCC("Similarly check for the remaining ESCs.")
                Scenes.stepModal({
                  description: "As similar check for the remaining ESCs.",
                },()=>{
                  Scenes.escIssueDone[0] = 1
                  Scenes.StepProcess.done()
                  Scenes.currentStep = 4
                },539, 168, 355).fadeShow()
                
              },
              539, 108, 355
            ).fadeShow()
            
            // todo video of ESC replacement
            videoBox = Scenes.videoBox(528, 197, Src.esc_replacement, 210, "ESC replacement")
          })

        }
        
        frame1()
        // frame9();
        
        // frame2_1();
      };

      animations();
      // DeveloperTools.init()
      return true
    },

    //! ESC issue 2
    // * step6
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("ESC issues - Check connections");
      Util.setCC("...")

      const frames = ()=>{
        let videoBox = null

        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC(
            "Check whether the ESC's connections are appropriate or not."
          )
            Scenes.stepModal(
              {
                description: "Check that the ESC's wires are properly connected with the center plate.",
              },
              () => {
                frame2();
              },
              528, 158, 388
            );
        }

        function frame2() {
          Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
          Scenes.stepModal(
            {
              description: "Firstly, Ensure the flight controller is disconnected from power source.",
            },
            () => {
              frame3();
            },
            528, 158, 400
          ).fadeShow()
          Util.setCC("Ensure that the ESC is disconnected from power source.")
          Util.setCC("Click on the dean plug to unplug it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play()
          })

          Scenes.maskClick(
            () => {
              Src.problem2_issue2_dean_plug_unpluged
                .zIndex(2)
                .set(5, -20, 444)
                .fadeShow(800, () => {
                  Src.fullfinal_drone.hide();
                  frame3()
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
          Util.setCC("Remove the battery as shown in the video.").onend(
            () => {
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
            }
          );
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
          Src.problem2_issue2_battery_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
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
          Src.fullfinal_drone.hide()

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
          Src.ESC2_zoom_1_connections
            .set(76,20,260)
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
            complete(){
              Util.setCC("Click on the connection to see the zoom view.").onend(
                () => {
                  Dom.setBlinkArrowOnElement(Src.mask, "right").play();
                }
              );
              Scenes.maskClick(
                () => {
                  Src.ESC2_zoom_1_connections.fadeShow(
                    800,
                    () => {
                      frame5();
                    }
                  );
                  Src.naza_upper_layer.set(261, 168, 25).zIndex(6).fadeShow(800)

                },
                198, 149, 53, 48, 0
              );
            }
        
          })
        }

        function frame5() {
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.ESC2_zoom_1_connections
            .set(76,20,260)
            .zIndex(2)
          Src.ESC2_zoom_2_connection_visible
            .set(76,20,260)
            .zIndex(3).hide()

          Util.setCC("Click here to see the connections of ESC without arm.").onend(
            () => {
              Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
            }
          );
          Scenes.maskClick(
            () => {
              Src.ESC2_zoom_2_connection_visible.fadeShow(
                800,
                () => {
                  Src.ESC2_zoom_1_connections.hide()
                  Util.setCC("As you see the wires are properly connected (no looseness) with the center plate of the drone.")
                  Scenes.stepModal(
                    {
                      description: "As you see the wires are properly connected (no looseness) with the center plate of the drone.",
                    },
                    () => {
                      frame6()
                    },
                    528, 158, 378
                  ).fadeShow()

                }
              );
            },
            182, 133, 53, 63, 0
          );


        }

        function frame6(){
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
          Src.ESC2_zoom_2_connection_visible.fadeHide(1000, ()=>{
              
              Src.ESC2_zoom_3_loose_wire
                .set(603,40,147)
                .zIndex(2).fadeShow(1000)
          })
          
          Util.setCC("But if wire are not connected properly in this case you need to resolder them.")

          Scenes.stepModal({
            description: "Example of loose or disconnected wire."
          }, ()=>{
            Src.ESC2_zoom_3_loose_wire.hide()
            frame7()
          }, 572,203,356).fadeShow(2000)
        }

        function frame7(){
          Src.problem2_issue2_upper_plate_removed_drone
            .set(5, -20, 444)
            .zIndex(1);
              

          Util.setCC("Video explains how the wires are soldered.")
          
          Scenes.stepModal(
            {
              description: "The video explains how they are connected.",
            },
            () => {
              videoBox.hide()

              Util.setCC("Similarly check for the remaining ESCs.")
                Scenes.stepModal({
                  description: "As similar check for the remaining ESCs.",
                },()=>{
                  Scenes.escIssueDone[1] = 1
                  Scenes.StepProcess.done()
                  Scenes.currentStep = 4
                },539, 168, 355).fadeShow()
            },
            539, 108, 355
          ).fadeShow()

          videoBox = Scenes.videoBox(528, 197, Src.esc_connection, 210, "How they are connected.")
        }

        //* frame calling
        frame1()
        // DeveloperTools.init()
      }

      frames()
     
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
// Scenes.currentStep = 1;
// Scenes.next();

export default Scenes;
