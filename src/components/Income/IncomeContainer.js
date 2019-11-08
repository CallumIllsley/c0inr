import React from 'react'
import Styles from './income.module.css'
import { Tab, Sidebar, Segment, Menu, Header } from 'semantic-ui-react'
import FormCardRecent from '../Common/FormCard/FormCardRecent'
import GenerateTable from '../Common/Table/GenerateTable'
import PieChart from '../Common/Chart/PieChart'

const panels = [
    { 
        menuItem: "Recent",
        render: () => 
            <Tab.Pane className={Styles.tabContainer}>
                    <FormCardRecent type='income'/>
                    <GenerateTable type='income'/>
                    <PieChart/>
            </Tab.Pane> 
    },
    { 
        menuItem: "Historic",
        render: () => 
            <Tab.Pane>
            </Tab.Pane> }
]

function IncomeContainer() { 
    const [sidebarVisible, setSidebarVisible] = React.useState(false)
    
    return ( 
        <div className={Styles.mainContainer}>
            <div>
                <Tab  menu={{ secondary: true, pointing: true}} panes={panels}/>
            </div>
        </div>
    )
}

export default IncomeContainer