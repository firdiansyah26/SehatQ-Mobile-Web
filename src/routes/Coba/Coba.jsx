import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form, Input, Button } from 'antd';
import { balik } from './redux/ac-coba';
import { Link, Redirect } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        width: '100%'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const Data = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}

class Coba extends Component {
    constructor(props) {
        super()
        this.state = {
            file: []
        }
    }

    handleClick = () => {
        // debugger
        const a = this.props.history
        const { balik } = this.props
        balik(a)
        // a.push('/dashboard/dashboard')
    }

    handleZip = () => {
        let apaaja = this.state.file
        // Get Image di halaman dan bisa download dalam zip
        // let images = [];
        // domtoimage.toBlob(document.getElementById('my-node'))
        //     .then(function (blob) {
        //         debugger
        //         images.push(blob);
        //     }).then(function () {
        //         let zip = new JSZip();
        //         zip.file('myImage.jpg', images[0], { binary: true });
        //         zip.generateAsync({ type: "blob" })
        //             .then(function callback(blob) {

        //                 saveAs(blob, "File.zip");
        //             })
        //     })
        let zip = new JSZip();
        for (let i = 0; i < apaaja.length; i++) {
            zip.file(apaaja[i].name, apaaja[i], { base64: true });
        }
        zip.generateAsync({ type: "blob" })
            .then(function callback(blob) {
                saveAs(blob, "File.zip");
            })
    }
    inputfile = (event) => {
        this.state.file.push(event.target.files[0])
    }


    render() {
        // const { loginState } = this.props
        // const from = { pathname: '/dashboard/balik' };
        // if (loginState.dataLogin.access_token !== null) {
        //     return <Redirect to={from} />;
        // }
        return (
            <div>
                <div id="my-node">
                    <img src="https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg"></img>
                </div>
                <input type="file" onChange={this.inputfile} />
                <Button onClick={this.handleZip.bind()} >Test </Button>
                <PDFDownloadLink document={<Data />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dashState: state.Dashboard,
    loginState: state.Login
})

export default connect(
    mapStateToProps, {
        balik,
    }
)(Coba)