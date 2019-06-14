import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})

export class MetronomeComponent implements OnInit {

  @Input() tempo: number;
  @Input() beats: number;

  audioContext: AudioContext;
  oscillator: OscillatorNode;
  intervalTicker;

  isStarted = false;


  ngOnInit() {
    console.log('constructing metronome: ' + this.tempo);
  }

  start() {
    // setup basic oscillator
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine'; // this is the default - also square, sawtooth, triangle
    this.oscillator.frequency.value = 0; // Hz
    this.oscillator.start();

    const $this = this;
    let beat = 0;

    this.intervalTicker = setInterval(() => {
      if (!$this.isStarted) {
        return;
      }

      // console.log('tick on beat ' + beat);
      if (beat === 0) {
        $this.oscillator.frequency.value = 520; // Hz
        beat = this.beats;
      } else {
        $this.oscillator.frequency.value = 440; // Hz
      }
      $this.oscillator.connect($this.audioContext.destination);
      beat--;
      setTimeout(() => {
        $this.oscillator.disconnect($this.audioContext.destination);
      }, 200);
    }, 1000 * 60 / this.tempo);

    this.isStarted = true;
  }

  stop() {
    clearInterval(this.intervalTicker);
    this.oscillator.stop();
    this.oscillator.disconnect();
    this.audioContext.close();
    this.isStarted = false;
  }

}
