const axios = require("axios");

const fetchLeetCodeProfile = async (username) => {
  try {
    const response = await axios.post("https://leetcode.com/graphql", {
      query: `
        query getUserData($username: String!) { 
          matchedUser(username: $username) { 
            submitStatsGlobal { 
              acSubmissionNum { 
                difficulty 
                count 
              } 
            } 
            profile { 
              ranking 
            } 
            userCalendar { 
              streak 
              totalActiveDays 
            } 
          } 
          userContestRanking(username: $username) { 
            rating 
            attendedContestsCount
          } 
          userContestRankingHistory(username: $username) { 
            rating 
            contest { 
              title 
              startTime 
            } 
          } 
        }`,
      variables: { username }
    });
    const userData = response.data.data.matchedUser;
    const contest=response.data.data
    return {
      submissionCount: userData.submitStatsGlobal.acSubmissionNum[0].count,
      rating: contest.userContestRanking.rating,
      recentContestRatings: contest.userContestRankingHistory.slice(-5).map((contest) => contest.rating),
      contestsParticipated: contest.userContestRanking.attendedContestsCount,
      activeDays: userData.userCalendar.totalActiveDays,
      easyQuestionsSolved: userData.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === 'Easy').count,
      mediumQuestionsSolved: userData.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === 'Medium').count,
      hardQuestionsSolved: userData.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === 'Hard').count
    };
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return { 
      submissionCount: 0, 
      rating: null, 
      recentContestRatings: [], 
      contestsParticipated: 0, 
      activeDays: 0, 
      easyQuestionsSolved: 0, 
      mediumQuestionsSolved: 0, 
      hardQuestionsSolved: 0 
    };
  }
};

const fetchGitHubProfile = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return {
      publicRepos: response.data.public_repos,
      contributions: response.data.contributions
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { publicRepos: 0, contributions: 0 };
  }
};

const fetchCodeforcesProfile = async (username) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const userData = response.data.result[0];
    return {
      rating: userData.rating,
      maxRating: userData.maxRating,
      submissionCount: userData.submissionCount
    };
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    return { rating: null, maxRating: null, submissionCount: 0 };
  }
};

module.exports = { fetchLeetCodeProfile, fetchGitHubProfile, fetchCodeforcesProfile };
