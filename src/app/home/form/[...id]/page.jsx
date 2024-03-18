"use client";
import React, { useEffect, useState } from "react";
import FormSettings from "@/Components/formSettings";
import JsonBar from "@/Components/jsonBar";
import ItemsBar from "@/Components/itemsBar";
import LayoutBar from "@/Components/layoutBar";
import { SaveIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
} from "@/Components/ui/alert-dialog"
import { Skeleton } from "@/Components/ui/skeleton";
// import { useSession } from "next-auth/client"

const FormManager = () => {
  const [loaded, setLoaded] = useState(false);
  // const [session, loading] = useSession();
  const [startTags, setStartTags] = useState(["registeration"]);

  const [startJson, setStartJson] = useState({
    content: JSON.stringify({
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
    })
  });

  const router = usePathname();
  const [pageFormId, setPageFormId] = useState(router?.split('/')[3]);
  // console.log('curreee-------11-1-1-1-', router?.split('/')[3])

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

  // const addForm = async (content) => {
  //   try {
  //     const response = await fetch("/api/forms", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: 1,
  //         formData: { content: content },
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       return data.data;
  //     } else {
  //       const { error } = await response.json();
  //       throw new Error(error);
  //     }
  //   } catch (error) {
  //     console.error("Error adding tag:", error);
  //     throw error;
  //   }
  // };

  // console.warn(session)
  // console.log("session")
  // console.log('currentForm', startJson)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/forms?formId=${pageFormId}`);

        if (response.ok) {
          const data = await response.json();
          // console.log(data.data)

          setStartJson(data?.data)
          setLoaded(true);
          // console.log('data.data[0]?.forms-------------------3', data.data?.forms?.find(form => form?.id == router?.split('/')[2]))
          // setStartJson(data.data[0]?.forms?.find(form => form?.id == router?.split('/')[2]));
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

  return (
    <div>
      <div>
        {loaded ? (
          <FormSettings
            data={JSON.parse(startJson?.content)}
            update={setStartJson}
            tags={tags}
            tagUpdate={setStartTags}
            dataStatus={loaded}
          />
        ) : (
          <div className='px-4 py-2'>
            <p className='text-lg font-semibold underline'>
              Form Settings
            </p>
            <div className='pt-1'>
              <Skeleton className="h-[125px] w-full rounded-xl  bg-gray-200" />
            </div>
          </div>
        )}

        <br />
      </div>
      <div className="grid grid-cols-8 h-[70vh] text-center">
        <div className="border overflow-y-auto col-span-2">
          Items Bar
          <br />
          <ItemsBar data={JSON.parse(startJson.content)} tags={tags} update={setStartJson} />
        </div>
        <div className="border overflow-y-auto col-span-3">
          Layout Bar
          <br />
          {loaded ? (
            <LayoutBar data={JSON.parse(startJson.content)} update={setStartJson} />
          ) : (
            <Skeleton className="h-[200px] rounded-xl bg-gray-200 m-4" />
          )}
        </div>
        <div className="border overflow-y-auto col-span-3">
          JSON Bar
          <br />
          <div className="text-left">
            {loaded ? (
              <JsonBar json={JSON.parse(startJson?.content)} name={"Form"} />
            ) : (
              <Skeleton className="h-[400px] rounded-xl bg-gray-200 m-4" />
            )}
          </div>
          <div className="absolute bottom-8 right-8 flex justify-between gap-3">
            <AlertDialog>
              <AlertDialogTrigger className="bg-[blue] text-white shadow-lg hover:bg-[darkblue] duration-100 rounded-2xl p-2">
                Preview
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Form Name:</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="bg-[red] hover:bg-[darkred]">Close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button
              onClick={() => {
                addForm(JSON.stringify(startJson));
              }}
              className="flex bg-[red] text-white shadow-lg hover:bg-[darkred] duration-100 rounded-2xl p-2"
            >
              <SaveIcon className="cursor-pointer pr-1" size={24} /> Save Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormManager;
