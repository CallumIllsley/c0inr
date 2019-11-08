import React from 'react'
import Styles from './formcard.module.css'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Form , Label, Button, Segment } from 'semantic-ui-react'
import { useFirebaseCurrentUser } from 'fireact'
import { useFirebaseDatabaseWriters, useFirebaseDatabaseValue } from 'fireact/dist/hooks'
import { useDispatch } from 'react-redux'
import { generateTable } from '../../../actions/misc'

function FormCardRecent({type}) {
    let currentUDT = Date.now()

    const user  = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const dispatch = useDispatch()
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/income`)
    const { update : updateBalance } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}`)
    const [dropValue, setDropValue] = React.useState()
    const [incomeInput, setIncomeInput] = React.useState({desc: null, amount: null, type: null, dateTime: null})
    const [isComplete, setIsComplete] = React.useState([false, false, false])
    const currentBalance = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/balance`)
    let newBalance = parseInt(currentBalance) + parseInt(incomeInput.amount)


    const incomeTypes = [
        {label: 'Income', value: 'Income'},
        {label: 'Lottery', value: 'Lottery'},
        {label: 'Transfer', value: 'Transfer'}
    ]

    return (
            <div className={Styles.formWrapper}>
             <Label color='green' size='medium' className={Styles.tableHead} ribbon='Left'>Add Income</Label>
                <Form className={Styles.formContent} onSubmit={ () => {
                    if(currentAccount == null) {
                        alert('Add an account before adding any income!')
                    } else {
                        setIncomeInput({desc: incomeInput.desc, amount: incomeInput.amount, type: dropValue, dateTime: currentUDT})
                        update({[currentUDT] : incomeInput})
                        currentUDT = Date.now()
                        updateBalance({balance: newBalance})
                        setIsComplete([false, false, false])
                        setIncomeInput({desc: '', amount: ''})
                        setDropValue('')
                        dispatch(generateTable(true))
                    }
                }}>
                    <Form.Field >
                        <label className={Styles.labels}>Type:</label>
                        <Dropdown 
                            value={dropValue}
                            className={Styles.formField} 
                            options={incomeTypes} 
                            placeholder='Select a type!'
                            onChange={(e) => {
                                setDropValue(e.value)
                                setIncomeInput({desc: incomeInput.desc, amount: incomeInput.amount, type: dropValue, dateTime: currentUDT})
                                setIsComplete([true, isComplete[1], isComplete[2]])
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className={Styles.labels}>Description:</label>
                        <InputText 
                            className={Styles.formField} 
                            keyfilter='alphanum'
                            value={incomeInput.desc}
                            onChange={(e) => {
                                setIncomeInput({desc: e.target.value, amount: incomeInput.amount, type: dropValue, dateTime: currentUDT})
                                setIsComplete([isComplete[0], true, isComplete[2]])
    console.log(currentBalance)
                                
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className={Styles.labels}>Amount:</label>
                        <InputText 
                            className={Styles.formField} 
                            keyfilter='int'
                            value={incomeInput.amount}
                            onChange={(e) => { 
                                setIncomeInput({desc: incomeInput.desc, amount: e.target.value, type: dropValue, dateTime: currentUDT})
                                setIsComplete([isComplete[0], isComplete[1], true])
                            }}
                        />
                    </Form.Field>
                <Button content='Submit' color='green' fluid/>
                {
                    isComplete[0] && isComplete[1] && isComplete[2] ? <Segment fluid size='tiny' color='green'>Click submit to add income!</Segment>
                                                                    : <Segment fluid size='tiny' color='red'>Finish the form and cick submit</Segment>
                }
                </Form>
            </div>
    )
}

export default FormCardRecent