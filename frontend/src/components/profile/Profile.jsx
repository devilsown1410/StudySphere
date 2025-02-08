import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Avatar, Grid, Paper } from '@mui/material';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [codingStats, setCodingStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/users/${user}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProfile({
        name: res.data.name,
        email: `${localStorage.getItem('email')}`,
        college: res.data.college,
        degree: res.data.degree || '',
        techSkills: res.data.techSkills || ['React', 'Node.js', 'MongoDB', 'Python'],
        codingProfiles: res.data.codingProfiles || [
          { platform: 'LeetCode', link: 'https://leetcode.com/johndoe', username: 'johndoe' },
          { platform: 'Codeforces', link: 'https://codeforces.com/profile/johndoe', username: 'johndoe' },
          { platform: 'GitHub', link: 'https://github.com/johndoe', username: 'johndoe' }
        ],
        profilePhoto: 'https://plus.unsplash.com/premium_photo-1682124752476-40db22034a58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWV8ZW58MHx8MHx8fDA%3D'
      });
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchCodingStats = async () => {
      if (profile) {
        try {
          const token = localStorage.getItem('token');
          const usernames = profile.codingProfiles.reduce((acc, curr) => {
            acc[curr.platform.toLowerCase()] = curr.username;
            return acc;
          }, {});
          const response = await axios.post('http://localhost:3000/users/coding', usernames, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setCodingStats(response.data);
        } catch (error) {
          console.error('Error fetching coding stats:', error);
        }
      }
    };

    fetchCodingStats();
  }, [profile]);

  if (!profile || !codingStats) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4, color: 'rgb(35, 38, 52)' }} />;
  }

  const totalQuestionsSolved = (codingStats.leetcode.submissionCount || 0) +
    (codingStats.codeforces.submissionCount || 0) +
    (codingStats.github.contributions || 0);

  const leetCodeRatingData = {
    labels: ['Contest 1', 'Contest 2', 'Contest 3', 'Contest 4', 'Contest 5'],
    datasets: [
      {
        label: 'LeetCode Rating',
        data: codingStats.leetcode.recentContestRatings || [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const questionDifficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [
          codingStats.leetcode.easyQuestionsSolved || 0,
          codingStats.leetcode.mediumQuestionsSolved || 0,
          codingStats.leetcode.hardQuestionsSolved || 0
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
      }
    ]
  };

  return (
    <div className='flex flex-col justify-center align-center mt-8 p-4 min-w-[60vw]'>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor:'transparent', boxShadow:'none' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.profilePhoto}
              sx={{ width: 200, height: 200, border: '3px solid rgb(122, 135, 174)', mx: 'auto',py:'2' }}
            />
            <h3 className='text-white text-4xl font-bold mt-4 mb-2'>{profile.name}</h3>
            <Typography className='text-slate-400'>{profile.email}</Typography>
            <button
              onClick={() => setIsEditing(true)}
              className='bg-indigo-100 text-slate-700 font-semibold p-2 mt-4 rounded px-8'
            >
              Edit
            </button>
          </Grid>
          <Grid item xs={12} md={8}>
            {isEditing ? (
              <ProfileForm profile={profile} setProfile={setProfile} setIsEditing={setIsEditing} />
            ) : (
              <div className='flex flex-col justify-center mt-[4rem] align-center'>
                <h4 className='text-red-300 font-bold'>EDUCATION</h4>
                {
                  profile.college? (
                    <p className='text-2xl text-slate-200 font-semibold'>{profile.college}</p>
                  ):(
                    <p className='text-4xl text-slate-200 font-semibold'>---</p>
                  )
                }
                <p className='text-2xl text-slate-200 font-semibold'>{profile.degree}</p>
                <h4 className='text-red-300 font-bold mt-4'>TECHNICAL SKILLS</h4>
                <div className='flex flex-wrap max-w-400 gap-3 mt-4 justify-center'>
                  {profile.techSkills.map((skill, index) => (
                    <div key={index} className='text-indigo-400 p-2 border-2 rounded-lg px-4 border-indigo-300'>{skill}</div>
                  ))}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'transparent',boxShadow:'none', mt: 4 }}>
        <h4 className='text-indigo-300 text-5xl font-bold text-center pb-2'>Coding Profiles</h4>
        <Grid container spacing={4}>
          {profile.codingProfiles.map((profile, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ textAlign: 'center' }}>
              <Typography>
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-yellow-200 p-2'
                  style={{ textDecoration: 'none', fontWeight: 'bold' }}
                >
                  {profile.platform}
                </a>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'rgb(30, 33, 44)', mt: 4 }}>
        <Typography variant="h4" className='text-blue-200 text-center font-semibold pb-2'>Statistics</Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" className='text-white'>Total Questions Solved</Typography>
          <Typography className='text-slate-400'>{totalQuestionsSolved}</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <h6 className='text-blue-200 text-3xl mt-8 mb-4 font-semibold text-center'>LeetCode Rating (Last 5 Contests)</h6>
          <Line data={leetCodeRatingData}/>
        </Box>
        <Box sx={{ mt: 4 }}>
          <h6 className='text-blue-200 text-3xl mt-8 mb-4 font-semibold text-center'>Questions Solved by Difficulty</h6>
          <Doughnut data={questionDifficultyData} height={200} width={200} />
        </Box>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <h6 className='text-white text-2xl font-bold text-yellow-200 text-center mb-4'>LeetCode</h6>
            <Typography className='text-slate-400 text-center'>Username: {profile.codingProfiles.find(p => p.platform === 'LeetCode')?.username || 'NA'}</Typography>
            <Typography className='text-slate-400 text-center'>Submissions: {codingStats.leetcode.submissionCount || 0}</Typography>
            <Typography className='text-slate-400 text-center'>Ranking: {codingStats.leetcode.rating || 0}</Typography>
            <Typography className='text-slate-400 text-center'>Contests Participated: {codingStats.leetcode.contestsParticipated || 0}</Typography>
            <Typography className='text-slate-400 text-center'>Active Days: {codingStats.leetcode.activeDays || 0}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <h6 className='text-white text-2xl font-bold text-yellow-200 text-center mb-4'>GitHub</h6>
            <Typography className='text-slate-400 text-center'>Username: {profile?.codingProfiles.find(p => p.platform === 'GitHub')?.username || 'NA'}</Typography>
            <Typography className='text-slate-400 text-center'>Public Repos: {codingStats.github.publicRepos || 0}</Typography>
            <Typography className='text-slate-400 text-center'>Contributions: {codingStats.github.contributions || 0}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <h6 className='text-white text-2xl font-bold text-yellow-200 text-center mb-4'>Codeforces</h6>
            <Typography className='text-slate-400 text-center'>Username: {profile?.codingProfiles.find(p => p.platform === 'Codeforces')?.username || 'NA'}</Typography>
            <Typography className='text-slate-400 text-center'>Rating: {codingStats.codeforces.rating}</Typography>
            <Typography className='text-slate-400 text-center'>Max Rating: {codingStats.codeforces.maxRating}</Typography>
            <Typography className='text-slate-400 text-center'>Submissions: {codingStats.codeforces.submissionCount || 0}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
