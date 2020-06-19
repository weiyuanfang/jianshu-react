import React from "react";
import { connect } from 'react-redux'
import {RecommendItem, RecommendWrapper} from "../style";

class Recommend extends React.PureComponent{
    render() {
        const { list } = this.props
        return (
            <RecommendWrapper>
                {
                    list.map(item => <RecommendItem key={item.get('id')} imgUrl={item.get('imgUrl')} />)
                }
            </RecommendWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home', 'recommendList'])
})

export default connect(mapStateToProps, null)(Recommend)
