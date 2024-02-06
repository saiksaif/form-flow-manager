"use client"
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox, DatePicker } from 'antd';

const AddDatePicker = ({ data, update }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [pickerTypeValue, setPickerTypeValue] = useState('');
    const [pickerLabelValue, setPickerLabelValue] = useState('');
    const [pickerNameValue, setPickerNameValue] = useState('');
    const [pickerStartValue, setPickerStartValue] = useState('');
    const [pickerEndValue, setPickerEndValue] = useState('');
    const [pickerRequireValue, setPickerRequireValue] = useState(false);
    const [stepValue, setStep] = useState(data?.steps[0]?.step_name);

    const handleAddStep = () => {
        if (pickerTypeValue == "" || pickerLabelValue == "" || pickerNameValue == "") {
            alert("Cannot add field without details!")
            return;
        }

        let fieldToAdd = {
            type: "date",
            pickerType: pickerTypeValue,
            name: pickerLabelValue,
            label: pickerNameValue,
            startDate: pickerStartValue,
            endDate: pickerEndValue,
            required: pickerRequireValue,
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
        setPickerTypeValue('');
        setPickerLabelValue('');
        setPickerNameValue('');
        setPickerStartValue('');
        setPickerEndValue('');
        setPickerRequireValue(false);
    };


    const onStepChange = (value) => {
        setStep(value);
    };

    return (
        <div>
            <button className='border rounded bg-gray-300 min-w-[150px] w-full' onClick={() => setShowPopup(true)}>
                Add Date Picker
            </button>

            {/* Insert Modal here and relevent functions/fields inside the modal */}
            <Modal
                title="Add Date Picker"
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

                    Date Picker Type:
                    <Select
                        className='w-full'
                        value={pickerTypeValue}
                        onChange={setPickerTypeValue}
                        options={[
                            { label: "Simple", value: "simple" },
                            { label: "Range", value: "range" }
                        ]}
                        required={true}
                    />

                    Date Picker Details:
                    <Input
                        placeholder="Enter Date Picker Label"
                        value={pickerLabelValue}
                        onChange={(e) => setPickerLabelValue(e.target.value)}
                        required={true}
                    />

                    <Input
                        placeholder="Enter Date Picker Name"
                        value={pickerNameValue}
                        onChange={(e) => setPickerNameValue(e.target.value)}
                        required={true}
                    />

                    Start Date (Optional):
                    <DatePicker onChange={setPickerStartValue} />

                    End Date (Optional):
                    <DatePicker onChange={setPickerEndValue} />

                    <Checkbox onChange={(e) => { setPickerStartValue("Today") }}>Use Today as Start date</Checkbox>

                    <Checkbox onChange={(e) => { setPickerEndValue("Today") }}>Use Today as End date</Checkbox>

                    <Checkbox onChange={(e) => { setPickerRequireValue(e.target.checked) }}>Required?</Checkbox>
                </div>
            </Modal>
        </div>
    )
}

export default AddDatePicker