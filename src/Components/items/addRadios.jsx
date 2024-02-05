"use client"
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

const AddRadios = ({ data, update }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [radioLabelValue, setRadioLabelValue] = useState('');
    const [radioNameValue, setRadioNameValue] = useState('');
    const [radioRequireValue, setRadioRequireValue] = useState(false);
    const [radioOptionsValue, setRadioOptionsValue] = useState([]);
    const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
    let radioOptionsTest;

    const handleAddStep = () => {
        if (radioLabelValue == "" || radioNameValue == "") {
            alert("Cannot add field without details!")
            return;
        }

        let fieldToAdd = {
            type: "radio",
            name: radioNameValue,
            label: radioLabelValue,
            required: radioRequireValue
        };

        let filteredSteps = data?.steps?.map((step) => {
            console.log(step?.step_name);
            return step?.step_name === stepValue ? {
                ...step,
                fields: [...step.fields, fieldToAdd]
            } : step;
        });

        update({
            ...data,
            steps: filteredSteps,
        });

        setShowPopup(false);
        setRadioLabelValue('');
        setRadioNameValue('');
        setRadioRequireValue(false);
    };

    const onStepChange = (value) => {
        setStep(value);
    };

    return (
        <div>
            <button className='border rounded bg-gray-300 min-w-[150px] w-full' onClick={() => setShowPopup(true)}>
                Add Radios
            </button>

            {/* Insert Modal here and relevent functions/fields inside the modal */}
            <Modal
                title="Add Radios"
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

                    Radios Details:
                    <Input
                        placeholder="Enter Field Label"
                        value={radioLabelValue}
                        onChange={(e) => setRadioLabelValue(e.target.value)}
                        required={true}
                    />

                    <Input
                        placeholder="Enter Field Name"
                        value={radioNameValue}
                        onChange={(e) => setRadioNameValue(e.target.value)}
                        required={true}
                    />

                    Add Radio Options
                    <Input
                        placeholder="Enter Field Name"
                        value={radioOptionsTest}
                        onChange={(e) => {radioOptionsTest = e.target.value}}
                        onPressEnter={(e) => {setRadioOptionsValue([...radioOptionsValue, e.target.value]); radioOptionsTest = ""}}
                        required={true}
                    />
                    {radioOptionsValue}

                    <Checkbox onChange={(e) => { setRadioRequireValue(e.target.checked) }}>Required?</Checkbox>
                </div>
            </Modal>
        </div>
    )
}

export default AddRadios