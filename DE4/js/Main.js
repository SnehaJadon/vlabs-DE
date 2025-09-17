import { Download, Scenes, Util, Steps } from "./Libs.js";

function init(){
  function lazyLoading() {
    const images = Util.getAll("img");
    images.forEach((img) => {
      img.loading = "lazy";
      img.decoding = "async";
    });
  }

  Scenes.steps = Steps.steps
  lazyLoading();
  Download.spinner(true);
  Download.detectMobileUser();
  Download.detectZoomLevel();
}

function Run(){
  // stepcalling
  Scenes.currentStep = 0;
  Scenes.next();
  Download.init()
  Download.setHeightOfMainContainerAuto()
  Download.spinner(false)
  // DeveloperTools.updateMousePosition()
}

window.addEventListener('load', ()=>{
  Run()
});

document.addEventListener("DOMContentLoaded", () => {
  init();
});