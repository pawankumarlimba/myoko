import bcryptjs from 'bcryptjs';
import User from '@/moduls/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import DB from '../../../lib/dbconnect'; 
DB();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    console.log(email, password);
    if (!user) {
      return NextResponse.json({ error: "User not resister" }, { status: 404 });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "password is wrong" }, { status: 401 });
    }

    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN, { expiresIn: '10d' });

    user.accessToken = token;
    await user.save(); 

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        collegeName: user.collegeName,
        course: user.course,
        year: user.year,
        accessToken: token, 
      },
    });


    return response;
  } catch (error) {
    console.error('Error:', error);

    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
