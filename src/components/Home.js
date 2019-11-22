import React from 'react'

import DisplayMenu from './Menu/Menu'
import { Switch, Route, useLocation } from 'react-router-dom'
import Styles from './home.module.css'
import Dashboard from './Dashboard/Dashboard'
import TransactionsContainer from './Income/TransactionsContainer'
import Settings from '../components/Settings/Settings'
import { Sidebar, Segment, Menu, Card, Header, Button, Input, Icon, Modal, Form, Dimmer } from 'semantic-ui-react'
import { useFirebaseCurrentUser } from 'fireact'
import { useTransition, animated } from 'react-spring'
import DisplayAccounts from './Common/Accounts/DisplayAccounts'
import { useFirebaseDatabaseWriters, useFirebaseDatabaseValue } from 'fireact/dist/hooks'

function Home() {
    
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const [sidebarVisible, setSidebarVisible] = React.useState(false)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts`)
    const { update : updateCurrentAccount } = useFirebaseDatabaseWriters(`users/${uid}/settings`)
    const { update : updateTutorialSettings } = useFirebaseDatabaseWriters(`users/${uid}/settings`)
    const accTut = useFirebaseDatabaseValue(`users/${uid}/settings/accTutorialComplete`)
    const [viewAccountAdder, setViewAccountAdder] = React.useState(false)
    const [accountDetails, setAccountDetails] = React.useState({name: null, desc: null, balance: 0})
    const [complete, setComplete] = React.useState([false, false]) 
    const location = useLocation()
    const transitions = useTransition(location, location => location.pathname, {
    from: { background: '#F6F5F1', opacity: 0, transform: 'translate3d(-100%,0,0)'},
    enter: { background: '#F6F5F1', opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { background: '#F6F5F1', opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

    return transitions.map(({ item: location, props, key }) => (   
        <div className={Styles.mainContainer}>

            <Modal
                basic
                size='small'
                open={viewAccountAdder}
            >
                <Form>
                    <Form.Field >
                        <Header inverted content='Enter account details'/>
                    </Form.Field>
                    <Form.Field >
                        <label className={Styles.addLabel}>Account Name: </label>
                        <Input onChange={(e) => {
                            setAccountDetails({name: e.target.value, desc: accountDetails.desc, balance: accountDetails.balance})
                            setComplete([true, complete[1]])
                        }}/>
                    </Form.Field>
                    <Form.Field >
                        <label className={Styles.addLabel}>Account Desription: </label>
                        <Input onChange={(e) => {
                            setAccountDetails({name: accountDetails.name, desc: e.target.value, balance: accountDetails.balance})
                            setComplete([complete[0], true])
                        }}/>
                    </Form.Field>
                    <Button 
                        color='green' 
                        onClick={() => {
                            if(complete[0] && complete[1]) {
                                setViewAccountAdder(false)
                                update({[accountDetails.name] : accountDetails})
                                updateCurrentAccount({currentAccount: accountDetails.name})
                                updateTutorialSettings({accTutorialComplete : true})
                            }
                        }}  
                        inverted>
                        <Icon name='checkmark' /> Add
                    </Button>
                </Form>
            </Modal>
            <Sidebar.Pushable  as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    vertical
                    visible={sidebarVisible}
                    dimPage='true'
                    onMouseLeave={() => setSidebarVisible(false)}
                    className={Styles.accountSidebar}
                >
                    <Header content='Accounts' className={Styles.account}/>
                    <DisplayAccounts/>
                    <Card className={Styles.account}>
                        <Card.Content>
                            <Button fluid color='green' size='mini' onClick={() => setViewAccountAdder(true)}>Add</Button>
                        </Card.Content>
                    </Card>
                    
                </Sidebar>
                    <div className={Styles.sidebarViewer} onMouseOver={() => { 
                        setSidebarVisible(true)
                    }}/> 
                    <Sidebar.Pusher dimmed={sidebarVisible}>
                    <Dimmer className={Styles.dimmer} active={!accTut}>
                        <Header as='h2' icon inverted>
                            <Icon size='massive' name='arrow circle left'/>
                            Make sure to add an account first!
                            <Header.Subheader>Just slide your mouse to the left of the screen!</Header.Subheader>
                        </Header>
                    </Dimmer>                 
                        <div className={Styles.menu}>
                                    <DisplayMenu />
                        </div>
                        <animated.div key={key} style={props}>
                        <Switch location={location}>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/transactions' component={TransactionsContainer}/>
                            <Route path='/' component={Dashboard}/>
                        </Switch>
                        </animated.div>
                    </Sidebar.Pusher>
            </Sidebar.Pushable> 
        </div>
    ) ) 
}

export default Home