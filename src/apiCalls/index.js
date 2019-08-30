let endpoint 
// endpoint = 'https://long-shot-league-be.herokuapp.com/'
endpoint = 'http://localhost:3001'

export const getTeamData = async () => {
	const response = await fetch(`${endpoint}/api/v1/longshotleague/teams`)
  const teamData = await response.json()
	teamData.push({ name: '' }) //neede?
	return teamData
}

export const getPlayerData = async () => {
	const response = await fetch(`${endpoint}/api/v1/longshotleague/players`)
	const playerData = await response.json()
	playerData.push({ name: '' })
	return playerData
}

export const getBonusData = async () => {
	const response = await fetch(`${endpoint}/api/v1/longshotleague/bonus`)
	const bonusData = await response.json()
	return bonusData
}

export const patchTeamData = async (teamData, points) => {
	await fetch(`${endpoint}/api/v1/longshotleague/team`, {
		method: 'PATCH',
		credentials: 'same-origin',
		body: JSON.stringify({
			name: teamData.name,
			points,
			is_eliminated: teamData.is_eliminated,
		}),
		headers: { 'Content-Type': 'application/json' },
	})
}

export const postBonus = async (playerData, description, points) => {
	await fetch(`${endpoint}/api/v1/longshotleague/bonus`, {
		method: 'POST',
		credentials: 'same-origin',
		body: JSON.stringify({
			name: playerData.name,
			player_id: playerData.id,
			description,
			points,
		}),
		headers: { 'Content-Type': 'application/json' },
	})
}

export const deleteBonus = async (id) => {
	await fetch(`${endpoint}/api/v1/longshotleague/bonus`, {
		method: 'DELETE',
		credentials: 'same-origin',
		body: JSON.stringify({ id }),
		headers: { 'Content-Type': 'application/json' },
	})
}
