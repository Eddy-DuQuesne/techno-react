import React, { Component } from 'react';
import LeadLoop from './LeadLoop.js'
import * as Tone from 'tone';
import {getBlankSequence} from '../helpers/sequencer.js'
import Loop from '../loops/Loop.js';

class Main extends Component {
    state = {
        sequence: []
    }

    startAudioContext = async () => {
        console.log("Start")
        await Tone.start()       
    }

    getSequence = () => {
        return [...this.state.sequence];
    }

    play = () => {
        console.log("PLAY");
        Tone.Transport.start();
        this.lead.loop.start();
    }

    stop = () => {
        Tone.Transport.stop();
        this.lead.loop.stop();
    }

    componentWillMount() {
        const blankSequence = getBlankSequence();
        this.setState({
            sequence: blankSequence
        });            
        this.lead = new Loop(blankSequence); 
    }
    

    onSequencerChange = ({row, column, state}) => {
        console.log(row, column, state);
        let sequence = [...this.state.sequence];        
        let newColumn = [...sequence[0]];
        newColumn[row] = state;
        sequence[column] = newColumn;  
        this.setState({sequence: sequence});
        this.lead.setSequence(this.state.sequence);
    }              

    render() {
        console.log("this.lead", this.lead)
        return (
         <div>   
          <LeadLoop 
            lead={this.lead}
            sequence={this.state.sequence}
            onSequencerChange={this.onSequencerChange}
          />
            
          <button onClick={this.startAudioContext}>Start</button>
          <button onClick={this.play}>Play</button>
          <button onClick={this.stop}>Stop</button>
          </div>
      )
    }
  }

  export default Main;