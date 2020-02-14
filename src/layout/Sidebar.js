import React from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import clone from "clone";
import options from './options'
import Logo from './Logo'
import SidebarWrapper from "./sidebar.style";
import { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } from './redux/ac-app'

const { SubMenu } = Menu;
const { Sider } = Layout;
const stripTrailingSlash = str => {
    if (str.substr(-1) === "/") {
        return str.substr(0, str.length - 1);
    }
    return str;
};

class MenuSidabar extends React.PureComponent {
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    getAncestorKeys = key => {
        const map = {
            sub3: ["sub2"]
        };
        return map[key] || [];
    };

    onOpenChange(newOpenKeys) {
        const { app, changeOpenKeys } = this.props;
        const latestOpenKey = newOpenKeys.find(
            key => !(app.openKeys.indexOf(key) > -1)
        );
        const latestCloseKey = app.openKeys.find(
            key => !(newOpenKeys.indexOf(key) > -1)
        );
        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        changeOpenKeys(nextOpenKeys);
    }

    handleClick(e) {
        this.props.changeCurrent([e.key]);
        if (this.props.app.view === "MobileView") {
            setTimeout(() => {
                this.props.toggleCollapsed();
                this.props.toggleOpenDrawer();
            }, 100);
        }
    }

    getMenuItem = ({ singleRoute }) => {
        const { key, label, leftIcon, children } = singleRoute;
        const url = stripTrailingSlash(this.props.url);
        if (children) {
            return (
                <SubMenu
                    key={key}
                    title={
                        <span>
                            <Icon type={leftIcon} />
                            <span>{label}</span>
                        </span>
                    }
                >
                    {children.map(child => {
                        const linkTo = `${url}/${key}/${child.key}`;
                        return (
                            <Menu.Item key={child.key}>
                                <Link to={linkTo}>
                                    <span>{child.label}</span>
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={key}>
                <Link to={`${url}/${key}`}>
                    <Icon type={leftIcon} />
                    <span>{label}</span>
                </Link>
            </Menu.Item>
        );
    };

    render() {
        const { app, toggleCollapsed } = this.props
        const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
        const mode = collapsed === true ? "vertical" : "inline";

        return (
            <SidebarWrapper>
                <Sider
                    collapsible={true}
                    breakpoint="md"
                    collapsed={collapsed}
                    onCollapse={toggleCollapsed}
                    style={{height:'100vh', position:'fixed'}}
                    width={240}
                >
                    <Logo collapsed={collapsed} />
                    <Menu
                        theme="dark"
                        className="isoDashboardMenu"
                        mode={mode}
                        openKeys={collapsed ? [] : app.openKeys}
                        selectedKeys={app.current}
                        onClick={this.handleClick.bind(this)}
                        onOpenChange={this.onOpenChange.bind(this)}
                    >
                        {options.map(singleRoute =>
                            this.getMenuItem({ singleRoute })
                        )}
                    </Menu>
                </Sider>
            </SidebarWrapper>
        )
    }
}

export default connect(
    state => ({
        app: state.App
    }),
    { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(MenuSidabar);