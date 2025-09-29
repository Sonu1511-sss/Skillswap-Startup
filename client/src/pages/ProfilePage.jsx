// client/src/pages/ProfilePage.jsx

import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import ProfileSection from '../Dashboard/ProfileSection';

export default function ProfilePage() {
  const { user, login } = useContext(AuthContext);

  const handleUpdateProfile = async (editedProfile, imageFile) => {
    const profileDataToSend = editedProfile;

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileDataToSend),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update profile.');
      }

      toast.success(data.message);
      login(data.data);

    } catch (error) {
      toast.error(error.message);
      console.error("Profile update error:", error);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ProfileSection user={user} onUpdate={handleUpdateProfile} />
    </div>
  );
}