'use server';

import { cookies } from 'next/headers';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const API_URL = process.env.BASE_API_URL;
const SECRET_KEY = 'SECRET_KEY';

export async function findMe() {
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

    const res = await axios.get(`${API_URL}user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      withCredentials: true,
    });
    console.log(res.data);

    if (res.status !== 200) {
      return {
        ok: false,
        message: res.data.message,
      };
    }

    return {
      ok: true,
      data: res.data.userData,
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
