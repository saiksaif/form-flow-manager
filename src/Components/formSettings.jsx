import React, { useState } from 'react'

const FormSettings = ({data, update}) => {
    const [fName, setFName] = useState(data?.formName);
    const [fSubmit, setFSubmit] = useState(data?.onSubmit);
    const [fSuccess, setFSuccess] = useState(data?.successMsg);
    const [fError, setFError] = useState(data?.errorMsg);

  return (
    <div className='p-4'>
        <p className='text-lg font-semibold underline'>
            Form Settings
        </p>
        <div className='grid grid-cols-4 gap-3'>
            <div className='flex flex-col'>
                <label htmlFor="">Form Name:</label>
                <input className='border rounded shadow p-2' type="text" placeholder='Form Name' value={fName} onChange={(e)=>setFName(e.target.value)} onBlur={()=>{update({...data, formName: fName})}} />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">On Submit:</label>
                <input className='border rounded shadow p-2' type="text" placeholder='On Submit' value={fSubmit} onChange={(e)=>setFSubmit(e.target.value)} onBlur={()=>{update({...data, onSubmit: fSubmit})}} />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">Success Msg:</label>
                <input className='border rounded shadow p-2' type="text" placeholder='Success Msg' value={fSuccess} onChange={(e)=>setFSuccess(e.target.value)} onBlur={()=>{update({...data, successMsg: fSuccess})}} />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">Fail Msg:</label>
                <input className='border rounded shadow p-2' type="text" placeholder='Fail Msg' value={fError} onChange={(e)=>setFError(e.target.value)} onBlur={()=>{update({...data, errorMsg: fError})}} />
            </div>
        </div>
    </div>
  )
}

export default FormSettings