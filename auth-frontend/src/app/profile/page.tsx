import axios from 'axios';
import { cookies } from 'next/headers';
import ProfileCard from './ProfileCard';

type Response = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
const getUser = async () => {
  const cookieStore = await cookies();
  console.log(axios.defaults.baseURL);

  const res = await axios.get('/user/me', {
    headers: {
      Authorization: `access_token=${
        cookieStore.get('access_token')?.value
      } ,refresh_token=${cookieStore.get('refresh_token')?.value}`,
    },
    withCredentials: true,
  });
  const data = (await res.data) as Response;
  console.log(data);
  return data;
};
const ProfilePage = async () => {
  const user = await getUser();
  return <ProfileCard {...user.user} />;
};

export default ProfilePage;
