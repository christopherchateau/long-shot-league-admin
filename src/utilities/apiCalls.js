import { sortData } from './helper.js'

let endpoint
// endpoint = 'https://long-shot-league-be.herokuapp.com/api/v1/longshotleague/'
endpoint = 'http://localhost:3001/api/v1/longshotleague/'

const types = ['players', 'teams', 'bonus']
const credentials = 'same-origin'
const headers = { 'Content-Type': 'application/json' }

const get = async type => {
    const response = await fetch(`${endpoint}${type}`)
    return await response.json()
}

export const getData = async () => {
    try {
        const data = await Promise.all(
			types.map(
                type => get(type)
            )
        )
        return sortData(data)

    } catch (error) {
        console.error(error)
    }
}

export const patchTeamData = async (teamData, points) => {
    await fetch(`${endpoint}team`, {
        method: 'PATCH',
        headers,
        credentials,
        body: JSON.stringify({
            name: teamData.name,
            points,
            is_eliminated: teamData.is_eliminated,
        }),
    })
}

export const postBonus = async (playerData, description, points) => {
    await fetch(`${endpoint}bonus`, {
        method: 'POST',
        headers,
        credentials,
        body: JSON.stringify({
            name: playerData.name,
            player_id: playerData.id,
            description,
            points,
        }),
    })
}

export const deleteBonus = async id => {
    await fetch(`${endpoint}bonus`, {
        method: 'DELETE',
        headers,
        credentials,
        body: JSON.stringify({ id }),
    })
}
