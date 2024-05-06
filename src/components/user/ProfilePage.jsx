
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const { state } = useLocation();
  const user = state && state.user;

  return (
    <div>
      <h1>Welcome, {user.first_name}</h1>
    </div>
  );
};

export default ProfilePage;