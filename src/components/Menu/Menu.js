import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

import { logoutUser } from '../../actions/'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changePage } from '../../actions/navigation'

function DisplayMenu() {

    const [activeItem, setActiveItem] = React.useState(useSelector(state => state.navigation.pageLoaded))
    const dispatch = useDispatch()

    return (
        <Menu pointing fluid>
            <Link to='/'>
                <Menu.Item
                    name='Overview'
                    active={activeItem === 'Overview'}
                    onClick={() => 
                        {
                            setActiveItem('Overview')
                            dispatch(changePage('Overview'))
                        }}
                />
            </Link>
            <Link to='/income'>
                <Menu.Item
                    name='Income'
                    active={activeItem === 'Income'}
                    onClick={() => 
                        {
                            setActiveItem('Income')
                            dispatch(changePage('Income'))
                        }} 
                />
            </Link>
            <Link to='/outgoings'>
                <Menu.Item
                    name='Outgoings'
                    active={activeItem === 'Outgoings'}
                    onClick={() => 
                        {
                            setActiveItem('Outgoings')
                            dispatch(changePage('Outgoings'))
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
                            dispatch(changePage('Settings'))
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