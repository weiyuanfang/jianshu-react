import React from "react";
import { connect } from 'react-redux'
import {TopicItem, TopicWrapper} from "../style";

// 因为比较简单，无需创建文件夹
class Topic extends React.PureComponent{
    render() {
        const { list } = this.props
        return (
            <TopicWrapper>
                {
                    list.map(item => {
                        return (
                            <TopicItem key={item.get('id')}>
                                <img className='topic-pic' alt='' src={item.get('imgUrl')}/>
                                {item.get('title')}
                            </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home', 'topicList'])
})

export default connect(mapStateToProps, null)(Topic)
