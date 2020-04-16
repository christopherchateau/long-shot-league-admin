import React, { createContext, useState, useEffect } from 'react'
import { getData } from '../utilities/apiCalls'

export const DataContext = createContext()

const DataContextProvider = props => {
	const [data, setData] = useState(null)

	const loading = !data
	const errors = (data && data.errors) || null
	
	useEffect(() => { loadData() }, [])

	const loadData = async () => {
		setData(await getData())
	}

	return (
		<DataContext.Provider
			value={{
				data,
				errors,
				loading,
				refreshData: loadData,
			}}
		>
			{props.children}
		</DataContext.Provider>
	)
}

export default DataContextProvider
