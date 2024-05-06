import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/dist';

const UserUpdateForm = ({ user }) => {
  const { id } = useParams();
  console.log('User:', user);
  const [formData, setFormData] = useState({
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    password: '',
    password_confirmation: '',
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('password_confirmation', formData.password_confirmation);
    formDataToSend.append('avatar', formData.avatar);
  
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${id}/update`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);

    } catch (error) {
      console.error(error.response.data);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input type="file" id="avatar" name="avatar" onChange={handleFileChange} />
      </div>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserUpdateForm;