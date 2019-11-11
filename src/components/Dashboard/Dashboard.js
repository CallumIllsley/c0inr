import React from 'react'
import DashChart from '../Common/Chart/DashChart'
import Styles from './dashboard.module.css'
import DisplayBudgets from '../Common/Budgets/DisplayBudgets'
import DisplaySavings from '../Common/Savings/DisplaySavings'

function Dashboard() {
    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.content}>
                <DashChart type='Outgoings'/>
                <DisplayBudgets/>
                <DisplaySavings/>
            </div>
        </div>
    )
}

export default Dashboard