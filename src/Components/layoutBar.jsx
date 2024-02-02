// "use client"
import React from 'react'

const LayoutBar = ({data, update}) => {
  const deleteStep = (stepName) => {
    let newSteps = data?.steps?.filter(object => object.step_name !== stepName);
    
    let multiStep = newSteps.length > 1 ? true : false;

    update({
      ...data,
      multi_step: multiStep,
      steps: newSteps
    })
  }
  return (
    <div>
      <br />
      Form Name: <strong>{data?.formName}</strong>
      <br />
      {data?.steps?.map((step, id)=>{
        return (
          <div key={id} className='p-2 m-2 bg-slate-100 rounded text-left'>
            <div className='flex justify-between'>
              <span>
                Step Name: {step?.step_name}
              </span>
              <button className='text-red-500 p-2 hover:text-red-400' onClick={()=>deleteStep(step?.step_name)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
            <br />
            <div>
              Fields:
              {step?.fields?.map((field, id) => {
                return (
                  <div key={id} className='my-3 mx-1 border rounded p-2'>
                    <label htmlFor="">{field.label}</label> <br />
                    <input className='p-2 my-2' type={field.type} placeholder={field.placeholder} name={field.name} />
                  </div>
                )
              })}
              {step.fields.length < 1 ? (<div>N/A</div>) : ("")}
            </div>
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default LayoutBar