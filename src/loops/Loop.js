import * as Tone from 'tone';
import {simpleSynth} from '../instruments/synths.js';

class Loop {
    construct(sequence) {
        this.sequence = sequence;
    }

    loop = new Tone.Sequence((time, col) => {
        const seq = ['C3', 'E3', 'G3', 'B3'];
        for (let i = 0; i < 4; i++) {
            const column = [...this.sequence[col]];
            if (column[i] === true) { 
                console.log('TRUE');
                simpleSynth.triggerAttackRelease(seq[i], "8n");
            }
        }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    setSequence(sequence) {
        this.sequence = sequence;
    }
}

export default Loop;