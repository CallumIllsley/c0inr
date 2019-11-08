import React from 'react'
import Styles from './transactions.module.css'
import { Tab } from 'semantic-ui-react'
import FormCardRecent from '../Common/FormCard/FormCardRecent'
import GenerateTable from '../Common/Table/GenerateTable'
import PieChart from '../Common/Chart/PieChart'

const incomeTypes = [
    {label: 'Income', value: 'Income'},
    {label: 'Lottery', value: 'Lottery'},
    {label: 'Transfer', value: 'Transfer'}
]

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


const panels = [
    { 
        menuItem: "Recent",
        render: () => 
            <Tab.Pane className={Styles.tabContainer}>
                    <FormCardRecent className={Styles.flexItem} type='Income' defaultDropType={'Income'} dropTypes={incomeTypes}/>
                    <GenerateTable className={Styles.flexItem} type='Income'/>
                    <PieChart className={Styles.flexItem} type='Income'/>
                    <FormCardRecent className={Styles.flexItem} type='Outgoings' defaultDropType={'Rent'} dropTypes={outgoingsTypes}/>
                    <GenerateTable className={Styles.flexItem} type='Outgoings'/>
                    <PieChart className={Styles.flexItem} type='Outgoings'/>
            </Tab.Pane> 
    },
    { 
        menuItem: "Historic",
        render: () => 
            <Tab.Pane>
            </Tab.Pane> }
]

function TransactionsContainer() { 
    return ( 
        <div className={Styles.mainContainer}>
            <div>
                <Tab  menu={{ secondary: true, pointing: true}} panes={panels}/>
            </div>
        </div>
    )
}

export default TransactionsContainer