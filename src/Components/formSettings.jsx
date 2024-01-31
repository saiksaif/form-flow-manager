import React from 'react'

const FormSettings = ({data, update}) => {
  return (
    <div className='p-4'>
        <p className='text-lg font-semibold underline'>
            FormSettings
        </p>
        <div className='grid grid-cols-4 gap-3'>
            <div className='flex flex-col'>
                <label htmlFor="">Form Name</label>
                <input className='border rounded shadow p-2' type="text" placeholder='Form Name' />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">On Submit</label>
                <input className='border rounded shadow p-2' type="text" placeholder='On Submit' />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">Success Msg</label>
                <input className='border rounded shadow p-2' type="text" placeholder='Success Msg' />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">Fail Msg</label>
                <input className='border rounded shadow p-2' type="text" placeholder='Fail Msg' />
            </div>
        </div>
    </div>
  )
}

export default FormSettings