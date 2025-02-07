const axios = require("axios");

const fetchLeetCodeProfile = async (username) => {
  try {
    const response = await axios.post("https://leetcode.com/graphql",
      {
        "query": `{ matchedUser(username: \"${username}\") { submitStats { acSubmissionNum { count } } profile { ranking } } userContestRanking(username: \"rahul_1910\") { rating } }`
      });
    const userData = response.data.data.matchedUser;
    return {
      submissionCount: userData.submitStats.acSubmissionNum[0].count,
      rating: userData.profile.ranking
    };
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return 0;
  }
};

const fetchGitHubProfile = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data.public_repos;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return 0;
  }
};

const fetchCodeforcesProfile = async (username) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const userData = response.data.result[0];
    return {
      rating: userData.rating,
      maxRating: userData.maxRating
    };
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    return { rating: null, maxRating: null };
  }
};

module.exports = { fetchLeetCodeProfile, fetchGitHubProfile, fetchCodeforcesProfile };
