import React from 'react'
import DashChart from '../Common/Chart/DashChart'
import Styles from './dashboard.module.css'
import DisplayBudgets from '../Common/Budgets/DisplayBudgets'
import DisplaySavings from '../Common/Savings/DisplaySavings'

function Dashboard() {

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.content}>
                    <DashChart className={Styles.item} type='Outgoings'/>
                    <DisplayBudgets className={Styles.item}/>
                    <DisplaySavings className={Styles.item}/>
            </div>
        </div>
    )
}

export default Dashboard