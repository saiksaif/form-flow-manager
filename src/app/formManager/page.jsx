"use client"
import React, { useState } from 'react'
import FormSettings from '@/Components/formSettings'
import JsonBar from '@/Components/jsonBar'
import ItemsBar from '@/Components/itemsBar'
import LayoutBar from '@/Components/layoutBar'

const FormManager = () => {
    const [startJson, setStartJson] = useState({
        formName: "demo form",
        multi_step: false,
        steps: [
            {
                step_name: "Personal",
                fields: []
            }
        ],
        onSubmit: "http://0.0.0.0:3000/some/api",
        successMsg: "Data was saved",
        errorMsg: "Something went wrong",
        tags: []
    })

  return (
    <div>
        <p className='text-center font-semibold my-4'>Form Manager</p>
        <hr />
        <div>
            <FormSettings data={startJson} update={setStartJson} />
            <br />
        </div>
        <div className='grid grid-cols-5 h-[65vh] text-center'>
            <div className='border overflow-y-auto'>
                Items Bar
                <br />
                <ItemsBar data={startJson} update={setStartJson} />
            </div>
            <div className='border overflow-y-auto col-span-2'>
                Layout Bar
                <br />
                <LayoutBar data={startJson} update={setStartJson} />
            </div>
            <div className='border overflow-y-auto col-span-2'>
                JSON Bar
                <br />
                <div className='text-left'>
                    <JsonBar json={startJson} name={"Form"} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormManager