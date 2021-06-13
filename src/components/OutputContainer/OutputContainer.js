import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Tile, Button, Checkbox, Form, FileUploader, NumberInput, RadioButton, RadioButtonGroup, Search, Select, SelectItem, TextArea,TextInput,Toggle } from 'carbon-components-react';
import AudioWave from '../AudioWave';
import TranscriptBox from '../TranscriptBox';

import { action } from '@storybook/addon-actions';

export const OutputContainer = ({
  audioAnalyzer,
  audioDataArray,
  audioDuration,
  audioSource,
  audioWaveContainerRef,
  isTranscribing,
  keywordInfo,
  transcriptArray,
}) => {

const additionalProps = {
  className: 'some-class',
  onSubmit: (e) => {
    e.preventDefault();
    action('FormSubmitted')(e);
  },
};

const radioProps = {
  className: 'some-class',
};

const fieldsetRadioProps = {
  className: 'some-class',
  legendText: 'Responsive?',
};

  return (
  <Tile className="output-container">
    <h3 className="container-title">Case</h3>
    <h4 className="container-title">Vitals</h4>
    <p className="container-title">Fill in the form fields provided according to recorded vitals. If you prefer, you can dictate these vitals.</p>
  <Form {...additionalProps}>
        <FormGroup legendText="Audio">
      <AudioWave
        audioWaveContainerRef={audioWaveContainerRef}
        data={audioDataArray}
        duration={audioDuration}
        isTranscribing={isTranscribing}
        audioSource={audioSource}
        audioAnalyzer={audioAnalyzer}
      />
    </FormGroup>
    <TextInput
  className= 'input'
  id= 'pulse'
  labelText= 'Pulse'
 />
    <TextInput 
  className= 'input'
  id= 'bloodPressure'
  labelText= 'Blood Pressure'
/>
    <TextInput 
      className= 'input'
  id= 'spo2'
  labelText= 'SpO2'
/>
    <TextInput 
  className= 'input'
  id= 'temperature'
  labelText= 'Temperature'
/>
    <FormGroup {...fieldsetRadioProps}>
      <RadioButtonGroup
        onChange={action('onChange')}
        name="radio-button-group"
        defaultSelected="default-selected">
        <RadioButton
          value="standard"
          id="radio-1"
          labelText="Yes"
          {...radioProps}
        />
        <RadioButton
          value="default-selected"
          labelText="No"
          id="radio-2"
          {...radioProps}
        />
      </RadioButtonGroup>
    </FormGroup>
    <FormGroup legendText="Transcript">
      <TranscriptBox
        keywordInfo={keywordInfo}
        transcriptArray={transcriptArray}
      />
    </FormGroup>
    <Button type="submit" className="submit">
      SUBMIT
    </Button>
  </Form>
  </Tile>
  )
};

OutputContainer.propTypes = {
  audioAnalyzer: PropTypes.object.isRequired,
  audioDataArray: PropTypes.arrayOf(PropTypes.number),
  audioDuration: PropTypes.number,
  audioSource: PropTypes.string,
  audioWaveContainerRef: PropTypes.object.isRequired,
  isTranscribing: PropTypes.bool,
  keywordInfo: PropTypes.arrayOf(PropTypes.object),
  transcriptArray: PropTypes.arrayOf(PropTypes.object),
};

OutputContainer.defaultProps = {
  audioDataArray: [],
  audioDuration: 0,
  audioSource: '',
  isTranscribing: false,
  keywordInfo: [],
  transcriptArray: [],
};

export default OutputContainer;
