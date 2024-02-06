// "use client"
import React from 'react'
import AddStep from './items/addStep'
import AddInput from './items/addInput'
import AddTextArea from './items/addTextArea'
import AddSelect from './items/addSelect'
import AddDatePicker from './items/addDatePicker'
import AddRadios from './items/addRadios'
import AddCheckbox from './items/addCheckbox'

const ItemsBar = ({data, update}) => {
  return (
    <div className='flex flex-col gap-2 p-3'>
        <p className='text-left font-semibold'>Steps</p>
        <AddStep data={data} update={update} />
        <hr />

        <p className='text-left font-semibold'>Fields</p>
        <AddInput data={data} update={update} />
        <AddTextArea data={data} update={update} />
        <AddSelect data={data} update={update} />
        <AddDatePicker data={data} update={update} />
        <AddRadios data={data} update={update} />
        <AddCheckbox data={data} update={update} />
    </div>
  )
}

export default ItemsBar