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
    const res = await axios.post(
      `${API_URL}transaction/event`,
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

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Event {
  organizerId: number;
  eventName: string;
  category: string;
}

export interface Transaction {
  amount: number;
  createdAt: string;
  Event: Event;
  User: User;
  id: number;
}

export const fetchTransactions = async () => {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const res = await axios.get<{ data: Transaction[] }>(
      `${API_URL}transaction/stats/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      ok: true,
      data: res.data.data,
    };
  } catch (error) {
    console.error('Error fetching Transaction:', error);
    return {
      ok: false,
      message: 'Failed to get transaction',
    };
  }
};

export const getUserTransactions = async () => {
  const token = cookies().get('token')?.value;

  if (!token) {
    console.log('Token not found');
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const res = await axios.get<{ data: Transaction[] }>(
      `${API_URL}transaction/user-transaction/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      ok: true,
      data: res.data.data,
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);

    if (axios.isAxiosError(error) && error.response) {
      // Log the error response
      console.error('API Response Error:', error.response.data);
    }

    return {
      ok: false,
      message: 'Failed to get transaction',
    };
  }
};

export const submitReview = async (
  eventId: number,
  rating: number,
  comment: string,
) => {
  const token = cookies().get('token')?.value;

  if (!token) {
    return { ok: false, message: 'Unauthenticated' };
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const res = await axios.post(
      `${API_URL}transaction/reviews`,
      {
        eventId,
        rating,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.ok) {
      return { ok: true, data: res.data.data };
    } else {
      return {
        ok: false,
        message: res.data.message || 'Failed to submit review',
      };
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    return { ok: false, message: 'An error occurred' };
  }
};
