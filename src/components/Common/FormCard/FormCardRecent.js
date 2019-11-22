import React from 'react'
import Styles from './formcard.module.css'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Form , Label, Button, Segment } from 'semantic-ui-react'
import { useFirebaseCurrentUser } from 'fireact'
import { useFirebaseDatabaseWriters, useFirebaseDatabaseValue } from 'fireact/dist/hooks'
import { useDispatch } from 'react-redux'
import { generateTable } from '../../../actions/misc'
import { useSpring, animated } from 'react-spring'


function FormCardRecent({dropTypes, defaultDropType, type}) {
    let currentUDT = Date.now()
    const [getValue, setValue] = React.useState({desc: '', amount: '', type: null, dateTime: null})
    const user  = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const dispatch = useDispatch()
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const currentBalance = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/balance`)
    const { update : updateBalance } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}`)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/${type}`)
    const { update : updateTutorial } = useFirebaseDatabaseWriters(`users/${uid}/settings`)
    const [dropValue, setDropValue] = React.useState(defaultDropType)
    const [isComplete, setIsComplete] = React.useState([false, false, false])
    const animProps1 = useSpring({opacity: 1, transform: 'translateX(0)',delay : 100, from: { opacity: 0, transform: 'translateX(-100vw)'}})
    const animProps2 = useSpring({opacity: 1, transform: 'translateX(0)',delay : 200, from: { opacity: 0, transform: 'translateX(-100vw)'}})
    let newBalance = 0

    type === 'Income' ? newBalance = parseInt(currentBalance) + parseInt(getValue.amount) 
                      : newBalance = (currentBalance - getValue.amount)


    return (
            <animated.div style={type === 'Income' ? animProps2  : animProps1} className={Styles.formWrapper}>
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
                        updateTutorial({overviewTutorialComplete : true})
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
            </animated.div>
    )
}

export default FormCardRecent