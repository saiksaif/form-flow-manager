"use client"
import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd';

import TagsManager from './tagsManager';

const FormSettings = ({ data, update, tags, tagUpdate }) => {
    const [fName, setFName] = useState(data?.formName);
    const [fSubmit, setFSubmit] = useState(data?.onSubmit);
    const [fSuccess, setFSuccess] = useState(data?.successMsg);
    const [fError, setFError] = useState(data?.errorMsg);

    return (
        <div className='px-4 py-2'>
            <p className='text-lg font-semibold underline'>
                Form Settings
            </p>
            <div className='grid grid-cols-5 gap-4'>
                <div className='flex flex-col col-span-2'>
                    <label htmlFor="">Form Name:</label>
                    <Input className='border rounded shadow p-2' type="text" placeholder='Form Name' value={fName} onChange={(e) => setFName(e.target.value)} onBlur={() => { update({ ...data, formName: fName }) }} />

                    <label htmlFor="">On Submit:</label>
                    <Input className='border rounded shadow p-2' type="text" placeholder='On Submit' value={fSubmit} onChange={(e) => setFSubmit(e.target.value)} onBlur={() => { update({ ...data, onSubmit: fSubmit }) }} />
                </div>

                <div className='flex flex-col col-span-2'>
                    <label htmlFor="">Success Msg:</label>
                    <Input className='border rounded shadow p-2' type="text" placeholder='Success Msg' value={fSuccess} onChange={(e) => setFSuccess(e.target.value)} onBlur={() => { update({ ...data, successMsg: fSuccess }) }} />

                    <label htmlFor="">Fail Msg:</label>
                    <Input className='border rounded shadow p-2' type="text" placeholder='Fail Msg' value={fError} onChange={(e) => setFError(e.target.value)} onBlur={() => { update({ ...data, errorMsg: fError }) }} />
                </div>

                <div className='flex flex-col col-span-1'>
                    <label htmlFor="">My Tags:</label>
                    <TagsManager tags={tags} tagUpdate={tagUpdate} />

                    <p>Tags in this form:</p>
                    <div className='flex flex-row flex-nowrap p-1 gap-1 overflow-x-auto overflow-y-hidden'>
                        {tags?.map((tag, index) => {
                            return (
                                <div key={index} className='border rounded-lg p-2 w-full whitespace-pre h-[45px]'>
                                    #{tag}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSettings