import React from 'react'
import Styles from './chart.module.css'
import { Label } from 'semantic-ui-react'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import {Chart} from 'primereact/chart';

function PieChart({ chartType, type }) {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const oneDay = 86400 * 1000
    const threeDay = oneDay * 3
    const week = oneDay * 7
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    let todayUnix = Date.now()
    const DataList = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/${type}`) || {}
    const Data = Object.values(DataList) 
    const daySetting = useFirebaseDatabaseValue(`users/${uid}/settings/daySetting`)
    let sortedData = []
    let currentRangeShowing = ''

    switch(daySetting) {
        case '1day':
            sortedData = Data.filter((entry) => entry.dateTime > todayUnix - oneDay)
            currentRangeShowing = 'the last 24hrs.'
            break
        case '3day':
            sortedData = Data.filter((entry) => entry.dateTime > todayUnix - threeDay)
            currentRangeShowing = 'the last 3 days.'
            break
        case '7day':
            sortedData = Data.filter((entry) => entry.dateTime > todayUnix - week)
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
                    label: `My ${type}`,
                    data: dataValues,
                    backgroundColor: ["#6C6CE2", "#F4DA70", "#C972C9", "#5C3434", "#FF4365", "#00D9C0","#272838", "#4B5043", "1A281F"],
                    hoverBackgroundColor: ["#6C6CE2", "#F4DA70", "#C972C9", "#5C3434", "#FF4365", "#00D9C0", "#272838", "#4B5043","1A281F"]
                }
            ]
        }
        return ( 
            <div className={Styles.chartWrapper}>
                    <Label className={Styles.chartHeader} color='green' size='medium' ribbon='left' content={`Your ${type} from ${currentRangeShowing}`}/> 
                    <Chart type='bar' data={data}/>
            </div> 
        )
} 

export default PieChart