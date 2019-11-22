import React from 'react'
import Styles from './budgets.module.css'
import { Label, Segment } from 'semantic-ui-react'
import GenerateBudgets from './GenerateBudgets'
import { useSpring, animated } from 'react-spring'


function DisplayBudgets() {
    const animProps2 = useSpring({opacity: 1, scale: 1, transform: 'translateY(0)', delay: 560,  from: {scale: 0, opacity: 0, transform: 'translateY(-100vh)'}})
    return ( 
        <animated.div style={animProps2} className={Styles.budgetContainer}>
            <Label className={Styles.bLabel} color='green' size='medium' ribbon='left'>Active Budgets</Label>
            <Segment className={Styles.budgets}>
                <GenerateBudgets/>
            </Segment>
        </animated.div>
    )
}

export default DisplayBudgets