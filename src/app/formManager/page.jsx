"use client"
import React, { useState } from 'react'
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
    })

  return (
    <div>
        <p className='text-center font-semibold my-4'>Form Manager</p>
        <div className='grid grid-cols-3 min-h-[50vh] text-center'>
            <div className='border'>
                Items Bar
                <br />
                <ItemsBar data={startJson} update={setStartJson} />
            </div>
            <div className='border'>
                Layout Bar
                <br />
                <LayoutBar data={startJson} update={setStartJson} />
            </div>
            <div className='border overflow-y-auto'>
                JSON Bar
                <br />
                <JsonBar json={startJson} name={"Form"} />
            </div>
        </div>
    </div>
  )
}

export default FormManager