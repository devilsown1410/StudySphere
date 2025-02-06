const axios = require("axios");

const fetchLeetCodeProfile = async (username) => {
  try {
    const response = await axios.post("https://leetcode.com/graphql", {
      query: `{ matchedUser(username: "${username}") { submitStats { acSubmissionNum { count } } } }`,
    });
    return response.data.data.matchedUser.submitStats.acSubmissionNum[0].count;
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

module.exports = { fetchLeetCodeProfile, fetchGitHubProfile };
