import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, InputNumber } from 'antd';

function ComponentInputNumber({
    getFieldDecorator,
    isRequired = false,
    isRequiredMess = 'This field is required',
    isMax = 1000000000000000,
    handleState = '',
    isMin = 0,
    id = 'id',
    label = null,
    placeholder = 'Input Number',
    horizontal = false,
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    isDisabled = false,
    isSize = null,
    isStyle = { width: '100%' },
    isHasFeedback = false,
    isStep = false,
    isFromater = false,
    format = (data) => `Rp ${data}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    isParser = false,
    fromatParser = (data) => data.replace(/\Rp\s?|(,*)/g, ''),
    value = null
}) {
    console.log(`Compoponent Input Number ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null

    const cekStep = isStep ? '0.0' : undefined
    const cekFrmater = isFromater ? (value) => format(value) : (value) => value
    const cekParser = isParser ? (value) => fromatParser(value) : (value) => value

    return (
        <Form.Item label={label} {...formItemLayout} hasFeedback={isHasFeedback} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value,
                onChange: ((e) => handleChange(e)),
                rules: [
                    {
                        required: isRequired,
                        message: isRequiredMess,
                    }
                ]
            })(
                <InputNumber
                    min={isMin}
                    max={isMax}
                    size={isSize}
                    style={isStyle}
                    name={id}
                    id={id}
                    step={cekStep}
                    formatter={value => cekFrmater(value)}
                    parser={value => cekParser(value)}
                    placeholder={placeholder}
                    disabled={isDisabled}
                />
            )}
        </Form.Item>
    )
}

export default React.memo(ComponentInputNumber)
