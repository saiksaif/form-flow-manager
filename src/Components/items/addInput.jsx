"use client"
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

const AddInput = ({ data, update }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputTypeValue, setInputTypeValue] = useState('');
  const [inputLabelValue, setInputLabelValue] = useState('');
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputPlaceValue, setInputPlaceValue] = useState('');
  const [inputRequireValue, setInputRequireValue] = useState(false);
  const [inputMinValue, setInputMinValue] = useState(0);
  const [inputMaxValue, setInputMaxValue] = useState(1);
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);

  const handleAddStep = () => {
    if (inputTypeValue == "" || inputLabelValue == "" || inputNameValue == "" || inputPlaceValue == "") {
      alert("Cannot add field without details!")
      return;
    }

    let fieldToAdd = {
      type: inputTypeValue,
      name: inputLabelValue,
      label: inputNameValue,
      placeholder: inputPlaceValue,
      required: inputRequireValue,
      minLength: inputMinValue,
      maxLength: inputMaxValue
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
    setInputTypeValue('')
    setInputLabelValue('');
    setInputNameValue('');
    setInputPlaceValue('');
    setInputRequireValue(false);
    setInputMinValue(0);
    setInputMaxValue(1);
  };


  const onStepChange = (value) => {
    setStep(value);
  };

  return (
    <div>
      <button className='border rounded bg-gray-300 min-w-[150px] w-full' onClick={() => setShowPopup(true)}>
        Add Input
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Input Field"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <div className='flex flex-col gap-2'>
          Step:
          <Select
            className='w-full'
            value={stepValue}
            onChange={onStepChange}
            options={data?.steps.map((step) => ({
              label: step?.step_name,
              value: step?.step_name,
            }))}
            required={true}
          />

          Field Type:
          <Select
            className='w-full'
            value={inputTypeValue}
            onChange={setInputTypeValue}
            options={[
              {label: "Text", value: "text"}, 
              {label: "Email", value: "email"}, 
              {label: "Password", value: "password"}
            ]}
            required={true}
          />

          Field Details:
          <Input
            placeholder="Enter Field Label"
            value={inputLabelValue}
            onChange={(e) => setInputLabelValue(e.target.value)}
            required={true}
          />

          <Input
            placeholder="Enter Field Name"
            value={inputNameValue}
            onChange={(e) => setInputNameValue(e.target.value)}
            required={true}
          />

          <Input
            placeholder="Enter Field Placeholder"
            value={inputPlaceValue}
            onChange={(e) => setInputPlaceValue(e.target.value)}
            required={true}
          />

          Min length:
          <InputNumber 
            className='w-full'
            placeholder="Enter Min Length" 
            min={inputMinValue} max={100}
            defaultValue={inputMinValue} 
            onChange={(value)=>{
              setInputMinValue(value); 
              inputMaxValue < inputMinValue ?? setInputMaxValue(inputMinValue+1)
            }}
            required={true}
          />

          Max Length:
          <InputNumber 
            className='w-full'
            placeholder="Enter Max Length" 
            min={inputMinValue + 1} max={100}
            defaultValue={inputMinValue + 1}
            onChange={(value)=>{setInputMaxValue(value)}}
            required={true}
          />

          <Checkbox onChange={(e) => { setInputRequireValue(e.target.checked) }}>Required?</Checkbox>
        </div>
      </Modal>
    </div>
  )
}

export default AddInput