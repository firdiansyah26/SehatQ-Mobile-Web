import React, { useState, useEffect } from 'react'
import { Form, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { handleState, setJK } from '../master/redux/ac-master';
import CmpInput from './Global/Input'
import CmpSelect from './Global/Select'
import CmpInputNumber from './Global/InputNumber'
import CmpTextArea from './Global/TextArea'
import CmpDate from './Global/Date'
import CmpDateRange from './Global/DateRange'
import CmpRadio from './Global/Radio'
import CmpCheckbox from './Global/Checkbox'
import CmpSwitch from './Global/Switch'


function HalamanUtama({ form }) {
    const [triger, setTiger] = useState(false)
    const [name, setName] = useState('')
    const stateMaster = useSelector(state => state.Master)
    const { getFieldDecorator, } = form
    const actionDis = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        setTiger(!triger)
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {

            }
        });
    }

    useEffect(() => {
        var abc = [
            {
                id: 1,
                label: 'Erik'
            }, {
                id: 2,
                label: 'Satu'
            }
        ]
        setTimeout(() => {
            actionDis(setJK(abc))
        }, 2000)
    }, [])

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {stateMaster.form.nama} - {stateMaster.form.alamat}
                <CmpInput triger={triger} getFieldDecorator={getFieldDecorator} id="nama" label="Nama" value={stateMaster.form.nama} handleState={handleState} isRequired={true} />
                <CmpInput triger={triger} getFieldDecorator={getFieldDecorator} id="alamat" label="Alamat" value={stateMaster.form.alamat} handleState={handleState} />
                <CmpSelect triger={triger} getFieldDecorator={getFieldDecorator} isRequired={true} id="jenkel" label="Jenis Kelamin" value={stateMaster.form.jenkel} source={stateMaster.sourceJK} handleState={handleState} />
                <CmpInputNumber triger={triger} getFieldDecorator={getFieldDecorator} isRequired={true} id="number" label="Number" value={stateMaster.form.number} handleState={handleState} isPrefix={true}/>
                <CmpTextArea triger={triger} getFieldDecorator={getFieldDecorator} id="textarea" label="Text Area" value={stateMaster.form.textarea} handleState={handleState} isRequired={false} />
                <CmpDate triger={triger} getFieldDecorator={getFieldDecorator} id="date" label="Date" value={stateMaster.form.date} handleState={handleState} isRequired={true} />
                <CmpDateRange triger={triger} getFieldDecorator={getFieldDecorator} id="daterange" label="Date" value={stateMaster.form.daterange} handleState={handleState} isRequired={true} />
                <CmpRadio triger={triger} getFieldDecorator={getFieldDecorator} id="radio" label="Radio" value={stateMaster.form.radio} handleState={handleState} isRequired={true} />
                <CmpCheckbox triger={triger} getFieldDecorator={getFieldDecorator} id="checkbox" label="Checkbox" value={stateMaster.form.checkbox} handleState={handleState} isRequired={true} />
                <CmpSwitch id="switch" label="Switch" value={stateMaster.form.switch} handleState={handleState} />
                
                <br></br>
                <br></br>
                <Button type="primary" htmlType="submit">
                    <span>Simpan</span>
                </Button>
            </Form>
        </div>
    )
}

const WrappedFormWIthSubmissionButton = Form.create()(HalamanUtama);
export default WrappedFormWIthSubmissionButton
