import React from 'react'
import { useFirebaseDatabaseValue, useFirebaseCurrentUser } from 'fireact'
import { Dropdown } from 'primereact/dropdown'
import { Modal, Button, Divider, Form, Input, Grid, Progress, Header, Confirm} from 'semantic-ui-react'
import { useFirebaseDatabaseWriters } from 'fireact/dist/hooks'
import Styles from './budgets.module.css'

const outgoingsTypes = [
    {label: 'Rent', value: 'Rent'},
    {label: 'Lottery', value: 'Lottery'},
    {label: 'Transfer', value: 'Transfer'},
    {label: 'Fuel', value: 'Fuel'},
    {label: 'Transport', value: 'Transport'},
    {label: 'Shopping', value: 'Shopping'},
    {label: 'Food', value: 'Food'},
    {label: 'Utilities', value: 'Utilities'},    
]

function GenerateBudgets() {
    const currentUnix = Date.now() / 1000
    const currentUDT = new Date()
    const todayDate = currentUDT.getFullYear() + '-' + (currentUDT.getMonth() + 1) + '-' + currentUDT.getDate()
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const activeBudgetsList = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/budgets`)  || {}
    const dataList =  useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/Outgoings`) || {}
    const data = Object.values(dataList)
    const activeBudgets = Object.values(activeBudgetsList)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/budgets`)
    const [newBudget, setNewBudget] = React.useState({name: null, amount: null, date: null})
    const [dropValue, setDropValue] = React.useState()
    const [visible, setVisible] = React.useState(false)
    const [viewConfirm, setViewConfirm] = React.useState(false)
    const [budgetDelete, setBudgetDelete] = React.useState()
    let currentAmount = 0

    function dataToProgress(type, finalValue) {
        currentAmount = data.filter((entry) => entry.type === type).reduce((a,b) => a+ parseInt(b.amount), 0)
        return  (currentAmount / finalValue) * 100
    }   

    function resetProgress() { 
        activeBudgets.map((entry) => {
            console.log(entry.date)
            console.log(currentUnix)

            if(entry.date < currentUnix) { 
                update({[entry.name] : {name: entry.name, amount: entry.amount, date: (entry.date + 2592000)}})
            }
        })
    }

     function generate() {
         resetProgress()
         return (
        activeBudgets.map((entry) => { 
            let date = new Date(entry.date * 1000)
            console.log(date)
            return (
                <Grid columns={2} rows={2} relaxed='very'>
                 
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header color='green' size='small'>{entry.name}</Header>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header color='green' size='tiny'>Resets on {date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Header>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Button className={Styles.rLabel} onClick={() => { 
                            setViewConfirm(true)
                            setBudgetDelete(entry.name)
                            }} size='mini' icon='close' color='red'/>
                        </Grid.Column>
                        <Divider vertical hidden/>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            {
                               dataToProgress(entry.name, entry.amount) >= 100 ? <Progress error percent={dataToProgress(entry.name, entry.amount)}fluid>{`£${currentAmount} / £${entry.amount}\n You are over budget!`}</Progress>
                                                                               : <Progress success percent={dataToProgress(entry.name, entry.amount)}fluid>{`£${currentAmount} / £${entry.amount}`}</Progress>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Divider section/>
                </Grid>
                )
            })
        )
    }

    return ( 
        <>
        <Confirm 
            open={viewConfirm}
            onConfirm={() => {
                update({[budgetDelete] : {}})
                setViewConfirm(false)
            }}
            onCancel={() => setViewConfirm(false)}/>
                <Modal open={visible}>
                    <Modal.Header>Add a budget</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Budget name</label>
                                <Dropdown
                                    options={outgoingsTypes}
                                    value={dropValue}
                                    onChange={(e) => {
                                        setDropValue(e.value)
                                        setNewBudget({name: e.value, amount: newBudget.amount, date: newBudget.date})
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Budget amount</label>
                                <Input type='number' onChange={(e) => 
                                    setNewBudget({name: newBudget.name, amount: e.target.value, date: newBudget.date})
                                }></Input>
                            </Form.Field>
                            <Form.Field>
                                <label>When to reset?</label>
                                <Input type='date' min={todayDate} onChange={(e) => {
                                    let date = new Date(e.target.value).getTime() / 1000
                                    setNewBudget({name: newBudget.name, amount: newBudget.amount, date: date})
                                }}></Input>
                            </Form.Field>
                        <Modal.Actions>
                            <Button onClick={() => {
                                update({[newBudget.name]: newBudget})
                                setVisible(false)
                            }} 
                            color='green' 
                            icon='checkmark'>Submit</Button>
                        </Modal.Actions>
                            </Form>
                    </Modal.Content>
                </Modal>
                {generate()}
                <Button color='green' size='small' onClick={()=> setVisible(true)} content='Add Budget'fluid/>
                
        </>
    )
}

export default GenerateBudgets