import {
    INIT_DATA_HOME_SUCCESS,
    HANDLE_CHANGE_HOME,
    GET_DATA_HOME,
    DATA_CART_HOME,
    FAV_DATA_HOME
} from '../../../../reduxs/ActionType'

import { Toast } from 'antd-mobile'

const initState = {
    dataCategory: [],
    productPromo: [],
    pushArrayData: [],
    searchBar: '',
    modal: {},
    pushBuyProduct: []
}

export default function HomeState(state = initState, action) {
    switch (action.type) {
        case INIT_DATA_HOME_SUCCESS:
            return {
                ...state, dataCategory: action.value
            }
        case HANDLE_CHANGE_HOME:
            return {
                ...state, [action.field]: action.value
            }
        case GET_DATA_HOME:
            return {
                ...state, [action.field]: action.value
            }
        case FAV_DATA_HOME:
            state.productPromo.find(obj => obj.id == action.value.id)['favFlag'] = (!action.value.favFlag ? true : false)

            return { ...state }
        case DATA_CART_HOME:
            let _findData = state.pushBuyProduct.find(obj => obj.id == action.value.id)
            if (action.operator == '+') {
                if (_findData) {
                    state.pushBuyProduct.find(obj => obj.id == action.value.id)['qty'] = action.value['qty'] + 1
                }
                else {
                    action.value['qty'] = 1
                    state.pushBuyProduct.push(action.value)
                }
                Toast.success('Barang sukses dimasukkan ke keranjang !!!', 1);
            }
            else {
                debugger
                if (_findData.qty != 0) {
                    state.pushBuyProduct.find(obj => obj.id == action.value.id)['qty'] = action.value['qty'] - 1
                }
                else {
                    let _findIndex = state.pushBuyProduct.indexOf(_findData).id

                    state.pushBuyProduct.splice(_findIndex, 1)
                }
            }
            return { ...state }
        default:
    }
    return state
}