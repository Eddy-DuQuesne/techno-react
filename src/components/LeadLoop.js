import React, { Component } from 'react';
import { Sequencer, Position, Dial } from 'react-nexusui';


class LeadLoop extends Component {
    componentDidMount() {
        console.log("Props: ",this.props);
    }
    adjustVolPan = ({x, y}) => {
        this.props.lead.adjustVolPan(x,y);
    }

    adjustDelayWet = (value) => {
        this.props.lead.adjustDelayWet(value);
    }

    adjustDelayTime = (value) => {
        console.log(value);
        this.props.lead.adjustDelayTime(value);
    }

    adjustDelayFeedback = (value) => {
        this.props.lead.adjustDelayFeedback(value);
    }

    adjustReverbWet = (value) => {
        this.props.lead.adjustReverbWet(value);
    }

    adjustReverbDamp = (value) => {      
        this.props.lead.adjustReverbDamp(value);
    }
    adjustReverbSize = (value) => {
        this.props.lead.adjustReverbSize(value);
    }

    handeSequencerChange = () => {

    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                <Sequencer
                    rows={4}
                    columns={16}                
                    size={[800, 200]}              
                    value={this.props.sequence}
                    onStep={console.warn}
                    onChange={this.props.onSequencerChange}
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
            </div>
        )
    }
}

export default LeadLoop;
