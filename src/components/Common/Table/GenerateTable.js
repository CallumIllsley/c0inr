import React from 'react'
import Styles from './generatetable.module.css'

import { Table, Label, Modal, Checkbox, Form, Icon, Button } from 'semantic-ui-react'
import { useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import { useFirebaseDatabaseWriters } from 'fireact/dist/hooks'
import { useSelector } from 'react-redux'


let currentRangeShowing = 'the last 24hrs.'


function GenerateTable() {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentAccount = useFirebaseDatabaseValue(`users/${uid}/settings/currentAccount`)
    const incomeDataList =  useFirebaseDatabaseValue(`users/${uid}/accounts/${currentAccount}/income`) || {}
    const incomeData = Object.values(incomeDataList)
    const oneDay = 86400 * 1000
    const threeDay = oneDay * 3
    const week = oneDay * 7
    const generate = useSelector(state => state.misc.generate)
    const [viewSettings, setViewSettings] = React.useState(false)
    const [daySetting, setDaySettings] = React.useState('1day')
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/settings`)
    

    function GenerateTableRow() {    
        let sortedData = []
        const todayUnix = Date.now()
        switch(daySetting) {
            case '1day':
                sortedData = incomeData.filter((entry) => entry.dateTime > todayUnix - oneDay)
                currentRangeShowing = 'the last 24hrs.'
                update({daySetting: daySetting})
                break
            case '3day':
                sortedData = incomeData.filter((entry) => entry.dateTime > todayUnix - threeDay)
                currentRangeShowing = 'the last 3 days.'
                update({daySetting: daySetting})
                break
            case '7day':
                sortedData = incomeData.filter((entry) => entry.dateTime > todayUnix - week)
                currentRangeShowing = 'the last week.'
                update({daySetting: daySetting})
                break
        }
        return (
            sortedData.map((entry) => {
                return (
                    <Table.Row>
                        <Table.Cell>{entry.type}</Table.Cell>
                        <Table.Cell>{entry.desc}</Table.Cell>
                        <Table.Cell>£{entry.amount}</Table.Cell>                        
                    </Table.Row>
                )
            })
        )
    }

    return ( 
        <>
            <Modal open={viewSettings} basic size='tiny'>
                <Modal.Content>
                    <h1>Table Settings!</h1>
                    <Form inverted>
                        <Form.Field>Date range for table:</Form.Field>
                        <Form.Field inverted>
                            <Checkbox
                                toggle
                                label='1 Day'
                                name='checkBoxRadioGroup'
                                value='1day'
                                checked={daySetting === '1day'}
                                onChange={() => 
                                    setDaySettings('1day')
                                }
                            />
                        </Form.Field>
                        <Form.Field inverted>
                            <Checkbox
                                toggle
                                label='3 Day'
                                name='checkBoxRadioGroup'
                                value='3day'
                                checked={daySetting === '3day'}
                                onChange={() => 
                                    setDaySettings('3day')
                                }
                            />
                        </Form.Field>
                        <Form.Field inverted>
                            <Checkbox
                                toggle
                                label='7 Day'
                                name='checkBoxRadioGroup'
                                value='7day'
                                checked={daySetting === '7day'}
                                onChange={() => 
                                    setDaySettings('7day')
                                }
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={() => setViewSettings(false)}>
                        <Icon name='checkmark'/> Submit!
                    </Button>
                </Modal.Actions>
            </Modal>

            <div className={Styles.tableWrapper}>
                <Label className={Styles.tableHead} color='green' size='medium' ribbon='left' content={`Showing income from ${currentRangeShowing}`}/>
                <Label className={Styles.settingsLabel} onClick={() => setViewSettings(true)} content='Settings' color='red' size='medium' icon='setting' ribbon='right'/>
                <Table size='small' className={Styles.tableContent}> 
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {
                        generate ? GenerateTableRow() : null
                    }
                </Table>
            </div>
        </>
    )
}

export default GenerateTable