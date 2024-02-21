"use client"
import React, { useEffect, useState } from 'react'
import FormSettings from '@/Components/formSettings'
import JsonBar from '@/Components/jsonBar'
import ItemsBar from '@/Components/itemsBar'
import LayoutBar from '@/Components/layoutBar'

const FormManager = () => {
    const [startTags, setStartTags] = useState(["registeration"]);
    const [startJson, setStartJson] = useState({
        formName: "demo form",
        multi_step: false,
        steps: [
            {
                step_name: "Personal",
                onStepComplete: "",
                fields: []
            }
        ],
        onSubmit: "http://0.0.0.0:3000/some/api",
        successMsg: "Data was saved",
        errorMsg: "Something went wrong",
    })

    const [tags,setTags]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("/api/tags", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    console.log('res,responseponse',response)
            if (response.ok) {
              const data = await response.json();
              setTags(data.data);
            } else {
              const { error } = await response.json();
              console.error(error);
              // Handle the error as needed
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error as needed
          } finally {
          }
        };
    
        fetchData();
      }, []);

  return (
    <div>
        <p className='text-center font-semibold my-4'>Form Manager</p>
        <hr />
        <div>
            <FormSettings data={startJson} update={setStartJson} tags={tags} tagUpdate={setStartTags} />
            <br />
        </div>
        <div className='grid grid-cols-5 h-[65vh] text-center'>
            <div className='border overflow-y-auto'>
                Items Bar
                <br />
                <ItemsBar data={startJson} tags={tags} update={setStartJson} />
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