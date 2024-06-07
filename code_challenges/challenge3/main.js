const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const captureButton = document.getElementById('capture-btn');
const switchButton = document.getElementById('switch-btn');
const resultsElement = document.getElementById('results');

let webcam;
let net;
let isFrontCamera = true;

async function setup() {
  net = await mobilenet.load();
  console.log('MobileNet model loaded.');

  webcam = new Webcam(webcamElement, 'user', canvasElement);

  await webcam.start();
  console.log('Webcam started.');
}

async function captureAndRecognize() {
  
  webcam.snap();

  const img = document.getElementById('canvas');

  const predictions = await net.classify(img);

 
  resultsElement.innerHTML = `
    <h2>Predictions:</h2>
    <ul>
      ${predictions.map(p => `<li>${p.className}</li>`).join('')}
    </ul>
  `;
}

async function switchCamera() {
  isFrontCamera = !isFrontCamera;
  const facingMode = isFrontCamera ? 'user' : 'environment';

 
  await webcam.stop();

 
  webcam = new Webcam(webcamElement, facingMode, canvasElement);


  await webcam.start();
  console.log('Camera switched.');
}


setup();


captureButton.addEventListener('click', captureAndRecognize);
switchButton.addEventListener('click', switchCamera);