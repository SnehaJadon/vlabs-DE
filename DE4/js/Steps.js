import { Scenes, Src, Util, Dom, DragAndDrop, Elements } from "./Libs.js";

const Steps = {
  
  // phone zoom in anime
  phoneZoomInAnime() {
    Src.base_setup_phone_dummy_transformed.set(760, 352, 23, 30);
    anime({
      targets: Src.base_setup_phone_dummy_transformed.item,
      duration: 1000,
      delay: 1000,
      left: 709,
      top: 114,
      height: 223,
      width: 130,
      rotate: -16,
      easing: "easeOutQuad",
      update: function (anim) {
        if (anim.progress > 10) {
          Src.phone_dummy
            .set(731, 113, 201, 82)
            .rotate(20)
            .zIndex(15)
            .fadeShow();
          anime({
            targets: Src.phone_dummy.item,
            easing: "easeInOutQuad",
            duration: 1000,
            left: 676,
            top: -22,
            height: 457,
            width: 236,
            rotate: 0,
          });
        }
      },
    });
  },

  // phone zoom out anime
  phoneZoomOutAnime() {
    Src.phone_dummy.set(676, -22, 457, 236).zIndex(15);
    anime({
      easing: "easeOutQuad",
      targets: Src.phone_dummy.item,
      duration: 1000,
      delay: 1000,
      left: 731,
      top: 113,
      height: 201,
      width: 82,
      rotate: 0,
      update: function (anim) {
        if (anim.progress > 10) {
          Src.base_setup_phone_dummy_transformed
            .set(709, 114, 223, 130)
            .rotate(-16);
          anime({
            easing: "easeInOutQuad",
            targets: Src.base_setup_phone_dummy_transformed.item,
            duration: 1000,
            left: 760,
            top: 352,
            height: 23,
            width: 30,
            rotate: 0,
          });
        }
      },
      complete() {
        Src.phone_dummy.fadeHide(100);
      },
    });
  },

  steps: [

    //! Explaination intro
    ()=>{
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Land Survey using Drone");
      Util.setCC("...");
      Src.intro_bcg.set(0, -48, 500, 950)

      //! starting positions
      let boxes = [
        Src.box_1.set(-600, -53, 146).zIndex(2),
        Src.box_2.set(-600, 101, 120).zIndex(2),
        Src.box_3.set(-600, 229, 212).zIndex(2),
        Src.box_4.set(437+ 700, -21, 102).zIndex(2),
        Src.box_5.set(636 + 700, 318, 122).zIndex(2)
      ]

      // Src.box_6.set(0, -35, 206).zIndex(1)
      // Src.box_7.set(488, 112, 132).zIndex(1)
      // Src.box_8.set(0, 185, 260).zIndex(1)
  
      //! Animations
      anime({
        targets: boxes[0].item,
        left: 0,
        easing: "linear",
        duration: 4000,
        complete(){
          anime({
            targets: boxes[1].item,
            left: 0,
            easing: "linear",
            duration: 4000,
            complete(){
              anime({
                targets: boxes[2].item,
                left: 0,
                easing: "linear",
                duration: 4000,
                complete(){
                  anime({
                    targets: boxes[3].item,
                    left: 437,
                    easing: "linear",
                    duration: 4000,
                    complete(){
                      anime({
                        targets: boxes[4].item,
                        left: 636,
                        easing: "linear",
                        duration: 4000,
                        complete(){
                          Scenes.StepProcess.done()
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
      return true;
    },

    //! Explaination intro
    ()=>{
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Land Survey using Drone");
      Util.setCC("...");
      Src.intro_bcg.set(0, -48, 500, 950)

      //! starting positions
      let boxes = [
        Src.box_6.set(-600, -35, 206).zIndex(1),
        Src.box_7.set(488 + 700, 210, 132).zIndex(1),
        Src.box_8.set(-600, 185, 260).zIndex(1),
      ]

  
      //! Animations
      anime({
        targets: boxes[0].item,
        left: 0,
        easing: "linear",
        duration: 4000,
        complete(){
          anime({
            targets: boxes[1].item,
            left: 488,
            easing: "linear",
            duration: 4000,
            complete(){
              anime({
                targets: boxes[2].item,
                left: 0,
                easing: "linear",
                duration: 4000,
                complete(){
                  Scenes.StepProcess.done()
                }
              })
            }
          })
        }
      })
      return true;
    },

    //! Required Equipments
    ()=>{
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Equipment Required");
      Util.setCC("...");

      Src.required_page.set(8, -12, 430)
      Util.setCC("These are all the equipments that are required in the experiment.").onend(()=>{
        Util.setCC("Keep all this equipments in the car's trunk and we will move towards our location where we have to survey.").onend(()=>{
          Scenes.StepProcess.done()
        })
      })
      return true

    },

    //! Background 1 Scene
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading(
        "Mark Ground Control Points and record it's coordinates "
      );
      Util.setCC("...");

      let mapStyle = {
        borderRadius: "15px",
        border: "3px solid black",
      };
      // map settings
      Src.background_gcp_1.set(-485, -257, 711, 1440);
      Src.small_map_location_1.set(8, -38, 200).zIndex(1).styles(mapStyle);
      // car setting and components
      Src.car_trunk_open.set(476, 134, 320).zIndex(1);
      Src.base_tripod_closed.set(670, 302, 108).zIndex(11).rotate(106);
      Src.rover_tripod_closed.set(721, 232, 174).zIndex(3).rotate(-76);
      Src.tribrach_with_extension_for_base.set(753, 313, 39).zIndex(5);
      Src.gcp_1.set(676, 310 + 4 * 1, 26, 54).zIndex(7);
      Src.gcp_2.set(676, 310 + 4 * 2, 26, 54).zIndex(6);
      Src.gcp_3.set(676, 310 + 4 * 3, 26, 54).zIndex(5);
      Src.gcp_4.set(676, 310 + 4 * 4, 26, 54).zIndex(4);
      Src.base_setup_stake_transformed.set(739, 363, 14, 18).zIndex(5);
      Src.base_setup_phone_dummy_transformed.set(760, 352, 23, 30).zIndex(5);
      Src.base_setup_spray_paint.set(746, 328, 41, 17).zIndex(11);
      Src.cone_1.set(641, 260 + 4 * 1, 58, 34).zIndex(7);
      Src.cone_2.set(641, 260 + 4 * 2, 58, 34).zIndex(6);
      Src.cone_3.set(641, 260 + 4 * 3, 58, 34).zIndex(5);
      Src.cone_4.set(641, 260 + 4 * 4, 58, 34).zIndex(4);
      Src.gnss_base.set(722, 335, 30).zIndex(10);
      Src.gnss_rover.set(726, 324, 30).zIndex(9);

      // base setup final
      // Src.base_setup_stake_transformed.set(357, 416, 14, 18);
      // Src.base_setup_spray_mark.set(331, 409, 29, 70)
      // Src.base_setup_spray_mark.set(331, 409, 29, 70);
      // Src.base_tripod.set(305, 264, 175, 123);
      // Src.tribrach_with_extension_for_base.set(353, 230, 39, 22);
      // Src.gnss_base.set(351, 205, 30, 26);

      // rover setup final
      // Src.gcp_1.set(462, 296, 26, 54).zIndex(1);
      // Src.rover_tripod.set(459, 172, 175, 85).zIndex(2);
      // Src.gnss_rover.set(480, 146, 30, 26).zIndex(3);
      // Src.rover_tripod_closed_with_gnss.set(706, 231, 174).zIndex(3).rotate(106);

      let st = { "border-radius": "30px" };
      let display_pos = [685, -16, 450, 219];
      // Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(16)
      // Src.phone_dummy_anime_helper.set(676, -22, 457, 236).zIndex(15)
      // Src.base_setup_phone_display_4.set(...display_pos).styles(st).zIndex(15)

      // new DragAndDrop()
      //   .setDraggable(Src.base_tripod_closed, 200, 200)
      //   .setDroppable(200,200)
      //   .active(()=>{
      //     console.log("Done")
      //   })
      let blinkLoopAnime = null;
      let zoomImgs = [];

      let frameIdx = 0;
      const frames = [
        // Explaination
        ()=>{
          Src.small_map_location_1.set(85, 15, 390).zIndex(20).hide()
          //85, 15, 390
          Util.setCC("This is the location where we will conduct the survey.").onend(()=>{
            Src.small_map_location_1.fadeShow(800)
            Util.setCC("It's your location in the map.")
            setTimeout(()=>{
              Scenes.stepModal({
                title: "",
                description: "It's your location in the map."
              }, ()=>{
                anime(({
                  targets: Src.small_map_location_1.item,
                  left: 8, 
                  top: -38,
                  height: 200,
                  easing: "linear",
                  duration: 1000,
                  complete(){
                    Src.small_map_location_1.zIndex(1)
                    frames[++frameIdx]()
                  }
                }))
                // frames[++frameIdx]()
              }, 220, 270, 275).fadeShow(900)
            }, 2000)


          })

        },
        () => {
            Util.setCC("To mark the GCP's, we need to perform the following steps.").onend(()=>{
              Scenes.stepModal(
                {
                  title:
                    "To mark the GCP's, we need to perform the following steps:",
                  description:
                    "1. Setting Base station. <br> 2. Placing the rover setup.",
                },
                () => {
                  frames[++frameIdx]();
                },
                90,
                230,
                441
              );
            })
        },
        () => {
          Util.setCC("Step 1 is Setting the Base Station.")
          Scenes.stepModal(
            {
              title: "Step 1 - Setting Base Station",
              description:
                "The Base Station acts as a fixed reference point and stays in one spot, that helps correct the GNSS data collected by the Rover, ensuring highly accurate and consistent measurements during land surveys.",
            },
            () => {
              frames[++frameIdx]();
            },
            64,
            225,
            478
          );
        },
        // Stake
        () => {
          Util.setCC("Drag the Stake and place it in the ground.");
          let draggableComponent = Src.base_setup_stake_transformed;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(315, 396, 52, 96)
            .setDraggable(draggableComponent, 357, 416)
            .active(() => {
              Scenes.stepModal(
                {
                  title: "Stake: ",
                  description:
                    "It marks the precise spot for the GNSS receiver to measure coordinates accurately.",
                },
                () => {
                  frames[++frameIdx]();
                },
                16,
                262,
                381
              );
              // frames[++frameIdx]();
            });
        },

        // Spray
        () => {
          Util.setCC("Drag the Spray bottle and spray the stake surroundings.");
          Src.base_setup_spray_mark.set(331, 409, 29, 70).hide();
          let draggableComponent = Src.base_setup_spray_paint;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(315, 396, 52, 96)
            .setDraggable(draggableComponent, 357, 416)
            .active(() => {
              // spray paint animation
              draggableComponent.set(342, 415, 41, 17);
              anime({
                targets: draggableComponent.item,
                begin() {
                  Src.base_setup_spray_mark.set(331, 409, 29, 70).hide();
                  Src.base_setup_spray_mark.fadeShow(4000);
                },
                duration: 5000,
                easing: "linear",
                keyframes: [
                  { rotate: -68 },
                  { left: 339, top: 417 },
                  { left: 386, top: 418 },
                  { left: 399, top: 411 },
                  { left: 395, top: 396 },
                  { left: 367, top: 391 },
                  { left: 344, top: 395 },
                  { left: 337, top: 399 },
                  { left: 339, top: 417 },
                  { left: 386, top: 418 },
                  { left: 399, top: 411 },
                  { left: 395, top: 396 },
                  { left: 367, top: 391 },
                  { left: 344, top: 395 },
                  { left: 337, top: 399 },
                  { left: 339, top: 417 },
                ],

                complete() {
                  anime({
                    targets: draggableComponent.item,
                    easing: "linear",
                    duration: 2000,
                    keyframes: [
                      // back to car
                      // {left: 746, top: 300, rotate: 0},
                      // {top: 328, height: 41, width: 17},

                      // on surface
                      { left: 575, top: 390, rotate: 0 },
                      { top: 409 },
                    ],
                    complete() {
                      Scenes.stepModal(
                        {
                          title: "Spray paint:",
                          description:
                            "Spray paint makes survey points easy to spot, accurately marked, and durable for the drone to capture precise data.",
                        },
                        () => {
                          frames[++frameIdx]();
                        },
                        11,
                        240,
                        342
                      );
                      // frames[++frameIdx]();
                    },
                  });
                },
              });
            });
        },

        // Base Tripod
        () => {
          Util.setCC("Drag the Base tripod and place it above the stake.");
          Src.base_tripod.set(305, 244, 175, 123).hide();
          let draggableComponent = Src.base_tripod_closed;
          // Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play()
          Dom.setBlinkArrowRed(665, 366).play();
          new DragAndDrop()
            .setDroppable(266, 219, 52, 191)
            .setDraggable(draggableComponent, 356, 204)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 3000,
                easing: "linear",
                keyframes: [
                  { left: 356, top: 204, rotate: 0 },
                  { top: 249, height: 125 },
                ],
                complete() {
                  draggableComponent.fadeHide(400);
                  anime({
                    begin() {
                      Src.base_tripod.fadeShow(200);
                    },
                    targets: Src.base_tripod.item,
                    duration: 1000,
                    easing: "linear",
                    top: 264,
                    complete() {
                      Scenes.stepModal(
                        {
                          title: "Base Tripod: ",
                          description:
                            "A base tripod is a three-legged adjustable stand used to holds the base station receiver steady in one fixed position throughout the survey.",
                        },
                        () => {
                          frames[++frameIdx]();
                        },
                        15,
                        230,
                        266
                      );
                    },
                  });
                },
              });
            });
        },

        // Tribrech
        () => {
          Util.setCC("Drag the Tribrach and place it above the Base tripod.");
          let draggableComponent = Src.tribrach_with_extension_for_base;
          // Src.base_tripod.set(305, 264, 175, 123);
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();

          new DragAndDrop()
            .setDroppable(335, 220, 67, 58)
            .setDraggable(draggableComponent, 353, 210)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 230,
                complete() {
                  Scenes.stepModal(
                    {
                      title: "Tribrach: ",
                      description:
                        "Tribrach is used to mount the GNSS Receiver above it and equipped with a viewfinder (optical plummet), helping the surveyor align the instrument directly above the Ground Control Point (GCP).",
                    },
                    () => {
                      frames[++frameIdx]();
                    },
                    20,
                    177,
                    320
                  );
                  // frames[++frameIdx]();
                },
              });
            });
        },

        // Tribrech view finder zoom
        () => {
          // Src.tribrach_with_extension_for_base.set(353, 230, 39, 22);
          let zoomPos = [265, 170, 186];
          let zoomImgs = [
            Src.tribrach_zoom_1
              .set(...zoomPos)
              .hide()
              .zIndex(7),
            Src.tribrach_zoom_2
              .set(...zoomPos)
              .hide()
              .zIndex(7),
          ];

          Util.setCC("Click on the Tribrach to see the zoom view.");
          Scenes.maskClick(
            () => {
              zoomImgs[0].fadeShow(1000, () => {
                setTimeout(() => {
                  zoomImgs[1].fadeShow(1000, () => {
                    zoomImgs[0].hide();
                    // see in view finder that stake is there
                    setTimeout(() => {
                      Scenes.stepModal(
                        {
                          title: "Optical plummet:",
                          description:
                            "The hole embedded in a tribrach is called the optical plummet or sight hole, helps the surveyor accurately position the instrument directly above a marked ground point, ensuring precise measurements in land surveying.",
                        },
                        () => {
                          frames[++frameIdx]();
                          zoomImgs[1].fadeHide(100);
                        },
                        20,
                        177,
                        256
                      );

                      // zoomImgs[1].fadeHide(100);
                      // frames[++frameIdx]();
                    }, 2000);
                  });
                }, 2000);
              });
            },
            351,
            254,
            15,
            25,
            0
          );
          Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
        },

        // GNSS base
        () => {
          Util.setCC("Drag the GNSS Receiver and place it above the tribrach.");
          let draggableComponent = Src.gnss_base;
          // Src.base_tripod.set(305, 264, 175, 123);
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();

          new DragAndDrop()
            .setDroppable(335, 165, 67, 58)
            .setDraggable(draggableComponent, 351, 185)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 205,
                complete() {
                  Scenes.stepModal(
                    {
                      title: "GNSS Receiver: ",
                      description:
                        "A GNSS (Global Navigation Satellite System) receiver is used in land surveying to accurately determine the geographic coordinates (latitude, longitude, and elevation) of specific points on the Earth's surface.",
                    },
                    () => {
                      frames[++frameIdx]();
                    },
                    14,
                    189,
                    293
                  );
                  // frames[++frameIdx]();
                },
              });
            });
        },

        // GNSS base zoom
        () => {
          Util.setCC("Click on the GNSS Receiver to see the zoom view.");

          Src.gnss_base.set(351, 205, 30, 26);

          let zoomPos = [270, 80, 186];
          zoomImgs = [
            Src.gnss_base_zoom_1,
            Src.gnss_base_zoom_2_on,
            Src.gnss_base_zoom_3_all_lights,
            Src.gnss_base_zoom_4_on,
            Src.gnss_base_zoom_5_wifi_on,
          ];

          zoomImgs.forEach((img, idx) => {
            img
              .set(...zoomPos)
              .zIndex(20 + idx)
              .hide();
          });

          Scenes.maskClick(
            () => {
              anime
                .timeline({
                  easing: "linear",
                  duration: 2000,
                })
                .add({
                  begin() {
                    zoomImgs[0].fadeShow(1000);
                  },
                })
                .add({
                  begin() {
                    Util.setCC("Power On the GNSS Receiver.");

                    Scenes.maskClick(
                      () => {
                        zoomImgs[1].fadeShow(0, () => {
                          anime({
                            begin() {
                              zoomImgs[2].show();
                            },
                            targets: zoomImgs[2].item,
                            easing: "easeInOutQuad",
                            duration: 6000,
                            opacity: [0, 1, 0, 1, 0, 1],
                            complete() {
                              zoomImgs[2].hide();
                              zoomImgs[3].show();
                              blinkLoopAnime = anime({
                                begin() {
                                  zoomImgs[4].show();
                                },
                                duration: 1000,
                                targets: zoomImgs[4].item,
                                opacity: [1, 0, 1],
                                loop: true,
                              });

                              frames[++frameIdx]();
                            },
                          });
                        });
                      },
                      353,
                      214,
                      16,
                      19,
                      0
                    );
                    Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
                  },
                });
            },
            346,
            201,
            40,
            35,
            0
          );
          Dom.setBlinkArrowOnElement(Src.mask, "left").play();
        },

        // Reach view base setup
        () => {
          Util.setCC(
            "Click on the mobile and connect Mobile to GNSS Receiver WiFi."
          );
          Src.base_setup_phone_dummy_transformed.zIndex(14);
          Scenes.maskClick(
            () => {
              Steps.phoneZoomInAnime();
              setTimeout(() => {
                frames[++frameIdx]();
              }, 4000);
            },
            762,
            349,
            33,
            25,
            30
          );

          Dom.setBlinkArrowOnElement(
            Src.base_setup_phone_dummy_transformed,
            "top"
          ).play();
        },

        // GNSS Base Screen setup
        () => {
          Src.phone_dummy.hide();
          Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(17);

          let imgs = [
            // img_1
            Src.base_setup_phone_display_1,
            // img_2
            Src.base_setup_phone_display_2,
            // img_3
            Src.base_setup_phone_display_3,
            // img_4
            Src.base_setup_phone_display_4,
            // img_5
            Src.base_setup_phone_display_5,
            // img_6
            Src.base_setup_phone_display_6,
            // img_7
            Src.base_setup_phone_display_7,
            // img_8
            Src.base_setup_phone_display_7_1,
            // img_9
            Src.base_setup_phone_display_7_2,
            // img_10
            Src.base_setup_phone_display_7_3,
            // img_11
            Src.base_setup_phone_display_8,
            // img_12
            Src.base_setup_phone_display_9,
            // img_13
            Src.base_setup_phone_display_9_1,
            // img_14
            Src.base_setup_phone_display_9_2,
            // img_15
            Src.base_setup_phone_display_9_3,
            // img_16
            Src.base_setup_phone_display_10,
            // img_17
            Src.base_setup_phone_display_11,
            // img_18
            Src.base_setup_phone_display_11_1,
            // img_19
            Src.base_setup_phone_display_11_2,
            // img_20
            Src.base_setup_phone_display_12,
            // img_21
            Src.base_setup_phone_display_13,
            // img_22
            Src.base_setup_phone_display_13_1,
            // img_23
            Src.base_setup_phone_display_13_2,
            // img_24
            Src.base_setup_phone_display_13_3,
            // img_25
            Src.base_setup_phone_display_14,
            // img_26
            Src.base_setup_phone_display_14_1,
            // img_27
            Src.base_setup_phone_display_14_2,
            // img_28
            Src.base_setup_phone_display_15,
            // img_29
            Src.base_setup_phone_display_16,
            // img_30
            Src.base_setup_phone_display_16_1,
            // img_31
            Src.base_setup_phone_display_16_2,
            // img_32
            Src.base_setup_phone_display_17,
            // img_33
            Src.base_setup_phone_display_17_1,
            // img_34
            Src.base_setup_phone_display_18,
            // img_35
            Src.base_setup_phone_display_18_1,
            // img_36
            Src.base_setup_phone_display_18_2,
            // img_37
            Src.base_setup_phone_display_18_3,
            // img_38
            Src.base_setup_phone_display_18_4,
            // img_39
            Src.base_setup_phone_display_18_5,
            // img_40
            Src.base_setup_phone_display_18_6,
            // img_41
            Src.base_setup_phone_display_18_7,
            // img_42
            Src.base_setup_phone_display_18_8,
            // img_43
            Src.base_setup_phone_display_18_9,
            // img_44
            Src.base_setup_phone_display_18_10,
            // img_45
            Src.base_setup_phone_display_19,
            // img_46
            Src.base_setup_phone_display_20,
            // img_47
            Src.base_setup_phone_display_21,
            // img_48
            Src.base_setup_phone_display_22,
          ];

          imgs.forEach((img, idx) => {
            let display_pos = [685, -16, 450, 219];
            if (idx == 0 || idx == 6) display_pos = [676, -22, 457, 236];

            let st = {
              "border-radius": "30px",
            };
            img
              .set(...display_pos)
              .styles(st)
              .hide()
              .zIndex(16);
          });

          //idx for mask Clicks
          let maskClickIdx = 0;

          let maskClicksPos = [
            [749, 22, 57, 47, 0], // click setting
            [696, 163, 42, 196, 0],
            [856, 45, 24, 35, 0],
            [696, 37, 40, 197, 0],
            [703, 98, 33, 188, 0],
            [699, 8, 26, 20, 0],
            [701, 22, 57, 52, 0], // click emlid
            [697, 125, 35, 197, 0],
            [697, 82, 35, 197, 0],
            [697, 67, 35, 197, 0],
            [704, 162, 24, 33, 0], //for edit
            [848, 262, 30, 37, 0], //for save
            [697, 22, 20, 21], //cross button
            [697, 125, 35, 197, 0], //setting
            [697, 294, 27, 197, 0], //gnss setting
            [710, 357, 30, 172], //update value
            [706, 319, 22, 180], //select 5 val
            [835, 331, 31, 44], //apply
            [697, 22, 20, 21], //cross button
            [697, 340, 30, 197, 0], //base mode
            [697, 273, 30, 197, 0], //rtcm3 messages
            [697, 22, 20, 21], //cross button
            [697, 233, 30, 197, 0], //correction output
            [697, 82, 20, 21], //checkbox lora
            [697, 22, 20, 21], //back

            //for no error
            [697, 94, 27, 197, 0], //gnss setting
          ];

          /**
           * @param {Dom} toShow
           */
          const screenAnimation = (
            toShow,
            nextImgs = [],
            onComplete = () => {}
          ) => {
            // for parameters
            let maskClickDelay = 400;
            let slideShowDelay = 500;

            // slideshow function
            function imgsSlideShow(nextImgs = [], imgIdx = 0) {
              if (imgIdx == nextImgs.length) {
                [toShow, ...nextImgs].forEach((img) => img.hide());
                onComplete();
                return;
              }

              console.log(imgIdx, nextImgs[imgIdx].item);
              nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
                imgsSlideShow(nextImgs, imgIdx + 1);
              });
            }

            toShow.show();
            setTimeout(() => {
              Scenes.maskClick(() => {
                console.log("Current:", maskClickIdx);

                imgsSlideShow(nextImgs);
              }, ...maskClicksPos[maskClickIdx++]);
            }, maskClickDelay);
          };

          const displayFrames = () => {
            function frame1() {
              Util.setCC("Click on 'Settings'.");
              let toShow = Src.base_setup_phone_display_1;
              let nextImgs = [Src.base_setup_phone_display_2];
              let nextFrame = frame2;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame2() {
              Util.setCC("Click on 'Connections'.");
              let toShow = Src.base_setup_phone_display_2;
              let nextImgs = [Src.base_setup_phone_display_3];
              let nextFrame = frame3;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame3() {
              Util.setCC("Turn on 'Wi-Fi'.");
              let toShow = Src.base_setup_phone_display_3;
              let nextImgs = [Src.base_setup_phone_display_4];
              let nextFrame = frame4;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame4() {
              Util.setCC("Click on 'Wi-Fi'.");
              let toShow = Src.base_setup_phone_display_4;
              let nextImgs = [Src.base_setup_phone_display_5];
              let nextFrame = frame5;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame5() {
              Util.setCC("Click on Network named 'reach:37:2F'.");
              let toShow = Src.base_setup_phone_display_5;
              let nextImgs = [Src.base_setup_phone_display_6];
              let nextFrame = frame6;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame6() {
              // stop wifi blink anime
              // Util.setCC("As you see the WiFi is connected.").onend(()=>{
              blinkLoopAnime.reset();
              // });

              Util.setCC("Click on back button.");
              let toShow = Src.base_setup_phone_display_6;
              let nextImgs = [Src.base_setup_phone_display_7];
              let nextFrame = frame7;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame7() {
              // hide zoom view of gnss base
              zoomImgs.forEach((img) => img.fadeHide());

              Util.setCC("Click on 'Emlid Flow'.");
              let toShow = Src.base_setup_phone_display_7;
              let nextImgs = [
                Src.base_setup_phone_display_7_1,
                Src.base_setup_phone_display_7_2,
              ];
              let nextFrame = frame8;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame8() {
              Util.setCC("Click on 'Settings'.");
              let toShow = Src.base_setup_phone_display_7_3;
              let nextImgs = [Src.base_setup_phone_display_8];
              let nextFrame = frame9;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame9() {
              Util.setCC("Click on 'General'.");
              let toShow = Src.base_setup_phone_display_8;
              let nextImgs = [Src.base_setup_phone_display_9];
              let nextFrame = frame10;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame10() {
              Util.setCC("Click on 'Device and hotspot name'.");
              let toShow = Src.base_setup_phone_display_9;
              let nextImgs = [
                Src.base_setup_phone_display_9_1,
                Src.base_setup_phone_display_9_2,
              ];
              let nextFrame = frame11;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame11() {
              Util.setCC("Click on 'Edit'.");
              let toShow = Src.base_setup_phone_display_9_3;
              let nextImgs = [Src.base_setup_phone_display_10];
              let nextFrame = frame12;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            //! taking input
            function frame12() {
              Src.base_setup_phone_display_10.show();
              let toShow = Src.base_setup_phone_display_11;
              let nextImgs = [
                Src.base_setup_phone_display_11_1,
                Src.base_setup_phone_display_11_2,
              ];
              let nextFrame = frame13;

              //taking input
              let st = {
                border: "2px solid #ccc",
                "border-radius": "5px",
                outline: "none",
                "font-size": "8px",
                padding: "4px",
                color: "gray",
                width: "180px",
                "font-family": "Arial, Helvetica, sans-serif",
              };
              Scenes.inputBox(
                () => {
                  Scenes.maskClick(
                    () => {
                      Scenes.ipBox.hide();
                      screenAnimation(toShow, nextImgs, nextFrame);
                      Src.base_setup_phone_display_10.hide();
                      Util.setCC("Click on 'Save'.");
                    },
                    848,
                    262,
                    30,
                    37,
                    0
                  );
                },
                "reach-base",
                st,
                706,
                182
              );
              Util.setCC('Please give name "reach-base"!!');
            }

            function frame13() {
              Util.setCC("Click on cross button.");
              let toShow = Src.base_setup_phone_display_11_2;
              let nextImgs = [Src.base_setup_phone_display_12];
              let nextFrame = frame14;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame14() {
              Util.setCC("Click on 'Settings'.");
              let toShow = Src.base_setup_phone_display_12;
              let nextImgs = [Src.base_setup_phone_display_13];
              let nextFrame = frame15;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame15() {
              Util.setCC("Click on 'GNSS settings'.");
              let toShow = Src.base_setup_phone_display_13;
              let nextImgs = [
                Src.base_setup_phone_display_13_1,
                Src.base_setup_phone_display_13_2,
                Src.base_setup_phone_display_13_3,
                Src.base_setup_phone_display_14,
                Src.base_setup_phone_display_14_1,
                Src.base_setup_phone_display_14_2,
              ];
              let nextFrame = frame16;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame16() {
              Util.setCC("Click on Update rate '1Hz'.");
              let toShow = Src.base_setup_phone_display_14_2;
              let nextImgs = [Src.base_setup_phone_display_15];
              let nextFrame = frame17;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame17() {
              Util.setCC("Click on Update rate '5Hz'.");
              let toShow = Src.base_setup_phone_display_15;
              let nextImgs = [Src.base_setup_phone_display_16];
              let nextFrame = frame18;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame18() {
              Util.setCC("Click on 'Apply'.");
              let toShow = Src.base_setup_phone_display_16;
              let nextImgs = [
                Src.base_setup_phone_display_16_1,
                Src.base_setup_phone_display_16_2,
              ];
              let nextFrame = frame19;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame19() {
              Util.setCC("Click on 'Cross button'.");
              let toShow = Src.base_setup_phone_display_16_2;
              let nextImgs = [Src.base_setup_phone_display_17];
              let nextFrame = frame20;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame20() {
              Util.setCC("Click on 'Base mode'.");
              let toShow = Src.base_setup_phone_display_17;
              let nextImgs = [
                Src.base_setup_phone_display_17_1,
                Src.base_setup_phone_display_18,
              ];
              let nextFrame = frame21;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame21() {
              Util.setCC("Click on 'RTCM3 messages'.");
              Util.setCC("Match the frequencies.");
              let toShow = Src.base_setup_phone_display_18;
              let nextImgs = [
                Src.base_setup_phone_display_18_1,
                Src.base_setup_phone_display_18_2,
                Src.base_setup_phone_display_18_3,
                Src.base_setup_phone_display_18_4,
                Src.base_setup_phone_display_18_5,
                Src.base_setup_phone_display_18_6,
                Src.base_setup_phone_display_18_7,
                Src.base_setup_phone_display_18_8,
                Src.base_setup_phone_display_18_9,
                Src.base_setup_phone_display_18_10,
              ];
              let nextFrame = frame22;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame22() {
              Util.setCC("Click on 'Cross button'.");
              let toShow = Src.base_setup_phone_display_18_10;
              let nextImgs = [Src.base_setup_phone_display_19];
              let nextFrame = frame23;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame23() {
              Util.setCC("Click on 'Correction  Input'.");
              let toShow = Src.base_setup_phone_display_19;
              let nextImgs = [Src.base_setup_phone_display_20];
              let nextFrame = frame24;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame24() {
              Util.setCC("Click on 'LoRa'.");
              let toShow = Src.base_setup_phone_display_20;
              let nextImgs = [Src.base_setup_phone_display_21];
              let nextFrame = frame25;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame25() {
              Util.setCC("Click on 'Back button'.");
              let toShow = Src.base_setup_phone_display_21;
              let nextImgs = [Src.base_setup_phone_display_22];
              let nextFrame = frame26;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame26() {
              Src.base_setup_phone_display_22.show();
              Util.setCC("Click on 'Phone' to close the phone.");
              Scenes.maskClick(
                () => {
                  Src.base_setup_phone_display_22.hide();
                  Src.phone_empty_screen.hide();
                  Steps.phoneZoomOutAnime();
                  setTimeout(() => {
                    frames[++frameIdx]();
                  }, 4000);
                },
                676,
                -22,
                457,
                236,
                0
              );
              Dom.setBlinkArrowOnElement(Src.phone_empty_screen, "left").play();
            }

            frame1();
            // maskClickIdx = 23
            // frame24()
            // frame7()
            // DeveloperTools.init()
          };

          displayFrames();
        },

        //! GNSS rover setup

        //Explaination
        () => {
          Util.setCC("Step 2 is Placing Rover Setup.")
          Scenes.stepModal(
            {
              title: "Step 2 - Placing Rover Setup",
              description:
                "The Rover setup helps surveyors move around and collect highly accurate location data while working with a stationary Base Station, ensuring precise measurements for mapping and construction projects.",
            },
            () => {
              frames[++frameIdx]();
            },
            110,
            225,
            436
          ).zIndex(10);
        },

        // placing GCP
        () => {
          Util.setCC("Drag the GCP and place it in the ground.");

          let draggableComponent = Src.gcp_1;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(462, 280, 65, 65)
            .setDraggable(draggableComponent, 462, 285)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 296,
                complete() {
                  Scenes.stepModal(
                    {
                      title: "GCP (Ground Control Point): ",
                      description:
                        "GCPs are the marked ground points with known coordinates that help make drone surveys more accurate by correcting positional errors and aligning aerial data with real-world maps.",
                    },
                    () => {
                      frames[++frameIdx]();
                    },
                    20,
                    225,
                    436
                  );
                  // frames[++frameIdx]();
                },
              });
            });
        },

        // Rover Tripod
        () => {
          Util.setCC("Drag the Rover tripod and place it above the GCP.");
          // Src.rover_tripod_closed.show();
          Src.rover_tripod.set(459, 143, 175, 85).hide().zIndex(8);
          let draggableComponent = Src.rover_tripod_closed;
          // Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play()
          Dom.setBlinkArrowRed(724, 274, 180).play();
          new DragAndDrop()
            .setDroppable(444, 147, 49, 97)
            .setDraggable(draggableComponent, 479, 115)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                keyframes: [
                  { left: 479, top: 136, rotate: 0 },
                  { top: 143, height: 194 },
                ],
                complete() {
                  draggableComponent.fadeHide(400);
                  anime({
                    begin() {
                      Src.rover_tripod.fadeShow(200);
                    },
                    targets: Src.rover_tripod.item,
                    duration: 1000,
                    easing: "linear",
                    top: 172,
                    complete() {
                      Scenes.stepModal(
                        {
                          title: "Rover Tripod: ",
                          description:
                            "A Rover Tripod is used to support the Rover GNSS receiver, ensuring stability during data collection across the survey area.",
                        },
                        () => {
                          frames[++frameIdx]();
                        },
                        70,
                        245,
                        383
                      );
                      // frames[++frameIdx]();
                    },
                  });
                },
              });
            });
        },

        // GNSS rover
        () => {
          Util.setCC(
            "Drag the GNSS Rover and place it above the Rover tripod."
          );

          let draggableComponent = Src.gnss_rover.zIndex(9);
          // Src.base_tripod.set(305, 264, 175, 123);
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();

          new DragAndDrop()
            .setDroppable(470, 128, 45, 45)
            .setDraggable(draggableComponent, 480, 136)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 146,
                complete() {
                  Scenes.stepModal(
                    {
                      title: "GNSS Rover: ",
                      description:
                        "The GNSS Rover is a portable device that collects highly accurate location data from different points on the ground, while receiving corrections from a stationary Base Station.",
                    },
                    () => {
                      frames[++frameIdx]();
                    },
                    65,
                    178,
                    388
                  );
                  // frames[++frameIdx]();
                },
              });
            });
        },

        // GNSS rover zoom
        () => {
          Util.setCC("Click on the GNSS Rover to see the zoom view.");

          Src.gnss_rover.set(480, 146, 30, 26);

          let zoomPos = [401, 17, 186];
          zoomImgs = [
            Src.gnss_rover_zoom_1,
            Src.gnss_rover_zoom_2_on,
            Src.gnss_rover_zoom_3_all_lights,
            Src.gnss_rover_zoom_4_on,
            Src.gnss_rover_zoom_5_wifi,
          ];

          zoomImgs.forEach((img, idx) => {
            img
              .set(...zoomPos)
              .zIndex(20 + idx)
              .hide();
          });

          Scenes.maskClick(
            () => {
              anime
                .timeline({
                  easing: "linear",
                  duration: 2000,
                })
                .add({
                  begin() {
                    zoomImgs[0].fadeShow(1000);
                  },
                })
                .add({
                  begin() {
                    Util.setCC("Power on the GNSS Rover.");
                    Scenes.maskClick(
                      () => {
                        zoomImgs[1].fadeShow(0, () => {
                          anime({
                            begin() {
                              zoomImgs[2].show();
                            },
                            targets: zoomImgs[2].item,
                            easing: "easeInOutQuad",
                            duration: 6000,
                            opacity: [0, 1, 0, 1, 0, 1],
                            complete() {
                              zoomImgs[2].hide();
                              zoomImgs[3].show();
                              blinkLoopAnime = anime({
                                begin() {
                                  zoomImgs[4].show();
                                },
                                duration: 1000,
                                targets: zoomImgs[4].item,
                                opacity: [1, 0, 1],
                                loop: true,
                              });

                              frames[++frameIdx]();
                            },
                          });
                        });
                      },
                      484,
                      151,
                      16,
                      19,
                      0
                    );
                    Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
                  },
                });
            },
            475,
            140,
            40,
            35,
            0
          );
          Dom.setBlinkArrowOnElement(Src.mask, "left").play();
        },

        // Reach view base setup
        () => {
          Util.setCC(
            "Click on the mobile and record the coordinates of GCP."
          );
          Src.base_setup_phone_dummy_transformed.zIndex(14);
          Scenes.maskClick(
            () => {
              Steps.phoneZoomInAnime();
              setTimeout(() => {
                frames[++frameIdx]();
              }, 4000);
            },
            762,
            349,
            33,
            25,
            30
          );

          Dom.setBlinkArrowOnElement(
            Src.base_setup_phone_dummy_transformed,
            "top"
          ).play();
        },

        // GNSS rover screen setup
        () => {
          Util.setCC("Connect the 'reach-rover' same as the 'reach-base'.");
          Src.phone_dummy.hide();
          Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(17);

          //* Display pos for phone screen images
          let imgs = [
            Src.base_setup_phone_display_1,
            Src.rover_setup_phone_display_1,
            Src.rover_setup_phone_display_2,
            Src.rover_setup_phone_display_2_1,
            Src.rover_setup_phone_display_2_2,
            Src.rover_setup_phone_display_2_3,
            Src.rover_setup_phone_display_2_4,
            Src.rover_setup_phone_display_2_5,
            Src.rover_setup_phone_display_2_6,
            Src.rover_setup_phone_display_2_7,
            Src.rover_setup_phone_display_2_8,
            Src.rover_setup_phone_display_3,
            Src.rover_setup_phone_display_4,
            Src.rover_setup_phone_display_4_1,
            Src.rover_setup_phone_display_4_2,
            Src.rover_setup_phone_display_4_3,
            Src.rover_setup_phone_display_4_4,
            Src.rover_setup_phone_display_4_5,
            Src.rover_setup_phone_display_5,
            Src.rover_setup_phone_display_6,
            Src.rover_setup_phone_display_7,
            Src.rover_setup_phone_display_7_1,
            Src.rover_setup_phone_display_7_2,
            Src.rover_setup_phone_display_7,

            // rover gcp display
            Src.rover_setup_phone_display_1,
            Src.rover_gcp_setup_1_survey,
            Src.rover_gcp_setup_2_add_clicked,
            Src.rover_gcp_setup_3_edit_clicked,
            Src.rover_gcp_setup_3_1_edit_clicked,
            Src.rover_gcp_setup_4_save_clicked,
            Src.rover_gcp_setup_4_1_values_change,
            Src.rover_gcp_setup_4_2_values_change,
            Src.rover_gcp_setup_4_3_values_change,
            Src.rover_gcp_setup_5_click_on_fix,
            Src.rover_gcp_setup_6_click_on_measure,
            Src.rover_gcp_setup_6_1_progress,
            Src.rover_gcp_setup_6_2_progress,
            Src.rover_gcp_setup_6_3_progress,
            Src.rover_gcp_setup_7_click_close,
            Src.rover_gcp_setup_8_final,
          ];

          imgs.forEach((img, idx) => {
            let display_pos = [685, -16, 450, 219];
            if (idx == 0) display_pos = [676, -22, 457, 236];

            let st = {
              "border-radius": "30px",
            };
            img
              .set(...display_pos)
              .styles(st)
              .hide()
              .zIndex(16);
          });

          //idx for mask Clicks
          let maskClickIdx = 0;

          let maskClicksPos = [
            [700, 21, 57, 52, 0], // click emlid
            [697 - 1, 125, 35, 197, 0], //settings
            [697 - 1, 294, 27, 197, 0], //gnss setting
            [697 - 1, 22, 20, 21], //cross button
            [697 - 1, 319, 30, 197, 0], //correction input
            [697 - 1, 82, 20, 21], //checkbox lora
            [697 - 1, 22, 20, 21], //back
            [697 - 1, 22, 20, 21], //back
            [697 - 1, 98, 35, 197, 0], //status

            // [697 - 1, 98, 35, 197, 0], //extra
            [763, 17, 16, 64, 0], // down arrow
            [770, 376, 36, 51], // click survey
            [775, 317, 39, 39], // click add
            [696, 221, 21, 37], // click edit
            [861, 19, 20, 33], // click save
            // [696, 367, 42, 197], // click measure
            [852, 294, 28, 40], // turn on fix only
            [696, 367, 42, 197], // click measure
            [866, 188, 30, 31], // click close

            //Extra
            [697 - 1, 294, 27, 197, 0], //gnss setting
          ];

          /**
           * @param {Dom} toShow
           */
          const screenAnimation = (
            toShow,
            nextImgs = [],
            onComplete = () => {}
          ) => {
            // for parameters
            let maskClickDelay = 400;
            let slideShowDelay = 500;

            // slideshow function
            function imgsSlideShow(nextImgs = [], imgIdx = 0) {
              if (imgIdx == nextImgs.length) {
                [toShow, ...nextImgs].forEach((img) => img.hide());
                onComplete();
                return;
              }

              console.log(imgIdx, nextImgs[imgIdx].item);
              nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
                imgsSlideShow(nextImgs, imgIdx + 1);
              });
            }

            toShow.show();
            setTimeout(() => {
              Scenes.maskClick(() => {
                console.log("Current:", maskClickIdx);

                imgsSlideShow(nextImgs);
              }, ...maskClicksPos[maskClickIdx++]);
            }, maskClickDelay);
          };

          const displayFrames = () => {
            function frame0() {
              Util.setCC("Click on application 'Emlid Flow'.");
              let toShow = Src.base_setup_phone_display_1;
              let nextImgs = [Src.rover_setup_phone_display_1];
              let nextFrame = frame1;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
            function frame1() {
              Util.setCC("Click on 'Settings'.");
              let toShow = Src.rover_setup_phone_display_1;
              let nextImgs = [Src.rover_setup_phone_display_2];
              let nextFrame = frame2;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame2() {
              // hide zoom view of gnss rover
              zoomImgs.forEach((img) => img.fadeHide());
              blinkLoopAnime.reset();

              Util.setCC("Click on 'GNSS settings'.");
              Util.setCC("Match the frequencies and check all the boxes.");
              let toShow = Src.rover_setup_phone_display_2;
              let nextImgs = [
                Src.rover_setup_phone_display_2_1,
                Src.rover_setup_phone_display_2_2,
                Src.rover_setup_phone_display_2_3,
                Src.rover_setup_phone_display_2_4,
                Src.rover_setup_phone_display_2_5,
                Src.rover_setup_phone_display_2_6,
                Src.rover_setup_phone_display_2_7,
                Src.rover_setup_phone_display_2_8,
              ];
              let nextFrame = frame3;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame3() {
              Util.setCC("Click on Cross button.");
              let toShow = Src.rover_setup_phone_display_2_8;
              let nextImgs = [Src.rover_setup_phone_display_3];
              let nextFrame = frame4;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame4() {
              Util.setCC("Click on 'Correction Input'.");
              let toShow = Src.rover_setup_phone_display_3;
              let nextImgs = [Src.rover_setup_phone_display_4];
              let nextFrame = frame5;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame5() {
              Util.setCC("Click on 'LoRa'.");
              let toShow = Src.rover_setup_phone_display_4;
              let nextImgs = [
                Src.rover_setup_phone_display_4_1,
                Src.rover_setup_phone_display_4_2,
                Src.rover_setup_phone_display_4_3,
                Src.rover_setup_phone_display_4_4,
                Src.rover_setup_phone_display_4_5,
              ];
              let nextFrame = frame6;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame6() {
              Util.setCC("Click on Back button.");
              let toShow = Src.rover_setup_phone_display_4_5;
              let nextImgs = [Src.rover_setup_phone_display_5];
              let nextFrame = frame7;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame7() {
              Util.setCC("Click on Back button.");
              let toShow = Src.rover_setup_phone_display_5;
              let nextImgs = [Src.rover_setup_phone_display_6];
              let nextFrame = frame8;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame8() {
              Util.setCC("Click on 'Status'.");
              let toShow = Src.rover_setup_phone_display_6;
              let nextImgs = [
                Src.rover_setup_phone_display_7,
                Src.rover_setup_phone_display_7_1,
                Src.rover_setup_phone_display_7_2,
              ];
              let nextFrame = frame9;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame9() {
              Util.setCC("Click on 'Down Arrow'.");
              let toShow = Src.rover_setup_phone_display_7_1;
              let nextImgs = [Src.rover_setup_phone_display_6];
              let nextFrame = frame10;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame10() {
              Util.setCC("Click on 'Survey'.");
              let toShow = Src.rover_setup_phone_display_6;
              let nextImgs = [Src.rover_gcp_setup_1_survey];
              let nextFrame = frame11;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame11() {
              Util.setCC("Click on add button.");
              let toShow = Src.rover_gcp_setup_1_survey;
              let nextImgs = [Src.rover_gcp_setup_2_add_clicked];
              let nextFrame = frame12;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame12() {
              Util.setCC("Click on edit button.");
              let toShow = Src.rover_gcp_setup_2_add_clicked;
              let nextImgs = [Src.rover_gcp_setup_3_edit_clicked];
              let nextFrame = frame13;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame13(){
              Src.rover_gcp_setup_3_edit_clicked.show()
              //taking input
              let st = {
                border: "2px solid #ccc",
                "border-radius": "5px",
                outline: "none",
                "font-size": "8px",
                padding: "4px",
                color: "black",
                fontWeight: "bold",
                width: "180px",
                "font-family": "Arial, Helvetica, sans-serif",
              };
              Scenes.inputBox(
                () => {
                  Scenes.maskClick(
                    () => {
                      Src.rover_gcp_setup_3_1_edit_clicked.show()
                      Src.rover_gcp_setup_3_edit_clicked.hide()
                      // Scenes.ipBox.hide();
                      frame14();
                    },
                    861, 19, 20, 33
                  );
                },
                "GCP",
                st,
                706, 153
              );
              Util.setCC('Please give description "GCP"!!');
            }

            function frame14() {
              Scenes.ipBox.hide();

              Util.setCC("Click on Save button.");
              let toShow = Src.rover_gcp_setup_3_1_edit_clicked;
              let nextImgs = [Src.rover_gcp_setup_4_save_clicked, 
                Src.rover_gcp_setup_4_1_values_change,
                Src.rover_gcp_setup_4_2_values_change,
                Src.rover_gcp_setup_4_3_values_change,
              ];
              let nextFrame = frame15;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame15() {
              Util.setCC("Turn on 'FIX only'.");
              let toShow = Src.rover_gcp_setup_5_click_on_fix;
              let nextImgs = [Src.rover_gcp_setup_6_click_on_measure];
              let nextFrame = frame16;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame16() {
              Util.setCC("Click on 'Measure'.");
              let toShow = Src.rover_gcp_setup_6_click_on_measure;
              let nextImgs = [
                Src.rover_gcp_setup_6_1_progress,
                Src.rover_gcp_setup_6_2_progress,
                Src.rover_gcp_setup_6_3_progress,
                // Src.rover_gcp_setup_7_click_close,
              ];
              let nextFrame = frame17;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
            function frame17() {
              let modal = Scenes.stepModal({
                title: "",
                description: "Coordinates of GCP 1 is recorded."
              }, ()=>{
              }, 401, 80, 275);
              Util.setCC("Coordinates of first GCP is recorded.").onend(()=>{
                modal.hide()
                Util.setCC("Click on Close button.");
              })
              let toShow = Src.rover_gcp_setup_7_click_close;
              let nextImgs = [Src.rover_gcp_setup_8_final];
              let nextFrame = frame18;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame18() {
              let toShow = Src.rover_gcp_setup_8_final;
              let toHide = [
                toShow,
                Src.phone_empty_screen,
              ];
              toShow.show();
              Util.setCC("Click on 'Phone' to close the phone.");
              Scenes.maskClick(
                () => {
                  toHide.forEach((img) => img.hide());
                  Steps.phoneZoomOutAnime();
                  setTimeout(() => {
                    frames[++frameIdx]();
                  }, 4000);
                },
                676,
                -22,
                457,
                236,
                0
              );
              Dom.setBlinkArrowOnElement(Src.phone_empty_screen, "left").play();
            }

            frame0();
            // maskClickIdx = 9
            // frame10()
            // frame7()
            // DeveloperTools.init()
          };

          displayFrames();

          return true;
        },

        // Closing rover and gnss
        () => {
          Util.setCC(
            "Click on Rover tripod to fold it and place back to the car's trunk."
          );
          Src.rover_tripod_closed_with_gnss
            .set(477, 128, 174)
            .rotate(0)
            .zIndex(10)
            .hide();
          Scenes.maskClick(
            () => {
              Src.gnss_rover.fadeHide();
              Src.rover_tripod.fadeHide();
              Src.rover_tripod_closed_with_gnss.fadeShow(700, () => {
                anime({
                  targets: Src.rover_tripod_closed_with_gnss.item,
                  easing: "linear",
                  duration: 3000,
                  keyframes: [
                    { rotate: 106 },
                    { left: 706, top: 171, zIndex: 5 },
                    { top: 231 },
                  ],
                  complete(){
                    Scenes.StepProcess.done()
                  }
                });
              });
            },
            458,
            134,
            213,
            76,
            0
          );
        },
      ];

      // frameIdx = 16;
      frames[frameIdx]();

      return true;
    },

    //! Background 2 Scene
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Mark Ground Control Points and record it's coordinates ");
      Util.setCC("...");

      let mapStyle = {
        borderRadius: "15px",
        border: "3px solid black",
      };
      // map settings
      // Src.background_gcp_2.set(-485, -257, 711, 1440);
      Src.background_gcp_2.set(-446, -123, 711, 1440).rotate(-12);
      Src.small_map_location_2.set(8, -38, 200).zIndex(1).styles(mapStyle);
      // car setting and components
      Src.car_trunk_open.set(476, 134, 320).zIndex(1);
      Src.gcp_2.set(676, 310 + 4 * 2, 26, 54).zIndex(6);
      Src.gcp_3.set(676, 310 + 4 * 3, 26, 54).zIndex(5);
      Src.gcp_4.set(676, 310 + 4 * 4, 26, 54).zIndex(4);
      Src.base_setup_phone_dummy_transformed.set(760, 352, 23, 30).zIndex(5);
      Src.cone_1.set(641, 260 + 4 * 1, 58, 34).zIndex(7);
      Src.cone_2.set(641, 260 + 4 * 2, 58, 34).zIndex(6);
      Src.cone_3.set(641, 260 + 4 * 3, 58, 34).zIndex(5);
      Src.cone_4.set(641, 260 + 4 * 4, 58, 34).zIndex(4);

      // base setup final
      // Src.base_setup_stake_transformed.set(357, 416, 14, 18);
      // Src.base_setup_spray_mark.set(331, 409, 29, 70)
      // Src.base_setup_spray_mark.set(331, 409, 29, 70);
      // Src.base_tripod.set(305, 264, 175, 123);
      // Src.tribrach_with_extension_for_base.set(353, 230, 39, 22);
      // Src.gnss_base.set(351, 205, 30, 26);

      // rover setup final
      // Src.gcp_1.set(462, 296, 26, 54).zIndex(1);
      // Src.rover_tripod.set(459, 172, 175, 85).zIndex(2);
      // Src.gnss_rover.set(480, 146, 30, 26).zIndex(3);
      Src.rover_tripod_closed_with_gnss
        .set(706, 231, 174)
        .zIndex(3)
        .rotate(106);

      let st = { "border-radius": "30px" };
      let display_pos = [685, -16, 450, 219];
      // Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(16)
      // Src.phone_dummy_anime_helper.set(676, -22, 457, 236).zIndex(15)
      // Src.base_setup_phone_display_4.set(...display_pos).styles(st).zIndex(15)

      // new DragAndDrop()
      //   .setDraggable(Src.base_tripod_closed, 200, 200)
      //   .setDroppable(200,200)
      //   .active(()=>{
      //     console.log("Done")
      //   })
      let blinkLoopAnime = null;
      let zoomImgs = [];

      let frameIdx = 0;
      const frames = [
        //! Explaination
        ()=>{
          Src.small_map_location_2.set(85, 15, 390).zIndex(20).hide()
          //85, 15, 390
          Util.setCC("This is the second location from where we are taking the coordinates of GCP.").onend(()=>{
            Src.small_map_location_2.fadeShow(800)
            Util.setCC("It's your location in the map.")
            setTimeout(()=>{
              Scenes.stepModal({
                title: "",
                description: "It's your location in the map."
              }, ()=>{
                anime(({
                  targets: Src.small_map_location_2.item,
                  left: 8, 
                  top: -38,
                  height: 200,
                  easing: "linear",
                  duration: 1000,
                  complete(){
                    frames[++frameIdx]()
                  }
                }))
                // frames[++frameIdx]()
              }, 280, 80, 275).fadeShow(900)
            }, 2000)
          })
        },
        ()=>{
          Util.setCC("These are the steps for taking the coordinates.").onend(()=>{
            Scenes.stepModal({
              title: "Steps:",
              description: "1. Place GCP (Ground control point) in the ground. <br> 2. Place Tripod and rover above the GCP. <br> 3. Use mobile and record the coordinates."
            }, ()=>{
              frames[++frameIdx]();             
            }, 30, 270, 416).fadeShow(900)
          })

        },
        //! GNSS rover setup
        // placing GCP
        () => {
          Util.setCC("Drag the GCP and place it in the ground.");

          let draggableComponent = Src.gcp_2;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(462, 280, 65, 65)
            .setDraggable(draggableComponent, 462, 285)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 296,
                complete() {
                  frames[++frameIdx]();
                },
              });
            });
        },

        // Rover Tripod
        () => {
          Util.setCC("Drag the Rover tripod and place it above the GCP.");
          // Src.rover_tripod_closed.show();
          Src.rover_tripod_with_gnss.set(459, 115, 214, 85).hide().zIndex(8);
          let draggableComponent = Src.rover_tripod_closed_with_gnss;
          // Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play()
          Dom.setBlinkArrowRed(724, 274, 180).play();
          new DragAndDrop()
            .setDroppable(444, 147, 49, 97)
            .setDraggable(draggableComponent, 479, 85)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                keyframes: [
                  { left: 479, top: 110, rotate: 0, zIndex: 7 },
                  { top: 120, height: 194 },
                ],

                complete() {
                  draggableComponent.fadeHide(400);
                  anime({
                    begin() {
                      Src.rover_tripod_with_gnss.fadeShow(200);
                    },
                    targets: Src.rover_tripod_with_gnss.item,
                    duration: 1000,
                    easing: "linear",
                    top: 144,

                    complete() {
                      frames[++frameIdx]();
                    },
                  });
                },
              });
            });
        },

        // Reach view base setup
        () => {
          Util.setCC(
            "Click on the mobile and record the coordinates of GCP."
          );
          Src.base_setup_phone_dummy_transformed.zIndex(14);
          Scenes.maskClick(
            () => {
              Steps.phoneZoomInAnime();
              setTimeout(() => {
                frames[++frameIdx]();
              }, 4000);
            },
            762,
            349,
            33,
            25,
            30
          );

          Dom.setBlinkArrowOnElement(
            Src.base_setup_phone_dummy_transformed,
            "top"
          ).play();
        },

        // GNSS rover screen setup
        () => {
          Src.phone_dummy.hide();
          Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(17);
    
          let imgs = [
            Src.base_setup_phone_display_1,
            Src.rover_setup_phone_display_1,
            Src.rover_gcp_setup_9_click_on_add,
            Src.rover_gcp_setup_10_click_on_measure,
            Src.rover_gcp_setup_10_1_progress,
            Src.rover_gcp_setup_10_2_progress,
            Src.rover_gcp_setup_10_3_progress,
            Src.rover_gcp_setup_11_click_close,
            Src.rover_gcp_setup_12_final,
          ];
    
          imgs.forEach((img, idx) => {
            let display_pos = [685, -16, 450, 219];
            if (idx == 0) display_pos = [676, -22, 457, 236];

            let st = {
              "border-radius": "30px",
            };
            img
              .set(...display_pos)
              .styles(st)
              .hide()
              .zIndex(16);
          });
    
          //idx for mask Clicks
          let maskClickIdx = 0;
    
          let maskClicksPos = [
            [700, 21, 57, 52, 0], // click emlid
            [770, 376, 36, 51], // click survey
            [775, 321, 39, 39], // click add
            [696, 367, 42, 197], // click measure
            [866, 188, 30, 31], // click close
            // [696, 379, 20, 33], //click close
          ];
    
          /**
           * @param {Dom} toShow
           */
          const screenAnimation = (
            toShow,
            nextImgs = [],
            onComplete = () => {}
          ) => {
            // for parameters
            let maskClickDelay = 400;
            let slideShowDelay = 500;
    
            // slideshow function
            function imgsSlideShow(nextImgs = [], imgIdx = 0) {
              if (imgIdx == nextImgs.length) {
                [toShow, ...nextImgs].forEach((img) => img.hide());
                onComplete();
                return;
              }
    
              console.log(imgIdx, nextImgs[imgIdx].item);
              nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
                imgsSlideShow(nextImgs, imgIdx + 1);
              });
            }
    
            toShow.show();
            setTimeout(() => {
              Scenes.maskClick(() => {
                console.log("Current:", maskClickIdx);
    
                imgsSlideShow(nextImgs);
              }, ...maskClicksPos[maskClickIdx++]);
            }, maskClickDelay);
          };
    
          const displayFrames = () => {
            function frame1() {
              Util.setCC("Click on application 'Emlid Flow'.");
              let toShow = Src.base_setup_phone_display_1;
              let nextImgs = [Src.rover_setup_phone_display_1];
              let nextFrame = frame2;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame2() {
              Util.setCC("Click on 'Survey'.");
              let toShow = Src.rover_setup_phone_display_1;
              let nextImgs = [Src.rover_gcp_setup_9_click_on_add];
              let nextFrame = frame3;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame3() {
              Util.setCC("Click on add button.");
              let toShow = Src.rover_gcp_setup_9_click_on_add;
              let nextImgs = [Src.rover_gcp_setup_10_click_on_measure];
              let nextFrame = frame4;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame4() {
              Util.setCC("Click on Measure.");
              let toShow = Src.rover_gcp_setup_10_click_on_measure;
              let nextImgs = [
                Src.rover_gcp_setup_10_1_progress,
                Src.rover_gcp_setup_10_2_progress,
                Src.rover_gcp_setup_10_3_progress,
              ];
              let nextFrame = frame5;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame5() {
              let modal = Scenes.stepModal({
                title: "",
                description: "Coordinates of GCP 2 is recorded."
              }, ()=>{
              }, 401, 80, 275);
              Util.setCC("Coordinates of Second GCP is recorded.").onend(()=>{
                modal.hide()
                Util.setCC("Click on Close button.")
              })
              let toShow = Src.rover_gcp_setup_11_click_close;
              let nextImgs = [Src.rover_gcp_setup_12_final];
              let nextFrame = frame6;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame6() {
              let toShow = Src.rover_gcp_setup_12_final;
              let toHide = [
                toShow,
                Src.phone_empty_screen,
              ];
              toShow.show();
              Util.setCC("Click on 'Phone' to close the phone.");
              Scenes.maskClick(
                () => {
                  toHide.forEach((img) => img.hide());
                  Steps.phoneZoomOutAnime();
                  setTimeout(() => {
                    frames[++frameIdx]();
                  }, 4000);
                },
                676,
                -22,
                457,
                236,
                0
              );
              Dom.setBlinkArrowOnElement(Src.phone_empty_screen, "left").play();
            }
            
            // maskClickIdx = 3
            // frame4();
            frame1();
          };
    
          displayFrames();
    
          return true;
        },

        // Closing rover and gnss
        () => {
          Util.setCC(
            "Click on Rover tripod to fold it and place back to the car's trunk."
          );
          Src.rover_tripod_closed_with_gnss
            .set(477, 128, 174)
            .rotate(0)
            .zIndex(10)
            .hide();
          Scenes.maskClick(
            () => {
              Src.gnss_rover.fadeHide();
              Src.rover_tripod.fadeHide();
              Src.rover_tripod_with_gnss.fadeHide()
              Src.rover_tripod_closed_with_gnss.fadeShow(700, () => {
                anime({
                  targets: Src.rover_tripod_closed_with_gnss.item,
                  easing: "linear",
                  duration: 3000,
                  keyframes: [
                    { rotate: 106 },
                    { left: 706, top: 171, zIndex: 5 },
                    { top: 231 },
                  ],

                  complete(){
                    Scenes.StepProcess.done()
                  }
                });
              });
            },
            458,
            134,
            213,
            76,
            0
          );
        },
      ];

      // frameIdx = 0;
      frames[frameIdx]();

      return true;
    },

    //! Background 3 Scene
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Mark Ground Control Points and record it's coordinates ");
      Util.setCC("...");

      let mapStyle = {
        borderRadius: "15px",
        border: "3px solid black",
      };
      // map settings
      Src.background_gcp_3.set(-1, -153, 711, 1440);
      // Src.background_gcp_3.set(-446, -123, 711, 1440).rotate(-12);
      Src.small_map_location_3.set(8, -38, 200).zIndex(1).styles(mapStyle);
      // car setting and components
      Src.car_trunk_open.set(476, 134, 320).zIndex(1);
      Src.gcp_3.set(676, 310 + 4 * 3, 26, 54).zIndex(5);
      Src.gcp_4.set(676, 310 + 4 * 4, 26, 54).zIndex(4);
      Src.base_setup_phone_dummy_transformed.set(760, 352, 23, 30).zIndex(5);
      Src.cone_1.set(641, 260 + 4 * 1, 58, 34).zIndex(7);
      Src.cone_2.set(641, 260 + 4 * 2, 58, 34).zIndex(6);
      Src.cone_3.set(641, 260 + 4 * 3, 58, 34).zIndex(5);
      Src.cone_4.set(641, 260 + 4 * 4, 58, 34).zIndex(4);

      // base setup final
      // Src.base_setup_stake_transformed.set(357, 416, 14, 18);
      // Src.base_setup_spray_mark.set(331, 409, 29, 70)
      // Src.base_setup_spray_mark.set(331, 409, 29, 70);
      // Src.base_tripod.set(305, 264, 175, 123);
      // Src.tribrach_with_extension_for_base.set(353, 230, 39, 22);
      // Src.gnss_base.set(351, 205, 30, 26);

      // rover setup final
      // Src.gcp_1.set(462, 296, 26, 54).zIndex(1);
      // Src.rover_tripod.set(459, 172, 175, 85).zIndex(2);
      // Src.gnss_rover.set(480, 146, 30, 26).zIndex(3);
      Src.rover_tripod_closed_with_gnss
        .set(706, 231, 174)
        .zIndex(3)
        .rotate(106);

      let st = { "border-radius": "30px" };
      let display_pos = [685, -16, 450, 219];
      // Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(16)
      // Src.phone_dummy_anime_helper.set(676, -22, 457, 236).zIndex(15)
      // Src.base_setup_phone_display_4.set(...display_pos).styles(st).zIndex(15)

      // new DragAndDrop()
      //   .setDraggable(Src.base_tripod_closed, 200, 200)
      //   .setDroppable(200,200)
      //   .active(()=>{
      //     console.log("Done")
      //   })
      let blinkLoopAnime = null;
      let zoomImgs = [];

      let frameIdx = 0;
      const frames = [
        ()=>{
          Src.small_map_location_3.set(85, 15, 390).zIndex(20).hide()
          //85, 15, 390
          Util.setCC("This is the third location from where we are taking the coordinates of GCP.").onend(()=>{
            Src.small_map_location_3.fadeShow(800)
            Util.setCC("It's your location in the map.")
            setTimeout(()=>{
              Scenes.stepModal({
                title: "",
                description: "It's your location in the map."
              }, ()=>{
                anime(({
                  targets: Src.small_map_location_3.item,
                  left: 8, 
                  top: -38,
                  height: 200,
                  easing: "linear",
                  duration: 1000,
                  complete(){
                    frames[++frameIdx]()
                  }
                }))
                // frames[++frameIdx]()
              }, 418, 30, 275).fadeShow(900)
            }, 2000)
          })
        },
        ()=>{
          Util.setCC("These are the steps for taking the coordinates.").onend(()=>{
            Scenes.stepModal({
              title: "Steps:",
              description: "1. Place GCP (Ground control point) in the ground. <br> 2. Place Tripod and rover above the GCP. <br> 3. Use mobile and record the coordinates."
            }, ()=>{
              frames[++frameIdx]();             
            }, 30, 270, 416).fadeShow(900)
          })

        },
        //! GNSS rover setup
        // placing GCP
        () => {
          Util.setCC("Drag the GCP and place it in the ground.");

          let draggableComponent = Src.gcp_3;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(462, 280, 65, 65)
            .setDraggable(draggableComponent, 462, 285)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 296,
                complete() {
                  frames[++frameIdx]();
                },
              });
            });
        },

        // Rover Tripod
        () => {
          Util.setCC("Drag the Rover tripod and place it above the GCP.");
          // Src.rover_tripod_closed.show();
          Src.rover_tripod_with_gnss.set(459, 115, 214, 85).hide().zIndex(8);
          let draggableComponent = Src.rover_tripod_closed_with_gnss;
          // Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play()
          Dom.setBlinkArrowRed(724, 274, 180).play();
          new DragAndDrop()
            .setDroppable(444, 147, 49, 97)
            .setDraggable(draggableComponent, 479, 85)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                keyframes: [
                  { left: 479, top: 110, rotate: 0, zIndex: 7 },
                  { top: 120, height: 194 },
                ],

                complete() {
                  draggableComponent.fadeHide(400);
                  anime({
                    begin() {
                      Src.rover_tripod_with_gnss.fadeShow(200);
                    },
                    targets: Src.rover_tripod_with_gnss.item,
                    duration: 1000,
                    easing: "linear",
                    top: 144,

                    complete() {
                      frames[++frameIdx]();
                    },
                  });
                },
              });
            });
        },

        // Reach view base setup
        () => {
          Util.setCC(
            "Click on the mobile and record the coordinates of GCP."
          );
          Src.base_setup_phone_dummy_transformed.zIndex(14);
          Scenes.maskClick(
            () => {
              Steps.phoneZoomInAnime();
              setTimeout(() => {
                frames[++frameIdx]();
              }, 4000);
            },
            762,
            349,
            33,
            25,
            30
          );

          Dom.setBlinkArrowOnElement(
            Src.base_setup_phone_dummy_transformed,
            "top"
          ).play();
        },

        // GNSS rover screen setup
        () => {
          Src.phone_dummy.hide();
          Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(17);
    
          let imgs = [
            Src.base_setup_phone_display_1,
            Src.rover_setup_phone_display_1,
            Src.rover_gcp_setup_13_click_on_add,
            Src.rover_gcp_setup_14_click_on_measure,
            Src.rover_gcp_setup_14_1_progress,
            Src.rover_gcp_setup_14_2_progress,
            Src.rover_gcp_setup_14_3_progress,
            Src.rover_gcp_setup_15_click_on_close,
            Src.rover_gcp_setup_16_final,
          ];
    
          imgs.forEach((img, idx) => {
            let display_pos = [685, -16, 450, 219];
            if (idx == 0) display_pos = [676, -22, 457, 236];

            let st = {
              "border-radius": "30px",
            };
            img
              .set(...display_pos)
              .styles(st)
              .hide()
              .zIndex(16);
          });
    
          //idx for mask Clicks
          let maskClickIdx = 0;
    
          let maskClicksPos = [
            [700, 21, 57, 52, 0], // click emlid
            [770, 376, 36, 51], // click survey
            [775, 321, 39, 39], // click add
            [696, 367, 42, 197], // click measure
            [866, 188, 30, 31], // click close
            // [696, 379, 20, 33], //click close
          ];
    
          /**
           * @param {Dom} toShow
           */
          const screenAnimation = (
            toShow,
            nextImgs = [],
            onComplete = () => {}
          ) => {
            // for parameters
            let maskClickDelay = 400;
            let slideShowDelay = 500;
    
            // slideshow function
            function imgsSlideShow(nextImgs = [], imgIdx = 0) {
              if (imgIdx == nextImgs.length) {
                [toShow, ...nextImgs].forEach((img) => img.hide());
                onComplete();
                return;
              }
    
              console.log(imgIdx, nextImgs[imgIdx].item);
              nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
                imgsSlideShow(nextImgs, imgIdx + 1);
              });
            }
    
            toShow.show();
            setTimeout(() => {
              Scenes.maskClick(() => {
                console.log("Current:", maskClickIdx);
    
                imgsSlideShow(nextImgs);
              }, ...maskClicksPos[maskClickIdx++]);
            }, maskClickDelay);
          };
    
          const displayFrames = () => {
            function frame1() {
              Util.setCC("Click on application 'Emlid Flow'.");
              let toShow = Src.base_setup_phone_display_1;
              let nextImgs = [Src.rover_setup_phone_display_1];
              let nextFrame = frame2;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame2() {
              Util.setCC("Click on 'Survey'.");
              let toShow = Src.rover_setup_phone_display_1;
              let nextImgs = [Src.rover_gcp_setup_13_click_on_add];
              let nextFrame = frame3;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame3() {
              Util.setCC("Click on add button.");
              let toShow = Src.rover_gcp_setup_13_click_on_add;
              let nextImgs = [Src.rover_gcp_setup_14_click_on_measure];
              let nextFrame = frame4;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame4() {
              Util.setCC("Click on Measure.");
              let toShow = Src.rover_gcp_setup_14_click_on_measure;
              let nextImgs = [
                Src.rover_gcp_setup_14_1_progress,
                Src.rover_gcp_setup_14_2_progress,
                Src.rover_gcp_setup_14_3_progress,
              ];
              let nextFrame = frame5;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame5() {
              let modal = Scenes.stepModal({
                title: "",
                description: "Coordinates of GCP 3 is recorded."
              }, ()=>{
              }, 401, 80, 275);
              Util.setCC("Coordinates of third GCP is recorded.").onend(()=>{
                modal.hide()
                Util.setCC("Click on Close button.");
              })
              let toShow = Src.rover_gcp_setup_15_click_on_close;
              let nextImgs = [Src.rover_gcp_setup_16_final];
              let nextFrame = frame6;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame6() {
              let toShow = Src.rover_gcp_setup_16_final;
              let toHide = [
                toShow,
                Src.phone_empty_screen,
              ];
              toShow.show();
              Util.setCC("Click on 'Phone' to close the phone.");
              Scenes.maskClick(
                () => {
                  toHide.forEach((img) => img.hide());
                  Steps.phoneZoomOutAnime();
                  setTimeout(() => {
                    frames[++frameIdx]();
                  }, 4000);
                },
                676,
                -22,
                457,
                236,
                0
              );
              Dom.setBlinkArrowOnElement(Src.phone_empty_screen, "left").play();
            }
    
            frame1();
          };
    
          displayFrames();
    
          return true;
        },

        // Closing rover and gnss
        () => {
          Util.setCC(
            "Click on Rover tripod to fold it and place back to the car's trunk."
          );
          Src.rover_tripod_closed_with_gnss
            .set(477, 128, 174)
            .rotate(0)
            .zIndex(10)
            .hide();
          Scenes.maskClick(
            () => {
              Src.gnss_rover.fadeHide();
              Src.rover_tripod.fadeHide();
              Src.rover_tripod_with_gnss.fadeHide()
              Src.rover_tripod_closed_with_gnss.fadeShow(700, () => {
                anime({
                  targets: Src.rover_tripod_closed_with_gnss.item,
                  easing: "linear",
                  duration: 3000,
                  keyframes: [
                    { rotate: 106 },
                    { left: 706, top: 171, zIndex: 5 },
                    { top: 231 },
                  ],

                  complete(){
                    Scenes.StepProcess.done()
                  }
                });
              });
            },
            458,
            134,
            213,
            76,
            0
          );
        },
      ];

      frameIdx = 0;
      frames[frameIdx]();

      return true;
    },

    //! Background 4 Scene
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Mark Ground Control Points and record it's coordinates ");
      Util.setCC("...");

      let mapStyle = {
        borderRadius: "15px",
        border: "3px solid black",
      };
      // map settings
      Src.background_gcp_4.set(-147, -99, 673, 1440);
      // Src.background_gcp_3.set(-446, -123, 711, 1440).rotate(-12);

      Src.small_map_location_4.set(8, -38, 200).zIndex(1).styles(mapStyle);
      // car setting and components
      Src.car_trunk_open.set(476, 134, 320).zIndex(1);
      Src.gcp_4.set(676, 310 + 4 * 4, 26, 54).zIndex(4);
      Src.base_setup_phone_dummy_transformed.set(760, 352, 23, 30).zIndex(5);
      Src.cone_1.set(641, 260 + 4 * 1, 58, 34).zIndex(7);
      Src.cone_2.set(641, 260 + 4 * 2, 58, 34).zIndex(6);
      Src.cone_3.set(641, 260 + 4 * 3, 58, 34).zIndex(5);
      Src.cone_4.set(641, 260 + 4 * 4, 58, 34).zIndex(4);

      // base setup final
      // Src.base_setup_stake_transformed.set(357, 416, 14, 18);
      // Src.base_setup_spray_mark.set(331, 409, 29, 70)
      // Src.base_setup_spray_mark.set(331, 409, 29, 70);
      // Src.base_tripod.set(305, 264, 175, 123);
      // Src.tribrach_with_extension_for_base.set(353, 230, 39, 22);
      // Src.gnss_base.set(351, 205, 30, 26);

      // rover setup final
      // Src.gcp_1.set(462, 296, 26, 54).zIndex(1);
      // Src.rover_tripod.set(459, 172, 175, 85).zIndex(2);
      // Src.gnss_rover.set(480, 146, 30, 26).zIndex(3);
      Src.rover_tripod_closed_with_gnss
        .set(706, 231, 174)
        .zIndex(3)
        .rotate(106);

      let st = { "border-radius": "30px" };
      let display_pos = [685, -16, 450, 219];
      // Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(16)
      // Src.phone_dummy_anime_helper.set(676, -22, 457, 236).zIndex(15)
      // Src.base_setup_phone_display_4.set(...display_pos).styles(st).zIndex(15)

      // new DragAndDrop()
      //   .setDraggable(Src.base_tripod_closed, 200, 200)
      //   .setDroppable(200,200)
      //   .active(()=>{
      //     console.log("Done")
      //   })
      let blinkLoopAnime = null;
      let zoomImgs = [];

      let frameIdx = 0;
      const frames = [
        ()=>{
          Src.small_map_location_4.set(85, 15, 390).zIndex(20).hide()
          //85, 15, 390
          Util.setCC("This is the fourth location from where we are taking the coordinates of GCP.").onend(()=>{
            Src.small_map_location_4.fadeShow(800)
            Util.setCC("It's your location in the map.")
            setTimeout(()=>{
              Scenes.stepModal({
                title: "",
                description: "It's your location in the map."
              }, ()=>{
                anime(({
                  targets: Src.small_map_location_4.item,
                  left: 8, 
                  top: -38,
                  height: 200,
                  easing: "linear",
                  duration: 1000,
                  complete(){
                    frames[++frameIdx]()
                  }
                }))
                // frames[++frameIdx]()
              }, 482, 316, 275).fadeShow(900)
            }, 2000)
          })
        },
        ()=>{
          Util.setCC("These are the steps for taking the coordinates.").onend(()=>{
            Scenes.stepModal({
              title: "Steps:",
              description: "1. Place GCP (Ground control point) in the ground. <br> 2. Place Tripod and rover above the GCP. <br> 3. Use mobile and record the coordinates."
            }, ()=>{
              frames[++frameIdx]();             
            }, 30, 270, 416).fadeShow(900)
          })

        },
        //! GNSS rover setup
        // placing GCP
        () => {
          Util.setCC("Drag the GCP and place it in the ground.");

          let draggableComponent = Src.gcp_4;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(462, 280, 65, 65)
            .setDraggable(draggableComponent, 462, 285)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                top: 296,
                complete() {
                  frames[++frameIdx]();
                },
              });
            });
        },

        // Rover Tripod
        () => {
          Util.setCC("Drag the Rover tripod and place it above the GCP.");
          // Src.rover_tripod_closed.show();
          Src.rover_tripod_with_gnss.set(459, 115, 214, 85).hide().zIndex(8);
          let draggableComponent = Src.rover_tripod_closed_with_gnss;
          // Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play()
          Dom.setBlinkArrowRed(724, 274, 180).play();
          new DragAndDrop()
            .setDroppable(444, 147, 49, 97)
            .setDraggable(draggableComponent, 479, 85)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                duration: 2000,
                easing: "linear",
                keyframes: [
                  { left: 479, top: 110, rotate: 0, zIndex: 7 },
                  { top: 120, height: 194 },
                ],

                complete() {
                  draggableComponent.fadeHide(400);
                  anime({
                    begin() {
                      Src.rover_tripod_with_gnss.fadeShow(200);
                    },
                    targets: Src.rover_tripod_with_gnss.item,
                    duration: 1000,
                    easing: "linear",
                    top: 144,

                    complete() {
                      frames[++frameIdx]();
                    },
                  });
                },
              });
            });
        },

        // Reach view base setup
        () => {
          Util.setCC(
            "Click on the mobile and record the coordinates of GCP."
          );
          Src.base_setup_phone_dummy_transformed.zIndex(14);
          Scenes.maskClick(
            () => {
              Steps.phoneZoomInAnime();
              setTimeout(() => {
                frames[++frameIdx]();
              }, 4000);
            },
            762,
            349,
            33,
            25,
            30
          );

          Dom.setBlinkArrowOnElement(
            Src.base_setup_phone_dummy_transformed,
            "top"
          ).play();
        },

        // GNSS rover screen setup
        () => {
          Src.phone_dummy.hide();
          Src.phone_empty_screen.set(676, -22, 457, 236).zIndex(17);
    
          let imgs = [
            Src.base_setup_phone_display_1,
            Src.rover_setup_phone_display_1,
            Src.rover_gcp_setup_17_click_on_add,
            Src.rover_gcp_setup_18_click_on_measure,
            Src.rover_gcp_setup_18_1_progress,
            Src.rover_gcp_setup_18_2_progress,
            Src.rover_gcp_setup_18_3_progress,
            Src.rover_gcp_setup_19_click_on_close,
            Src.rover_gcp_setup_20_final,
          ];
    
          imgs.forEach((img, idx) => {
            let display_pos = [685, -16, 450, 219];
            if (idx == 0) display_pos = [676, -22, 457, 236];

            let st = {
              "border-radius": "30px",
            };
            img
              .set(...display_pos)
              .styles(st)
              .hide()
              .zIndex(16);
          });
    
          //idx for mask Clicks
          let maskClickIdx = 0;
    
          let maskClicksPos = [
            [700, 21, 57, 52, 0], // click emlid
            [770, 376, 36, 51], // click survey
            [775, 321, 39, 39], // click add
            [696, 367, 42, 197], // click measure
            [866, 188, 30, 31], // click close
            // [696, 379, 20, 33], //click close
          ];
    
          /**
           * @param {Dom} toShow
           */
          const screenAnimation = (
            toShow,
            nextImgs = [],
            onComplete = () => {}
          ) => {
            // for parameters
            let maskClickDelay = 400;
            let slideShowDelay = 500;
    
            // slideshow function
            function imgsSlideShow(nextImgs = [], imgIdx = 0) {
              if (imgIdx == nextImgs.length) {
                [toShow, ...nextImgs].forEach((img) => img.hide());
                onComplete();
                return;
              }
    
              console.log(imgIdx, nextImgs[imgIdx].item);
              nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
                imgsSlideShow(nextImgs, imgIdx + 1);
              });
            }
    
            toShow.show();
            setTimeout(() => {
              Scenes.maskClick(() => {
                console.log("Current:", maskClickIdx);
    
                imgsSlideShow(nextImgs);
              }, ...maskClicksPos[maskClickIdx++]);
            }, maskClickDelay);
          };
    
          const displayFrames = () => {
            function frame1() {
              Util.setCC("Click on application 'Emlid Flow'.");
              let toShow = Src.base_setup_phone_display_1;
              let nextImgs = [Src.rover_setup_phone_display_1];
              let nextFrame = frame2;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame2() {
              Util.setCC("Click on 'Survey'.");
              let toShow = Src.rover_setup_phone_display_1;
              let nextImgs = [Src.rover_gcp_setup_17_click_on_add];
              let nextFrame = frame3;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame3() {
              Util.setCC("Click on add button.");
              let toShow = Src.rover_gcp_setup_17_click_on_add;
              let nextImgs = [Src.rover_gcp_setup_18_click_on_measure];
              let nextFrame = frame4;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame4() {
              Util.setCC("Click on Measure.");
              let toShow = Src.rover_gcp_setup_18_click_on_measure;
              let nextImgs = [
                Src.rover_gcp_setup_18_1_progress,
                Src.rover_gcp_setup_18_2_progress,
                Src.rover_gcp_setup_18_3_progress,
              ];
              let nextFrame = frame5;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
    
            function frame5() {
              let modal = Scenes.stepModal({
                title: "",
                description: "Coordinates of GCP 4 is recorded."
              }, ()=>{
              }, 401, 80, 275);
              Util.setCC("Coordinates of fourth GCP is recorded.").onend(()=>{
                modal.hide()
                Util.setCC("Click on Close button.");
              })
              let toShow = Src.rover_gcp_setup_19_click_on_close;
              let nextImgs = [Src.rover_gcp_setup_20_final];
              let nextFrame = frame6;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame6() {
              let toShow = Src.rover_gcp_setup_20_final;
              let toHide = [
                toShow,
                Src.phone_empty_screen,
              ];
              toShow.show();
              Util.setCC("Click on 'Phone' to close the phone.");
              Scenes.maskClick(
                () => {
                  toHide.forEach((img) => img.hide());
                  Steps.phoneZoomOutAnime();
                  setTimeout(() => {
                    frames[++frameIdx]();
                  }, 4000);
                },
                676,
                -22,
                457,
                236,
                0
              );
              Dom.setBlinkArrowOnElement(Src.phone_empty_screen, "left").play();
            }
    
            frame1();
          };
    
          displayFrames();
    
          return true;
        },

        // Closing rover and gnss
        () => {
          Util.setCC(
            "Click on Rover tripod to fold it and place back to the car's trunk."
          );
          Src.rover_tripod_closed_with_gnss
            .set(477, 128, 174)
            .rotate(0)
            .zIndex(10)
            .hide();
          Scenes.maskClick(
            () => {
              Src.gnss_rover.fadeHide();
              Src.rover_tripod.fadeHide();
              Src.rover_tripod_with_gnss.fadeHide()
              Src.rover_tripod_closed_with_gnss.fadeShow(700, () => {
                anime({
                  targets: Src.rover_tripod_closed_with_gnss.item,
                  easing: "linear",
                  duration: 3000,
                  keyframes: [
                    { rotate: 106 },
                    { left: 706, top: 171, zIndex: 5 },
                    { top: 231 },
                  ],

                  complete(){
                    Scenes.StepProcess.done()
                  }
                });
              });
            },
            458,
            134,
            213,
            76,
            0
          );
        },
      ];

      frameIdx = 0;
      frames[frameIdx]();

      return true;
    },

    //! Drone setup
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Preparing the Drone for survey");
      Util.setCC("...");
      let mapStyle = {
        borderRadius: "15px",
        border: "3px solid black",
      };
      Src.background_drone_fly_area.set(0, -49, 502, 950);
      Src.small_map_location_drone_fly.set(8, -38, 200).zIndex(1).styles(mapStyle);

      let imgs = [
        Src.car_trunk_with_drone_box_and_coness
          .set(476, 134, 320)
          .zIndex(1)
          .hide(),
        Src.car_trunk_zoom_box.set(5, 48, 324).zIndex(2).hide(),
        Src.car_trunk_zoom_box_open.set(5, 48, 324).zIndex(2).hide(),
        Src.components_in_trunk.set(5, 48, 324).zIndex(2).hide(),
        Src.top_view_background.set(5, 26, 370, 940).zIndex(3).hide(),
        Src.drone_top_view.set(67, 35, 350).zIndex(6).hide(),
        Src.prop1
          .set(30 + 505, 25, 210)
          .rotate(75)
          .zIndex(7)
          .hide(),
        Src.prop1_1
          .set(30 + 505, 25 + 60, 210)
          .rotate(75)
          .zIndex(7)
          .hide(),
        Src.prop2
          .set(30 + 507, 25 + 60 + 60, 210)
          .rotate(75)
          .zIndex(7)
          .hide(),
        Src.prop2_1
          .set(30 + 507, 25 + 60 + 60 + 60, 210)
          .rotate(75)
          .zIndex(7)
          .hide(),
        Src.battry.set(740, 148, 140).zIndex(4).hide(),
      ];

      let frameIdx = 0;
      const frames = [
        //explaination
        ()=>{
          Src.car_trunk_with_drone_box_and_coness.show();
          Src.small_map_location_drone_fly.set(85, 15, 390).zIndex(1).hide()
          //85, 15, 390
          Util.setCC("This is the location from where our drone takes off for the survey.").onend(()=>{
            Src.small_map_location_drone_fly.fadeShow(800)
            Util.setCC("It's your location in the map.")
            setTimeout(()=>{
              Scenes.stepModal({
                title: "",
                description: "It's your location in the map."
              }, ()=>{
                anime(({
                  targets: Src.small_map_location_drone_fly.item,
                  left: 8, 
                  top: -38,
                  height: 200,
                  easing: "linear",
                  duration: 1000,
                  complete(){
                    frames[++frameIdx]()
                  }
                }))
                // frames[++frameIdx]()
              }, 470, 150, 275).fadeShow(900)
            }, 2000)
          })
        },
        //zoom the close box
        () => {
          Util.setCC("These are the steps you have to follow to prepare the drone.").onend(()=>{
            Scenes.stepModal({
              title: "Steps:",
              description: "1. Open the Drone box. <br> 2. Bring all the components outside from the box. <br> 3. Prepare the drone."
            }, ()=>{
              Util.setCC("Click on the box to see the zoom view.");
              Scenes.maskClick(
                () => {
                  Src.car_trunk_zoom_box.fadeShow(800);
                  frames[++frameIdx]();
                },
                671,
                302,
                70,
                120,
                15
              );
              Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
              
            }, 30, 270, 416).fadeShow(900)
          })
        },
        //Open the box
        () => {
          Src.car_trunk_zoom_box.show();
          Util.setCC("Click on the box to open it.").onend(()=>{
            Scenes.maskClick(
              () => {
                Src.car_trunk_zoom_box_open.fadeShow(800);
                frames[++frameIdx]();
              },
              319,
              161,
              178,
              364
            );
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });

        },
        //Bring the components outside
        () => {
          Src.car_trunk_zoom_box_open.show();
          Util.setCC("Click on the components to bring them outside from the box.").onend(()=>{
            Scenes.maskClick(
              () => {
                Util.setCC("These are all the components of the drone.")
                Src.components_in_trunk.fadeShow(800);
                frames[++frameIdx]();
              },
              333,
              161,
              109,
              309
            );
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });

        },
        //top view of the drone
        () => {
          Src.components_in_trunk.show();
          Util.setCC("Click on the drone to see the top view.").onend(()=>{
            Scenes.maskClick(
              () => {
                Src.top_view_background.fadeShow(800);
                Src.drone_top_view.fadeShow(800);
                Src.prop1.fadeShow(800).rotate(75);
                Src.prop1_1.fadeShow(800).rotate(75);
                Src.prop2.fadeShow(800).rotate(75);
                Src.prop2_1.fadeShow(800).rotate(75);
                Src.battry.fadeShow(800);
                frames[++frameIdx]();
              },
              206,
              107,
              237,
              347
            );
            Dom.setBlinkArrowOnElement(Src.mask, "top").play();
          });

        },
        //dragging 1st
        () => {
          Util.setCC("Drag the propeller and place it on the wing of the drone.");
          let draggableComponent = Src.prop1;
          Dom.setBlinkArrowRed(541, 80, 180).play();
          new DragAndDrop()
            .setDroppable(40, 32, 59, 132)
            .setDraggable(draggableComponent, 71, -42)
            .active(() => {
              frames[++frameIdx]();
            });
        },
        //dragging 2nd
        () => {
          Util.setCC("Drag the propeller and place it on the wing of the drone.");

          let draggableComponent = Src.prop1_1;
          Dom.setBlinkArrowRed(541, 137, 180).play();
          new DragAndDrop()
            .setDroppable(323, 324, 59, 132)
            .setDraggable(draggableComponent, 365, 247)
            .active(() => {
              frames[++frameIdx]();
            });
        },
        //dragging 3rd
        () => {
          Util.setCC("Drag the propeller and place it on the wing of the drone.");

          let draggableComponent = Src.prop2;
          Dom.setBlinkArrowRed(541, 195, 180).play();
          new DragAndDrop()
            .setDroppable(315, 32, 59, 132)
            .setDraggable(draggableComponent, 358, -42)
            .active(() => {
              frames[++frameIdx]();
            });
        },
        //dragging 4th
        () => {
          Util.setCC("Drag the propeller and place it on the wing of the drone.");

          let draggableComponent = Src.prop2_1;
          Dom.setBlinkArrowRed(541, 260, 180).play();
          new DragAndDrop()
            .setDroppable(40, 324, 59, 132)
            .setDraggable(draggableComponent, 76, 244)
            .active(() => {
              frames[++frameIdx]();
            });
        },
        //dragging battery
        () => {
          Util.setCC("Drag the battery and put it into the drone.");

          let draggableComponent = Src.battry;
          Dom.setBlinkArrowRed(778, 111, 180).play();
          new DragAndDrop()
            .setDroppable(172, 265, 96, 132)
            .setDraggable(draggableComponent, 188, 167) //288
            .active(() => {
              anime({
                targets: draggableComponent.item,
                top: 167,
                duration: 8000,
                easing: "easeInOutExpo",
                complete: frames[++frameIdx](),
              });
            });
        },
        // zoom out the top view
        () => {
          Util.setCC("Now the drone is prepared and ready to fly.").onend(()=>{
                  Scenes.StepProcess.done()

            // Util.setCC("Click on the drone to zoom out.").onend(()=>{
            //   Scenes.maskClick(
            //     () => {
            //       imgs.forEach((img) => img.hide());
            //       Scenes.StepProcess.done()
            //       Scenes.next()
            //     },
            //     144, 135, 163, 194
            //   );
            //   Dom.setBlinkArrowOnElement(Src.mask, "left").play();
            // });
          })

        },
      ];

      // frameIdx = 0;
      frames[frameIdx]();

      return true;
    },

    //! Drone flying scene
    ()=>{
      Scenes.StepProcess.start()
      Scenes.experimentHeading("Conducting the Survey: Ready to fly")

      let mapStyle = {
        borderRadius: "15px",
        border: "3px solid black",
      };
      Src.background_drone_fly_area.set(0, -49, 502, 950);
      Src.small_map_location_drone_fly.set(8, -38, 200).zIndex(1).styles(mapStyle);

      Src.rc.set(742,310,55).zIndex(4)
      Src.car_trunk_open.set(476, 134, 320).zIndex(1);
      Src.cone_1.set(641, 260 + 4 * 1, 58, 34).zIndex(7);
      Src.cone_2.set(641, 260 + 4 * 2, 58, 34).zIndex(6);
      Src.cone_3.set(641, 260 + 4 * 3, 58, 34).zIndex(5);
      Src.cone_4.set(641, 260 + 4 * 4, 58, 34).zIndex(4);
      // cone with shadow in car
      // Src.cone_1_shadow.set(620, 254 + 4 * 0, 78, 75).zIndex(7);
      // Src.cone_2_shadow.set(620, 254 + 4 * 1, 78, 75).zIndex(6);
      // Src.cone_3_shadow.set(620, 254 + 4 * 2, 78, 75).zIndex(5);
      // Src.cone_4_shadow.set(620, 254 + 4 * 3, 78, 75).zIndex(4);

      Src.drone_for_fly.set(670, 311, 45).zIndex(5);
      // Src.drone_for_fly_shadow_upscaled.set(649, 298, 66).zIndex(2);
      
      // final positions
      // Src.drone_for_fly_shadow_upscaled.set(308, 287, 66).zIndex(5);
      // Src.cone_1_shadow.set(242, 225, 78, 75).zIndex(7);
      // Src.cone_2_shadow.set(401, 209, 78, 75).zIndex(6);
      // Src.cone_3_shadow.set(254, 324, 78, 75).zIndex(5);
      // Src.cone_4_shadow.set(430, 297, 78, 75).zIndex(4);

      let zoomImgs = []
      let frameIdx = 0
      const frames = [
        //Explanation
        ()=>{
          Util.setCC("To start the survey, you have to follow the above steps.")
          Scenes.stepModal({
            title: "Marking the Take-Off Area:",
            description: "1. Select a safe, flat location for take-off. <br> 2. Place four safety cones around the area to keep the ground crew safe. "
          }, ()=>{
            frames[++frameIdx]()
          }, 30, 270, 416).fadeShow(900)
        },
        // cone 1 drag
        ()=>{
          Util.setCC("Drag the Cone and place it in the ground.");

          let draggableComponent = Src.cone_1;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(253, 208, 65, 53)
            .setDraggable(draggableComponent, 262, 236)
            .active(() => {
              draggableComponent.fadeHide(200)
              Src.cone_1_shadow.set(242, 225, 78, 75).fadeShow(200,()=>{
                frames[++frameIdx]()
              })

            });
        },
        // cone 2 drag
        ()=>{
          Util.setCC("Drag the Cone and place it in the ground.");

          let draggableComponent = Src.cone_2;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(413, 190, 65, 53)
            .setDraggable(draggableComponent, 422, 218)
            .active(() => {
              draggableComponent.fadeHide(200)
              Src.cone_2_shadow.set(401, 209, 78, 75).fadeShow(200,()=>{
                frames[++frameIdx]()
              })
            });
        },
        // cone 3 drag
        ()=>{
          Util.setCC("Drag the Cone and place it in the ground.");

          let draggableComponent = Src.cone_3;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(265, 306, 65, 53)
            .setDraggable(draggableComponent, 274, 334)
            .active(() => {
              draggableComponent.fadeHide(200)
              Src.cone_3_shadow.set(254, 324, 78, 75).fadeShow(200,()=>{
                frames[++frameIdx]()
              })
            });
        },
        // cone 4 drag
        ()=>{
          Util.setCC("Drag the Cone and place it in the ground.");

          let draggableComponent = Src.cone_4;
          Dom.setBlinkArrowOnElement(draggableComponent, "bottom").play();
          new DragAndDrop()
            .setDroppable(441, 282, 65, 53)
            .setDraggable(draggableComponent, 450, 306)
            .active(() => {
              draggableComponent.fadeHide(200)
              Src.cone_4_shadow.set(430, 297, 78, 75).fadeShow(200,()=>{
                frames[++frameIdx]()
              })
            });
        },
        // Drone drag
        ()=>{
          Util.setCC("Drag the drone and place it between the four cones.");

          let draggableComponent = Src.drone_for_fly;
          Dom.setBlinkArrowRed(695, 358).play();
          new DragAndDrop()
            .setDroppable(322, 265, 65, 91)
            .setDraggable(draggableComponent, 329, 290)
            .active(() => {
              anime({
                targets: draggableComponent.item,
                easing: "linear",
                top: 300,
                duration: 500,
                complete(){
                  draggableComponent.fadeHide(200)
                  Src.drone_for_fly_shadow_upscaled.set(308, 287, 66).fadeShow(200,()=>{
                    frames[++frameIdx]()
                  })
                }
              })
            });
        },

        // Drone button zoom
        () => {
          Util.setCC("Click on the Drone to see the zoom view.");

          Src.drone_for_fly_shadow_upscaled.set(308, 287, 66).zIndex(5);

          let zoomPos = [232, 162,288];
          zoomImgs = [
            Src.drone_power_btn_zoom,
            Src.drone_power_btn_zoom_1,
            Src.drone_power_btn_zoom_2,
            Src.drone_power_btn_zoom_3,
            Src.drone_power_btn_zoom_4,
            Src.drone_power_btn_zoom_5,
            Src.drone_power_btn_zoom_6,
          ];

          zoomImgs.forEach((img, idx) => {
            img
              .set(...zoomPos)
              .zIndex(20 + idx)
              .hide();
          });

          Scenes.maskClick(
            () => {
              anime
                .timeline({
                  easing: "linear",
                  duration: 2000,
                })
                .add({
                  begin() {
                    zoomImgs[0].fadeShow(1000);
                  },
                })
                .add({
                  begin(){
                    zoomImgs[1].fadeShow(1000,()=>{
                      zoomImgs[0].hide()
                    })
                  }
                })                
                .add({
                  begin() {
                    Util.setCC("Turn on the button.");
                    let fadeDuration = 300
                    Scenes.maskClick(
                      () => {
                        anime.timeline({
                          duration: fadeDuration,
                          easing: "linear",
                        })
                        .add({
                          begin(){
                            zoomImgs[2].fadeShow(fadeDuration)
                          }
                        })
                        .add({
                          begin(){
                            zoomImgs[3].fadeShow(fadeDuration)
                          }
                        })
                        .add({
                          begin(){
                            zoomImgs[4].fadeShow(fadeDuration)
                          }
                        })
                        .add({
                          begin(){
                            zoomImgs[5].fadeShow(fadeDuration)
                          }
                        })
                        .add({
                          begin(){
                            zoomImgs[6].fadeShow(fadeDuration)
                          },
                          complete(){
                            let droneStartSound = new Audio("../src/other/drone_startup.mp3")
                            
                            droneStartSound.play().then(()=>{
                              Scenes.stepModal({
                                title: "",
                                description: "The drone is powered on and can be connected to the controller."
                              }, ()=>{
                                zoomImgs.forEach((img)=>{
                                  img.hide()
                                })
                                frames[++frameIdx]()
                              }, 61, 335, 269).fadeShow(900)
                            })
                          }

                        })
                      },
                      403,
                      286,
                      50,
                      56,
                      0
                    );
                    Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
                  },
                });
            },
            326,
            294,
            57,
            88,
            0
          );
          Dom.setBlinkArrowOnElement(Src.mask, "top").play();
        },

        //Controller open and zoom
        ()=>{
          Src.rc_on.set(680, 175, 255).hide().zIndex(5)
          Src.rc_on_2.set(680, 175, 255).hide().zIndex(6)
          Util.setCC("To operate the controller, first lift the controller from the car's trunk.").onend(()=>{
            Util.setCC("Click on the controller to lift it.")
            Scenes.maskClick(()=>{
              //680, 175, 255
              anime({
                targets: Src.rc.item,
                left: 680,
                // top: 175,
                keyframes: [{top: 152}, {top: 175}],
                height: 255,
                easing: "linear",
                duration: 1000,
                complete(){
                  //turn on the controller
                  Util.setCC("Power on the controller.")
                  Scenes.maskClick(()=>{
                    Src.rc_on.fadeShow(300)
                    Src.rc_on_2.fadeShow(400)

                    //Click screen and see the zoom view
                    Util.setCC("Click on the screen to see the zoom view.")
                    Scenes.maskClick(()=>{
                      //next func call
                      frames[++frameIdx]()

                    }, 711, 187, 86, 170)
                    Dom.setBlinkArrowOnElement(Src.mask, "top").play()

                  }, 759, 324, 20, 31)
                  Dom.setBlinkArrowOnElement(Src.mask, "left").play()
                }
              })
            }, 744, 307, 60, 49)
            Dom.setBlinkArrowOnElement(Src.mask, "bottom").play();
          })

        },

        // controller screen setup
        () => {
          // Scenes.StepProcess.start();
          // Scenes.experimentHeading("Land Surveying using Drone");
          // Util.setCC("...");
          // Src.background_gcp_1.set(-485, -257, 711, 1440);
          Src.screenzoomopen.set(10, -20, 452).zIndex(16);

          let displayPos = [70, 7, 400, 809];

          let imgs = [
            Src.controller_scr1,
            Src.controller_scr2,
            Src.controller_scr3,
            Src.controller_scr4,
            Src.controller_scr5,
            Src.controller_scr6,
            Src.controller_scr7,
            Src.controller_scr8,
            Src.controller_scr9,
            Src.controller_scr10,
            Src.controller_scr11,
            Src.controller_scr12,
            Src.controller_scr12_1,
            Src.controller_scr13,
            Src.controller_scr14,
            Src.controller_scr14_1,
            Src.controller_scr14_2,
            Src.controller_scr14_3,
            Src.controller_scr14_4,
            Src.controller_scr14_5,
            Src.controller_scr14_6,
            Src.controller_scr14_7,
            Src.controller_scr14_8,
            Src.controller_scr14_9,
            Src.controller_scr14_10,
            Src.controller_scr14_11,
            Src.controller_scr15,
          ];

          imgs.forEach((img) => {
            img.set(...displayPos).hide().zIndex(15);
          });

          //idx for mask Clicks
          let maskClickIdx = 0;

          let maskClicksPos = [
            [92, 339, 60, 128], // click plan
            [121, 78, 94, 132], //click 2d photo
            [107, 301, 35, 42], //select click
            [402, 301, 35, 42], //select click
            [435, 179, 35, 42], //select click
            [609, 100, 35, 42], //select click
            [147, 106, 35, 42], //select click
            [129, 158, 35, 42], //select click
            [164, 215, 35, 42], //select click
            [774, 368, 35, 96], // click save
            [789, 361, 26, 65], //click invoke
            [789, 361, 26, 65], //click start
            [517, 271, 35, 79], //click ok
            [312, 221, 52, 327], //slide to execute

            //for no error
            [697, 94, 27, 197, 0], //gnss setting
          ];

          /**
           * @param {Dom} toShow
           */
          const screenAnimation = (
            toShow,
            nextImgs = [],
            onComplete = () => {}
          ) => {
            // for parameters
            let maskClickDelay = 400;
            let slideShowDelay = 500;

            // slideshow function
            function imgsSlideShow(nextImgs = [], imgIdx = 0) {
              if (imgIdx == nextImgs.length) {
                [toShow, ...nextImgs].forEach((img) => img.hide());
                onComplete();
                return;
              }

              console.log(imgIdx, nextImgs[imgIdx].item);
              nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
                imgsSlideShow(nextImgs, imgIdx + 1);
              });
            }

            toShow.show();
            setTimeout(() => {
              Scenes.maskClick(() => {
                console.log("Current:", maskClickIdx);

                imgsSlideShow(nextImgs);
              }, ...maskClicksPos[maskClickIdx++]);
            }, maskClickDelay);
          };
          const displayFrames = () => {
            function frame1() {
              Util.setCC('Click on "Plan".');

              let toShow = Src.controller_scr1;
              let nextImgs = [Src.controller_scr2];
              let nextFrame = frame2;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame2() {
              Util.setCC('Click on "2D photogrammetry".');
              let toShow = Src.controller_scr2;
              let nextImgs = [Src.controller_scr3];
              let nextFrame = frame3;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame3() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr3;
              let nextImgs = [Src.controller_scr4];
              let nextFrame = frame4;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame4() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr4;
              let nextImgs = [Src.controller_scr5];
              let nextFrame = frame5;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame5() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr5;
              let nextImgs = [Src.controller_scr6];
              let nextFrame = frame6;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame6() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr6;
              let nextImgs = [Src.controller_scr7];
              let nextFrame = frame7;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame7() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr7;
              let nextImgs = [Src.controller_scr8];
              let nextFrame = frame8;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame8() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr8;
              let nextImgs = [Src.controller_scr9];
              let nextFrame = frame9;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame9() {
              Util.setCC("Click on the highlighted box.");
              let toShow = Src.controller_scr9;
              let nextImgs = [Src.controller_scr10, Src.controller_scr11];
              let nextFrame = frame10;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
            function frame10() {
              Util.setCC("Click on 'Save' button.");
              let toShow = Src.controller_scr12;
              let nextImgs = [Src.controller_scr12_1];
              let nextFrame = frame11;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame11() {
              Src.controller_scr12_1.show();
              //taking input
              let st = {
                border: "none",
                "border-radius": "5px",
                outline: "none",
                "font-size": "20px",
                padding: "2px",
                color: "gray",
                width: "176px",
                "font-family": "Arial, Helvetica, sans-serif",
                "background-color": "#d8d3e8",
              };
              Scenes.inputBox(
                () => {
                  Scenes.maskClick(
                    () => {
                      Src.controller_scr13.show();
                      Scenes.ipBox.hide();
                      Src.controller_scr12_1.hide();
                      frame12();
                      // screenAnimation(toShow, nextImgs,nextFrame)
                    },
                    490,
                    248,
                    36,
                    162
                  );
                },
                "DRONE JOB",
                st,
                387,
                194
              );
              Util.setCC("Please give name 'DRONE JOB' !!");
            }

            function frame12() {
              Util.setCC('Click on "Invoke". ');
              let toShow = Src.controller_scr13;
              let nextImgs = [Src.controller_scr14];
              let nextFrame = frame13;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame13() {
              Util.setCC("Click on 'Start'. ");
              let toShow = Src.controller_scr14;
              let nextImgs = [Src.controller_scr14_2];
              let nextFrame = frame14;
              screenAnimation(toShow, nextImgs, nextFrame);
            }
            function frame14() {
              let toShow = Src.controller_scr14_2;
              let nextImgs = [
                Src.controller_scr14_3,
                Src.controller_scr14_4,
                Src.controller_scr14_5,
                Src.controller_scr14_6,
                Src.controller_scr14_7,
                Src.controller_scr14_8,
                Src.controller_scr14_9,
                Src.controller_scr14_10,
              ];
              let nextFrame = frame15;
              screenAnimation(toShow, nextImgs, nextFrame);
            }

            function frame15() {
              Util.setCC("Click to Execute. ");
              let imgs = [
                Src.i10_transparent.set(...displayPos).zIndex(15),
                Src.i10_slideer.set(-189, 6, 402, 809).zIndex(14),
                Src.i10_yellow_slide.set(70, -3, 417, 809).zIndex(13)
                // Src.i10_transparent.set(...displayPos).zIndex(10),
                // Src.i10_slideer.set(-189, 6, 402, 809).zIndex(9),
                // Src.i10_yellow_slide.set(70, -3, 417, 809).zIndex(8)
              ]

              Scenes.maskClick(
                () => {
                  anime({
                    targets: Src.i10_slideer.item,
                    left: 70,
                    easing: "linear",
                    duration: 2000,
                    complete(){
                      // frames[++frameIdx]()
                      //after complete zoomout
                      Src.controller_scr15.fadeShow(300).zIndex(16)
                      setTimeout(()=>{
                        imgs.forEach((img)=>{
                          img.hide()
                        })
                      }, 400)
                      //zoom out animation
                      Util.setCC("Click on the screen to zoom out.").onend(()=>{
                        Scenes.maskClick(()=>{
                          //todo set left top according to next frame
                          // Src.screenzoomopen.set(392+6, 170, 266).zIndex(10);
                          // Src.controller_scr15.set(427+6,180,257,479).zIndex(10).rotate(1)
                          anime.timeline({
                            easing: "linear",
                            duration: 2000,
                          }).add({
                            targets: Src.screenzoomopen.item,
                            left: 398,
                            top: 170, 
                            height: 266
                          }, 0)
                          .add({
                            targets: Src.controller_scr15.item,
                            left: 427+6,
                            top: 180,
                            height: 257,
                            width: 479,
                            rotate: 1
                          }, 0)
                          .add({
                            complete(){
                              //call next frame
                              frames[++frameIdx]()

                            }
                          })
                          // anime({
                          //   targets:[Src.screenzoomopen.item, Src.controller_scr15.item],
                          //   left: 432,
                          //   top: 290,
                          //   height: 266,
                          //   // easing: "linear",
                          //   duration: 2000, 
                          //   complete(){
                          //     //call next frame
                          //     frames[++frameIdx]()
                          //   }
                          // })
                        }, 11, -22, 456, 928)
                      })

                    }
                  });
                },
                312,
                221,
                52,
                327
              );
            }

            frame1();
            // maskClickIdx = 11
            // frame12();
            // frame8();
          };

          displayFrames();

          // return true;
        },


        // Drone fly anime
        () =>{
          Src.screenzoomopen.set(392+6, 170, 272, 548).zIndex(10);
          Src.controller_scr16.set(427+5,180,257,479).zIndex(10).rotate(1)
          Src.controller_scr15.hide()
          Src.drone_for_fly_shadow_upscaled.set(308, 287, 66).zIndex(5);
          Src.cone_1_shadow.set(242, 225, 78, 75).zIndex(7);
          Src.cone_2_shadow.set(401, 209, 78, 75).zIndex(6);
          Src.cone_3_shadow.set(254, 324, 78, 75).zIndex(5);
          Src.cone_4_shadow.set(430, 297, 78, 75).zIndex(4);

          // Src.black_bcg.set(200,200,10,100).zIndex(100)

          Src.location_drone_arrow.set(645, 289, 20, 20).zIndex(12)
          const droneArrow = Src.location_drone_arrow

          const droneFlyingControllerAnime = (completeAnime=()=>{})=>{
            let sendIdx = 0;
            const sendArrowTo = (left,top) => {
              console.log(sendIdx)
              let duration = 2000
              if(sendIdx%2==0 && sendIdx != 0 && sendIdx!= 30)
                duration = 300
              sendIdx++
                
              return {
                left: left-10,
                top: top-10,
                duration,
              }
            }
            const rotateArrow = (angle) => {
              let duration = 300
              
              return {
                rotate: angle,
                duration
              }
            }

            anime({
              easing: "linear",
              targets: droneArrow.item, 
              keyframes: [
                rotateArrow(-118),
                sendArrowTo(463,403),
  
                // in mesh
                rotateArrow(86),
                sendArrowTo(722,400),
                
                rotateArrow(9),
                sendArrowTo(723, 386),
  
                rotateArrow(-90),
                sendArrowTo(448, 384),
  
                rotateArrow(26),
                sendArrowTo(456, 373),
                
                rotateArrow(90),
                sendArrowTo(727, 372),
                
                rotateArrow(9),
                sendArrowTo(731, 358),
                
                rotateArrow(-90),
                sendArrowTo(468, 358),
  
                rotateArrow(26),
                sendArrowTo(479, 342),
  
                rotateArrow(90),
                sendArrowTo(735, 344),
  
                rotateArrow(9),
                sendArrowTo(739, 330),
  
                rotateArrow(-90),
                sendArrowTo(488, 330),
  
                rotateArrow(26),
                sendArrowTo(499, 316),
  
                rotateArrow(90),
                sendArrowTo(743, 317),
  
                rotateArrow(6),
                sendArrowTo(747, 302),
  
                rotateArrow(-90),
                sendArrowTo(497, 304),
  
                rotateArrow(-46),
                sendArrowTo(485, 290),
  
                rotateArrow(90),
                sendArrowTo(752, 289),
  
                rotateArrow(66),
                sendArrowTo(785, 275),
  
                rotateArrow(-90),
                sendArrowTo(470, 275),
  
                rotateArrow(0),
                sendArrowTo(470, 262),
  
                rotateArrow(90),
                sendArrowTo(822, 261),
  
                rotateArrow(66),
                sendArrowTo(854, 247),
  
                rotateArrow(-90),
                sendArrowTo(470, 248),
  
                rotateArrow(0),
                sendArrowTo(470, 233),
  
                rotateArrow(90),
                sendArrowTo(889, 232),
  
                rotateArrow(-9),
                sendArrowTo(888, 218),
  
                rotateArrow(-90),
                sendArrowTo(480, 218),
  
                rotateArrow(46),
                sendArrowTo(502, 204),
  
                rotateArrow(90),
                sendArrowTo(885, 205),
  
                // return to home RTH
                rotateArrow(245),
                sendArrowTo(655, 292),
  
                rotateArrow(360)
              ],
              complete(){
                completeAnime()
              }
            })
          }

          function droneFlyingRTH(){
            let flyingImgProps = [529, -118, 45] 

            let droneFlyingImgs = [
              Src.drone_flying_0.set(...flyingImgProps).show(),
              Src.drone_flying_1.set(...flyingImgProps).hide(),
              Src.drone_flying_2.set(...flyingImgProps).hide(),
            ]

            anime.timeline({
              easing: "linear",
            })
            .add({
              targets: droneFlyingImgs.map(img=>img.item),
              left: 490,  
              top: 169,
              duration: 6000,
              update: function(anim) {
                const progress = anim.progress;
                if (progress % 3 <= 0) {
                  droneFlyingImgs[0].show();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].hide();
                } else if (progress % 3 <= 1) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].show();
                  droneFlyingImgs[2].hide();
                } else if(progress % 3 <= 2) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].show();
                }
              }
            })
            .add({
              targets: droneFlyingImgs.map(img=>img.item),
              left: 329,  
              duration: 1500,
              update: function(anim) {
                const progress = anim.progress;
                if (progress % 3 <= 0) {
                  droneFlyingImgs[0].show();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].hide();
                } else if (progress % 3 <= 1) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].show();
                  droneFlyingImgs[2].hide();
                } else if(progress % 3 <= 2) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].show();
                }
              }
            })
            .add({
              targets: droneFlyingImgs.map(img=>img.item),
              duration: 6000,
              keyframes: [
                {top: 298,  height: 54,},
                {},
              ],
              update: function(anim) {
                const progress = anim.progress;
                if(progress < 3){
                  Src.drone_for_fly.hide()
                }
                if (progress % 3 <= 0) {
                  droneFlyingImgs[0].show();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].hide();
                } else if (progress % 3 <= 1) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].show();
                  droneFlyingImgs[2].hide();
                } else if(progress % 3 <= 2) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].show();
                }
              }
            })
            .add({
              duration: 3000,
              begin(){
                droneFlyingImgs.forEach(img=>img.fadeHide())
                Src.drone_for_fly_shadow_upscaled.fadeShow()
              },
              complete(){
                Scenes.StepProcess.done()
              }
            })
          }

          function droneFlyingStart(){
            let flyingImgProps = [329, 300 - 2, 45 + 4] 

            let droneFlyingImgs = [
              Src.drone_flying_0.set(...flyingImgProps).hide(),
              Src.drone_flying_1.set(...flyingImgProps).hide(),
              Src.drone_flying_2.set(...flyingImgProps).hide(),
            ]

            anime.timeline({
              easing: "linear",
            })
            // .add({
            //   duration: 2000,
            //   begin(){
            //     Src.drone_for_fly.set(329, 300, 45).fadeShow(2000)
            //     Src.drone_for_fly_shadow_upscaled.fadeHide(2000)
            //   },
            // })
            .add({
              delay: 5000,
              targets: droneFlyingImgs.map(img=>img.item),
              duration: 6000,
              keyframes: [
                {},
                {top: 169,  height: 65,},
              ],
              update: function(anim) {
                const progress = anim.progress;
                if(progress < 15){
                  Src.drone_for_fly_shadow_upscaled.fadeHide()
                }
                if (progress % 3 <= 0) {
                  droneFlyingImgs[0].show();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].hide();
                } else if (progress % 3 <= 1) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].show();
                  droneFlyingImgs[2].hide();
                } else if(progress % 3 <= 2) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].show();
                }
              }
            })
            .add({
              targets: droneFlyingImgs.map(img=>img.item),
              left: 490,  
              duration: 1500,
              update: function(anim) {
                const progress = anim.progress;
                if (progress % 3 <= 0) {
                  droneFlyingImgs[0].show();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].hide();
                } else if (progress % 3 <= 1) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].show();
                  droneFlyingImgs[2].hide();
                } else if(progress % 3 <= 2) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].show();
                }
              }
            })
            .add({
              targets: droneFlyingImgs.map(img=>img.item),
              left: 529,  
              top: -118,
              height: 45,
              duration: 6000,
              update: function(anim) {
                const progress = anim.progress;
                if (progress % 3 <= 0) {
                  droneFlyingImgs[0].show();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].hide();
                } else if (progress % 3 <= 1) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].show();
                  droneFlyingImgs[2].hide();
                } else if(progress % 3 <= 2) {
                  droneFlyingImgs[0].hide();
                  droneFlyingImgs[1].hide();
                  droneFlyingImgs[2].show();
                }
              }
            })
            .add({
              begin(){
                droneFlyingControllerAnime(droneFlyingRTH)
              }
            })
          }

          droneFlyingStart()
        },

      ]

      // frameIdx = 0;
      frames[frameIdx]()
    },

    //! Laptop screen
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Post-Survey Data Collection, Analysis and Reporting");
      Util.setCC("...");



      //All the removable images
      //img5, img8, img10

      //! for table setup
      // Src.table.set(53, -51, 600)
      // Src.laptop.set(452, 45, 225).zIndex(2)
      // Src.laptop_screen.set(488, 49, 112, 211).zIndex(3)
      // Src.drone_final.set(75, 55, 231).zIndex(2)
      // Scenes.maskClick(()=>{
      //   frame1()
      // }, 485, 42, 230, 215)

      Src.laptop_frame.set(-3, -50, 502, 958).hide();

      let displayPos = [10, -29, 463, 1032];
      let displayPos_2 = [9, -29, 463, 1034];

      let imgs = [
        Src.img1,
        Src.img2,
        Src.img3,
        Src.img4,
        Src.img5,
        Src.img6,
        Src.img7,
        Src.img8,
        Src.img9,
        Src.img10,
        Src.img11,
        Src.img12,
        Src.img13,
        Src.img14,
        Src.img15,
        Src.img16,
        Src.img17,
        Src.img18,
        Src.img19,
        Src.img20,
        Src.img21,
        Src.img22,
        Src.img23,
        Src.img24,
        Src.img25,
        Src.img26,
        Src.img27,
        Src.img28,
        Src.img29,
        Src.img30,
        Src.img31,
        Src.img32,
        Src.img33,
        Src.img34,
        Src.img35,
        Src.img36,
        Src.img37,
        Src.img38,
        Src.img39,
        Src.img40,
        Src.img17_GCP_1,
        Src.img17_GCP_2,
        Src.img17_GCP_3,
        Src.img17_GCP_4,
        Src.img17_GCP_5,
        Src.img17_GCP_6,
        Src.img17_GCP_7,
        Src.img17_GCP_8,
        Src.img17_GCP_9,
        Src.img17_GCP_10_click_down_arrow
      ];

      imgs.forEach((img) => {
        img.set(...displayPos).hide();
      });

      //image that's is different from all

      Src.img41.set(-38, -29, 463, 1031).hide();

      let fromNextVidImgs = [
        Src.img42,
        Src.img43,
        Src.img44,
        Src.img45,
        Src.img46,
        Src.img47,
        Src.img48,
        Src.img49,
        Src.img50,
        Src.img51,
        Src.img52,
        Src.img53,
        Src.img54,
        Src.img55,
        Src.img56,
        Src.img57,
        Src.img58,
        Src.img59,
        Src.img60,
        Src.img61,
        Src.img62,
        Src.img63,
        Src.img64,
      ];

      fromNextVidImgs.forEach((img) => {
        img.set(...displayPos_2).hide();
      });

      //idx for mask Clicks
      let maskClickIdx = 0;

      let maskClicksPos = [
        [10, 40, 63, 64], //desktop icon click
        [339, 172, 27, 121], //select from disk
        [343, 197, 20, 79], //select folder
        [29, 81, 23, 79], //select desktop
        [157, 57, 28, 106], //select golf_part
        [457, 257, 28, 93], //select folder
        [538, 247, 33, 68], //click start

        //! new gcp positions added
        [251,373,24,258], //click tie points
        [495, 280, 31, 111], //select from disk
        [170, 67, 27, 77], //click folder golf_part
        [175, 56, 78, 79], //click on .csv file
        [482, 270, 25, 79], //click on open
        [260, 85, 19, 532], //horizontal 
        [260, 85+15, 19, 532], //horizontal 
        [260, 119, 19, 532], //vertical 
        [260, 119+15, 19, 532], //vertical 
        [659, 355, 36, 66], //apply

        [915, 37, 24, 32], //side click
        [78, -19, 20, 58], //click process
        [89, -6, 23, 79], //click calibration
        [50, 104, 25, 23], //check box
        [50, 131, 25, 23], //check box
        [50, 131 + 27, 25, 23], //check box
        [50, 131 + 27 + 27, 25, 23], //check box
        [50, 131 + 27 + 27 + 27, 25, 21], //check box
        [50, 330, 38, 192], //click start
        [886, 16, 23, 24], //click 3d
        [9, -22, 14, 25], //click file
        [9, 121, 23, 112], //click export
        [112, 156, 19, 139], //click quality report
        [351, 184, 23, 63], //click save

        [915, 37, 24, 32],

        //for no error
        [697, 94, 27, 197, 0], //gnss setting
      ];

      /**
       * @param {Dom} toShow
       */
      const screenAnimation = (
        toShow,
        nextImgs = [],
        onComplete = () => {}
      ) => {
        // for parameters
        let maskClickDelay = 400;
        let slideShowDelay = 800;

        // slideshow function
        function imgsSlideShow(nextImgs = [], imgIdx = 0) {
          if (imgIdx == nextImgs.length) {
            [toShow, ...nextImgs].forEach((img) => img.hide());
            onComplete();
            return;
          }

          console.log(imgIdx, nextImgs[imgIdx].item);
          nextImgs[imgIdx].fadeShow(slideShowDelay, () => {
            imgsSlideShow(nextImgs, imgIdx + 1);
          });
        }

        toShow.show();
        setTimeout(() => {
          Scenes.maskClick(() => {
            console.log("Current:", maskClickIdx);

            imgsSlideShow(nextImgs);
          }, ...maskClicksPos[maskClickIdx++]);
        }, maskClickDelay);
      };


      const displayFrames = () => {
        function frame0(){
          Src.memory_card.set(289, 139, 28).zIndex(1)
          Util.setCC("Click on drone to eject the memory card and insert it in to laptop.").onend(()=>{
            Scenes.maskClick(()=>{

              anime({
                targets: Src.memory_card.item,
                easing: "easeInOutQuad",
                duration: 4000,
                keyframes: [
                  {left: 400},
                  {left: 433, top: 220},
                  {left: 467, duration: 3000, easing: "easeInOutExpo"},
                ],
                complete(){
                  Src.memory_card.hide()
                  frame0_1()
                }
              })
              
            }, 159, 91,171, 268)
          })        
          
        }
        function frame0_1() {
          Util.setCC("Click on the laptop screen to see the zoom view.");
          let imgs = [
            Src.table.set(53, -51, 600),
            Src.laptop.set(452, 45, 225).zIndex(2),
            Src.laptop_screen.set(488, 49, 112, 211).zIndex(3),
            Src.drone_for_fly_shadow_upscaled.set(75, 55, 231).zIndex(2),
          ];
          Scenes.maskClick(
            () => {
              imgs.forEach((img) => img.hide());
              frame1();
            },
            485,
            42,
            130,
            215
          );
        }
        function frame1() {
          Util.setCC("Click on Application 'Pix 4D matic'.");
          Src.laptop_frame.show();
          let toShow = Src.img1;
          let nextImgs = [Src.img2];
          let nextFrame = frame2;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame2() {
          Util.setCC("Click on 'or select from disk'.");
          let toShow = Src.img2;
          let nextImgs = [Src.img3];
          let nextFrame = frame3;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame3() {
          Util.setCC("Click on 'Select folder'.");
          let toShow = Src.img3;
          let nextImgs = [Src.img4];
          let nextFrame = frame4;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame4() {
          Util.setCC("Click on 'Desktop'.");
          let toShow = Src.img4;
          let nextImgs = [Src.img6];
          let nextFrame = frame5;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame5() {
          Util.setCC("Click on folder 'Golf part'.");
          let toShow = Src.img6;
          let nextImgs = [Src.img7];
          let nextFrame = frame6;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame6() {
          Util.setCC("Click on 'Select folder'.");
          let toShow = Src.img7;
          let nextImgs = [Src.img9];
          let nextFrame = frame7;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame7() {
          Util.setCC("Click on 'Start'.");
          let toShow = Src.img10;
          let nextImgs = [
            Src.img11,
            Src.img12,
            Src.img13,
            Src.img14,
            Src.img15,
          ];
          // let nextFrame = frame8;
          let nextFrame = frame7_1;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        //! add new gcp images
        function frame7_1(){
          Util.setCC("Click on 'Tie points'.");
          let toShow = Src.img15;
          let nextImgs = [
            Src.img17_GCP_1,
          ];
          let nextFrame = frame7_2;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_2(){
          Util.setCC("Click on 'Select from disk'.");
          let toShow = Src.img17_GCP_1;
          let nextImgs = [
            Src.img17_GCP_2,
          ];
          let nextFrame = frame7_3;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_3(){
          Util.setCC("Click on folder 'Golf part'.");
          let toShow = Src.img17_GCP_2;
          let nextImgs = [
            Src.img17_GCP_3,
          ];
          let nextFrame = frame7_4;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_4(){
          Util.setCC("Click on file 'gcps.csv'.");
          let toShow = Src.img17_GCP_3;
          let nextImgs = [
            Src.img17_GCP_4,
          ];
          let nextFrame = frame7_5;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_5(){
          Util.setCC("Click on 'open'.");
          let toShow = Src.img17_GCP_4;
          let nextImgs = [
            Src.img17_GCP_5,
          ];
          let nextFrame = frame7_6;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_6(){
          Util.setCC("Click on 'Horizontal coordinate reference system'.");
          let toShow = Src.img17_GCP_5;
          let nextImgs = [
            Src.img17_GCP_6,
          ];
          let nextFrame = frame7_6_1;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_6_1(){
          Util.setCC("Click on Selected area.");
          let toShow = Src.img17_GCP_6;
          let nextImgs = [
            Src.img17_GCP_7,
          ];
          let nextFrame = frame7_7;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_7(){
          Util.setCC("Click on 'Vertical coordinate reference system'.");
          let toShow = Src.img17_GCP_7;
          let nextImgs = [
            Src.img17_GCP_8,
          ];
          let nextFrame = frame7_7_1;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_7_1(){
          Util.setCC("Click on Selected area.");
          let toShow = Src.img17_GCP_8;
          let nextImgs = [
            Src.img17_GCP_9,
          ];
          let nextFrame = frame7_8;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame7_8(){
          Util.setCC("Click on 'Apply'.");
          let toShow = Src.img17_GCP_9;
          let nextImgs = [
            Src.img17_GCP_10_click_down_arrow,
          ];
          let nextFrame = frame8;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame8() {
          Util.setCC("Click on top right 'Properties symbol'.");
          let toShow = Src.img15;
          let nextImgs = [
            Src.img19,
            Src.img20,
            Src.img21,
            Src.img22,
            Src.img25,
            Src.img27,
          ];
          let nextFrame = frame9;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame9() {
          Util.setCC("Click on 'Process'.");
          let toShow = Src.img27;
          let nextImgs = [Src.img30];
          let nextFrame = frame10;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame10() {
          Util.setCC("Click on 'Calibration'.");
          let toShow = Src.img30;
          let nextImgs = [Src.img32];
          let nextFrame = frame11;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame11() {
          Util.setCC("Turn on 'Dense point cloud'.");
          let toShow = Src.img32;
          let nextImgs = [Src.img33];
          let nextFrame = frame12;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame12() {
          Util.setCC("Click on 'Image pre-processing'.");
          let toShow = Src.img33;
          let nextImgs = [Src.img34];
          let nextFrame = frame13;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame13() {
          Util.setCC("Click on 'Mesh'.");
          let toShow = Src.img34;
          let nextImgs = [Src.img35];
          let nextFrame = frame14;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame14() {
          Util.setCC("Click on 'DSM'.");
          let toShow = Src.img35;
          let nextImgs = [Src.img36];
          let nextFrame = frame15;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame15() {
          Util.setCC("Click on 'Orthomosaic'.");
          let toShow = Src.img36;
          let nextImgs = [Src.img37];
          let nextFrame = frame16;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame16() {
          Util.setCC("Click on 'Start'.");
          let toShow = Src.img37;
          let nextImgs = [Src.img38, Src.img39, Src.img40, Src.img41];
          let nextFrame = frame18;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        //! from new video
        // function frame17(){
        //   let toShow = Src.img40
        //   let nextImgs = [
        //     Src.img41
        //   ]
        //   let nextFrame = frame18
        //   screenAnimation(toShow, nextImgs, nextFrame)
        // }
        function frame18() {
          Util.setCC("Click on top right '3D'.");
          let toShow = Src.img41;
          let nextImgs = [Src.img42];
          let nextFrame = frame19;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame19() {
          Util.setCC("Click on top left 'File'.");
          let toShow = Src.img42;
          let nextImgs = [Src.img43];
          let nextFrame = frame20;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame20() {
          Util.setCC("Click on 'Import'.");
          let toShow = Src.img43;
          let nextImgs = [Src.img44];
          let nextFrame = frame21;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame21() {
          Util.setCC("Click on 'Quality report'.");
          let toShow = Src.img44;
          let nextImgs = [Src.img47];
          let nextFrame = frame22;
          screenAnimation(toShow, nextImgs, nextFrame);
        }
        function frame22() {
          Util.setCC("Click on 'Save'.");
          let toShow = Src.img47;
          let nextImgs = [
            Src.img48,
            Src.img49,
            Src.img50,
            Src.img51,
            Src.img52,
            Src.img53,
            Src.img54,
            Src.img55,
            Src.img61,
          ];
          let nextFrame = frame23;
          screenAnimation(toShow, nextImgs, nextFrame);
        }

        function frame23() {
          Src.img61.show();
          let temp = new Elements.Text()

          temp.dom.setContent(`<a id="down" download href="../src/other/vLabs-land-survey-quality_report.pdf">Download</a>`).hide()
          setTimeout(() => {
            Util.get("#down").click()
            setTimeout(() => {
              Util.setCC("Drone is now completed.")
            }, 1000);
          }, 1000);
          
        }

        frame0();
        // frame6();

      };

      Src.table.set(53, -51, 600),
      Src.laptop.set(452, 45, 225).zIndex(2),
      Src.laptop_screen.set(488, 49, 112, 211).zIndex(3),
      Src.drone_for_fly_shadow_upscaled.set(75, 55, 231).zIndex(2),

      // Src.drone_final.set(75, 55, 231).zIndex(2),

      Util.setCC("To collect the data you have to perform the following steps.")
      Scenes.stepModal({
        title: "To collect the data you have to perform the following steps:",
        description:  "1. Retrieve the memory card from the drone.<br> 2. Insert the memory card into the laptop. <br> 3. Upload the images to mapping software (Pix4Dmatic). "}, ()=>{
          displayFrames();
        }, 195, 280, 610);


      return true;
    },
  ],
};

export default Steps;
