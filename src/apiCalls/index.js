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

export const patchTeamData = async (teamData, points) => {
  const response = await fetch(
    `http://localhost:3001/api/v1/longshotleague/team`,
    {
      method: "PATCH",
      credentials: "same-origin",
      body: JSON.stringify({
        name: teamData.name,
        points,
        is_eliminated: teamData.is_eliminated
      }),
      headers: { "Content-Type": "application/json" }
    }
  );
  const data = await response.json();
};
