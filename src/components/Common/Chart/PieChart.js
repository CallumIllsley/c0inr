import React from 'react'
import Styles from './chart.module.css'
import { Label } from 'semantic-ui-react'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import {Chart} from 'primereact/chart';

function PieChart() {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const oneDay = 86400 * 1000
    const threeDay = oneDay * 3
    const week = oneDay * 7
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    let todayUnix = Date.now()
    const incomeDataList = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/income`) || {}
    const incomeData = Object.values(incomeDataList) 
    const daySetting = useFirebaseDatabaseValue(`users/${uid}/settings/daySetting`)
    let sortedData = []
    let currentRangeShowing = ''


    switch(daySetting) {
        case '1day':
            sortedData = incomeData.filter((entry) => entry.dateTime > todayUnix - oneDay)
            currentRangeShowing = 'the last 24hrs.'
            break
        case '3day':
            sortedData = incomeData.filter((entry) => entry.dateTime > todayUnix - threeDay)
            currentRangeShowing = 'the last 3 days.'
            break
        case '7day':
            sortedData = incomeData.filter((entry) => entry.dateTime > todayUnix - week)
            currentRangeShowing = 'the last week.'            
            break
    }

    const graphData = sortedData.map((entry) => {
        return {
            x: entry.type,
            y: parseInt(entry.amount)
        }
    })

    const groupedGraphData = []
    graphData.reduce( (result, value) => {
        if(!result[value.x]) { 
            result[value.x] = { 
                x: value.x,
                y: 0
            }
                groupedGraphData.push(result[value.x])
            }
                result[value.x].y += value.y
                return result
        }, {})

        const dataLabels = groupedGraphData.map((entry) => entry.x)
        const dataValues = groupedGraphData.map((entry) => entry.y)
        const data = {
            labels: dataLabels,
            datasets: [
                {
                    data: dataValues,
                    backgroundColor: ["#6C6CE2", "#F4DA70", "#C972C9", "5DBF4E", "#5C3434"],
                    hoverBackgroundColor: ["#6C6CE2", "#F4DA70", "#C972C9", "5DBF4E", "#5C3434"]
                }
            ]
        }

    return (
        <div className={Styles.pieChartWrapper}>
                <Label className={Styles.chartHeader} color='green' size='medium' ribbon='left' content={`Average spending from ${currentRangeShowing}`}/>
                <Chart type='pie' data={data}/>
        </div>
    )
}

export default PieChart