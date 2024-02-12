"use client"
import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const AddStep = ({ data, update }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [onComplete, setOnComplete] = useState('');

  const handleAddStep = () => {
    let multiStep = data?.steps?.length > 0 ? true : false;

    console.log(data?.steps?.length, multiStep)

    update({
      ...data,
      multi_step: multiStep,
      steps: [
        ...data?.steps,
        {
          "step_name": inputValue,
          "onStepComplete": onComplete,
          "fields": []
        }
      ]
    })
    setShowPopup(false);
    setInputValue('');
    setOnComplete('');
  };

  return (
    <div>
      <button className='border rounded bg-gray-300 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Step
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-to-line"><path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/></svg>
      </button>

      <Modal
        title="Add Step"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}

      >
        Step Name:
        <Input
          placeholder="Enter step name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <br />
        <br />

        On Complete (Optional):
        <Input
          placeholder="Enter API to run on completing step."
          value={onComplete}
          onChange={(e) => setOnComplete(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AddStep;
