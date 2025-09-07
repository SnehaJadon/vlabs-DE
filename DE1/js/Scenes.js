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
  batteryIssueDone: [0,0],
  pmuIssueDone: [0,0],
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
    //! Menu page
    // * Step0
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Drone is not responding – I");


      if (Scenes.tabsDone.indexOf(1) == -1){
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
      }else{
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
          Src.tab_1.set(28, -29, 68).opacity(0.4).zIndex(1),
          Src.tab_2
            .set(28 + 230 * 1, -29, 68)
            .opacity(0.4)
            .zIndex(1),
        ];
  
        let issues = [
          Src.issue_bat.set(34, 146, 187, 418).hide(),
          Src.issue_pmu.set(34, 146, 187, 418).hide(),
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
  
        if(Scenes.tabsDone.indexOf(1) == -1){
          droneAnimeFull.play()
        }else{
          
        }
  
        if(Scenes.tabsDone.indexOf(0) == -1){
          right_ricks[0].show();
          right_ricks[1].show();
          tabs[0].opacity(1);
          tabs[1].opacity(1);
          Util.setCC("We have successfully rectify both the components of the drone.")
          setTimeout(()=>{
            Scenes.stepModal(
              {
                description:
                  "We have successfully rectify both the components of the drone.",
      
              },
              () => {
                
              },
              133, 182, 324
            );    
          }, 3200)
          return true
        }
        else if (Scenes.tabsDone[0]) {
          setTimeout(() => {
            Util.setCC("Click on the PMU issues and start rectifying.");
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
        }
        else {
          setTimeout(() => {
            Util.setCC("Click on the Battery issues and start rectifying.");
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

    //! BATTERY ISSUE HOMEPAGE
    // * step1
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Battery issues");

      // Required images
      Src.homepage_battery_issue.set(387, 99-60, 257);
      Src.btn_check_physical_damage.set(471, 148-60, 66).zIndex(1);
      Src.btn_check_connection.set(471, 148 + 100-60, 66).zIndex(1);
      Src.problem_1_battery.set(32, 132-60, 151);

      let styles = {
        rightTick: {
          filter: "hue-rotate(282deg)",
          zIndex: 1,
        },
      };

      let rightTicks = [
        Src.right_tick_1.set(442, 170-60, 20).zIndex(1).styles(styles.rightTick).hide(),
        Src.right_tick_2.set(441, 170 + 94-60, 20).zIndex(1).styles(styles.rightTick).hide()
      ]

      //functionality

      let options = [Src.btn_check_physical_damage, Src.btn_check_connection];

      if(Scenes.batteryIssueDone.indexOf(0) == -1){
        Scenes.tabsDone[0] = 1
        rightTicks[0].show()
        rightTicks[1].show()
        Util.setCC("We have done with all the Battery issues.")
        Scenes.stepModal(
          {
            description:
              "We have seen all the possible issues with the Battery."
          },
          () => {
            Scenes.StepProcess.done();
            Scenes.currentStep = 0;
          },
          233, 334, 424
        );    
      }
      else if(Scenes.batteryIssueDone[0]){
        rightTicks[0].show()
        Util.setCC("Click on check connections.")
        options[1].item.onclick = () => {
          Scenes.currentStep = 3;
          Scenes.StepProcess.done();
          Scenes.next();
        };
      }
      else{
        Util.setCC("Click on check physical damage.")
        options[0].item.onclick = () => {
          Scenes.currentStep = 2;
          Scenes.StepProcess.done();
          Scenes.next();
        };

      }



      return true;
    },

    //! battery issue 1
    // * step2
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Battery issues - Physical damage");
      Src.mask.styles({ cursor: "pointer", zIndex: 1000 });
      let videoBox = new Dom("");

      // * Animation functions
      const frames = () => {
        function frame2() {
          function frame2_0() {
            Src.fullfinal_drone.set(5, -20, 444);
            Util.setCC(
              "To check the battery, you will have to first remove the battery from the drone."
            ).onend(() => {});

            Scenes.stepModal(
              {
                description: `<p>Steps to remove the battery:</p>
                    <ol>
                      <li>Unplug the battery from dean connector.</li>
                      <li>Detach the GPS.</li>
                      <li>Open the battery strip.</li>
                      <li>Remove the battery</li>
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
                    description:
                      "The video explains how to remove the battery.",
                  },
                  () => {
                    videoBox.hide();
                    frame2_2();
                  },
                  579,
                  123,
                  358
                );
              }
            );
          }

          function frame2_2() {
            Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
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
                    frame2_3();
                  });
              },
              200,
              140,
              26,
              22,
              0
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
            Dom.setBlinkArrowRed().reset();
            Util.setCC(
              "Physically check whether the battery is not puffed or swollen anywhere."
            ).onend(() => {
              Scenes.stepModal(
                { description: "Example of puffed or swollen battery." },
                () => {
                  frame2_7();
                },
                633,
                24,
                294
              ).zIndex(500);

              Src.problem_1_battery_puffed.set(688, -49, 75);
            });
          }

          function frame2_7() {
            //todo to move the battery and basket

            anime({
              targets: Src.blank_box.item,
              easing: "linear",
              duration: 2400,
              translateX: 400,
            })
            anime({
              targets: Src.problem2_issue2_battery_only.item,
              easing: "linear",
              duration: 2400,
              translateX: 400,
            })

            Src.problem_1_battery_puffed.set(688, -49, 75).hide();
            Util.setCC(
              "If your battery is puffed, swollen or have any damage then replace it with a new battery, and then put it back in it's place."
            ).onend(() => {
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.battery_connect,
                200,
                "How to place battery"
              );
             
              Scenes.stepModal(
                {
                  description:
                    "This video explain how to put battery in it's right place.",
                },
                () => {

                  //to go to next step
                  Scenes.batteryIssueDone[0] = 1
                  Scenes.StepProcess.done();
                  Scenes.currentStep = 1;
                },
                582,
                102,
                344
              ).zIndex(500);
            });

            
          }

          frame2_0();
        }
        frame2();
      };

      frames();
      return true;
    },

    //! battery issue 2
    // * step3
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Battery issues - Check connections");
      Util.setCC("...")



      let textCC = [
        "Check whether the connection between these two (deans plug and battery) is fine or not, there is no looseness anywhere.",

        "The video next to it explains how they are connected to each other.",

        "If it is connected properly then check whether the Dean plug is properly connected to the plate or not, whether the iron soldering is done properly or not.",
      ];

      // * Animation functions
      const anime = () => {

        function frame2() {
          let videoBox = null
          function frame2_0() {
            Src.fullfinal_drone.set(5, -20, 444);
            Util.setCC(
              "Check whether the connections are appropriate or not."
            ).onend(() => {});

            Scenes.stepModal(
              {
                description:
                  "Check whether the connection between these two (deans plug and battery) is fine or not, there is no looseness anywhere.",
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
            Src.fullfinal_drone.set(5, -20, 444);
            Util.setCC("Click on the dean plug to see the zoom view.").onend(
              () => {
                Dom.setBlinkArrowOnElement(Src.mask, "right").play();
              }
            );

            Scenes.maskClick(
              () => {
                Src.zoom_dean_plug
                  .set(101, 48, 200)
                  .zIndex(1)
                  .fadeShow(800, () => {
                    frame2_2();
                  });
              },
              200,
              143,
              24,
              24,
              0
            );
          }

          function frame2_2() {
            Src.fullfinal_drone.set(5, -20, 444);
            videoBox = new Dom("");
            Util.setCC(
              "The female socket of the battery should be connected with the male socket of deans plug."
            ).onend(() => {
              Scenes.stepModal(
                {
                  description: "Check whether they are connected as it appear in the image or not.",
                },
                () => {
                  Util.setCC("Video explaining how they are connected.")
                  videoBox = Scenes.videoBox(
                    575,
                    206,
                    Src.dean_plug_connect_to_battery,
                    200,
                    "How they are connected."
                  );
                  Scenes.stepModal(
                    {
                      description: "The video explains how they are connected.",
                    },
                    () => {
                      Src.zoom_dean_plug.fadeHide(200)
                      videoBox.hide();
                      frame2_3();
                    },
                    579,
                    123,
                    358
                  );
              
                },
                528,
                158,
                331
              );

            });
          }

          function frame2_3() {
            Src.fullfinal_drone.set(5, -20, 444);
            Util.setCC("If it is connected properly then check whether the Dean plug is properly connected to the plate or not  .").onend(()=>{
              Util.setCC("Click on the dean connector to see the zoom view.").onend(
                () => {
                  Dom.setBlinkArrowOnElement(Src.mask, "top").play();
                }
              );
  
              Scenes.maskClick(
                () => {
                  Src.Battery2_zoom_1_connections
                    .set(136, 79, 250)
                    .zIndex(2)
                    .fadeShow(800, () => {
                      frame2_4();
                    });
                },
                219, 134, 29, 65, 0
                // true
              );
            })

          }
          function frame2_4() {
            Src.fullfinal_drone.set(5, -20, 444);

              Util.setCC("Click on the dean connector to see the connections without upper plate.").onend(
                () => {
                  Dom.setBlinkArrowOnElement(Src.mask, "top").play();
                }
              );
  
              Scenes.maskClick(
                () => {
                  Src.Battery2_zoom_2_connections_hidden
                    .set(136, 79, 250)
                    .zIndex(3)
                    .fadeShow(800, () => {
                      frame2_5();
                    });
                },
                219, 134, 29, 65, 0
                // true
              );

          }

          function frame2_5() {
            Src.fullfinal_drone.set(5, -20, 444);
              Util.setCC("Click on the connections to see how it is connected with the center plate.").onend(
                () => {
                  Dom.setBlinkArrowOnElement(Src.mask, "top").play();
                }
              );
  
              Scenes.maskClick(
                () => {
                  Src.Battery2_zoom_3_connections_visible
                    .set(136, 79, 250)
                    .zIndex(3).hide()
                    .fadeShow(800, () => {
                      Util.setCC("Check whether the wires are neither loose nor burnt.")
                      Scenes.stepModal(
                        {
                          description: "Check whether the wires are neither loose nor burnt.",
                        },
                        () => {
                          frame2_6();
                        },
                        528,
                        158,
                        358
                      ).fadeShow(300);

                    });
                },
                229, 151, 29, 65, 0
                // true
              );
          }

          function frame2_6() {
            Src.fullfinal_drone.set(5, -20, 444);
            Src.Battery2_zoom_3_connections_visible
            .set(136, 79, 250)
            .zIndex(3)

            Util.setCC("If the wires are loose or burnt, then in this case you need to solder them.").onend(()=>{
              Util.setCC("Video explains how the deans connector's red and black wire is solder in center plate .")
              videoBox = Scenes.videoBox(
                575,
                206,
                Src.dean_plug_connect_to_center_plate,
                200,
                "Soldering deans plug"
              );
              Scenes.stepModal(
                {
                  description: "The video explains how soldering can be done.",
                },
                () => {
                  //to hide the previous images
                  Src.Battery2_zoom_1_connections.hide()
                  Src.Battery2_zoom_2_connections_hidden.hide()
                  Src.Battery2_zoom_3_connections_visible.fadeHide(200)
                  //to go to next step
                  Scenes.batteryIssueDone[1] = 1;
                  Scenes.StepProcess.done()
                  Scenes.currentStep = 1
                },
                574,
                120,
                361
              );
            })
            
          }

          frame2_0();
        }
        frame2();
      };

      anime();
      return true;
    },

    //! PMU ISSUES START
    // * step4
    //! PMU ISSUE HOMEPAGE
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("PMU (Power management unit) issues");

      // Required images
      Src.homepage_battery_issue.set(387, 99-60, 257);
      Src.btn_check_physical_damage.set(471, 148-60, 66).zIndex(1);
      Src.btn_check_connection.set(471, 148 + 100-60, 66).zIndex(1);
      Src.pmuwithwire.set(110, -14, 365).rotate(90);

      let styles = {
        rightTick: {
          filter: "hue-rotate(282deg)",
          zIndex: 1,
        },
      };

      let rightTicks = [
        Src.right_tick_1.set(442, 170-60, 20).zIndex(1).styles(styles.rightTick).hide(),
        Src.right_tick_2.set(441, 170 + 94-60, 20).zIndex(1).styles(styles.rightTick).hide()
      ]

      //functionality

      let options = [Src.btn_check_physical_damage, Src.btn_check_connection];

      if(Scenes.pmuIssueDone.indexOf(0) == -1){
        Scenes.tabsDone[1] = 1
        rightTicks[0].show()
        rightTicks[1].show()
        Util.setCC("We have done with all the PMU issues.")
        Scenes.stepModal(
          {
            description:
              "We have seen all the possible issues with the PMU."
          },
          () => {
            Scenes.StepProcess.done();
            Scenes.currentStep = 0;
          },
          233, 334, 424
        );    
      }
      else if(Scenes.pmuIssueDone[0]){
        rightTicks[0].show()
        Util.setCC("Click on check connections.")
        options[1].item.onclick = () => {
          Scenes.currentStep = 6;
          Scenes.StepProcess.done();
          Scenes.next();
        };
      }
      else{
        Util.setCC("Click on check physical damage.")
        options[0].item.onclick = () => {
          Scenes.currentStep = 5;
          Scenes.StepProcess.done();
          Scenes.next();
        };

      }

      return true;
    },

    //! PMU issue 1
    // * step5
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("PMU issue - Physical damage");

      Scenes.maskClick();
      let videoBox = new Dom("");
      let textCCIdx = 0;
      let textCC = [
        "Check whether the PMU is physically damage or not",

        "Click on the PMU to see the zoom view.",

        "Click on the zip tie to open it",

        "Now lift the PMU and check it",

        "Click on the PMU to see the zoom view",

        "Now manually check the PMU for any damage, if there is any damage then replace it.",

        "As you can see the PMU is damaged, there is a crack in it.",

        "Replace this PMU with a new one.",

        "Replace the working PMU in place of damaged PMU with the help of soldering iron.",

        "Click on the damaged PMU to remove it.",

        "Drag the new PMU to the drone.",
      ];

      // * Animation functions
      const animes = () => {
        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC("Click on the PMU to see the zoom view");
          setTimeout(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          }, 3000);
          Scenes.stepModal(
            {
              description:
                "First check whether the PMU is physically damaged or not",
            },
            () => {},
            547,
            151,
            324
          );

          Scenes.maskClick(
            () => {
              frame2();
            },
            331,
            86,
            57,
            32,
            43
          );
        }

        function frame2() {
          // Src.zoom_pmu_ziptie.set(238, -47, 257);
          Src.zoom_pmu_without_ziptie.set(238, -47, 257).zIndex(2);
          Src.tie_tied.set(361, 31, 90).rotate(-6).zIndex(4);
          Util.setCC("Click on the zip tie to open it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });
          Scenes.maskClick(
            () => {
              Src.zoom_pmu_open_tie.set(238, -47, 257).zIndex(3);
              Src.tie_tied.hide();
              frame3();
            },
            334,
            54,
            48,
            126,
            31
          );
          // Dom.setBlinkArrowRed(346,10,180).play()
        }

        function frame3() {
          Util.setCC("Now, click on the PMU to lift it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });

          Scenes.maskClick(
            () => {

              Src.pmu_lifted.set(5, -20, 444)
              Src.fullfinal_drone.hide()
              Src.zoom_pmu_open_tie.fadeHide();
              Src.zoom_pmu_without_ziptie.fadeHide();
              
              frame4();
            },
            347,
            32,
            72,
            107,
            131
          ); 
        }

        function frame4() {
          Util.setCC("Click on the PMU to see the zoom view").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });

          Scenes.maskClick(
            () => {
              frame5();
            },
            241,
            53,
            57,
            45
          );
        }

        function frame5() {
          Src.pmu_zoom_img_pmu.set(155, -18, 185).fadeShow();
          // Src.pmu_img.set(551, 14, 145).fadeShow();
          Util.setCC(
            "Now manually check the PMU for any damage, if there is any damage then replace it."
          );
          setTimeout(() => {
            frame6();
          }, 6000);
        }

        function frame6() {
          // animate pmu_zoom_img_pmu to rotate 90deg and left 655
          anime({
            targets: Src.pmu_zoom_img_pmu.item,
            // in keyframes
            keyframes: [{ left: 655 }],
            easing: "linear",
            duration: 2000,
            complete() {
              frame7();
            },
          });
        }

        function frame7() {
          Scenes.stepModal(
            {
              description:
                "As you can see the PMU is damaged, there is a crack in it.",
            },
            () => {
              Src.pmu_zoom_img_pmu.hide();
              frame8();
            },
            580,
            169,
            324
          );
        }

        function frame8() {
          Util.setCC("Replace this PMU with a new one.").onend(() => {
            Src.pmuwithwire.set(720, -42, 173).fadeShow();
            Scenes.stepModal(
              {
                description:
                  "Replace the working PMU in place of damaged PMU with the help of soldering iron.",
              },
              () => {
                frame9();
              },
              575,
              127,
              370
            );

            videoBox = Scenes.videoBox(
              582,
              228,
              Src.pmu_iron_soldering,
              184,
              "Iron Soldering"
            );
          });
        }

        function frame9() {
          videoBox.hide();
          Util.setCC("Click on the damaged PMU to remove it.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });
          Scenes.maskClick(
            () => {
              frame10();
            },
            241,
            53,
            57,
            45
          );
        }

        function frame10() {
          Src.pmu_lifted.fadeHide();
          Src.pmuwithwire.zIndex(4);
          Src.drone_without_pmu.set(5, -20, 444).zIndex(5);
          let droppable = new Dom("#droppable");
          Util.setCC("Drag the new PMU to the drone.").onend(() => {
            Dom.setBlinkArrowOnElement(Src.pmuwithwire, "right").play();
            droppable
              .set(219, 23, 173, 70)
              .styles({
                border: "dashed 2px black",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                "text-align": "center",
              })
              .fadeShow();
            Src.pmuwithwire.styles({
              cursor: "grab",
            });
          });
          // Make PMU draggable
          $(Src.pmuwithwire.item).draggable({
            start: function () {
              Src.pmuwithwire.styles({
                cursor: "grab",
              });
              Dom.setBlinkArrowRed().reset();
            },
            drag: function (event, ui) {
              Src.pmuwithwire.styles({
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
              Src.pmuwithwire.styles({
                cursor: "default",
              });
              const targetLeft = 219;
              const targetTop = 23;
              const tolerance = 40; // Pixels of tolerance

              if (
                Math.abs(ui.position.left - targetLeft) <= tolerance &&
                Math.abs(ui.position.top - targetTop) <= tolerance
              ) {
                // Snap to final position
                $(this).animate(
                  {
                    left: targetLeft,
                    top: targetTop,
                  },
                  500,
                  function () {
                    frame11();
                  }
                );
                droppable.fadeHide();
              } else {
                // Return to original position
                $(this).animate(
                  {
                    left: 720,
                    top: -42,
                  },
                  500
                );
                // Dom.setBlinkArrowOnElement(Src.mask, "right").play();
              }
            },
          });

          // give me droppable
          $(Src.pmuwithwire.item).droppable({
            drop: function (event, ui) {
              console.log("dropped");
            },
          });
        }

        function frame11() {
          Util.setCC("Attach the PMU on the drone").onend(() => {
            Dom.setBlinkArrowOnElement(Src.mask, "right").play();
          });
          Scenes.maskClick(
            () => {
              Src.pmu_lifted.fadeHide();
              Src.pmuwithwire.fadeHide();
              Src.drone_without_pmu.fadeHide();
              Src.fullfinal_drone.set(5, -20, 444).fadeShow();

              //to go to next step
              Scenes.pmuIssueDone[0] = 1
              Scenes.StepProcess.done()
              Scenes.currentStep = 4
            },
            241,
            53,
            57,
            45
          );
        }

        function requiredImages() {
          // Src.pmuwithwire.set(0,0)
          // Src.pmu_lifted.set(5, -20, 444)
          // Src.pmuwithwire.set(720,-42,173)
          // Src.drone_without_pmu.set(5, -20, 444)
          // Src.pmu_zoom_img_pmu.set(150, -18, 174).fadeShow();
          // Src.pmu_zoom_img_pmu.set(150, -18, 174).rotate(-90).zIndex(2);
          // DeveloperTools.init();
        }
        requiredImages();
        frame1();
      };

      // start anime
      animes();
      return true;
    },

    //! PMU issue 2
    // * Step6
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("PMU issue - Check connections");

      let videoBox = new Dom("");
      let texts = [
        "Now check the connections of the PMU power connections.",

        "Check the PMU's wire that is connected to the center plate of the drone.",

        "We have to remove the upper plate and battery to see the port's connection.",

        "The video explains how to remove battery.",

        "After removing the battery and upper plate.",

        "Check whether the ports are appropriate connected or not.",

        "The video explains how ports should be connected.",
      ];

      const animations = () => {
        function frame1() {
          Src.fullfinal_drone.set(5, -20, 444);
          Util.setCC("Check the PMU power connection.");

          Scenes.stepModal(
            {
              description:
                "Check the PMU's wire that is connected to the center plate of the drone.",
            },
            () => {
              frame2();
            },
            541,
            149,
            378
          );
        }

        function frame2() {
          function frame2_0() {
            Src.fullfinal_drone.set(5, -20, 444);
            Util.setCC(
              "For checking the connection of the PMU, we have to remove the gps, battery and upper plate"
            ).onend(() => {});

            Scenes.stepModal(
              {
                description: `<p>Steps:</p>
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
                    frame2_2();
                  },
                  585,
                  127,
                  340
                );
              }
            );
          }

          function frame2_2() {
            Src.fullfinal_drone.set(5, -20, 444).zIndex(1);
            Util.setCC("Click on the dean plut to unplug it.").onend(() => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            });

            Scenes.maskClick(
              () => {
                Src.problem2_issue2_dean_plug_unpluged
                  .zIndex(2)
                  .set(5, -20, 444)
                  .fadeShow(800, () => {
                    Src.fullfinal_drone.hide();
                    frame2_3();
                  });
              },
              200,
              140,
              26,
              22,
              0
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
                      frame2_8();
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

          function frame2_8() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_1_upper_plate_removed_drone
              .set(129, 55, 260)
              .zIndex(2)
              .hide();
            Util.setCC("Click on the connections to see the zoom view.").onend(
              () => {
                Dom.setBlinkArrowOnElement(Src.mask, "right").play();
              }
            );

            Scenes.maskClick(
              () => {
                Src.problem2_issue2_zoom_1_upper_plate_removed_drone.fadeShow(
                  800,
                  () => {
                    frame2_9();
                  }
                );
              },
              241,
              155,
              34,
              38,
              0
            );
          }

          function frame2_9() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_1_upper_plate_removed_drone
              .set(129, 55, 260)
              .zIndex(1);
            Src.problem2_issue2_zoom_2_zoom_view_loose_wire
              .set(129, 55, 260)
              .zIndex(2)
              .hide();

            Util.setCC(
              "Click on the flight controller to slightly move it."
            ).onend(() => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            });

            Scenes.maskClick(
              () => {
                Src.problem2_issue2_zoom_2_zoom_view_loose_wire.fadeShow(
                  800,
                  () => {
                    Src.problem2_issue2_zoom_1_upper_plate_removed_drone.hide();
                    frame2_10();
                  }
                );
              },
              229,
              175,
              104,
              69,
              0
            );
          }

          function frame2_10() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_2_zoom_view_loose_wire
              .set(129, 55, 260)
              .zIndex(1);
            Src.problem2_issue2_zoom_3_zoom_view_loose_wire_placed
              .set(129, 55, 260)
              .zIndex(2)
              .hide();

            Util.setCC(
              "You can see there is a loose wire between the PMU and center plate of the drone."
            ).onend(() => {
              anime({
                targets: [
                  Src.blank_box.item,
                  Src.problem2_issue2_battery_only.item,
                  Src.problem2_issue2_upper_plate_only.item,
                ],
                left: 1000,
                duration: 500,
                easing: "linear",
                complete() {
                  Src.problem2_issue2_zoom_2_helper_zoom_view_loose_wire
                    .set(661, 61, 111, 155)
                    .fadeShow();
                  Scenes.stepModal(
                    {
                      description:
                        "You can see there is a loose wire between the PMU and center plate of the drone.",
                    },
                    () => {
                      Src.problem2_issue2_zoom_2_helper_zoom_view_loose_wire.fadeHide(
                        200
                      );
                      frame2_11();
                    },
                    606,
                    178,
                    278
                  );
                },
              });
            });
          }

          function frame2_11() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_2_zoom_view_loose_wire
              .set(129, 55, 260)
              .zIndex(2);
            Src.problem2_issue2_zoom_3_zoom_view_loose_wire_placed
              .set(129, 55, 260)
              .zIndex(2)
              .hide();

            Util.setCC(
              "Click on the wire to place it on the connection point."
            ).onend(() => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            });

            Scenes.maskClick(
              () => {
                Src.problem2_issue2_zoom_3_zoom_view_loose_wire_placed.fadeShow(
                  800,
                  () => {
                    Src.problem2_issue2_zoom_2_zoom_view_loose_wire.hide();
                    frame2_12();
                  }
                );
              },
              244,
              90,
              40,
              27,
              0
            );
          }

          function frame2_12() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_3_zoom_view_loose_wire_placed
              .set(129, 55, 260)
              .zIndex(1);
            Src.problem2_issue2_zoom_4_zoom_view_loose_wire_soldered
              .set(129, 55, 260)
              .zIndex(2)
              .hide();

            Src.problem2_issue2_soldrod.set(719, 95, 190).zIndex(1);
            Src.problem2_issue2_handrod_wire.set(719, 95, 190).zIndex(3).hide();
            // Src.problem2_issue2_handrod_wire.set(261,-37,190).zIndex(3)
            Src.problem2_issue2_soldstand.set(714, 190, 120).zIndex(4);
            Src.problem2_issue2_sm1
              .set(232, 6, 150)
              .zIndex(2)
              .styles({
                filter: "drop-shadow(2px 4px 6px black)",
              })
              .hide();
            Src.problem2_issue2_silverhand.set(-139, 305, 111).zIndex(3);

            Util.setCC("Click on the solder iron to solder the wire.").onend(
              () => {
                Dom.setBlinkArrowOnElement(Src.mask, "left").play();
              }
            );

            Scenes.maskClick(
              () => {
                Src.problem2_issue2_soldrod.fadeHide();
                Src.problem2_issue2_handrod_wire.fadeShow();
                Util.setCC("Drag the solder iron to solder the wire.");
              },
              765,
              150,
              65,
              40
            );

            let droppable = new Dom("#droppable");
            droppable
              .set(235, -25, 190, 120)
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
            let draggable_component = Src.problem2_issue2_handrod_wire;
            // * drag complete
            const dragComplete = () => {
              droppable.fadeHide(200);
              anime
                .timeline({
                  duration: 3000,
                })
                .add({
                  targets: Src.problem2_issue2_silverhand.item,
                  left: 38,
                  top: -32,
                  easing: "easeInOutExpo",
                  duration: 2000,
                })
                .add({
                  targets: Src.problem2_issue2_silverhand.item,
                  left: 138,
                  top: 39,
                  easing: "linear",
                  duration: 1000,
                })
                .add({
                  begin() {
                    Src.problem2_issue2_sm1.fadeShow(1000);
                  },
                  endDelay: 3000,
                  complete() {
                    Src.problem2_issue2_sm1.fadeHide(1800);
                  },
                })
                .add({
                  complete() {
                    anime({
                      targets: Src.problem2_issue2_silverhand.item,
                      left: -139,
                      top: 305,
                      easing: "linear",
                      duration: 2000,
                    });
                    anime
                      .timeline()
                      .add({
                        targets: Src.problem2_issue2_silverhand.item,
                        left: 38,
                        top: -32,
                        easing: "linear",
                        duration: 2000,
                      })
                      .add({
                        targets: Src.problem2_issue2_silverhand.item,
                        left: -139,
                        top: 305,
                        easing: "linear",
                        duration: 2000,
                      });
                    anime
                      .timeline()
                      .add({
                        targets: Src.problem2_issue2_handrod_wire.item,
                        left: 775,
                        top: 8,
                        easing: "linear",
                        duration: 2000,
                      })
                      .add({
                        targets: Src.problem2_issue2_handrod_wire.item,
                        left: 719,
                        top: 95,
                        easing: "linear",
                        complete() {
                          Src.problem2_issue2_handrod_wire.fadeHide();
                          Src.problem2_issue2_soldrod.fadeShow();

                          Util.setCC(
                            "As you can see the wire is soldered."
                          ).onend(() => {
                            anime({
                              targets: [
                                Src.problem2_issue2_soldrod.item,
                                Src.problem2_issue2_soldstand.item,
                              ],
                              left: 1000,
                              duration: 1000,
                              easing: "linear",
                              complete() {
                                Src.problem2_issue2_zoom_4_helper_zoom_view_loose_wire_soldered
                                  .set(647, 59, 115)
                                  .fadeShow();
                                Scenes.stepModal(
                                  {
                                    description:
                                      "As you can see the wire is soldered.",
                                  },
                                  () => {
                                    Src.problem2_issue2_zoom_4_helper_zoom_view_loose_wire_soldered.fadeHide(
                                      200
                                    );
                                    frame2_13();
                                  },
                                  606,
                                  178,
                                  286
                                );
                              },
                            });
                          });
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
                const targetLeft = 261;
                const targetTop = -37;
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
                      left: 719,
                      top: 95,
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

          function frame2_13() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_4_zoom_view_loose_wire_soldered
              .set(129, 55, 260)
              .zIndex(2);
            Src.problem2_issue2_zoom_5_zoom_view_soldered_wire_glued
              .set(129, 55, 260)
              .zIndex(2)
              .hide();
            Src.problem2_issue2_gluegun.set(719, 95, 190).zIndex(3);

            Util.setCC(
              "Drag the glue gun to the solder point and apply glue on it."
            ).onend(() => {
              Dom.setBlinkArrowOnElement(Src.mask, "left").play();
            });

            Scenes.maskClick(() => {}, 739, 122, 98, 160, 0);

            let droppable = new Dom("#droppable");
            droppable
              .set(235, 5, 156, 174)
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
            let draggable_component = Src.problem2_issue2_gluegun;
            // * drag complete
            const dragComplete = () => {
              droppable.fadeHide(200);
              Src.problem2_issue2_zoom_5_zoom_view_soldered_wire_glued.fadeShow(
                2000
              );

              anime({
                delay: 3000,
                targets: Src.problem2_issue2_gluegun.item,
                left: 1000,
                duration: 3000,
                easing: "easeInOutExpo",
                complete() {
                  frame2_14();
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
                const targetLeft = 259;
                const targetTop = 24;
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
                      left: 719,
                      top: 95,
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

          function frame2_14() {
            Src.problem2_issue2_upper_plate_removed_drone
              .set(5, -20, 444)
              .zIndex(1);
            Src.problem2_issue2_zoom_5_zoom_view_soldered_wire_glued
              .set(129, 55, 260)
              .zIndex(1);
            Src.problem2_issue2_zoom_1_upper_plate_removed_drone
              .set(129, 55, 260)
              .zIndex(3)
              .hide();
            Src.problem2_issue2_zoom_4_zoom_view_loose_wire_soldered.hide();

            Util.setCC(
              "Place back the flight controller to its position."
            ).onend(() => {
              Dom.setBlinkArrowOnElement(Src.mask, "right").play();
            });

            Scenes.maskClick(
              () => {
                Src.problem2_issue2_zoom_1_upper_plate_removed_drone.fadeShow(
                  1000,
                  () => {
                    Src.problem2_issue2_zoom_5_zoom_view_soldered_wire_glued.hide();
                    Src.problem2_issue2_zoom_4_zoom_view_loose_wire_soldered.hide();
                    Util.setCC(
                      "Now set all the components back to its position."
                    );
                    Scenes.stepModal(
                      {
                        description:
                          "Now set all the components Upper plate, Battery and GPS back to the drone and test it.",
                      },
                      () => {
                        frame2_15();
                      },
                      606,
                      178,
                      278
                    );
                  }
                );
              },
              209,
              190,
              108,
              72,
              0
            );
          }

          function frame2_15() {
            Src.fullfinal_drone.set(5, -20, 444);
            Src.problem2_issue2_zoom_1_upper_plate_removed_drone.hide();
            Src.problem2_issue2_upper_plate_removed_drone.hide();
            Src.problem2_issue2_zoom_3_zoom_view_loose_wire_placed.hide()

            //to go to next step

            Scenes.pmuIssueDone[1] = 1
            // Scenes.tabsDone[1] = 1
            Scenes.StepProcess.done();
            Scenes.currentStep = 4

          }

          //todo frame 2_0
          frame2_0();
        }

        const requiredImagesVideos = () => {
          // Src.problem2_issue2_dean_plug_unpluged.set(5, -20, 444)
          // Src.fullfinal_drone.set(5, -20, 444);
        };
        requiredImagesVideos();
        // todo frame 1 
        frame1();
        // DeveloperTools.init();
      };

      animations();
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
