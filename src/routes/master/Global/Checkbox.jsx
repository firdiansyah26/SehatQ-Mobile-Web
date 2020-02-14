import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Checkbox } from 'antd';

function ComponentCheckbox({
    getFieldDecorator,
    isRequired = false,
    isRequiredMess = 'This field is required',
    handleState = '',
    id = 'id',
    label = null,
    horizontal = false,
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    isDisabled = false,
    isStyle = null,
    dataSource = [{ value: 1, label: 'A' }, { value: 2, label: 'B' }, { value: 3, label: 'C', disabled: true }],
    value = null
}) {
    console.log(`Compoponent Checkbox ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null

    const checkboxStyle = horizontal ? null : { display: 'block', height: '30px', lineHeight: '30px', marginLeft: '0' }

    return (
        <Form.Item label={label} {...formItemLayout} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value,
                onChange: ((e) => handleChange(e)),
                rules: [
                    {
                        required: isRequired,
                        message: isRequiredMess,
                    }
                ],
            })(
                <Checkbox.Group
                    style={isStyle}
                    name={id}
                    id={id}
                    disabled={isDisabled}
                >
                    {dataSource.map((x, i) => {
                        return (
                            <Checkbox key={i} value={x.value} style={checkboxStyle} disabled={x.disabled}>
                                {x.label}
                            </Checkbox>
                        )
                    })}
                </Checkbox.Group>
            )}
        </Form.Item>
    )
}

export default React.memo(ComponentCheckbox)
