import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Switch } from 'antd';

function ComponentSwitch({
    handleState = '',
    id = 'id',
    label = null,
    horizontal = true,
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    isDisabled = false,
    isStyle = null,
    isSize = null,
    isCheckedText = null,
    isUnCheckedText = null,
    isLoading = false,
    value = null
}) {
    console.log(`Compoponent Switch ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null

    return (
        <Form.Item label={label} {...formItemLayout} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            <Switch
                loading={isLoading}
                style={isStyle}
                name={id}
                id={id}
                size={isSize}
                checked={value}
                checkedChildren={isCheckedText}
                unCheckedChildren={isUnCheckedText}
                onClick={(e) => handleChange(e)}
                disabled={isDisabled}
            />
        </Form.Item>
    )
}

export default React.memo(ComponentSwitch)
