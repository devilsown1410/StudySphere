import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';

const ProfileForm = ({ profile, setProfile, setIsEditing }) => {
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCodingProfileChange = (index, field, value) => {
    const updatedProfiles = [...formData.codingProfiles];
    updatedProfiles[index][field] = value;
    setFormData({ ...formData, codingProfiles: updatedProfiles });
  };

  const addCodingProfile = () => {
    setFormData({
      ...formData,
      codingProfiles: [...formData.codingProfiles, { platform: '', link: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <Dialog open={true} onClose={() => setIsEditing(false)}>
      <DialogTitle className='bg-indigo-100 text-center font-bold text-indigo-500 min-w-[40vw]'>Edit Profile</DialogTitle>
      <DialogContent className='bg-indigo-100' >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth 
            sx={{
                "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                  "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                },
              }}
          />
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth 
            sx={{
                "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                },
            }}
            />
          <TextField label="College" name="college" value={formData.college} onChange={handleChange} fullWidth 
            sx={{
                "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                },
            }}
          />
          <TextField label="Degree" name="degree" value={formData.degree} onChange={handleChange} fullWidth
            sx={{
                "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                  "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                },
              }} 
          />
          <TextField 
            type="url" 
            label="Profile Image URL" 
            name="profilePhoto" 
            value={formData.profilePhoto} 
            onChange={handleChange} 
            fullWidth 
            sx={{
                "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                  "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                },
              }}
          />
          
          <Box>
            <button 
                onClick={addCodingProfile}
                className='border-2 border-indigo-500 rounded-md text-indigo-500 p-2 px-4 mb-2'
            >
                Add Coding Profile
            </button>
            {formData.codingProfiles.map((profile, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mt: 2, mb: 2 }}>
                <TextField
                  label="Platform"
                  value={profile.platform}
                  onChange={(e) => handleCodingProfileChange(index, 'platform', e.target.value)}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                      "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                    },
                  }}
                />
                <TextField
                  label="Profile Link"
                  value={profile.link}
                  onChange={(e) => handleCodingProfileChange(index, 'link', e.target.value)}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                      "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className='bg-indigo-100'>
        <button 
            onClick={() => setIsEditing(false)} 
            className='bg-slate-500 text-white p-2 rounded-md px-2'
        >
            Cancel
        </button>
        <button 
            onClick={handleSubmit} 
            className='bg-indigo-500 p-2 rounded-md px-4 text-white'
        >
            Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileForm;
