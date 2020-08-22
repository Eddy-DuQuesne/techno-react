import React, { Component } from 'react';
import { Sequencer, Position } from 'react-nexusui';
import * as Tone from 'tone';
import {getBlankSequence} from '../helpers/sequencer.js'
import Loop from '../loops/Loop.js';

class Main extends Component {
    state = {
        sequence: []
    }

    startAudioContext = async () => {
        await Tone.start()       
    }

    getSequence = () => {
        return [...this.state.sequence];
    }

    play = () => {
        console.log('PLAY');
        Tone.Transport.start();
        this.lead.loop.start();
    }

    stop = () => {
        console.log('STOP');
        Tone.Transport.stop();
        this.lead.loop.stop();
    }
    componentDidMount() {
        const blankSequence = getBlankSequence();
        this.setState({
            sequence: blankSequence
        });            
        this.lead = new Loop(blankSequence); 
    }

    onSequencerChange = ({row, column, state}) => {
        let sequence = [...this.state.sequence];        
        let newColumn = [...sequence[0]];
        newColumn[row] = state;
        sequence[column] = newColumn;  
        this.setState({sequence: sequence});
        this.lead.setSequence(sequence);
    }
              

    render() {
        return (
          <div>
              <h1>Test</h1>
              <Sequencer
                rows={4}
                columns={16}                
                size={[800, 200]}              
                value={this.state.sequence}
                onStep={console.warn}
                onChange={this.onSequencerChange}
            />
            <Position
                size={[150, 150]}
            />
            
          <button onClick={this.startAudioContext}>Start</button>
          <button onClick={this.play}>Play</button>
          <button onClick={this.stop}>Stop</button>
          </div>
      )
    }
  }

  export default Main;