import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserUpdateForm({ userId }) {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    telephone: '',
    birth_date: '',
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/api/users/${userId}`)
        .then(response => {
          setUserData(response.data);
          setFormData({
            image: response.data.data.image || '',
            email: response.data.data.email,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            address: response.data.data.address || '',
            telephone: response.data.data.telephone,
            birth_date: response.data.data.birth_date,
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${userId}`, formData);
      console.log('User data updated successfully:', response.data);
   
    } catch (error) {
      console.error('Error updating user data:', error);
    }
    console.log('Form submitted:', formData);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Update Form</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Telephone:
          <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Birth Date:
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UserUpdateForm;
