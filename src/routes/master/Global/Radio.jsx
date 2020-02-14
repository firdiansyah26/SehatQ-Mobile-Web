import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Radio } from 'antd';

function ComponentRadio({
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
    dataSource = [{ value: 1, label: 'A' }, { value: 2, label: 'B', disabled: true }],
    value = null
}) {
    console.log(`Compoponent Radio ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null

    const radioStyle = horizontal ? null : { display: 'block', height: '30px', lineHeight: '30px' }

    return (
        <Form.Item label={label} {...formItemLayout} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value,
                onChange: ((e) => handleChange(e.target.value)),
                rules: [
                    {
                        required: isRequired,
                        message: isRequiredMess,
                    }
                ],
            })(
                <Radio.Group
                    style={isStyle}
                    name={id}
                    id={id}
                    disabled={isDisabled}
                >
                    {dataSource.map((x, i) => {
                        return (
                            <Radio key={i} value={x.value} style={radioStyle} disabled={x.disabled}>
                                {x.label}
                            </Radio>
                        )
                    })}
                </Radio.Group>
            )}
        </Form.Item>
    )
}

export default React.memo(ComponentRadio)
