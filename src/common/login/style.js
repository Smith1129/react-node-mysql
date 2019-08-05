import styled from 'styled-components'
export const AllContent = styled.div`
        height: 100%;
        width:100%;
        min-height: 750px;
        text-align: center;
        font-size: 14px;
        background-color: #f1f1f1;
        position:absolute;
        left:0;
        top:0;
        z-index:999;

`
export const LoginWrapper = styled.div`
        width: 400px;
        margin: 60px auto 0;
        padding: 50px 50px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(0,0,0,.1);
        vertical-align: middle;
        display: inline-block;
        position:relative;
        p{
            position:absolute;
            right:0;
            top:0;
            width:20px;
            border-radius:7px;
            border:1px solid;
            cursor:pointer;
        }
`
export const TitleContent = styled.div`
    span{
        display:inline-block;
        font-size:18px;
        color: #969696;
        font-weight: 400;
        padding:10px;
    }
    .active{
        color: #ea6f5a;
        border-bottom: 2px solid #ea6f5a;
        font-weight: 700;
    }
`
export const LoginUsername = styled.div`
    width:300px;
    height:50px;
    box-sizing:border-box;
    border:1px solid #ccc;
    position:relative;
    box-sizing:border-box;
    margin-top:30px;
    span{
        display:inline-block;
        position:absolute;
        left:5px;
        top:50%;
        transform:translateY(-50%);
    }
    input{
        display:inline-block;
        width:264px;
        height:50px;
        background-color: #f1f1f1;
        font-size: 14px;
        box-sizing: border-box;
        padding:0 10px;
        line-height:50px;
        position:absolute;
        left:35px;
        top:50%;
        transform:translateY(-50%);
    }
`
export const LoginPass = styled.div`
    width:300px;
    height:50px;
    box-sizing:border-box;
    border:1px solid #ccc;
    position:relative;
    box-sizing:border-box;
    span{
        display:inline-block;
        position:absolute;
        left:5px;
        top:50%;
        transform:translateY(-50%);
    }
    input{
        display:inline-block;
        width:264px;
        height:50px;
        background-color: #f1f1f1;
        font-size: 14px;
        box-sizing: border-box;
        padding:0 10px;
        line-height:50px;
        position:absolute;
        left:35px;
        top:50%;
        transform:translateY(-50%);
    }
`
export const LoginBtn = styled.div`
    margin-top:30px;
    button{
        width:90%;
    }
    .register{
        background:#3db922
    }
`
