import React from 'react'
import bballImg from '../../images/bball.png'

import './Header.css'

const bball = <img className='todd-img' alt='loading' src={bballImg} />

export default () =>
	<div className='Header'>
		<h1>LONG SH{bball}T ADMIN</h1>
	</div>
