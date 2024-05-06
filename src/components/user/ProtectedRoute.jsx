import { Route, Navigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';

const ProtectedRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('jwt');

    return token ? (
        <Route {...rest} element={<ProfilePage />} />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;