// "use client"
import React from 'react'
import AddStep from './items/addStep'
import AddInput from './items/addInput'
import AddDatePicker from './items/addDatePicker'

const ItemsBar = ({data, update}) => {
  return (
    <div className='flex flex-col gap-2 p-3'>
        <p className='text-left font-semibold'>Steps</p>
        <AddStep data={data} update={update} />
        <hr />

        <p className='text-left font-semibold'>Input Fields</p>
        <AddInput data={data} update={update} />
        <AddDatePicker data={data} update={update} />
    </div>
  )
}

export default ItemsBar