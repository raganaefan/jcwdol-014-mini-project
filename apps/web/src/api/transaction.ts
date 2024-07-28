'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const API_URL = process.env.BASE_API_URL;
const SECRET_KEY = 'SECRET_KEY';

export async function getEventById(id: Number) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const res = await axios.get(`${API_URL}event/${id}`, {
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

export async function getUserDiscountAndPoints() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    if (!userId) {
      throw new Error('Invalid token');
    }

    const res = await axios.get(
      `${API_URL}user/getDiscountAndPoints/${userId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        withCredentials: true,
      },
    );

    if (res.status !== 200) {
      return {
        ok: false,
        message: res.data.message,
      };
    }

    console.log(res.data);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error: any) {
    console.error(
      'Error in findMe:',
      error.response ? error.response.data : error.message,
    );
    return {
      ok: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
}

export async function purchaseEvent(params: any) {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const res = await axios.post(
      `${API_URL}event/transaction`,
      {
        eventId: params.eventId,
        amount: params.amount,
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
  } catch (error) {
    console.error('Error making transaction:', error);
    return {
      ok: false,
      message: 'There was an error making the transaction.',
    };
  }
}
