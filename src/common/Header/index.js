import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    Addition,
    Button
} from "./style";
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store'

class Header extends Component{
    render() {
        const { focused, mouseIn, handleInputFocus, handleInputBlur, list } = this.props
        const isLarge = focused || mouseIn
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch className={isLarge? 'focused' : ''}
                                       onFocus={() => {handleInputFocus(list)}}
                                       onBlur={handleInputBlur}
                            />
                        </CSSTransition>
                        <i className={isLarge ? 'iconfont focused zoom' : 'iconfont zoom'}>
                            &#xe614;
                        </i>
                        {this.getInfoContent()}
                    </SearchWrapper>
                    <Addition>
                        <Button className='writing'>
                            <i className='iconfont'>&#xe615;</i>
                            写文章
                        </Button>
                        <Button className='reg'>注册</Button>
                    </Addition>
                </Nav>
            </HeaderWrapper>
        )
    }
    getInfoContent = () => {
        const { focused, mouseIn, list, page, totalPage, handelMouseEnter, handelMouseLeave, handelChangePage } = this.props
        const newList = list.toJS()
        if (focused || mouseIn) {
            const pageList = []
            const maxI = Math.min(page * 10, newList.length)
            for (let i = (page - 1) * 10; i < maxI; i ++) {
                // focused改变，list为空，未导致key=undefined
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
            return (
                <SearchInfo onMouseEnter={handelMouseEnter}
                            onMouseLeave={handelMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => {handelChangePage(page, totalPage, this.spinIcon)}}>
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <div>
                        {pageList}
                    </div>
                </SearchInfo>
            )
        }
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        // state为App.js传入的store对象
        // state.header是一个immutable对象
        focused: state.getIn(['header', 'focused']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            list.size === 0 && dispatch(actionCreators.getList()) // 初次异步获取数据
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur())
        },
        handelMouseEnter() {
            dispatch(actionCreators.infoMouseEnter())
        },
        handelMouseLeave() {
            dispatch(actionCreators.infoMouseLeave())
        },
        handelChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
            originAngle = originAngle ? parseInt(originAngle, 10) : 0
            spin.style.transform = `rotate(${originAngle + 180}deg)`
            const newPage = page < totalPage ? page + 1 : 1
            dispatch(actionCreators.changePage(newPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
