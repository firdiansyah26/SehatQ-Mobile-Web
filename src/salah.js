import React from 'react'
import { Redirect } from "react-router-dom";
import Layout from './layout/index'


export default class Salah extends React.PureComponent {
    render() {
        if (false) {
            return <Redirect to={Layout} />
        }
        return (<div>
            Salah
        </div>)

    }
}