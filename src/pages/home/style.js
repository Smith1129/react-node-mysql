import styled from 'styled-components'

export const HomeWrapper = styled.div`
    overflow:hidden;
    width:960px;
    margin:0 auto;
    position:absolute;
    left:50%;
    margin-left:-480px;
`;
export const HomeLeft = styled.div`
    float:left;
    margin-left:15px;
    padding-top:30px;
    width:625px;
    .banner-img{
        width:625px;
        height:270px;
    }
`;
export const HomeRight = styled.div`
    float:right;
    width:280px;
`;
export const TopicWrapper = styled.div`
    padding:20px 0 10px 0
    overflow:hidden;
    border-bottom:1px solid #dcdcdc
`
export const TopicItem = styled.div`
    float:left;
    height:32px;
    line-height:32px;
    padding-right:10px;
    margin-left:18px;
    background:#f7f7f7
    font-size:14px;
    color:#000;
    border:1px solid #dcdcdc;
     margin-bottom:18px;
    border-radius:4px;
    .topic-pic{
        display:block;
        margin-right:10px;
        float:left
        width:32px;
        height:32px;
        margin-right:10px;
    }
`;
export const ListItem = styled.div`
    padding:20px 0;
    border-bottom:1px solid #dcdcdc;
    overflow:hidden;
    .pic{
        display:block;
        width:125px;
        height:100px;
        float:right;
        border-radius:10px;
    }
    .title{
        line-height:27px;
        font-size:18px;
        font-weight:bold;
        color:#333;
    }
    .desc{
        width:500px;
        font-size:13px;
        line-height:24px;
        color:#999;
        margin-top:15px;
        word-break:break-all;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        overflow:hidden;
`;
export const ListInfo = styled.div`
    width:500px;
    float:left
    .iconfont{
        display:inline-block;
        margin-right:20px;
    }
    .up{
        color:red;
    }
`;
export const RecommendWrapper = styled.div`
    margin:30px 0;
    width:280px;
`
export const RecommendItem = styled.div`
    width:280px;
    height:50px;
    background:url(${(props) => props.imgUrl});
    background-size:contain;
`;
export const WriterWrapper = styled.div`
    width:278px;
    border:1px solid #dcdcdc;
    border-radius:3px;
    height:300px;
    line-height:300px;
    text-align:center;
`;
export const LoadMore = styled.div`
    width:100%;
    height:40px;
    line-height:40px;
    background:#a5a5a5;
    text-align:center;
    border-radius:20px;
    color:#fff;
    margin:30px 0;
    cursor:pointer;
`
export const BackTop = styled.div`
    position:fixed;
    right:100px;
    bottom:100px;
    width:60px;
    height:60px;
    line-height:60px;
    text-align:center;
    border:1px solid #ccc;
    font-size:14px;
`


