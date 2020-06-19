import * as constants from "./constants";
import axios from 'axios'
import {fromJS} from "immutable";

const changeList = (listData) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(listData),
    totalPage: Math.ceil(listData.length / 10)
})

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
})

export const infoMouseEnter = () => ({
    type: constants.MOUSE_ENTER
})

export const infoMouseLeave = () => ({
    type: constants.MOUSE_LEAVE
})

export const changePage = (page) => ({
    type: constants.CHANGE_PAGE,
    page
})

export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data
            dispatch(changeList(data.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}
