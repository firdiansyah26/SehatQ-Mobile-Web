import * as types from '../../reduxs/ActionType'

export function getView(width) {
    let newView = "MobileView";
    if (width > 1220) {
        newView = "DesktopView";
    } else if (width > 767) {
        newView = "TabView";
    }
    return newView;
}

export const toggleCollapsed = () => {
    return ({
        type: types.COLLPSE_CHANGE
    })
}
export const toggleAll = (width, height) => {
    const view = getView(width);
    const collapsed = view !== "DesktopView";
    return ({
        type: types.TOGGLE_ALL,
        collapsed,
        view,
        height
    })
}
export const toggleOpenDrawer = () => {
    return ({
        type: types.COLLPSE_OPEN_DRAWER
    })
}
export const changeOpenKeys = openKeys => {
    return ({
        type: types.CHANGE_OPEN_KEYS,
        openKeys
    })
}
export const changeCurrent = current => {
    return ({
        type: types.CHANGE_CURRENT,
        current
    })
}
export const clearMenu = () => {
    return ({
        type: types.CLEAR_MENU
    })
}
