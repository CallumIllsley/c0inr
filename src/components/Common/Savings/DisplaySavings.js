import React from 'react'
import Styles from './savings.module.css'
import SavingsCard from './SavingsCard'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import { useFirebaseDatabaseWriters } from 'fireact/dist/hooks'
import { useSpring, animated } from 'react-spring'


function DisplaySavings() {
    const currentUDT = new Date()
    const todayDate = currentUDT.getFullYear() + '-' + (currentUDT.getMonth() + 1) + '-' + currentUDT.getDate()
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const savingsList = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/savings`) || {}
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/savings`)
    const savings = Object.values(savingsList)
    const [visible, setVisible] = React.useState(false)
    const [savingsValue, setSavingsValue] = React.useState({name: null, amount: null, date: null, progress: null})
    const animProps3 = useSpring({opacity: 1, transform: 'translateX(0)',delay: 600, from: {opacity: 0, transform: 'translateX(100vw)'}})


    return (
        <> 
        <Modal size='large' open={visible}>
            <Modal.Header>Add a savings goal</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name of goal:</label>
                        <Input onChange={(e) => setSavingsValue({name: e.target.value, amount: savingsValue.amount, date: savingsValue.date, progress: 0})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Amount to save:</label>
                        <Input type='number' onChange={(e) => setSavingsValue({name: savingsValue.name, amount: e.target.value, date: savingsValue.date, progress: 0})}/>
                    </Form.Field>                
                    <Form.Field>
                        <label>Date to achieve goal by:</label>
                        <Input type='date' min={todayDate} onChange={(e) => {
                            setSavingsValue({name: savingsValue.name, amount: savingsValue.amount, date: e.target.value, progress: 0})
                        }}/>
                    </Form.Field>
                    <Button onClick={() => {
                        let date = new Date(savingsValue.date).getTime() / 1000
                        setSavingsValue({name: savingsValue.name, amount: savingsValue.amount, date: date, progress: 0})
                        update({[savingsValue.name] : savingsValue})
                        setVisible(false)
                    }}>
                        Submit!
                    </Button>
                </Form>
            </Modal.Content>   
        </Modal>
            {
                savings.map((entry) => {
                    return <SavingsCard name={entry.name} 
                                        amount={entry.amount} 
                                        date={entry.date} 
                                        progress={entry.progress}/>
                })
            }
            <animated.div style={animProps3} className={Styles.addContainer}>
                <Button onClick={() => setVisible(true)} fluid color='green'>Add Savings Goal</Button>
            </animated.div>
        </>
    )
}

export default DisplaySavings