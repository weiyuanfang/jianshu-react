import React from "react";
import { connect } from 'react-redux'
import List from "./components/List";
import Recommend from "./components/Recommend";
import Topic from "./components/Topic";
import Writer from "./components/Writer";
import {
    HomeWrapper,
    HomeLeft,
    HomeRight, BackTop
} from "./style";
import * as actionCreators from "./store/actionCreators";

class Home extends React.PureComponent{
    handleScrollTop = () => {
        window.scrollTo(0, 0)
    }
    render() {
        const { showScrollTop } = this.props
        return (
            <HomeWrapper>
                <HomeLeft>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                { showScrollTop ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}
            </HomeWrapper>
        )
    }
    componentDidMount() {
        const { changeHomeData } = this.props
        changeHomeData()
        this.bindEvents()
    }
    bindEvents () {
        window.addEventListener('scroll', this.props.handleShowSrollTop)
    }
}

const mapStateToProps = (state) => ({
    showScrollTop: state.getIn(['home', 'showScrollTop'])
})

const mapDispatchToProps = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreators.getHomeInfo())
    },
    handleShowSrollTop() {
        console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop > 400) {
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
