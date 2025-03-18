import User from '@/moduls/client';
import { NextResponse } from 'next/server';
import DB from '../../../lib/dbconnect'; 
DB();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { accessToken } = reqBody;

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 });
    }

    const user = await User.findOne({ accessToken });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User details fetched successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        collegeName: user.collegeName,
        course: user.course,
        year: user.year,
        accessToken: user.accessToken, 
      },
    });
  } catch (error) {

    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
