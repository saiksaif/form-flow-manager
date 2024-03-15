import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    // console.log(email);
    // Assuming you have a User model with forms relation
    const allForms = await prisma.form.findMany({
      where: {
        userEmail: email
      }
    })

    // console.log()
    return NextResponse.json({ success: true, data: allForms });

  } catch (error) {
    console.log('error', error);
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    console.log("====================================")
    const { email, formData } = await req.json();
    // Fetch the existing user (including forms)
    if (!email) {
      return NextResponse.json({ error: "No Email Found" }, { status: 500 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
      // include: { forms: true },
    });
    
    // Update or create a form based on formName
    let updatedForm;
    // console.log('------------',JSON.parse(formData?.content))
    const existingForm = existingUser?.forms?.find(form => form.name == JSON.parse(formData?.formName)) ?? null;
    // console.log('existingform',existingForm)
    
    if (existingForm) {
      // Check if the email of user of existing form is same as this users email or not
    } else {
      const updatedForm = await prisma.form.create({
        data: {
          name: formData?.formName,
          content: JSON.stringify(formData),
          user: {
            connect: {
              email: email,
            },
          },
        },
      });         
    }

    return NextResponse.json({ success: true, data: updatedForm });

  } catch (error) {
    console.error("Error in POST API route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const formId = searchParams.get("formId");
    
    if (!formId || formId=="") {
      return NextResponse.json(
        { error: "Form ID missing!" },
        { status: 500 }
      );
    }

    const deleteForm = await prisma.form.delete({
      where: {
        id: formId
      },
    })

    return NextResponse.json({ success: true, data: deleteForm });
  } catch (error) {
    console.error("Error in DELETE API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

