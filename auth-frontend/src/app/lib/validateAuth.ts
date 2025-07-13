import axios from 'axios';
import { cookies } from 'next/headers';

export const validateAuth = async () => {
  console.log('Validating the user!');
  console.log(
    ' process.env.LOCAL_BACKEND_URL::',
    process.env.LOCAL_BACKEND_URL
  );

  const cookieStore = await cookies();
  try {
    const URL = process.env.LOCAL_BACKEND_URL + '/validation/tokens';
    const res = await axios.put(
      URL,
      {}, // body
      {
        withCredentials: true,
        headers: {
          Authorization: `access_token=${
            cookieStore.get('access_token')?.value
          } ,refresh_token=${cookieStore.get('refresh_token')?.value}`,
        },
      }
    );

    const data = await res.data;
    console.log('Resp[onse from validate:', data);
    return data;
  } catch (error) {
    console.log('Error with validate!', error);
    throw error;
  }
};
