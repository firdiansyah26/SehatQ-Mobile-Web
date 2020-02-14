import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { Form, DatePicker } from 'antd';

function ComponentDate({
    getFieldDecorator,
    isRequired = false,
    isRequiredMess = 'This field is required',
    handleState = '',
    id = 'id',
    label = null,
    placeholder = 'Date',
    horizontal = false,
    isExtra = null,
    isHelp = undefined,
    isValidateStatus = undefined,
    isDisabled = false,
    isNotBeforeDate = false,
    isNotAfterDate = false,
    isSize = null,
    isStyle = { width: '100%' },
    isHasFeedback = false,
    isFormat = 'DD-MM-YYYY',
    value = null
}) {
    console.log(`Compoponent Date ${label}`)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        dispatch(handleState(id, value))
    }

    const formItemLayout = horizontal
        ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        } : null

    const disabledDateBefore = (current) => {
        return current && current < moment().subtract(1, 'days').endOf('day');
    }

    const disabledDateAfter = (current) => {
        return current && current > moment().endOf('day');
    }

    let disableDate

    if(isNotBeforeDate){
        disableDate = disabledDateBefore
    }else if(isNotAfterDate){
        disableDate = disabledDateAfter
    }else{
        disableDate = null
    }

    return (
        <Form.Item label={label} {...formItemLayout} hasFeedback={isHasFeedback} extra={isExtra} help={isHelp} validateStatus={isValidateStatus}>
            {getFieldDecorator(id, {
                initialValue: value ? moment(value, isFormat) : value,
                onChange: ((e) => handleChange(e)),
                rules: [
                    {
                        required: isRequired,
                        message: isRequiredMess,
                    }
                ],
            })(
                <DatePicker
                    size={isSize}
                    style={isStyle}
                    name={id}
                    id={id}
                    disabledDate={disableDate}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    format={isFormat}
                />
            )}
        </Form.Item>
    )
}

export default React.memo(ComponentDate)
