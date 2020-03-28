import React from 'react'
import Bonus from '../Bonus'
import PlayerForm from '../PlayerForm'

import './Players.css'

export default ({ playerData, bonusData, refreshData }) => {
	const players = playerData.map(player => {
		const bonusDataDisplayed = []

		const playerBonusTotal = bonusData.reduce((total, bonus) => {
			if (bonus.name === player.name) {
				bonusDataDisplayed.push(
					<Bonus {...{ bonus, refreshData, key: bonus.id }} />
				)
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
			<PlayerForm
				playerData={[{ name: '' }, ...playerData]}
				refreshData={refreshData}
			/>
			<div className='Players'>{players}</div>
		</div>
	)
}
