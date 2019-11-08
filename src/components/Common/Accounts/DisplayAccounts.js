import React from 'react'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import { CardContent, Card } from 'semantic-ui-react'
import { useFirebaseDatabaseWriters } from 'fireact/dist/hooks'
import Styles from './displayaccounts.module.css'

function DisplayAccounts() {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const accountsList = useFirebaseDatabaseValue(`users/${uid}/accounts`) || {}
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const currentBalance = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/balance`)
    const accounts = Object.values(accountsList) 
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/settings/`)

    if(accounts === null) {
        update({currentAccount: null})
        return null
    } else {
        return (
            accounts.map((account) => {
                return (
                    <Card onClick={() => update({currentAccount: account.name})}className={Styles.account}>
                        <Card.Content header={account.name}/>
                        <Card.Content description={account.desc}/>
                        <Card.Content >£{currentBalance}</Card.Content>
                        {/* {console.log(currentBalance)} */}
                        {currentAccount === account.name ? <CardContent extra>Active Account</CardContent> : null}
                    </Card>
                )
            })
        )
        
    }
}

export default DisplayAccounts