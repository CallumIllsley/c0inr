import React from 'react'
import Styles from './formcard.module.css'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Form , Label, Button, Segment } from 'semantic-ui-react'
import { useFirebaseCurrentUser } from 'fireact'
import { useFirebaseDatabaseWriters, useFirebaseDatabaseValue } from 'fireact/dist/hooks'
import { useDispatch } from 'react-redux'
import { generateTable } from '../../../actions/misc'

function FormCardRecent({dropTypes, defaultDropType, type}) {
    let currentUDT = Date.now()
    console.log(defaultDropType)
    const [getValue, setValue] = React.useState({desc: '', amount: '', type: null, dateTime: null})
    console.log(dropTypes)
    const user  = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const dispatch = useDispatch()
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/${type}`)
    const { update : updateBalance } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}`)
    const [dropValue, setDropValue] = React.useState(defaultDropType)
    const [isComplete, setIsComplete] = React.useState([false, false, false])
    const currentBalance = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/balance`)
    let newBalance = 0

    type === 'Income' ? newBalance = parseInt(currentBalance) + parseInt(getValue.amount) 
                      : newBalance = (currentBalance - getValue.amount)


    return (
            <div className={Styles.formWrapper}>
             <Label color='green' size='medium' className={Styles.tableHead} ribbon='Left'>Add {type}</Label>
                <Form className={Styles.formContent} onSubmit={ () => {
                    if(currentAccount == null) {
                        alert('Add an account first!')
                    } else {
                        setValue({desc: getValue.desc, amount: getValue.amount, type: dropValue, dateTime: currentUDT})
                        update({[currentUDT] : getValue})
                        currentUDT = Date.now()
                        updateBalance({balance: parseInt(newBalance)})
                        setIsComplete([false, false, false])
                        setValue({desc: '', amount:''})
                        dispatch(generateTable(true))
                    }
                }}>
                    <Form.Field >
                        <label className={Styles.labels}>Type:</label>
                        <Dropdown 
                            value={dropValue}
                            className={Styles.formField} 
                            options={dropTypes} 
                            placeholder='Select a type!'
                            onChange={(e) => {
                                setDropValue(e.value)
                                setValue({desc: getValue.desc, amount: getValue.amount, type: dropValue, dateTime: currentUDT})
                                setIsComplete([true, isComplete[1], isComplete[2]])
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className={Styles.labels}>Description:</label>
                        <InputText 
                            className={Styles.formField} 
                            keyfilter='alphanum'
                            value={getValue.desc}
                            onChange={(e) => {
                                setValue({desc: e.target.value, amount: getValue.amount, type: dropValue, dateTime: currentUDT})
                                setIsComplete([isComplete[0], true, isComplete[2]])                                
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className={Styles.labels}>Amount:</label>
                        <InputText 
                            className={Styles.formField} 
                            keyfilter='int'
                            value={getValue.amount}
                            onChange={(e) => { 
                                setValue({desc: getValue.desc, amount: e.target.value, type: dropValue, dateTime: currentUDT})
                                setIsComplete([isComplete[0], isComplete[1], true])
                            }}
                        />
                    </Form.Field>
                {
                    (getValue.desc != '') && (getValue.amount != '')  ? <Button content='Submit' color='green' fluid/>
                                                                      : <Button disabled content='Submit' color='green' fluid/>
                }
                {
                    (getValue.desc != '') && (getValue.amount != '') ? <Segment fluid size='tiny' color='green'>Click submit to add income!</Segment>
                                                                     : <Segment fluid size='tiny' color='red'>Finish the form and cick submit</Segment>
                }
                </Form>
            </div>
    )
}

export default FormCardRecent