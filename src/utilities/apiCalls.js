import { formatApiData as format } from './helper.js'

// const local = 'http://localhost:3001/api/v1/longshotleague'
const heroku = 'https://long-shot-league-be.herokuapp.com/api/v1/longshotleague'
const endpoint = heroku

const paths = ['players', 'teams', 'bonus']
const headers = { 'Content-Type': 'application/json' }

const get = async path => {
	const response = await fetch(`${endpoint}/${path}`)
	return await response.json()
}

export const getData = async () => {
	try {
		const data = await Promise.all(paths.map(path => get(path)))
		return format(paths, data)
	} catch {
		return { errors: ['Data failed to load :-('] }
	}
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
