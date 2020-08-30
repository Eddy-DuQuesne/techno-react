import React, { Component } from 'react';
import { Sequencer, Position, Dial } from 'react-nexusui';
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

    adjustVolPan = ({x, y}) => {
        this.lead.adjustVolPan(x,y);
    }

    adjustDelayWet = (value) => {
        this.lead.adjustDelayWet(value);
    }

    adjustDelayTime = (value) => {
        this.lead.adjustDelayTime(value);
    }

    adjustDelayFeedback = (value) => {
        this.lead.adjustDelayFeedback(value);
    }

    adjustReverbWet = (value) => {
        this.lead.adjustReverbWet(value);
    }

    adjustReverbDamp = (value) => {
        
        this.lead.adjustReverbDamp(value);
    }
    adjustReverbSize = (value) => {
        this.lead.adjustReverbSize(value);
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
                mode='absolute'
                x={0}
                minX={-1}
                maxX={1}
                stepX={0}
                y={0.5}
                minY={0}
                maxY={1}
                stepY={0}
                onChange={this.adjustVolPan}
            />
            <Dial 
                size={[25, 25]}
                interaction='radial'
                mode='relative'
                min={0}
                max={1}
                step={0}
                value={0}
                onChange={this.adjustDelayWet}
            />
            <Dial 
                size={[25, 25]}
                interaction='radial'
                mode='relative'
                min={0}
                max={1}
                step={0}
                value={0}
                onChange={this.adjustDelayTime}
            />
            <Dial 
                size={[25, 25]}
                interaction='radial'
                mode='relative'
                min={0}
                max={1}
                step={0}
                value={0}
                onChange={this.adjustDelayFeedback}
            />
            <h1>reverb</h1>
            <Dial 
                size={[25, 25]}
                interaction='radial'
                mode='relative'
                min={0}
                max={1}
                step={0}
                value={0}
                onChange={this.adjustReverbWet}
            />
            <Dial 
                size={[25, 25]}
                interaction='radial'
                mode='relative'
                min={0}
                max={1}
                step={0}
                value={0}
                onChange={this.adjustRevertDamp}
            />
            <Dial 
                size={[25, 25]}
                interaction='radial'
                mode='relative'
                min={0}
                max={1}
                step={0}
                value={0}
                onChange={this.adjustReverbSize}
            />
            
          <button onClick={this.startAudioContext}>Start</button>
          <button onClick={this.play}>Play</button>
          <button onClick={this.stop}>Stop</button>
          </div>
      )
    }
  }

  export default Main;