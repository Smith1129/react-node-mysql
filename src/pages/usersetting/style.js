import styled from 'styled-components'

export const UserHomeWrapper = styled.div`
    width:625px;
    margin:50px auto;
    img{
        display:inline-block;
        width:100px;
        height:100px;
        cursor:pointer;
        border:1px solid #ddd;
        border-radius:50px;
    }
    .upload{
        border: 1px solid rgba(59,194,29,.7);
        color: #42c02e!important;
        margin-left:40px;
        border-radius:40px;
    }
`
export const Name = styled.div`
    margin-top:50px;
    span:nth-child(1){
        font-size:15px;
        color:#969696
    }
    input{
        display:inline-block;
        width:214px;
        height:33px;
        padding:5px 10px;
        box-sizing:border-box;
        background-color: hsla(0,0%,71%,.1);
        border-radius: 4px;
        border: 1px solid #c8c8c8;
        margin-left:110px;
    }
    span:nth-child(3){
        box-sizing:border-box;
        width:80px;
        height:33px;
        display:inline-block;
        border: 1px solid rgba(59,194,29,.7);
        font-size:16px;
        color: #42c02e!important;
        border-radius:20px;
        text-align:center;
        line-height:32px;
        margin-left:15px;
        cursor:pointer;
    }
`
