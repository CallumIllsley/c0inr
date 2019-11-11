import React from 'react'
import Styles from './budgets.module.css'
import { Label, Segment } from 'semantic-ui-react'
import GenerateBudgets from './GenerateBudgets'

function DisplayBudgets() {
    return ( 
        <div className={Styles.budgetContainer}>
            <Label className={Styles.bLabel} color='green' size='medium' ribbon='left'>Active Budgets</Label>
            <Segment>
                <GenerateBudgets/>
            </Segment>
        </div>
    )
}

export default DisplayBudgets