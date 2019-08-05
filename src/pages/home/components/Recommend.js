import React,{ Component } from 'react'
import {RecommendWrapper,RecommendItem} from "../style";
import {connect} from 'react-redux'

class Recommend extends Component{
    render() {
        return(
            <RecommendWrapper>
                {this.props.recommendList.map((item)=>{
                    return(
                        <RecommendItem key={item.id} imgUrl={item.imgUrl}></RecommendItem>
                        )
                })}
            </RecommendWrapper>
        )
    }
}

const mapStateToProps = (state) =>{            //state是指store里的数据
    return{
        recommendList:state.home.recommendList      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
    }
}


export default connect(mapStateToProps,null)(Recommend)
