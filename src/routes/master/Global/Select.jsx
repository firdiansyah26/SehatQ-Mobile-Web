import React from 'react'
import { useDispatch } from 'react-redux'
import { Select, Form, Icon } from 'antd';
const { Option } = Select;

function CmpSelect({
    getFieldDecorator,
    handleState,
    isStyle = { width: '100%' },
    id = 'id',
    isRequired = false,
    isRequiredMess = 'This field is required',
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    horizontal = false,
    label = null,
    placeholder = 'Select a data',
    isShowSearch = true,
    source = [],
    isDisabled = false,
    isHasFeedback = false,
    isLoading = false,
    isMode = 'default',
    isSize = 'default',
    value = null

}) {
    console.log(`Compoponent Select ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }
    const onBlur = () => {
    }
    const onFocus = () => {
    }
    const onSearch = (val) => {
    }

    const children = []
    source.map((x, i) => {
        children.push(<Option key={i} value={x.id} disabled={x.disabled}>{x.label}</Option>)
    })

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null

    return (
        <Form.Item label={label} {...formItemLayout} hasFeedback={isHasFeedback} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value ? value : undefined,
                onChange: ((e) => handleChange(e)),
                rules: [
                    {
                        required: isRequired,
                        message: isRequiredMess,
                    }
                ],
            })(
                <Select
                    mode={isMode}
                    showSearch={isShowSearch}
                    style={isStyle}
                    placeholder={placeholder}
                    optionFilterProp="children"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    size={isSize}
                    onSearch={onSearch}
                    disabled={isDisabled}
                    loading={isLoading}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {children}
                </Select>
            )}
        </Form.Item>
    )
}

export default React.memo(CmpSelect)