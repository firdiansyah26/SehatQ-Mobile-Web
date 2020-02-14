import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from './Layout';
import Home from '../routes/UI/Home/index'
import asyncComponent from '../utils/AsyncFunc';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const LayoutPage = ({ stateLogin }) => {
    return (
        <div>
            <Route
                path="/"
                exact
                component={asyncComponent(() => import('../routes/UI/Login/index'))}>
            </Route>
            <Route
                path="/login"
                exact
                component={asyncComponent(() => import('../routes/UI/Login/index'))}>
            </Route>
            <RestrictedRoute
                path="/home"
                component={Home}
                isLoggedIn={stateLogin}
            />
        </div>
    )

}


const mapStateToProps = (state) => ({
    stateLogin: localStorage.getItem('access_token') ? true : false//state.LoginState.access_token !== null
})

export default connect(
    mapStateToProps
)(LayoutPage)
