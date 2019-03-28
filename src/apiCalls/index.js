export const getTeamData = async () => {
  const response = await fetch(
    "http://localhost:3001/api/v1/longshotleague/teams"
  );
  const teamData = await response.json();
  return teamData;
};

export const getPlayerData = async () => {
  const response = await fetch(
    "http://localhost:3001/api/v1/longshotleague/players"
  );
  const playerData = await response.json();
  return playerData;
};
