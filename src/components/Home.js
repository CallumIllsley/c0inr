import React from 'react'

import DisplayMenu from './Menu/Menu'
import { Switch, Route } from 'react-router-dom'
import Styles from './home.module.css'
import { useSelector } from 'react-redux'
import TransactionsContainer from './Income/TransactionsContainer'
import Overview from '../components/Overview/Overview'
import Settings from '../components/Settings/Settings'
import { Sidebar, Segment, Menu, Card, Header, Button, Input, Icon, Modal, Form } from 'semantic-ui-react'
import { useFirebaseCurrentUser } from 'fireact'
import DisplayAccounts from './Common/Accounts/DisplayAccounts'
import { useFirebaseDatabaseWriters } from 'fireact/dist/hooks'

function Home() {

    const currentPage = useSelector(state => state.navigation.pageLoaded)
    const [sidebarVisible, setSidebarVisible] = React.useState(false)
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts`)
    const { update : updateCurrentAccount } = useFirebaseDatabaseWriters(`users/${uid}/settings`)
    const [viewAccountAdder, setViewAccountAdder] = React.useState(false)
    const [accountDetails, setAccountDetails] = React.useState({name: null, desc: null, balance: 0})

    return (   
        <div className={Styles.mainContainer}>
            <Modal
                basic
                size='small'
                open={viewAccountAdder}
            >
                <Form>
                    <Form.Field inverted>
                        <Header inverted content='Enter account details'/>
                    </Form.Field>
                    <Form.Field inveted>
                        <label>Account Name: </label>
                        <Input onChange={(e) => setAccountDetails({name: e.target.value, desc: accountDetails.desc, balance: accountDetails.balance})}/>
                    </Form.Field>
                    <Form.Field inverted>
                        <label>Account Desription: </label>
                        <Input onChange={(e) => setAccountDetails({name: accountDetails.name, desc: e.target.value, balance: accountDetails.balance})}/>
                    </Form.Field>
                    <Button 
                        color='green' 
                        onClick={() => {
                            setViewAccountAdder(false)
                            update({[accountDetails.name] : accountDetails})
                            updateCurrentAccount({currentAccount: accountDetails.name})
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
                    <div className={Styles.menu}>
                                <DisplayMenu />
                    </div>
                    <Switch>
                        <Route path='/transactions' component={TransactionsContainer}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/' component={Overview}/>
                    </Switch>
                </Sidebar.Pusher>
            </Sidebar.Pushable> 
        </div>
    )
}

export default Home