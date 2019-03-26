export const getTeamData = async () => {
  const response = await fetch(
    "https://long-shot-league-be.herokuapp.com/api/v1/longshotleague/teams"
  );
  const teamData = await response.json();
  return teamData;
};

export const getPlayersData = async () => {
  const response = await fetch(
    "https://long-shot-league-be.herokuapp.com/api/v1/longshotleague/players"
  );
  const playerData = await response.json();
  return playerData;
};
