"use client"
import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const AddStep = ({ data, update }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
          "fields": []
        }
      ]
    })
    setShowPopup(false);
    setInputValue('');
  };

  return (
    <div>
      <button className='border rounded bg-gray-300 min-w-[150px] w-full' onClick={() => setShowPopup(true)}>
        Add Step
      </button>

      <Modal
        title="Add Step"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}

      >
        <Input
          placeholder="Enter step name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AddStep;
