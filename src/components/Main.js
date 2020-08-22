import React, { Component } from 'react';
import { Sequencer } from 'react-nexusui';
import * as Tone from 'tone';
import {getBlankSequence} from '../helpers/sequencer.js'
import {simpleSynth} from '../instruments/synths.js';

class Main extends Component {
    state = {
        sequence: []
    }

    arpLoop = new Tone.Sequence((time, col) => {
        const seq = ['C3', 'E3', 'G3', 'B3'];
        for (let i = 0; i < 4; i++) {
            const sequence = [...this.state.sequence];
            const column = [...sequence[col]]; 
            console.log(column);                    
            if (column[i] === true) {                
                simpleSynth.triggerAttackRelease(seq[i], "8n");
            }
        }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    startAudioContext = async () => {
        await Tone.start()
        const blankSequence = getBlankSequence();
        this.setState({
            sequence: blankSequence
        });
                
    }

    getSequence = () => {
        return [...this.state.sequence];
    }

    play = () => {
        console.log('PLAY');
        Tone.Transport.start();
        this.arpLoop.start();
    }

    stop = () => {
        console.log('STOP');
        Tone.Transport.stop();
        this.arpLoop.stop();
    }

    onSequencerChange = ({row, column, state}) => {
        let sequence = [...this.state.sequence];        
        let newColumn = [...sequence[0]];
        newColumn[row] = state;
        sequence[column] = newColumn;  
        console.log(sequence);  
        this.setState({sequence: sequence});
    }
              

    render() {
        return (
          <div>
              <h1>Test</h1>
              <Sequencer
                rows={4}
                columns={16}                
                size={[400, 200]}              
                value={this.state.sequence}
                onStep={console.warn}
                onChange={this.onSequencerChange}
            />
          <button onClick={this.startAudioContext}>Start</button>
          <button onClick={this.play}>Play</button>
          <button onClick={this.stop}>Stop</button>
          </div>
      )
    }
  }

  export default Main;