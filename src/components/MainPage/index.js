import React, { Component } from 'react'
import Players from '../Players'
import Teams from '../Teams'
import Loading from '../Loading'
import Errors from '../Errors'
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

    get showLoading() {
        return !this.state.data.length
    }

    get showErrors() {
        return this.state.errors.length
    }

    get showPlayers() {
        return this.state.display === 'players'
    }

    get showTeams() {
        return this.state.display === 'teams'
    }

    render() {
        const { display, data, errors } = this.state
        const [playerData, teamData, bonusData] = data

        return this.showErrors

            ? <Errors {...{ errors }} />

            : this.showLoading

                ? <Loading />

                : <div className='MainPage'>
                    <button
                        className='main-page-toggle-btn'
                        onClick={this.handleToggleBtnClick}
                    >
                        {display}
                    </button>

                    {this.showPlayers &&
                        <Players
                            {...{
                                playerData,
                                bonusData,
                                refreshData: this.refreshData
                            }}
                        />
                    }

                    {this.showTeams &&
                        <Teams {...{ teamData, refreshData: this.refreshData }} />
                    }
                </div>
    }
}
