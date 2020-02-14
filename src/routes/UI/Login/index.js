import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Card, WingBlank, WhiteSpace, Flex, InputItem, Checkbox, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import SocialButton from './SocialButton'
import { onLoginSuccess } from './redux/action'

const CheckboxItem = Checkbox.CheckboxItem;

class login extends Component {

    render() {
        const { onLoginSuccess } = this.props
        const { getFieldProps } = this.props.form;

        return (
            <React.Fragment>
                <WingBlank size="md">
                    <WhiteSpace size="md" />
                    <Card style={{ margin: '40% 4%' }}>
                        <Card.Header title="Login" />
                        <Card.Body>
                            <InputItem
                                {...getFieldProps('Username')}
                                placeholder="Username"
                            />
                            <InputItem
                                {...getFieldProps('Password')}
                                type="password"
                                placeholder="Password"
                            />
                            <br />
                            <Flex>
                                <Flex.Item>
                                    <CheckboxItem key={'remember'} onChange={() => ''}>Remember Me</CheckboxItem>
                                </Flex.Item>
                                <Flex.Item><Button size={'small'} style={{ color: 'white', backgroundColor: 'black' }}>Sign In</Button><WhiteSpace /></Flex.Item>
                            </Flex>
                            <Flex>
                                <Flex.Item><FacebookLoginButton onClick={() => document.getElementById('btnfacebook').click()}>{'Login'}</FacebookLoginButton></Flex.Item>
                                <Flex.Item><GoogleLoginButton >{'Login'}</GoogleLoginButton></Flex.Item>
                            </Flex>
                            <Flex>
                                <Flex.Item>
                                    <SocialButton
                                        style={{ visibility: 'hidden' }}
                                        id='btnfacebook'
                                        provider='facebook'
                                        appId='163435051777319'
                                        onLoginSuccess={(e) => {
                                            onLoginSuccess(e)
                                            window.location.href = '/home'
                                        }}
                                        onLoginFailure={(e) => console.log('onLoginFailure : ', e)}
                                    >
                                        Login with Facebook
                                    </SocialButton>
                                </Flex.Item>
                            </Flex>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="md" />
                </WingBlank>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    loginState: state.Login
})

const mapDispatchToProps = {
    onLoginSuccess
}

const BasicInputExampleWrapper = createForm()(login);

export default connect(mapStateToProps, mapDispatchToProps)(BasicInputExampleWrapper);