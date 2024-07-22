'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const API_URL = process.env.BASE_API_URL;
const SECRET_KEY = 'SECRET_KEY';

export async function createEvent(params: any) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const res = await axios.post(
      `${API_URL}event`,
      {
        eventName: params.eventName,
        description: params.description,
        price: params.price,
        date: params.date,
        organizerId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }
}
