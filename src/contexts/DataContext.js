import React, { useState, useEffect, createContext } from 'react'
import { getData } from '../utilities/apiCalls'

export const DataContext = createContext()

const DataContextProvider = props => {
	const [data, setData] = useState(null)

	useEffect(() => { loadData() }, [])

	const loadData = async () => {
        setData(await getData())
    }

    return (
		<DataContext.Provider value={{ data, refreshData: loadData }}>
			{props.children}
		</DataContext.Provider>
    )
}

export default DataContextProvider
