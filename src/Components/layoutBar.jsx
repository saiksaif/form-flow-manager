// "use client"
import React from 'react'

const LayoutBar = ({data, update}) => {
  return (
    <div>
      <br />
      Form Name: <strong>{data?.formName}</strong>
      <br />
      {data?.steps?.map((step, id)=>{
        return (
          <div key={id} className='p-2 m-2 bg-slate-100 rounded text-left'>
            Step Name: {step?.step_name}
            <br /> <br />
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