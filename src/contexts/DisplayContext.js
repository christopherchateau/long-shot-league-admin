import React, { createContext, useState } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export const DisplayContext = createContext()

const DisplayContextProvider = props => {
	const [modalProps, setModalProps] = useState(null)

	const openModal = props => {
		setModalProps(props)
		disableBodyScroll(document.querySelector('.MainPage'))
	}

	const closeModal = () => {
		setModalProps(null)
		clearAllBodyScrollLocks()
	}

	return (
		<DisplayContext.Provider
			value={{
				modalProps,
				openModal,
				closeModal,
			}}
		>
			{props.children}
		</DisplayContext.Provider>
	)
}

export default DisplayContextProvider
