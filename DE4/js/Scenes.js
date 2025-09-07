import {
  Dom,
  Util,
  Layout,
  Src,
  Elements,
  DeveloperTools,
  DragAndDrop,
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
      width: "fit-conten2t",
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

    modalBox.zIndex(1000)

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
  inputBox(
    callbackOnClick = () => {},
    input,
    st,
    ipBoxLeft = null,
    ipBoxTop = null,
    ipBoxWidth = null,
    ipBoxHeight = null
  ) {
    let inputBox = new Dom("#inputBox")
    //  empty the value 
    inputBox.item.value = ""
    let errorText = new Dom('#error')
    errorText.setContent(`Please enter ${input} !!`)
    inputBox.set(ipBoxLeft, ipBoxTop, ipBoxHeight, ipBoxWidth).styles(st).zIndex(100)

    inputBox.item.addEventListener("keyup", ()=>{
        if(inputBox.item.value == input ){
          callbackOnClick()
        }
        else{
          // errorText.set(0,0).zIndex(100)
        }
    })
  },
  ipBox: new Dom("#inputBox"),
  setMaskClickStyle(){
    let maskStyle = {}

    switch (Scenes.realCurrentStep) {
      case 20:
      // case 0:
      // case 0:
      // case 0:
      // case 0:
      // case 0:
      // case 0:
      // case 0:
        maskStyle = {
          "box-shadow": "0px 0px 10px 2px",
          "border-radius": "5px",
        }
        break;
    
      default:
        maskStyle = { 
          border: "3px solid #fbff00",
          "box-shadow": "0px 0px 10px 2px",
          "border-radius": "5px",
        }
        break;
    }

    return maskStyle
  },
  maskClick(
    onClick,
    leftAndDevMode = false,
    top = 0,
    height = 100,
    width = 100,
    rotate = 0,
  ) {
    let maskImg = Src.mask;
    // default px
    let leftPx = typeof leftAndDevMode === "boolean" ? 0 : leftAndDevMode;
    maskImg.set(leftPx, top, height, width).rotate(rotate).zIndex(1000);
    maskImg
      .styles({ cursor: "pointer", ...Scenes.setMaskClickStyle() })
      .onClick(() => {
        maskImg.styles({ cursor: "unset", border: "none", boxShadow: "none" });
        maskImg.hide()
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
  steps: [],
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
