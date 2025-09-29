// client/src/Dashboard/ProfileSection.jsx

import React, { useState, useEffect } from "react";
import { Save, X, Upload, Plus, XCircle } from "lucide-react";

const ProfileSection = ({ user, onUpdate }) => {
  // State to hold the form data we are editing
  const [editedProfile, setEditedProfile] = useState({
    ...user,
    // Ensure these fields are always arrays to prevent errors
    skillsOffered: Array.isArray(user.skillsOffered) ? user.skillsOffered : [],
    skillsWanted: Array.isArray(user.skillsWanted) ? user.skillsWanted : [],
    availability: Array.isArray(user.availability) ? user.availability : [],
  });

  // State for the image file itself
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profilePicture || null);

  // State for the temporary text in the skill input fields
  const [skillOfferedInput, setSkillOfferedInput] = useState("");
  const [skillWantedInput, setSkillWantedInput] = useState("");

  // Handler for regular text inputs like location, github, etc.
  const handleChange = (e) => {
    setEditedProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- NEW: Handlers for adding/removing skills ---
  const handleAddSkill = (skillType) => {
    const skillToAdd = skillType === 'offered' ? skillOfferedInput.trim() : skillWantedInput.trim();
    if (skillToAdd && !editedProfile[skillType === 'offered' ? 'skillsOffered' : 'skillsWanted'].includes(skillToAdd)) {
      setEditedProfile(prev => ({
        ...prev,
        [skillType === 'offered' ? 'skillsOffered' : 'skillsWanted']: [...prev[skillType === 'offered' ? 'skillsOffered' : 'skillsWanted'], skillToAdd]
      }));
      // Clear the input field
      skillType === 'offered' ? setSkillOfferedInput("") : setSkillWantedInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove, skillType) => {
    setEditedProfile(prev => ({
      ...prev,
      [skillType === 'offered' ? 'skillsOffered' : 'skillsWanted']: prev[skillType === 'offered' ? 'skillsOffered' : 'skillsWanted'].filter(skill => skill !== skillToRemove)
    }));
  };

  // --- NEW: Handler for availability buttons ---
  const handleAvailabilityToggle = (option) => {
    setEditedProfile((prev) => {
      const currentAvailability = prev.availability || [];
      const newAvailability = currentAvailability.includes(option)
        ? currentAvailability.filter((item) => item !== option)
        : [...currentAvailability, option];
      return { ...prev, availability: newAvailability };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the actual file
      setPreviewImage(URL.createObjectURL(file)); // Set the preview
    }
  };

  const handleSave = () => {
    // Pass both the text data and the image file to the parent
    onUpdate(editedProfile, imageFile);
  };
  
  const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl">
        <h2 className="text-3xl font-bold text-white">Update Your Profile</h2>
        <p className="text-indigo-100 mt-2">Keep your details current to find the best skill swaps.</p>
      </div>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center p-6 -mt-16">
        <div className="relative w-28 h-28">
          <img src={previewImage || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"/>
          <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition"><Upload className="text-white w-4 h-4" /></label>
          <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageUpload}/>
        </div>
      </div>

      {/* Form */}
      <div className="p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Field label="Full Name" name="name" value={editedProfile.name} onChange={handleChange} placeholder="Enter your full name" />  
         <Field label="Location" name="location" value={editedProfile.location} onChange={handleChange} placeholder="Enter your location" />
          
          {/* NEW Availability Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((option) => (
                <button key={option} type="button" onClick={() => handleAvailabilityToggle(option)} className={`px-3 py-1 rounded-full text-sm font-medium transition ${editedProfile.availability.includes(option) ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* NEW Skills Offered Input */}
          <SkillInput label="Skills You Can Offer" value={skillOfferedInput} onChange={setSkillOfferedInput} onAdd={() => handleAddSkill('offered')} skills={editedProfile.skillsOffered} onRemove={(skill) => handleRemoveSkill(skill, 'offered')} color="blue"/>
          
          {/* NEW Skills Wanted Input */}
          <SkillInput label="Skills You Want to Learn" value={skillWantedInput} onChange={setSkillWantedInput} onAdd={() => handleAddSkill('wanted')} skills={editedProfile.skillsWanted} onRemove={(skill) => handleRemoveSkill(skill, 'wanted')} color="pink"/>

          <Field label="GitHub" name="github" value={editedProfile.github} onChange={handleChange} placeholder="https://github.com/username" />
          <Field label="LinkedIn" name="linkedin" value={editedProfile.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button onClick={handleSave} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"><Save className="h-4 w-4" /> Save Changes</button>
          {/* Cancel button is optional, can be handled by parent */}
        </div>
      </div>
    </div>
  );
};

/* Reusable Field Component */
const Field = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input type="text" name={name} value={value || ""} onChange={onChange} placeholder={placeholder} className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400" />
  </div>
);

/* NEW Reusable Skill Input Component */
const SkillInput = ({ label, value, onChange, onAdd, skills, onRemove, color }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex gap-2">
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }} placeholder="Type a skill and press Enter" className="flex-grow border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400" />
      <button type="button" onClick={onAdd} className="bg-indigo-600 text-white p-2 rounded-lg shadow hover:bg-indigo-700"><Plus className="h-5 w-5"/></button>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill) => (
        <span key={skill} className={`flex items-center gap-2 bg-${color}-100 text-${color}-800 px-3 py-1 rounded-full text-sm`}>
          {skill}
          <button type="button" onClick={() => onRemove(skill)}><XCircle className={`h-4 w-4 text-${color}-500 hover:text-${color}-700`}/></button>
        </span>
      ))}
    </div>
  </div>
);

export default ProfileSection;