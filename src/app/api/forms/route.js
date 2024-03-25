import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const formId = searchParams.get("formId");
    
    // For Getting one form using ID
    if (formId) {
      const form = await prisma.form.findFirst({
        where: {
          id: formId
        }
      });
      return NextResponse.json({ success: true, data: form });
    }
    
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
    });
    
    // Update or create a form based on formName
    let updatedForm;
    const existingForm = existingUser?.forms?.find(form => form.name == JSON.parse(formData?.formName)) ?? null;
    
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

export async function PATCH(req) {
  try {
    const { id, name, content, userEmail } = await req.json();

    if (!id || id=="" || !userEmail || userEmail=="") {
      return NextResponse.json(
        { error: "Form ID or User Email is missing!" },
        { status: 500 }
      );
    }

    const updateForm = await prisma.form.update({
      where: {
        id: id
      },
      data: {
        name: name,
        content: content
      }
    })

    return NextResponse.json({ success: true, data: updateForm });
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured! "+error },
      { status: 500 }
    );
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

