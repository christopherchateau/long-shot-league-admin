import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { deleteBonus } from '../../utilities/apiCalls'

import './Bonus.css'

export default ({ bonus: { id, points, description } }) => {
	const { refreshData } = useContext(DataContext)

	const handleDelete = async id => {
		await deleteBonus(id)
		refreshData()
	}

	return <div className='bonus'>
		<h5 className='delete-btn' onClick={() => handleDelete(id)}>
			X
		</h5>
		<h5 className='description'>{`${points} - ${description}`}</h5>
	</div>
}
