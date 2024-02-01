"use client"
import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const AddInput = ({data, update}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddStep = () => {

    // Perform any necessary logic with the inputValue
    // For example, you can update the data array
    // and then close the modal
    // update([...data, inputValue]);
    setShowPopup(false);
    setInputValue('');
  };

  return (
    <div>
        <button className='border rounded bg-gray-300 min-w-[150px]' onClick={() => setShowPopup(true)}>Add Text Input</button>
        
        {/* Insert Modal here and relevent functions/fields inside the modal */}
        <Modal
        title="Add Item"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}

      >
        <Input
          placeholder="Enter Field Label"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Input
          placeholder="Enter Field Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Input
          placeholder="Enter Field Placeholder"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default AddInput