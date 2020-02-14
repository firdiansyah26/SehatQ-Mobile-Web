import React from 'react'
import { Route } from "react-router-dom";
import { Layout } from 'antd';
import routers from "../router";

const { Content } = Layout;

export default class ContentSidebar extends React.PureComponent {

    getRouteItem = ({ x, url }) => {
        const { path, exact, component } = x;
        const pathUrlNoChildren = `${url}/${path}`
        return (
            <Route key={path} path={pathUrlNoChildren} exact={exact} component={component} />
        )
    }
    render() {
        const { url } = this.props
        return (
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                }}
            >
                {routers.map(x =>
                    this.getRouteItem({ x, url })
                )}
            </Content>
        )
    }
}