import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, Avatar } from 'antd';
import userpic from '../Asset/img/user.jpg';
import { logout } from '../routes/login/redux/ac-login';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }
  onLogout = () => {
    const { logout, history } = this.props
    logout();
    history.push('/')
  }

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink" onClick={this.onLogout.bind(this)} href="# ">
          Logout
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomRight"
      >
        <div className="isoImgWrapper">
          <Avatar icon="user" />
        </div>
      </Popover>
    );
  }
}
export default connect(
  null,
  { logout }
)(TopbarUser);
