const axios = require('axios');

const backendAPI = process.env.REACT_APP_BACKEND_API;
const userId = process.env.REACT_APP_USER_ID;

export const fetchPortfolio = async () => {
  const url = `${backendAPI}/portfolio/${userId}`;
  try {
    const result = await axios({ method: 'get', url });
    return result.data.body;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export const updatePortfolio = async (portfolioName, description, twitterUsername, birthdate) => {
    const url = `${backendAPI}/portfolio/${userId}`;
    const data = {
        portfolioName,
        description,
        twitterUsername,
        birthdate,
    };
    const headers = { 'Content-Type': 'application/json' };
    try {
        await axios({ method: 'patch', url, data, headers });
        return true;
      } catch (e) {
        console.log(e);
      }
    return false;
}
