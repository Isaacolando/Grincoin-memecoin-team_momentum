// src/components/Admin.js
import React, { useState } from 'react';
import icpActor from '../src/icp';

const Admin = () => {
  const [newAdmin, setNewAdmin] = useState('');
  const [message, setMessage] = useState('');

  const addAdmin = async () => {
    try {
      const result = await icpActor.add_admin(newAdmin);
      setMessage(result ? 'Admin added successfully' : 'Failed to add admin');
    } catch (error) {
      setMessage('Error adding admin: ' + error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        type="text"
        placeholder="New Admin Principal ID"
        value={newAdmin}
        onChange={(e) => setNewAdmin(e.target.value)}
      />
      <button onClick={addAdmin}>Add Admin</button>
      <p>{message}</p>
    </div>
  );
};

export default Admin;
