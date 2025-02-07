import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, CircularProgress, Avatar, Grid, Chip } from '@mui/material';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setProfile({
        name: 'John Doe',
        email: 'johndoe@example.com',
        college: 'XYZ University',
        degree: 'B.Tech in Computer Science',
        techSkills: ['React', 'Node.js', 'MongoDB', 'Python'],
        codingProfiles: [
          { platform: 'LeetCode', link: 'https://leetcode.com/johndoe' },
          { platform: 'Codeforces', link: 'https://codeforces.com/profile/johndoe' },
          { platform: 'GitHub', link: 'https://github.com/johndoe' }
        ],
        profilePhoto: 'https://via.placeholder.com/150'
      });
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  return (
    <div className='flex flex-col justify-center align-center mt-8 p-4 min-w-[60vw]'>
      <Box sx={{ width: '60vw', bgcolor: 'rgb(34, 40, 64)', p: 4, borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {/* Left Content */}
        <Box flex={1}>
          {isEditing ? (
            <ProfileForm profile={profile} setProfile={setProfile} setIsEditing={setIsEditing} />
          ) : (
            <>
                <h4 
                    className='text-white text-4xl font-bold'
                >
                    {profile.name}
                </h4>
                <Typography className='text-slate-400'>{profile.email}</Typography>
                <Typography mt={2} className='text-orange-300 font-bold'>EDUCATION</Typography>
                <Typography color="white">{profile.college}</Typography>
                <Typography color="white">{profile.degree}</Typography>
                <Typography mt={2} className='text-orange-300 font-bold'>TECHNICAL SKILLS</Typography>
                <Box display="flex" className='justify-center' flexWrap="wrap" gap={1} mt={2}>
                    {profile.techSkills.map((skill, index) => (
                    <div key={index} label={skill} className='text-indigo-400 p-2 border-2 rounded-lg px-4 border-indigo-400'>{skill}</div>
                    ))}
                </Box>
            </>
          )}
        </Box>
        <div>
            <Avatar 
                src={profile.profilePhoto} 
                className='mr-12'
                sx={{ width: 200, height: 200, border: '3px solid rgb(122, 135, 174)' }} 
             />
            <button 
                onClick={() => setIsEditing(true)} 
                className='bg-indigo-400 text-white p-2 mt-12 mr-12 rounded px-8'
            >
                Edit
            </button>
        </div>
        
      </Box>

      {/* Bottom Coding Profiles */}
      <Box sx={{ width: '60vw', textAlign: 'center', mt: 3 }}>
        <h4 className='text-indigo-200 text-4xl font-bold pb-2'>Coding Profiles</h4>
        <Box display="flex" justifyContent="center" gap={2}>
          {profile.codingProfiles.map((profile, index) => (
            <Typography key={index}>
              <a 
                href={profile.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className='text-yellow-200 p-2 mt-16'
                style={{ textDecoration: 'none', fontWeight: 'bold' }}
              >
                {profile.platform}
              </a>
            </Typography>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
