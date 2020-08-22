import * as Tone from 'tone';

const simpleSynth = new Tone.Synth({
    envelope  : {
        attack  : 0.005 ,
        decay  : 0.1 ,
        sustain  : 0.3 ,
        release  : 1
    }
}).chain(Tone.Master);

export { simpleSynth }

