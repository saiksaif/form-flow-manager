"use client"
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

const AddTextArea = ({ data, update }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState('');
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputPlaceValue, setInputPlaceValue] = useState('');
  const [inputRequireValue, setInputRequireValue] = useState(false);
  const [inputRowsValue, setInputRowsValue] = useState(1);
  const [inputColsValue, setInputColsValue] = useState(1);
  const [inputMinValue, setInputMinValue] = useState(0);
  const [inputMaxValue, setInputMaxValue] = useState(1);
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);

  const handleAddStep = () => {
    if (inputLabelValue == "" || inputNameValue == "" || inputPlaceValue == "") {
      alert("Cannot add field without details!")
      return;
    }

    let fieldToAdd = {
      type: "textarea",
      name: inputLabelValue,
      label: inputNameValue,
      placeholder: inputPlaceValue,
      rows: inputRowsValue,
      cols: inputColsValue,
      minLength: inputMinValue,
      maxLength: inputMaxValue,
      required: inputRequireValue,
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
    setInputRequireValue(false);
    setInputRowsValue(1);
    setInputColsValue(1);
    setInputMinValue(0);
    setInputMaxValue(1);
  };


  const onStepChange = (value) => {
    setStep(value);
  };

  return (
    <div>
      <button className='border rounded bg-gray-300 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Text Area
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Text Area"
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

          Textarea Rows:
          <InputNumber 
            className='w-full'
            placeholder="Enter Text Area Rows"
            defaultValue={inputRowsValue} 
            min={1} max={20}
            onChange={(value)=>{setInputRowsValue(value);}}
            required={true}
          />

          Textarea Cols:
          <InputNumber 
            className='w-full'
            placeholder="Enter Text Area Cols"
            defaultValue={inputColsValue} 
            min={1} max={20}
            onChange={(value)=>{setInputColsValue(value);}}
            required={true}
          />

          Min length:
          <InputNumber 
            className='w-full'
            placeholder="Enter Min Length" 
            min={inputMinValue} max={1000}
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
            min={inputMinValue + 1} max={1000}
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

export default AddTextArea