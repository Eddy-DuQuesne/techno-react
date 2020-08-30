import * as Tone from 'tone';

class Loop {
    constructor(sequence) {
        this.sequence = sequence;

        this.arpVolPan = new Tone.PanVol();
        
        this.delay = new Tone.FeedbackDelay({
            wet: 0,
            delayTime: 0,
            feedback: 0
        });

        this.reverb = new Tone.Freeverb({
            dampening: 1600,
            wet: 0.01,
            roomSize: 0.05
        });

        this.masterChain = [this.arpVolPan, this.delay, this.reverb, Tone.Master];

        this.basicSynth = new Tone.Synth({
            envelope  : {
                attack  : 0.005 ,
                decay  : 0.1 ,
                sustain  : 0.3 ,
                release  : 1
            }
        }).chain(...this.masterChain);

        this.fmSynth = new Tone.FMSynth({
            envelope  : {
                attack  : 0.01 ,
                decay  : 0.01 ,
                sustain  : 1 ,
                release  : 0.5
                }
        }).chain(...this.masterChain);

        this.amSynth = new Tone.AMSynth({
            envelope  : {
                attack  : 0.01 ,
                decay  : 0.01 ,
                sustain  : 1 ,
                release  : 0.5
                }
        }).chain(...this.masterChain);

    }    
    
    loop = new Tone.Sequence((time, col) => {
        const seq = ['C3', 'E3', 'G3', 'B3'];
        for (let i = 0; i < 4; i++) {
            const column = [...this.sequence[col]];
            if (column[i] === true) { 
                this.fmSynth.triggerAttackRelease(seq[i], "8n");
            }
        }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    setSequence(sequence) {
        this.sequence = sequence;
    }

    setSynth(synth) {
        this.synth = synth;
    }

    adjustVolPan(x, y) {
        this.arpVolPan.volume.input.value = y;
        this.arpVolPan.pan.value = x;
    }

    adjustDelayWet(value) {
        this.delay.wet.value = value;
    }
    
    adjustDelayFeedback(value) {
        this.delay.feedback.value = value;        
    }
    
    adjustDelayTime(value) {
        this.delay.delayTime.value = value;
    }

    adjustReverbWet(value) {
        this.reverb.wet.value = value;
    }

    adjustReverbDamp(value) {
        this.reverb.dampening.value = value;
    }

    adjustReverbSize(value) {
        this.reverb.roomSize.value = value;
    }
}

export default Loop;