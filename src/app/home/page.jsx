"use client";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function Home() {
    const [forms, setForms] = useState([]);
    const [newFormName, setNewFormName] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let email = "admin@admin.com";
                const response = await fetch(`/api/forms?email=${email}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data.data);
                    // console.log(response);
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

        fetchData();
    }, []);

    const createForm = async () => {
        try {
            alert(newFormName)
        } catch (e) {
            console.error("Error: ", e);
        }
    }
    return (
        <main className="p-6">
            <div className="text-xl font-extrabold font-mono underline">
                Your FORMS
            </div>
            <span className="">({forms.length})</span>
            <div className="py-6 flex text-center w-100 flex-wrap">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="text-center bg-red-400 w-[160px] h-[150px] duration-300 rounded-xl shadow-lg hover:shadow-xl shadow-gray-300 hover:shadow-gray-400">
                            <p className="text-[70px] font-extrabold text-red-200">+</p>
                            <p className="font-extrabold text-red-200">New Form</p>
                        </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                <p className="text-red-500">Create New Form</p>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <input type="text" placeholder="Enter Form Name" minLength={4} maxLength={22}
                                value={newFormName} onChange={(event)=>{setNewFormName(event.target.value)}}
                                className="p-2 my-2 border rounded-lg w-full" required/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={createForm} className="bg-red-500 hover:bg-red-600" disabled={(!newFormName || newFormName == "" || newFormName.length < 4) ? true : false}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {forms?.map((item, index) => {
                    const parsedContent = JSON.parse(item.content);
                    return (
                        <pre
                            key={index}
                            className="mt-2 w-[390px] rounded-md mx-3 border border-[#e5e5e5] p-3 flex flex-col cursor-pointer"
                            onClick={() => router.push(`/formManager/${item?.id}`)}
                        >
                            <p>Name: {parsedContent?.formName}</p>
                            <code className="text-black text-xs text-left">
                                {JSON.stringify(parsedContent, null, 3)}
                            </code>
                        </pre>
                    );
                })}
            </div>
        </main>
    );
}
