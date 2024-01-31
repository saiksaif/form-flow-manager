// "use client"
import React from 'react'
import AddStep from './items/addStep'
import AddInput from './items/addInput'

const ItemsBar = ({data, update}) => {
  return (
    <div className='flex flex-col gap-2'>
        <br />
        <AddStep data={data} update={update} />
        <AddInput data={data} update={update} />
    </div>
  )
}

export default ItemsBar