import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Tile,
  Button,
  Form,
  RadioButton,
  RadioButtonGroup,
  TextInput,
} from 'carbon-components-react';
import AudioWave from '../AudioWave';
import TranscriptBox from '../TranscriptBox';

import wordsToNumbers from 'words-to-numbers';
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
  var bloodPressure = '';
  var pulse = '';
  var oxygen = '';
  var temperature = '';
  transcriptArray.forEach((transcriptItem) => {
    const { text } = transcriptItem;
    if (text) {
      var words = text.toLowerCase().split(' ');
      if (text.toLowerCase().includes('temperature')) {
        if (words.indexOf('temperature') !== words.length) {
          temperature = words[words.indexOf('temperature') + 1];
        }
        if (words.indexOf('temperatures') !== words.length) {
          temperature = words[words.indexOf('temperatures') + 1];
        }
      }
      if (text.toLowerCase().includes('blood pressure')) {
        if (words.indexOf('pressure') !== words.length) {
          bloodPressure = words[words.indexOf('pressure') + 1];
        }
      } 
      if (
        text.toLowerCase().includes('pulse') ||
        text.toLowerCase().includes('also')
      ) {
        if (words.indexOf('pulse') !== words.length) {
          pulse = words[words.indexOf('pulse') + 1];
        }
        if (words.indexOf('also') !== words.length) {
          pulse = words[words.indexOf('also') + 1];
        }
      }
      if (text.toLowerCase().includes('oxygen')) {
        if (words.indexOf('oxygen') !== words.length) {
          oxygen = words[words.indexOf('oxygen') + 1];
        }
      }
    }
  });

  return (
    <Tile className="output-container">
      <h3 className="container-title">Case</h3>
      <h4 className="container-title">Vitals</h4>
      <p className="container-title">
        Fill in the form fields provided according to recorded vitals. If you
        prefer, you can dictate these vitals.
      </p>
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
          className="input"
          id="pulse"
          labelText="Pulse"
          defaultValue={wordsToNumbers(pulse)}
        />
        <TextInput
          className="input"
          id="bloodPressure"
          labelText="Blood Pressure"
          defaultValue={wordsToNumbers(bloodPressure)}
        />
        <TextInput
          className="input"
          id="oxygen"
          labelText="Oxygen"
          defaultValue={wordsToNumbers(oxygen)}
        />
        <TextInput
          className="input"
          id="temperature"
          labelText="Temperature"
          defaultValue={wordsToNumbers(temperature)}
        />
        <FormGroup {...fieldsetRadioProps}>
          <RadioButtonGroup
            onChange={action('onChange')}
            name="radio-button-group"
            defaultSelected="default-selected"
          >
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
        <Button type="submit" className="submit">
          SUBMIT
        </Button>
      </Form>
    </Tile>
  );
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
