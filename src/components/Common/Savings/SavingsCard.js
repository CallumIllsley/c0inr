import React from 'react'
import Styles from './savings.module.css'
import { Card, Button, Icon, Progress, Label } from 'semantic-ui-react'

function SavingsCard() {
    return ( 
        <div className={Styles.cardContainer}>
            <Label color='green' className={Styles.cLabel} size='medium'ribbon='Left'>Savings</Label>
            <Card>
                <Card.Content>
                    <Card.Header>Holiday</Card.Header>
                    <Card.Meta>10/10/10</Card.Meta>
                    <Card.Description>
                        <Progress fluid></Progress>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button fluid color='green'>Add Savings</Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default SavingsCard