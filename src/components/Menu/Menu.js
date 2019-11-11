import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import Styles from './menu.module.css'

import { logoutUser } from '../../actions/'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function DisplayMenu() {

    const [activeItem, setActiveItem] = React.useState(useSelector(state => state.navigation.pageLoaded))
    const dispatch = useDispatch()

    return (
        <Menu className={Styles.menu} pointing fluid>
            <Link to='/'>
                <Menu.Item
                    name='Overview'
                    active={activeItem === 'Overview'}
                    onClick={() => 
                        {
                            setActiveItem('Overview')
                        }}
                />
            </Link>
            <Link to='/transactions'>
                <Menu.Item
                    name='Transactions'
                    active={activeItem === 'Transactions'}
                    onClick={() => 
                        {
                            setActiveItem('Transactions')
                        }} 
                />
            </Link>
            <Link to='/settings'>
                <Menu.Item
                    name='Settings'
                    active={activeItem === 'Settings'}
                    onClick={() => 
                        {
                            setActiveItem('Settings')
                        }}
                />
            </Link>
            <Menu.Item
                name='Logout'
                onClick={() => dispatch(logoutUser())}
            />
        </Menu>
    )
}

export default DisplayMenu