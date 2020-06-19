import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const getAjaxData = (path) => {
	return axios.get(path).then((res) => {
		return res.data.data
	})
}

const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	topicList: result.topicList,
	articleList: result.articleList,
	recommendList: result.recommendList
});

const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})

export const getHomeInfo = () => {
	return (dispatch) => {
		getAjaxData('/api/home.json').then((result) => {
			dispatch(changHomeData(result))
		})
	}
}

export const getMoreList = (page) => {
	return (dispatch) => {
		getAjaxData('/api/homeList.json?page=' + page).then(result => {
			dispatch(addHomeList(result, page + 1))
		})
	}
}

export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
})
