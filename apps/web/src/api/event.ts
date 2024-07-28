'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const API_URL = process.env.BASE_API_URL;
const SECRET_KEY = 'SECRET_KEY';

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await axios.post(`${API_URL}event/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Image upload response:', res.data); // Debugging
    return res.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return { ok: false, message: 'Image upload failed.' };
  }
};

interface EventParams {
  eventName: string;
  description: string;
  price: number;
  date: string;
  time: string;
  location: string;
  category: string;
  availSeats: number;
  imageUrl?: string;
}

export async function createEvent(params: EventParams) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    const userId = decoded.id;

    console.log('Creating event with params:', params); // Debugging

    const res = await axios.post(
      `${API_URL}event`,
      {
        ...params,
        organizerId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      ok: true,
      data: res.data,
    };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return {
      ok: false,
      message: 'Failed to create event',
    };
  }
}

export async function getAllEvent() {
  try {
    const res = await axios.get(`${API_URL}event`, {});
    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    console.error('Error getting event:', error);
    return {
      ok: false,
      message: 'Failed to get event',
    };
  }
}

export async function getEventByOrganizerId() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const res = await axios.get(`${API_URL}event/organizer/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    console.error('Error getting event:', error);
    return {
      ok: false,
      message: 'Failed to get event',
    };
  }
}

export async function getEvent() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const res = await axios.get(`${API_URL}event`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    console.error('Error getting event:', error);
    return {
      ok: false,
      message: 'Failed to get event',
    };
  }
}

export interface Event {
  id: number;
  eventName: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  price: number;
}

export const updateEvent = async (id: number, event: Event) => {
  try {
    const response = await axios.put(`/api/events/${id}`, event);
    return { ok: true, data: response.data };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
};
