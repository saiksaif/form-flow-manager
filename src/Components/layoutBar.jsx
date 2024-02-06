import React from 'react';
import { Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const LayoutBar = ({ data, update }) => {
  const deleteStep = (stepName) => {
    let newSteps = data?.steps?.filter((object) => object.step_name !== stepName);

    let multiStep = newSteps.length > 1 ? true : false;

    update({
      ...data,
      multi_step: multiStep,
      steps: newSteps,
    });
  };

  const deleteField = (stepName, fieldName) => {
    update((prevData) => {
      const updatedSteps = prevData.steps.map((step) => {
        if (step.step_name === stepName) {
          return {
            ...step,
            fields: step.fields.filter((field) => field.label !== fieldName),
          };
        }
        return step;
      });

      return {
        ...prevData,
        steps: updatedSteps,
      };
    });
  };

  return (
    <div>
      <br />
      Form Name: <strong>{data?.formName}</strong>
      <br />
      <Tabs type="line" tabBarStyle={{padding:'0 20px 0 20px'}}>
        {data?.steps?.map((step, step_id) => {
          return (
            <TabPane tab={step.step_name} key={step_id}>
              <div className='p-2 m-2 bg-slate-100 rounded text-left'>
                <div className='flex justify-between'>
                  <span>Step Name: {step?.step_name}</span>
                  <Button
                    className='text-red-500 p-2 hover:text-red-400'
                    onClick={() => deleteStep(step?.step_name)}
                  >
                    Delete Step
                  </Button>
                </div>
                <br />
                <div>
                  Fields:
                  {step?.fields?.map((field, field_id) => {
                    return (
                      <div
                        key={field_id}
                        className='my-3 mx-1 border rounded p-2 flex justify-between'
                      >
                        <label htmlFor=''>
                          {field.label} - {field.type}
                        </label>
                        <Button
                          className='text-red-500 p-1 hover:text-red-400'
                          onClick={() => deleteField(step?.step_name, field?.label)}
                        >
                          Delete Field
                        </Button>
                      </div>
                    );
                  })}
                  {step.fields.length < 1 ? <div>N/A</div> : ''}
                </div>
                <br />
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default LayoutBar;
