import React,{ Component } from 'react'
import { TopicWrapper,TopicItem } from "../style";
import {connect} from 'react-redux'
class Topic extends Component{
    render() {
        return(
            <TopicWrapper>
                {
                this.props.TopicList.map((item)=>{
                    return(
                        <TopicItem key={item.id}>
                            <img className='topic-pic' src={item.imgUrl} alt=''/>
                            {item.title}
                            {/*社会热点*/}
                        </TopicItem>
                    )
                })
                }

            </TopicWrapper>
        )
    }
}
const mapStateToProps = (state) =>{            //state是指store里的数据
    return{
        TopicList:state.home.TopicList      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
    }
}


export default connect(mapStateToProps,null)(Topic)
