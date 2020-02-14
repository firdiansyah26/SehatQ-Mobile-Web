import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import { handleState, postLogin } from './redux/ac-login'

const FormItem = Form.Item;

class SignIn extends Component {

  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };

  handleSubmit = (e, token = false) => {
    const { postLogin } = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        postLogin()
      }
    });
  };

  handleChange = (property, value) => {
    const { handleState } = this.props
    handleState(property, value)
  };

  render() {
    const from = { pathname: '/dashboard/dashboard' };
    const { loginState } = this.props
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    if (loginState.dataLogin.access_token !== null) {
      return <Redirect to={from} />;
    }

    return (
      // <SignInStyleWrapper className="isoSignInPage">
      <BlockUi tag="div" blocking={loginState.isLoading} loader={<Loader active type="ball-pulse-sync" color="#02a17c" />}>
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
            </div>

            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="Username" hasFeedback>
                {getFieldDecorator('username', {
                  initialValue: loginState.username,
                  value: loginState.username,
                  onChange: ((e) => this.handleChange('username', e.target.value)),
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ],
                })(
                  <Input name="username" id="username" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  initialValue: loginState.password,
                  value: loginState.username,
                  onChange: ((e) => this.handleChange('password', e.target.value)),
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Password',
                    },
                  ],
                })(
                  <Input name="password" id="password" />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </BlockUi>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.Login
})

const mapDispatchToProps = {
  handleState,
  postLogin
}

const WrappedFormWIthSubmissionButton = Form.create()(SignIn);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedFormWIthSubmissionButton)
