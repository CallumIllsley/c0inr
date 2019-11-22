import React from 'react'
import Styles from './savings.module.css'
import { Card, Button, Input, Progress, Label, Confirm } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue} from 'fireact'
import { useFirebaseDatabaseWriters } from 'fireact/dist/hooks'
import { useSpring, animated } from 'react-spring'

function SavingsCard({name, amount, progress, date}) {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/Outgoings`)
    const { update: updateSavings} = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}/savings/`)
    const currentBalance = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/balance`)
    const { update : updateBalance } = useFirebaseDatabaseWriters(`users/${uid}/accounts/${currentAccount}`)
    const [viewConfirm, setViewConfirm] = React.useState(false)
    const animProps3 = useSpring({opacity: 1, transform: 'translateX(0)',delay: 600, from: {opacity: 0, transform: 'translateX(-100vw)'}})

    let newBalance = 0
    
    const currentUDT = Date.now()
    const [values, setValues] = React.useState(0)
    const settings = {
        start: 0,
        min: 0,
        max: amount,
        step: (amount / 10),
        onChange: value => {
          setValues(value);
        }
      };

    function getPercentage(value) { 
        return ((value / amount) * 100) + progress
    }


    return ( 
        <animated.div style={animProps3} className={Styles.cardContainer}>
            <Confirm 
                open={viewConfirm}
                onConfirm={() => {
                    updateSavings({[name] : {}})
                    setViewConfirm(false)
                }}
                onCancel={() => setViewConfirm(false)}
            />
            <Card>
                <Card.Content>
                    <Card.Header>
                        {name}
                        <Button className={Styles.rLabel} onClick={() => setViewConfirm(true)} size='mini' icon='close' color='red'></Button>
                    </Card.Header>
                    <Card.Meta>{date}</Card.Meta>
                    <Card.Description>
                        <Progress success percent={progress} fluid>Goal: £{amount}</Progress>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Slider style={{thumb: {width: "17px", height: "17px"}}} className={Styles.slider} value={parseInt(values)} color="green" settings={settings} />
                    <Input onChange={(e) => {
                            setValues(Math.min(parseInt(amount), parseInt(e.target.value)))
                            console.log('LESS')
                       
                    }} 
                        value={values}
                        className={Styles.slider} 
                        type='number' 
                        placeholder='Amount here'>    
                    </Input>
                    <Label color='green'>£{parseInt(values)}</Label>
                    <Button 
                        onClick={() => {
                            newBalance = parseInt(currentBalance) - parseInt(values)
                            update({[currentUDT]: {type: 'Savings', dateTime: currentUDT, amount: values, desc: `Deposited ${name} savings`}})
                            updateBalance({balance: parseInt(newBalance)})
                            updateSavings({[name] : {amount: amount, date: date, name: name, progress: getPercentage(values)}})
                            setValues(0)
                        }}
                        fluid 
                        color='green'>
                            Add Savings
                    </Button>
                </Card.Content>
            </Card>
        </animated.div>
    )
}

export default SavingsCard