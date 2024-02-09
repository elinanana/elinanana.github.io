import { nameQuery, auditsDoneQuery, auditsReceivedQuery, gameQuery } from "./queries.js";
import { getId } from "./jwt.js";
import { drawGraph } from "./graphs.js";

const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
const userId = getId()
const endpoint = 'https://01.kood.tech/api/graphql-engine/v1/graphql'


// Make the GraphQL request with Bearer authentication
async function fetchData(query, variables = {}) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify({ query, variables }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error making GraphQL request:', error);
  }
}

fetchData(nameQuery)
  .then(userData => {
    const userInfoElement = document.getElementById('userInfo');
    userInfoElement.innerHTML = `${userData.user[0].firstName} ${userData.user[0].lastName}`;
  })
  .catch(error => {
    console.error('Error handling user data:', error);
  });


fetchData(auditsDoneQuery, { userId })
  .then(data => {
    const auditsDoneElement = document.getElementById('auditsDone');
    auditsDoneElement.innerHTML = `${data.audit.length}`;
  })
  .catch(error => {
    console.error('Error handling user data:', error);
  });


fetchData(auditsReceivedQuery)
  .then(data => {
    const auditsDoneElement = document.getElementById('auditsReceived');
    auditsDoneElement.innerHTML = `${data.transaction.length}`;
  })
  .catch(error => {
    console.error('Error handling user data:', error);
  });


fetchData(gameQuery)
  .then(data => {
    // draw zzle results
    const zzleResults = extractGameResults("zzle", data)
    drawGraph("zzle", zzleResults)

    // draw memory results
    const memoryResults = extractGameResults("memory", data);
    drawGraph("memory", memoryResults)
  })
  .catch(error => {
    console.error('Error handling user data:', error);
  });


function extractGameResults(gameName, data) {
  // Extracting  game data
  const gameData = data.result.find(item => item.attrs.games && item.attrs.games.some(game => game.name === gameName));
  // Extracting  game results
  const gameResults = gameData.attrs.games.find(game => game.name === gameName).results;
  return gameResults
}

document.getElementById('logout').addEventListener('click', function (event) {
  event.preventDefault();
  // Set the expiration date of the cookie to a past date
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/';
});