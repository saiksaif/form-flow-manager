"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [forms, setForms] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/forms", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("data.data[0]?.forms", data.data[0]?.forms);
                    setForms(data.data[0]?.forms);
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
        <main className="flex p-24 text-center w-100 flex-wrap">
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
        </main>
    );
}
