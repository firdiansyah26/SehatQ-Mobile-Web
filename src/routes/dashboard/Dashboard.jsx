import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form, Input, Button } from 'antd';
import { handleState } from './redux/ac-dashboard';
import PersistedInput from '../../components/DebounceComponent'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.firstRef = React.createRef();
      }
    handleChange = (property, value, c) => {
        const { handleState } = this.props
        handleState(property, value)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

            }
        });
    }

    render() {
        const { form } = this.props.dashState
        const { getFieldDecorator } = this.props.form
        const ref = React.createRef();
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Nama" hasFeedback>
                        {getFieldDecorator('nama', {
                            trigger: 'onBlur',
                            valuePropName: 'defaultValue',
                            initialValue: form.nama,
                            onChange: ((e) => this.handleChange('nama', e.target.value, this)),
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Nama',
                                },
                            ],
                        })(
                            <Input name="nama" id="nama" placeholder="Nama" />
                            // <PersistedInput ref={this.firstRef}
                            //     renderInput={props =>  <Input placeholder="nama" ref={this.firstRef} {...props} />}
                            // />
                        )}
                    </Form.Item>
                    <Form.Item label="Alamat" hasFeedback>
                        {getFieldDecorator('alamat', {
                            // trigger: 'onBlur',
                            valuePropName: 'defaultValue',
                            initialValue: form.alamat,
                            onChange: ((e) => this.handleChange('alamat', e.target.value, this)),
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your alamat',
                                },
                            ],
                        })(
                            <Input name="alamat" id="alamat" placeholder="Alamat" />
                            // <PersistedInput
                            //     renderInput={props => <Input placeholder="Alamat" {...props} />}
                            // />
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        <span>Simpan</span>
                    </Button>
                    <div style={{height:'500px'}}></div>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dashState: state.Dashboard
})

const WrappedFormWIthSubmissionButton = Form.create()(Dashboard);

export default connect(
    mapStateToProps, {
        handleState,
    }
)(WrappedFormWIthSubmissionButton)