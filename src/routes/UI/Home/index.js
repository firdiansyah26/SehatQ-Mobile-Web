import React, { useState, useEffect, useReducer, useRef, useLayoutEffect } from 'react';
import { connect, useStore, useSelector, useDispatch } from 'react-redux'
import { createForm } from 'rc-form';

import { WingBlank, WhiteSpace, SearchBar, TabBar, Grid, Card, Button, Modal, List } from 'antd-mobile';
import { Icon } from 'antd'
import { initData, handleState, getDataHome, dataCart, favData } from './redux/action'
import axios from 'axios'
import BlockUi from 'react-block-ui'

import './styles.scss'

const Item = List.Item;
const Brief = Item.Brief;

// UI
function RenderProfile() {
    const stateHome = useSelector(state => state.HomeState)
    const _item = useRef()

    // useLayoutEffect(() => {
    //     debugger
    //     if (stateHome.pushBuyProduct.length != 0) {
    //         document.getElementsByClassName('am-list-thumb')[0].getElementsByTagName('img')[0].style.width = "50px"
    //     }
    // }, [stateHome.pushBuyProduct])

    return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <List renderHeader={() => 'Purchase List'} className="my-list">
                {
                    stateHome.pushBuyProduct.map((obj, idx) => {
                        let _priceTotal = parseInt(obj.price.replace('$', '')) * obj.qty
                        return (
                            <Item ref={_item} extra={"Qty : " + obj['qty'] + " (@ " + obj.price + ")"} align="top" thumb={obj.imageUrl} multipleLine>
                                {obj.title}
                                <Brief>${_priceTotal}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        </div>
    )
}

function RenderHome(param) {

    const stateHome = useSelector(state => state.HomeState)
    const [showModal, setShowModal] = useState(false)

    let _dispatchData = useDispatch()

    return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <SearchBar placeholder="Search" maxLength={8} onChange={e => { _dispatchData(handleState('searchBar', e)) }} />
            <div>
                <Grid data={param.dataCategory} isCarousel carouselMaxRow={1} onClick={_el => console.log(_el)} />

                <WingBlank size="sm">
                    <WhiteSpace size="sm" />
                    {
                        param.productPromo.length != 0 ?
                            param.productPromo.filter(obj => obj.title.toLowerCase().includes(stateHome.searchBar.toLowerCase())).map(obj => {
                                return (
                                    <React.Fragment>
                                        <Card>
                                            <Card.Header
                                                title={obj.title}
                                            />
                                            <Card.Body onClick={() => {
                                                setShowModal(true)
                                                _dispatchData(handleState('modal', obj))
                                            }}>
                                                <img src={obj.imageUrl} width={'25%'} />
                                                <br />
                                                <span>{obj.description}</span>
                                            </Card.Body>
                                            <Card.Footer extra={<div>{obj.price}</div>} content={
                                                <React.Fragment>
                                                    <Button onClick={() => { _dispatchData(favData(obj)) }}><Icon type="heart" theme={obj.favFlag ? "filled" : ''} style={{ color: 'red' }} /></Button>
                                                </React.Fragment>
                                            } />
                                        </Card>
                                    </React.Fragment>
                                )
                            })
                            : null
                    }
                    <WhiteSpace size="sm" />
                </WingBlank>


            </div>

            {/* Modal */}
            <Modal
                visible={showModal}
                transparent
                maskClosable={false}
                onClose={() => setShowModal(false)}
                title={"Info Produk " + stateHome.modal['title']}
                style={{ width: 'fit-content', margin: '35px' }}
                footer={
                    [
                        {
                            text: 'Buy', onPress: () => { _dispatchData(dataCart(stateHome.modal, '+')); console.log('modal buy : ', stateHome.pushBuyProduct); setShowModal(false) }
                        },
                        {
                            text: 'Cancel', onPress: () => { setShowModal(false) }
                        },
                    ]}
                afterClose={() => { setShowModal(false) }}
            >
                <div style={{ width: 'fit-content', overflow: 'scroll' }}>
                    <Card>
                        <Card.Header
                            title={stateHome.modal.title}
                        />
                        <Card.Body>
                            <img src={stateHome.modal.imageUrl} width={'25%'} />
                            <br />
                            <span>{stateHome.modal.description}</span>
                        </Card.Body>
                        <Card.Footer extra={<div>{stateHome.modal.price} <Button onClick={() => { _dispatchData(favData(stateHome.modal)) }}><Icon type="heart" theme={stateHome.modal.favFlag ? "filled" : ''} style={{ color: 'red' }} /></Button></div>} content={''} />
                    </Card>
                </div>
            </Modal>
        </div>
    );
}

function RenderView() {
    const [hidden, setHidden] = useState(false)
    const [loader, setLoader] = useState(false)
    const [selectedTab, setSelectedTab] = useState('blueTab')
    let _dispatchData = useDispatch()

    const stateHome = useSelector(state => state.HomeState)

    useEffect(() => {
        setLoader(true)
        axios.get('https://private-4639ce-ecommerce56.apiary-mock.com/home')
            .then(res => {
                res.data[0].data.category.forEach(element => {
                    element.icon = element.imageUrl
                    element.text = element.name
                });
                _dispatchData(getDataHome('dataCategory', res.data[0].data.category))
                _dispatchData(getDataHome('productPromo', res.data[0].data.productPromo))
                setLoader(false)
            })
            .catch(err => {
                setLoader(false)
            })
    }, [])

    return (
        <React.Fragment>
            <BlockUi tag="div" blocking={loader} message="Please wait" keepInView>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={hidden}
                    >
                        <TabBar.Item
                            key="Home"
                            selected={selectedTab === 'blueTab'}
                            icon={<div>Home</div>}
                            selectedIcon={<div style={{ color: 'rgb(51, 163, 244)' }}>Home</div>}
                            onPress={() => {
                                setSelectedTab('blueTab')
                            }}
                            data-seed="logId"
                        >
                            {/* Content */}
                            {RenderHome(stateHome)}
                            {/* Content */}

                        </TabBar.Item>
                        <TabBar.Item
                            key="Feed"
                            selected={selectedTab === 'redTab'}
                            icon={<div>Feed</div>}
                            selectedIcon={<div style={{ color: 'rgb(51, 163, 244)' }}>Feed</div>}
                            onPress={() => {
                                setSelectedTab('redTab')
                            }}
                            data-seed="logId1"
                        >
                            {/* Content */}
                            sd

                            {/* Content */}
                        </TabBar.Item>
                        <TabBar.Item
                            key="Cart"
                            selected={selectedTab === 'greenTab'}
                            icon={<div>Cart</div>}
                            selectedIcon={<div style={{ color: 'rgb(51, 163, 244)' }}>Cart</div>}
                            onPress={() => {
                                setSelectedTab('greenTab')
                            }}
                        >
                            {/* Content */}
                            fd

                            {/* Content */}
                        </TabBar.Item>
                        <TabBar.Item
                            key="Profile"
                            selected={selectedTab === 'yellowTab'}
                            icon={<div>Profile</div>}
                            selectedIcon={<div style={{ color: 'rgb(51, 163, 244)' }}>Profile</div>}
                            onPress={() => {
                                setSelectedTab('yellowTab')
                            }}
                        >
                            {RenderProfile()}
                        </TabBar.Item>
                    </TabBar>
                </div>
            </BlockUi>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    homeState: state.Home
})

const mapDispatchToProps = {
    initData,
    handleState
}

const BasicInputExampleWrapper = createForm()(RenderView);

export default connect(mapStateToProps, mapDispatchToProps)(BasicInputExampleWrapper);