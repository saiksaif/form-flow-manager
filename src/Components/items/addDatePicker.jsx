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
            <button className='border rounded bg-gray-300 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
                Add Date Picker
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
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