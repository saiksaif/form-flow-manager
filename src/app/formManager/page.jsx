"use client"
import React from 'react'
import JsonBar from '@/Components/jsonBar'

const FormManager = () => {
    let startJson = {
        formName: "demo form",
        contents: [],
        onSubmit: "http://0.0.0.0:3000/some/api"
    }

  return (
    <div>
        <p className='text-center font-semibold my-4'>Form Manager</p>
        <div className='grid grid-cols-3 min-h-[50vh] text-center'>
            <div className='border'>
                Items Bar
            </div>
            <div className='border'>
                Layout Bar
            </div>
            <div className='border'>
                <JsonBar json={startJson} name={"Form"} />
            </div>
        </div>
    </div>
  )
}

export default FormManager