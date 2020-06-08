let starShader, portalShader, skyboxShader;
let currentState;
let img = [];
let daily = [], isaac = [], tetris = [];
let objects = [];
let cup;
let gl1, gl2; // WebGL pointer
let objtex, objtexloc, tex, texLoc;
let cnv;

function preload() {
  skyboxShader = loadShader('shader/skybox.vert', 'shader/skybox.frag');
  starShader = loadShader('shader/star.vert', 'shader/star.frag');
  portalShader = loadShader('shader/portal.vert', 'shader/portal.frag');

  // load six cubemap textures

  img[0] = loadImage("assets/sample/front.png");
  img[1] = loadImage("assets/sample/back.png");
  img[2] = loadImage("assets/sample/up.png");
  img[3] = loadImage("assets/sample/down.png");
  img[4] = loadImage("assets/sample/right.png");
  img[5] = loadImage("assets/sample/left.png");


  for (let i = 0; i<7; i++){
    isaac[i] = loadImage("assets/isaac/"+i+".png");
    tetris[i] = loadImage("assets/tetris/"+i+".png");
    daily[i] = loadImage("assets/daily/"+i+".png");
  }
}

function setup() {
  cnv = createCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight), WEBGL);


  noStroke();
  textureMode(NORMAL);
  setupCubeMap();
  //setupobjecttexture();

  for (let i = 0; i<7; i++){
    objects[i] = new Portal_Object();
  }
  pState = 1;
  rectMode(CENTER);

  ///////////////SOUND_GENERATE//////////////
  setupOscillator();
  startOscillator();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {

  background(0);
  renderSkyBox(); // draw skybox
  orbitControl();
  stateChange();

  for (let i = 0; i<7; i++){
    objects[i].render();
  }

  push();
  fill(0,0,0,0);
  setupPortal();
  pop();
  /////////////////SOUND_GENERATE/////////////////
  updateOscillator();
  stopOscillator();
  playOscillator();
  detectpeak();
  console.log(currentState);
}

function windowResized() {
  resizeCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight));
}
