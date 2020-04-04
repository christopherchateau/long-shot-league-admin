import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import Bonus from '../Bonus'
import PlayerForm from '../PlayerForm'

import './Players.css'

const Players = () => {
	let {
		data: [playerData, , bonusData],
	} = useContext(DataContext)

	const players = playerData.map(player => {
		const bonusDataDisplayed = []

		const playerBonusTotal = bonusData.reduce((total, bonus) => {
			if (bonus.name === player.name) {

				bonusDataDisplayed.push(<Bonus {...{ bonus, key: bonus.id }} />)
				total += bonus.points
			}
			return +total
		}, 0)

		return (
			<div className='player' key={player.name}>
				<h3 className='player-name'>{`${player.name} - ${playerBonusTotal}`}</h3>
				<div>{bonusDataDisplayed}</div>
			</div>
		)
	})

	return (
		<div>
			<PlayerForm />
			<div className='Players'>{players}</div>
		</div>
	)
}

export default Players
