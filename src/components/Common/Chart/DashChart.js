import React from 'react'
import Styles from './chart.module.css'
import { Label, Header, Segment, Grid, Divider, Dimmer, Icon } from 'semantic-ui-react'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import {Chart} from 'primereact/chart';

function DashChart( {type} ) {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const oneDay = 86400 * 1000
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const balance = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/balance`)
    const accTut = useFirebaseDatabaseValue(`users/${uid}/settings/overviewTutorialComplete`)
    let todayUnix = Date.now()
    const DataList = useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/${type}`) || {}
    const Data = Object.values(DataList) 
    let sortedData = []

    sortedData = Data.filter((entry) => entry.dateTime > todayUnix - oneDay)
  
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


        const todaySpending = groupedGraphData.map((entry) => entry.y).reduce((a,b) => a + b, 0)

        const dataLabels = groupedGraphData.map((entry) => entry.x)
        const dataValues = groupedGraphData.map((entry) => entry.y)
        const data = {
            labels: dataLabels,
            datasets: [
                {
                    data: dataValues,
                    backgroundColor: ["#6C6CE2", "#F4DA70", "#C972C9", "#5C3434", "#FF4365", "#00D9C0","#272838", "#4B5043", "1A281F"],
                    hoverBackgroundColor: ["#6C6CE2", "#F4DA70", "#C972C9", "#5C3434", "#FF4365", "#00D9C0", "#272838", "#4B5043","1A281F"]
                }
            ]
        }
        return ( 
            <div className={Styles.dChartWrapper}>
                <Dimmer active={!accTut}>
                    <Header as='h2' icon inverted>
                        <Icon size='massive' name='info circle'/>
                        Add some data to see an overview!
                        <Header.Subheader>Head into the transactions tab and add some info!</Header.Subheader>
                    </Header>
                </Dimmer>
            <Label className={Styles.dChartHeader} color='green' size='medium' ribbon='left'>{`Today's Overview`}</Label>
                    <Segment>
                        <Grid columns={2} relaxed='very'>
                            <Grid.Column className={Styles.gridRow}>
                                <label>Balance</label>
                                <Header className={Styles.dHeader}  color='green' content={`£${balance}`}/>
                            </Grid.Column>
                            <Grid.Column className={Styles.gridRow}>
                                <label>Spending today</label>
                                <Header className={Styles.dHeader} color='green' content={`£${todaySpending}`}/>
                            </Grid.Column>
                        </Grid>
                        <Divider hidden vertical/>
                    </Segment>
                    <Chart type='doughnut' data={data}/>
            </div> 
        )
}

export default DashChart