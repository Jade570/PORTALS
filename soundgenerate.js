let osc_sin, osc_tri, osc_saw, osc_square;
let freq, amp, playing, mic, peak, vol;
let sel;

function detectpeak() {
  vol = mic.getLevel();

  if (vol > 0.3) {
    peak = true;
  } else {
    peak = false;
  }
}

function setupOscillator(){
  osc_sin = new p5.Oscillator('sine');
  osc_tri = new p5.Oscillator('triangle');
  osc_saw = new p5.Oscillator('sawtooth');
  osc_square = new p5.Oscillator('square');
}

function startOscillator() {
cnv.mousePressed(function(){
  switch (currentState) {
    case 1:
      osc_sin.start();
      osc_saw.start();
      break;

    case 2:
      osc_square.start();
      osc_saw.start();
      break;

    case 3:
      osc_tri.start();
      osc_square.start();
      break;

    case 4:
      osc_saw.start();
      osc_tri.start();
      break;
  }

  playing = true;
});
}

function stopOscillator() {
  cnv.mouseReleased(function(){
        osc_sin.amp(0, 0.5);
        osc_saw.amp(0, 0.5);
        osc_tri.amp(0, 0.5);
        osc_square.amp(0, 0.5);

    playing = false;
  });
}

function playOscillator(){
  if (playing) {
    switch (currentState) {
      case 1:
        osc_sin.freq(int(freq), 0.1);
        osc_sin.amp(amp, 0.1);

        osc_saw.freq(freq, 0.1);
        osc_saw.amp(1 - amp, 0.1);
        break;

      case 2:
        osc_saw.freq(int(freq), 0.1);
        osc_saw.amp(amp, 0.1);

        osc_square.freq(freq, 0.1);
        osc_square.amp(1 - amp, 0.1);
        break;

      case 3:
        osc_square.freq(int(freq), 0.1);
        osc_square.amp(amp, 0.1);

        osc_tri.freq(freq, 0.1);
        osc_tri.amp(1 - amp, 0.1);
        break;

      case 4:
        osc_tri.freq(int(freq), 0.1);
        osc_tri.amp(amp, 0.1);

        osc_saw.freq(freq, 0.1);
        osc_saw.amp(1 - amp, 0.1);
        break;
    }
  }
}

function updateOscillator() {
  freq = constrain(map(mouseY, height, 0, 100, 500), 100, 500);
  amp = constrain(map(mouseX, 0, width, 0, 1), 0, 1);

}


function stateChange(){
  if (peak == false){
    if (mouseX < width/2){
      currentState = 1;
    }
    else if (mouseX >= width/2){
      currentState = 2;
    }
  }
  else if(peak == true){
    if (mouseX < width/2){
      currentState = 3;
    }
    else if (mouseX >= width/2){
      currentState = 4;
    }
  }
}
