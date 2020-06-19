import React from "react";
import { connect } from 'react-redux'
import {Content, DetailWrapper, Header} from "./style";
import {actionCreators} from './store'

class Detail extends React.Component{
    render() {
        const {title, content} = this.props
        console.log(this.props)
        return (
            <DetailWrapper>
                <Header>{title}</Header>
                <Content dangerouslySetInnerHTML={{__html: content}}/>
            </DetailWrapper>
        )
    }
    componentDidMount() {
        this.props.getDetail(this.props.match.params.id)
    }
}

const mapStateToProps = (state) => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
})

const mapDispatchToProps = (dispatch) => ({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(Detail)
