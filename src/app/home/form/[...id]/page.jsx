"use client";
import React, { useEffect, useState } from "react";
import FormSettings from "@/Components/formSettings";
import JsonBar from "@/Components/jsonBar";
import ItemsBar from "@/Components/itemsBar";
import LayoutBar from "@/Components/layoutBar";
import { SaveIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/client"

const FormManager = () => {
  // const [session, loading] = useSession();
  const [startTags, setStartTags] = useState(["registeration"]);

  const [startJson, setStartJson] = useState({
    formName: "demo form",
    multi_step: false,
    steps: [
      {
        step_name: "Personal",
        onStepComplete: "",
        fields: [],
      },
    ],
    onSubmit: "http://0.0.0.0:3000/some/api",
    successMsg: "Data was saved",
    errorMsg: "Something went wrong",
  });

  const router = usePathname();
  console.log('curreee-------11-1-1-1-', router?.split('/')[2])
  
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tags", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
      }
    };
    fetchData();
  }, []);

  const addForm = async (content) => {
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          formData: { content: content },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error adding tag:", error);
      throw error;
    }
  };

  // console.warn(session)
  // console.log("session")
  console.log('currentForm', startJson)
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
          console.log('data.data[0]?.forms-------------------3', data.data[0]?.forms?.find(form => form?.id == router?.split('/')[2]))
          setStartJson(data.data[0]?.forms?.find(form => form?.id == router?.split('/')[2]));
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
  console.log('startJson=----------------------', startJson)
  return (
    <div>
      <div className="flex justify-between items-center mx-5 ">
        {" "}
        <p className="text-center font-semibold my-4">Form Manager </p>
        <span
          onClick={() => {
            addForm(JSON.stringify(startJson));
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <SaveIcon className="cursor-pointer" size={24} /> Save Form
        </span>
      </div>
      <hr />
      <div>
        <FormSettings
          data={startJson?.content}
          update={setStartJson}
          tags={tags}
          tagUpdate={setStartTags}
        />
        <br />
      </div>
      <div className="grid grid-cols-5 h-[65vh] text-center">
        <div className="border overflow-y-auto">
          Items Bar
          <br />
          <ItemsBar data={startJson?.content} tags={tags} update={setStartJson} />
        </div>
        <div className="border overflow-y-auto col-span-2">
          Layout Bar
          <br />
          <LayoutBar data={startJson?.content} update={setStartJson} />
        </div>
        <div className="border overflow-y-auto col-span-2">
          JSON Bar
          <br />
          <div className="text-left">
            <JsonBar json={JSON.parse(startJson?.content)} name={"Form"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormManager;
