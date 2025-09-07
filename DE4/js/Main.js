import { Download, Scenes, DeveloperTools, Util, Steps } from "./Libs.js";

Download.spinner(true)

lazyLoading()

window.addEventListener('load', ()=>{
  Run()
});

function lazyLoading(){
  let images = document.querySelectorAll("img")
  images.forEach(img=>{
    img.loading = "lazy"
    img.decoding = "asynchronous"
  })
}

function Run(){
  Scenes.steps = Steps.steps
  
  // stepcalling
  Scenes.currentStep = 0;
  Scenes.next();

  Download.init()
  Download.spinner(false)

  // DeveloperTools.updateMousePosition()
}