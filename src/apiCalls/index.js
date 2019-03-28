export const getTeamData = async () => {
  const response = await fetch(
    "http://localhost:3001/api/v1/longshotleague/teams"
  );
  const teamData = await response.json();
  teamData.push({ name: "" });
  return teamData;
};

export const getPlayerData = async () => {
  const response = await fetch(
    "http://localhost:3001/api/v1/longshotleague/players"
  );
  const playerData = await response.json();
  playerData.push({ name: "" });
  return playerData;
};

export const getBonusData = async () => {
  const response = await fetch(
    "http://localhost:3001/api/v1/longshotleague/bonus"
  );
  const bonusData = await response.json();
  return bonusData;
};
