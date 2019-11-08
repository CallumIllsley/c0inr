import React from 'react'
import Styles from './login.module.css'

import { Form, Input, Button,Header, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../actions/'
import { Redirect } from 'react-router-dom'

function Login() {

    const [password, setPassword] = React.useState()
    const [email, setEmail] = React.useState()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loginError = useSelector(state => state.auth.loginError)
    const dispatch = useDispatch()

    if(isAuthenticated){
        return <Redirect to='/'/>
    } else return (
        <div className={Styles.mainContainer}>
            <div className={Styles.loginFormContainer}>
                <div className={Styles.loginForm}>
                    <Form onSubmit={() => dispatch(loginUser(email, password))}>
                        <Header as='h1' color='green' textAlign='center 'size='huge'>c0in</Header>
                        <Form.Field>
                            <label>Email</label>
                            <Input 
                                type='email' 
                                fluid 
                                onChange={e => {setEmail(e.target.value)}
                                }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input 
                                type='password' 
                                fluid
                                onChange={e => {setPassword(e.target.value)}
                                }/>
                        </Form.Field>
                            {
                             loginError ?  <Segment color='red' header='Login error!' content='There has been an error logging you in, check your credentials and try again!'/>
                                        : null
                            }
                        <Button content='Login' color='green' fluid/>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login