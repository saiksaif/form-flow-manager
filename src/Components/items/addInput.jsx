"use client"
import React, { useState } from 'react';
import { Modal, Input, Select } from 'antd';

const AddInput = ({data, update}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState('');
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputPlaceValue, setInputPlaceValue] = useState('');
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);

  const handleAddStep = () => {
    // Perform any necessary logic with the inputValue
    // For example, you can update the data array
    // and then close the modal
  
    let fieldToAdd = {
      name: inputLabelValue,
      label: inputNameValue,
      placeholder: inputPlaceValue,
      require: true
    };
  
    let filteredSteps = data?.steps?.map((step) => {
      console.log(step?.step_name);
      return step?.step_name === stepValue
        ? {
            ...step,
            fields: [...step.fields, fieldToAdd]
          }
        : step;
    });
  
    update({
      ...data,
      steps: filteredSteps,
    });
  
    setShowPopup(false);
    setInputLabelValue('');
    setInputNameValue('');
    setInputPlaceValue('');
  };
  

  const onStepChange = (value) => {
    setStep(value);
  };
console.log('data',data)

  return (
    <div>
      <button className='border rounded bg-gray-300 min-w-[150px]' onClick={() => setShowPopup(true)}>
        Add Text Input
      </button>
      
      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Text Input Field"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <Select
          style={{
            width: 200,
          }}
          value={stepValue}
          onChange={onStepChange}
          options={data?.steps.map((step) => ({
            label: step?.step_name,
            value: step?.step_name,
          }))}
        />

        <Input
          placeholder="Enter Field Label"
          value={inputLabelValue}
          onChange={(e) => setInputLabelValue(e.target.value)}
        />

        <Input
          placeholder="Enter Field Name"
          value={inputNameValue}
          onChange={(e) => setInputNameValue(e.target.value)}
        />

        <Input
          placeholder="Enter Field Placeholder"
          value={inputPlaceValue}
          onChange={(e) => setInputPlaceValue(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default AddInput