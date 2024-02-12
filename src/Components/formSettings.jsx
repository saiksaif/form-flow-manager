"use client"
import React, { useState } from 'react'
import { Input, Button } from 'antd';

const FormSettings = ({data, update}) => {
    const [fName, setFName] = useState(data?.formName);
    const [fSubmit, setFSubmit] = useState(data?.onSubmit);
    const [fSuccess, setFSuccess] = useState(data?.successMsg);
    const [fError, setFError] = useState(data?.errorMsg);

  return (
    <div className='px-4 py-2'>
        <p className='text-lg font-semibold underline'>
            Form Settings
        </p>
        <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col'>
                <label htmlFor="">Form Name:</label>
                <Input className='border rounded shadow p-2' type="text" placeholder='Form Name' value={fName} onChange={(e)=>setFName(e.target.value)} onBlur={()=>{update({...data, formName: fName})}} />
                
                <label htmlFor="">On Submit:</label>
                <Input className='border rounded shadow p-2' type="text" placeholder='On Submit' value={fSubmit} onChange={(e)=>setFSubmit(e.target.value)} onBlur={()=>{update({...data, onSubmit: fSubmit})}} />
            </div>

            <div className='flex flex-col'>
                <label htmlFor="">Success Msg:</label>
                <Input className='border rounded shadow p-2' type="text" placeholder='Success Msg' value={fSuccess} onChange={(e)=>setFSuccess(e.target.value)} onBlur={()=>{update({...data, successMsg: fSuccess})}} />

                <label htmlFor="">Fail Msg:</label>
                <Input className='border rounded shadow p-2' type="text" placeholder='Fail Msg' value={fError} onChange={(e)=>setFError(e.target.value)} onBlur={()=>{update({...data, errorMsg: fError})}} />
            </div>

            <div className='flex flex-col col-span-1'>
                <label htmlFor="">Manage Tags:</label>
                <Button className='border rounded shadow p-1 mb-1'>Add Tags</Button>
                {/* <Input
                    className='border rounded shadow p-2'
                    placeholder="Enter Tag Name"
                    // value={}
                    onPressEnter={(e) => update({...data, tags: [...data.tags, e.target.value]})}
                    required={true}
                /> */}
                <p>My Tags:</p>
                <div className='flex flex-row flex-wrap p-1 gap-1 overflow-x-auto overflow-y-hidden'>
                    <Button>
                        #tag &nbsp; ❌
                    </Button>
                </div>
            </div>
            {/* <div className='flex flex-row'>
                <label htmlFor="">Tags:</label>
                <div className='flex flex-row flex-wrap p-1 gap-1'>
                    {data?.tags.map((tag, index) => {return (
                        <Button key={index} onClick={() => {
                            const updatedTags = data.tags.filter((i) => i != tag);
                            update({ ...data, tags: updatedTags });
                        }}>
                            {tag}
                        </Button>
                    )})}
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default FormSettings