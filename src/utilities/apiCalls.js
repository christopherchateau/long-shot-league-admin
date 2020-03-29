import { sortData } from './helper.js'

let endpoint = 'http://localhost:3001/api/v1/longshotleague' //'https://long-shot-league-be.herokuapp.com/api/v1/longshotleague'
const types = ['players', 'teams', 'bonus']
const headers = { 'Content-Type': 'application/json' }

const get = async type => {
	const response = await fetch(`${endpoint}/${type}`)
	return await response.json()
}

export const getData = async () => {
	const data = await Promise.all(types.map(type => get(type)))
	return sortData(data)
}

export const patchTeamData = async ({ name, points, is_eliminated }) =>
	await fetch(`${endpoint}/team`, {
		method: 'PATCH',
		headers,
		body: JSON.stringify({
			name,
			points,
			is_eliminated,
		}),
	})

export const postBonus = async (playerData, description, points) =>
	await fetch(`${endpoint}/bonus`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			name: playerData.name,
			player_id: playerData.id,
			description,
			points,
		}),
	})

export const deleteBonus = async id =>
	await fetch(`${endpoint}/bonus`, {
		method: 'DELETE',
		headers,
		body: JSON.stringify({ id }),
	})
