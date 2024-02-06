"use client"
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

const AddSelect = ({ data, update }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectLabelValue, setSelectLabelValue] = useState('');
    const [selectNameValue, setSelectNameValue] = useState('');
    const [selectDefaultValue, setSelectDefaultValue] = useState('');
    const [selectRequireValue, setSelectRequireValue] = useState(false);
    const [selectOptionsValue, setSelectOptionsValue] = useState([]);
    const [stepValue, setStep] = useState(data?.steps[0]?.step_name);

    const handleAddStep = () => {
        if (selectLabelValue == "" || selectNameValue == "") {
            alert("Cannot add field without details!")
            return;
        }

        let fieldToAdd = {
            type: "select",
            name: selectNameValue,
            label: selectLabelValue,
            default: selectDefaultValue,
            options: selectOptionsValue,
            required: selectRequireValue
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
        setSelectLabelValue('');
        setSelectNameValue('');
        setSelectDefaultValue('');
        setSelectOptionsValue([]);
        setSelectRequireValue(false);
    };

    const onStepChange = (value) => {
        setStep(value);
    };
    const handleDelete = (indexToDelete) => {
        setSelectOptionsValue(prevOptions => (
            prevOptions.filter((_, index) => index !== indexToDelete)
        ));
    };
    

    return (
        <div>
            <button className='border rounded bg-gray-300 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
                Add Select
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-square"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 10-4 4-4-4"/></svg>
            </button>

            {/* Insert Modal here and relevent functions/fields inside the modal */}
            <Modal
                title="Add Select"
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

                    Selects Details:
                    <Input
                        placeholder="Enter Field Label"
                        value={selectLabelValue}
                        onChange={(e) => setSelectLabelValue(e.target.value)}
                        required={true}
                    />

                    <Input
                        placeholder="Enter Field Name"
                        value={selectNameValue}
                        onChange={(e) => setSelectNameValue(e.target.value)}
                        required={true}
                    />

                    <Input
                        placeholder="Enter Default Value"
                        value={selectDefaultValue}
                        onChange={(e) => setSelectDefaultValue(e.target.value)}
                        required={true}
                    />

                    Add Select Options
                    <Input
                        placeholder="Enter Field Name"
                        // value={selectOptionsTest}
                        // onChange={(e) => {selectOptionsTest = e.target.value}}
                        onPressEnter={(e) => {setSelectOptionsValue([...selectOptionsValue, {label:e.target.value, value: ""}]); e.target = ""}}
                        required={true}
                    />
                    <div className='flex flex-col gap-2'>
                        {selectOptionsValue.map((option, index) => (
                            <div key={index} className='flex w-full gap-2'>
                                <div className='flex justify-between bg-slate-100 p-1 px-4 w-full border rounded-lg'>
                                {option.label}
                                </div>
                                <Input
                                placeholder="Value"
                                value={option.value}
                                onChange={(e) => {
                                    const updatedOptions = [...selectOptionsValue];
                                    updatedOptions[index] = { ...option, value: e.target.value };
                                    setSelectOptionsValue(updatedOptions);
                                }}
                                required={true}
                                />
                                <button className='border rounded-lg bg-slate-200 w-[100px]' onClick={() => handleDelete(index)}>❌</button>
                            </div>
                        ))}
                    </div>

                    <Checkbox onChange={(e) => { setSelectRequireValue(e.target.checked) }}>Required?</Checkbox>
                </div>
            </Modal>
        </div>
    )
}

export default AddSelect