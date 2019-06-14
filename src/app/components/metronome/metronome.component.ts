import { Component, OnInit, Input, Output } from '@angular/core';
import { TimeInterval } from 'rxjs';

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

  ngOnInit() {
    console.log('constructing metronome: ' + this.tempo);
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();

    // setup basic oscillator
    this.oscillator.type = 'sine'; // this is the default - also square, sawtooth, triangle
    this.oscillator.frequency.value = 0; // Hz

    const $this = this;

    this.oscillator.start();

    let beat = 0;

    this.intervalTicker = setInterval(() => {
      console.log('tick on beat ' + beat);
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
  }

}
