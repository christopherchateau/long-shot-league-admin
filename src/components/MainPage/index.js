import React, { Component } from 'react'
import Players from '../Players'
import Teams from '../Teams'
import LoadingPage from '../LoadingPage'
import { getData } from '../../utilities/apiCalls'

import './MainPage.css'

export default class MainPage extends Component {
    state = {
        display: 'teams',
        data: [],
        errors: [],
    }

    componentDidMount = async () => {
        const data = await getData()
        const errors = data.filter(resp => resp.error)

        errors.length
            ? this.setState({ errors })
            : this.setState({ data })
    }

    refreshData = () => this.componentDidMount()

    handleToggleBtnClick = () => {
        let display = ''
        this.state.display === 'teams'
            ? display = 'players'
            : display = 'teams'
        this.setState({ display })
    }

    render() {
        const { display, data } = this.state
        const [playerData, teamData, bonusData] = data

        !data.length
            ? <div className='MainPage'>
                <LoadingPage />
            </div>

            : <div className='MainPage'>
                <button
                    className='main-page-toggle-btn'
                    onClick={this.handleToggleBtnClick}
                >
                    {display}
                </button>

                {display === 'players' &&
                    <Players
                        {...{ playerData, bonusData, refreshData: this.refreshData }}
                    />
                }

                {display === 'teams' &&
                    <Teams {...{ teamData, refreshData: this.refreshData }} />
                }
            </div>
    }
}
