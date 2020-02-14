import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input } from 'antd';
const { TextArea } = Input;

function ComponentTextArea({
    getFieldDecorator,
    isRequired = false,
    isRequiredMess = 'This field is required',
    isMax = 10000,
    isMaxMess = `This field Max ${isMax}`,
    handleState = '',
    isMin = 0,
    isMinMess = `This field Min ${isMin}`,
    isPattern = null,
    isPatternMess = 'This field is Wrong',
    id = 'id',
    label = null,
    placeholder = 'TextArea',
    horizontal = false,
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    isDisabled = false,
    isSize = null,
    isStyle = null,
    isHasFeedback = false,
    isRow = 4,
    value = null
}) {
    console.log(`Compoponent TextArea ${label}`)
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
        <Form.Item label={label} {...formItemLayout} hasFeedback={isHasFeedback} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value,
                onChange: ((e) => handleChange(e.target.value)),
                rules: [
                    {
                        required: isRequired,
                        message: isRequiredMess,
                    },
                    {
                        max: isMax,
                        message: isMaxMess,
                    },
                    {
                        min: isMin,
                        message: isMinMess,
                    },
                    {
                        pattern: isPattern,
                        message: isPatternMess
                    }
                ],
            })(
                <TextArea
                    size={isSize}
                    style={isStyle}
                    name={id}
                    id={id}
                    rows={isRow}
                    placeholder={placeholder}
                    disabled={isDisabled}
                />
            )}
        </Form.Item>
    )
}

export default React.memo(ComponentTextArea)
