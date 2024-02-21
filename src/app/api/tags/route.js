import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    console.log('rew',req)

      // Assuming you have a User model with tags field
      const allUsers = await prisma.user.findMany({
        select: { tags: true },
      });
      
      console.log('allUsers',allUsers)
      // Extract tags from all users
      const allTags = allUsers?.map(user => user.tags || []).flat();

      return NextResponse.json({ success: true, data: allTags });
  } catch (error) {
    console.log('eere',error)
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req, res) {
    try {
      // Assuming you have a User model with tags field
      const { userId, newTags } = await req.json(); // Adjust this based on your request structure
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          tags: {
            push: newTags, // Assuming tags is an array field in your schema
          },
        },
        select: { tags: true },
      });
  
      return NextResponse.json({ success: true, data: updatedUser.tags });
    } catch (error) {
      console.error("Error in POST API route:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
