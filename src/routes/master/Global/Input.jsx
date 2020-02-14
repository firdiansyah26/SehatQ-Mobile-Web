import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Icon } from 'antd';

function ComponentInput({
    getFieldDecorator,
    isType = null,
    isTypeMess = 'This field is wrong type',
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
    placeholder = 'Input',
    horizontal = false,
    isPrefix = false,
    isSuffix = false,
    iconTypePrefix = 'user',
    iconTypeSuffix = 'user',
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    isDisabled = false,
    isAddonBefore = null,
    isAddonAfter = null,
    isSize = null,
    isStyle = null,
    isHasFeedback = false,
    value = null
}) {
    console.log(`Compoponent Input ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null
    const addPrefix = isPrefix ? <Icon type={iconTypePrefix} style={{ color: 'rgba(0,0,0,.25)' }} /> : null
    const addSuffix = isSuffix ? <Icon type={iconTypeSuffix} style={{ color: 'rgba(0,0,0,.25)' }} /> : null

    return (
        <Form.Item label={label} {...formItemLayout} hasFeedback={isHasFeedback} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value,
                onChange: ((e) => handleChange(e.target.value)),
                rules: [
                    {
                        type: isType,
                        message: isTypeMess,
                    },
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
                <Input
                    size={isSize}
                    style={isStyle}
                    addonBefore={isAddonBefore}
                    prefix={addPrefix}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    suffix={addSuffix}
                    addonAfter={isAddonAfter}
                />
            )}
        </Form.Item>
    )
}

export default React.memo(ComponentInput)
