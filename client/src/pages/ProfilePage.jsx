// client/src/pages/ProfilePage.jsx

import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import ProfileSection from '../Dashboard/ProfileSection';

export default function ProfilePage() {
  const { user, login } = useContext(AuthContext);

  const handleUpdateProfile = async (editedProfile, imageFile) => {
    try {
      const formData = new FormData();

      formData.append('name', editedProfile.name);
      formData.append('location', editedProfile.location || '');
      formData.append('github', editedProfile.github || '');
      formData.append('linkedin', editedProfile.linkedin || '');

  
      if (Array.isArray(editedProfile.skillsOffered)) {
        editedProfile.skillsOffered.forEach(skill => formData.append('skillsOffered[]', skill));
      }
      if (Array.isArray(editedProfile.skillsWanted)) {
        editedProfile.skillsWanted.forEach(skill => formData.append('skillsWanted[]', skill));
      }
      if (Array.isArray(editedProfile.availability)) {
        editedProfile.availability.forEach(item => formData.append('availability[]', item));
      }

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        credentials: 'include',
        body: formData,
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