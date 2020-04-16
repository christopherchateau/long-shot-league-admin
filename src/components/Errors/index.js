import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'

import './Errors.css'

export default () => {
	const { errors } = useContext(DataContext)
	console.log(errors)
	return (
		<div className='error'>
			<h1>ERROR</h1>

			{errors.map(error => (
				<h3 key={error}>{`- ${error}`}</h3>
			))}
		</div>
	)
}
