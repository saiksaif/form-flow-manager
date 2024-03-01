import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
      // console.log('req', req);
  
      // Assuming you have a User model with forms relation
      const allUsers = await prisma.user.findMany({
        select: {
          forms: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              content: true,
              userId:true,
            },
          },
        },
      });
  
      // console.log('allUsers', allUsers);
  
      return NextResponse.json({ success: true, data: allUsers });
    } catch (error) {
      console.log('error', error);
      console.error("Error in API route:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  


  export async function POST(req, res) {
    try {
      const { userId, formData } = await req.json();
      // console.log("-------------------->data here",userId,formData)
  
      // Fetch the existing user (including forms)
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        // include: { forms: true },
      });
  
      // Update or create a form based on formName
      let updatedForm;
      // console.log('------------',JSON.parse(formData?.content))
      const existingForm = existingUser.forms.find(form => form.id == JSON.parse(formData?.id)) ?? null;
      // console.log('existingform',existingForm)
  
      if (existingForm) {
        // Update existing form
        updatedForm = await prisma.form.update({
          where: { id: existingForm.id },
          data: formData,
        });
      } else {
        // console.log('newform')
        // Create new form
        updatedForm = await prisma.form.create({
          data: {
            ...formData,
            userId: userId,
          },
        });
      }
  
      return NextResponse.json({ success: true, data: updatedForm });
    } catch (error) {
      console.error("Error in POST API route:", error);
      return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
  }
  
  
  
  
  

//   export async function DELETE(req) {
//     try {
//       // Assuming you have a User model with tags field
//       const { userId, newTags } = await req.json(); // Adjust this based on your request structure
  
//       const existingUser = await prisma.user.findUnique({
//         where: { id: userId },
//         select: { tags: true },
//       });
  
//       // Update the user, excluding the tagToDelete
//       const updatedUser = await prisma.user.update({
//         where: { id: userId },
//         data: {
//           tags: {
//             set: existingUser.tags.filter((tag) => tag != newTags),
//           },
//         },
//         select: { tags: true },
//       });
  
  
//       return NextResponse.json({ success: true, data: updatedUser.tags });
//     } catch (error) {
//       console.error("Error in POST API route:", error);
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
//   }

