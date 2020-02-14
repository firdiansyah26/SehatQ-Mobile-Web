import React from 'react'
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Content from './Content';
import AppHolder from './commonStyle';
import TopbarUser from "./topbarUser";
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import TopbarWrapper from "./topbar.style";
import { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed, toggleAll } from './redux/ac-app'

const { Header, Footer } = Layout;

class SiderDemo extends React.PureComponent {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { url } = this.props.match
        const { app, toggleCollapsed, history } = this.props;
        const styling = {
            marginLeft: !app.collapsed ? '240px' : '80px'
        }
        return (
            <AppHolder>
                <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
                    <Debounce time="1000" handler="onResize">
                        <WindowResizeListener
                            onResize={windowSize =>
                                this.props.toggleAll(
                                    windowSize.windowWidth,
                                    windowSize.windowHeight
                                )
                            }
                        />
                    </Debounce>
                    <Sidebar url={url} />
                    <Layout className="isoContentMainLayout" style={styling}>
                        <TopbarWrapper>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <div style={{ float: 'left' }}>
                                <Icon
                                    className="trigger"
                                    type={app.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={toggleCollapsed}
                                />
                            </div>
                            <div className="addCur" style={{ float: 'right', marginRight: '20px' }}>
                                <TopbarUser history={history} />
                            </div>
                        </Header>
                        </TopbarWrapper>
                        <Content className="isomorphicContent" url={url} />
                        <Footer style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </AppHolder>
        );
    }
}

export default connect(
    state => ({
        app: state.App
    }),
    { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed, toggleAll }
)(SiderDemo);