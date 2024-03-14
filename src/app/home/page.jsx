"use client";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx"
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

export default function Home() {
    // let session;
    const { data: session, status } = useSession()

    const [formsUpdate, setFormsUpdate] = useState(0);
    const [forms, setForms] = useState([]);
    const [newFormName, setNewFormName] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // console.log(session?.user?.email)
        const fetchData = async () => {
            try {
                let email = session.user.email;
                const response = await fetch(`/api/forms?email=${email}`);                
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data.data);
                    console.log(status);
                    setForms(data.data);
                } else {
                    const { error } = await response.json();
                    console.error(error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error as needed
            } finally {
            }
        };

        if (session?.user?.email)
            fetchData();
    }, [status, formsUpdate]);

    const createForm = async (email, formData) => {
        try {
            const response = await axios.post('/api/forms', {
                email,
                formData,
            });

            if (response.data.success) {
                console.log('Form updated successfully:', response.data.data);
                toast.success('Form Created Successfully!');
                // fetchData();
                setFormsUpdate(formsUpdate + 1);
            } else {
                console.error('Error creating form:', response.data.error);
                toast.error("Error creating form.")
            }
        } catch (error) {
            console.error('Error in POST request:', error);
            toast.error("Unable to create Form.")
        }
    }
    let formDataInit = {
        formName: newFormName,
        multi_step: false,
        steps: [
        {
            step_name: "Step 1",
            onStepComplete: "",
            fields: [],
        },
        ],
        onSubmit: "http://0.0.0.0:3000/some/api",
        successMsg: "Data was saved",
        errorMsg: "Something went wrong",
    };

    return (
        <main className="p-6 h-full overflow-y-hidden">
            <div className="text-xl font-extrabold font-mono underline">
                Your FORMS
            </div>
            {/* {session?.user?.email} */}
            <span className="">({forms.length ?? "Loading..."})</span>
            <div className="py-6 pb-12 text-center overflow-y-auto h-full w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="flex flex-col justify-between items-center p-2 text-center bg-red-400 h-[180px] duration-200 rounded-xl shadow-lg hover:shadow-xl shadow-gray-300 hover:shadow-gray-400 text-red-200 hover:text-red-100">
                            <p className="text-[70px] font-extrabold">+</p>
                            <p className="font-extrabold pb-4">New Form</p>
                        </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                <p className="text-red-500">Create New Form</p>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <input type="text" placeholder="Enter Form Name" minLength={4} maxLength={22}
                                    value={newFormName} onChange={(event) => { setNewFormName(event.target.value) }}
                                    className="p-2 my-2 border rounded-lg w-full" required />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>createForm(session?.user?.email, formDataInit)} className="bg-red-500 hover:bg-red-600" disabled={(!newFormName || newFormName == "" || newFormName.length < 4) ? true : false}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {forms?.map((item, index) => {
                    const parsedContent = JSON.parse(item.content);
                    // console.log(parsedContent)
                    return (
                        <a href="#" key={index}>
                            <div className='flex flex-col justify-between items-center py-2 text-left bg-red-400 h-[180px] duration-200 rounded-xl shadow-lg hover:shadow-xl shadow-gray-300 hover:shadow-gray-400 text-red-100 hover:text-white'>
                                <div className='w-full px-2'>
                                    <div className='py-2'>
                                        {parsedContent?.tags ? (<div>
                                            <strong>Tags: </strong>
                                        </div>) : "No tags"}
                                    </div>
                                    <div className='py-2'>
                                        {parsedContent?.createdAt}
                                    </div>
                                    <div>
                                        <strong>Form Type:</strong> {parsedContent?.multi_step ? "Multi Step" : "Single Step"}
                                    </div>
                                </div>
                                <button className='border-0'>
                                    <Trash2 />
                                </button>
                                <p className="text-center font-extrabold pb-4">{parsedContent?.formName}</p>
                                {/* <div>
                                </div> */}
                            </div>
                        </a>
                    );
                })}
            </div>
        </main>
    );
}
