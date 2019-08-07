import styled from 'styled-components'
import logoPic from '../../statics/logo.png'
export const HeaderWrapper = styled.div`
    position:relative;
    height:56px;
    border-bottom:1px solid #f0f0f0;
`;

export const Logo = styled.div`
    position:absolute;
    top:0;
    left:0;
    display:block
    width:100px;
    height:56px;
    background:url(${logoPic});
    background-size: contain;
`
export const Nav = styled.div`
    width:960px;
    height:100%;
    padding-right:70px;
    box-sizing:border-box;
    margin:0 auto;
`
export const NavItem = styled.div`
    line-height:56px;
    padding:0 15px;
    font-size:17px;
    color:#333;
    &.left {
        float:left;
    }
    &.right{
        float:right;
        color:#969696;
    }
    &.active{
        color:#ea6f5a;
    }
`;
export const SearchWrapper = styled.div`
    float:left;
    position:relative;
    z-index:999;
    .zoom {
        position:absolute;
        right:5px;
        bottom:5px;
        width:30px;
        line-height:30px;
        text-align:center;
        border-radius:15px;
     &.focused{
        background:#777;
        color:#fff;
     }
    }
`
export const NavSearch = styled.input.attrs({
    placeholder:'搜索'
})`
    width:160px;
    height:38px;
    margin-top:9px;
    padding:0 30px 0 20px;
    margin-left:20px;
    box-sizing:border-box;
    border:none;
    outline:none;
    color:#666;
    border-radius:19px;
    background:#eee;
    font-size:14px;
    &.focused{
        width:240px
    }
    &.slide-enter{
        transition:all .2s ease-out;
    }
    &.slide-enter-active{
        width:240px;
    }
    &.slide-exit{
        transition:all .2s ease-out;
    }
    &.slide-exit-active{
          width:160px;
    }
    &::placeholder{
        color:#999;
    }
`;
export const SearchInfo = styled.div`
    position:absolute;
    left:0;
    top:56px;
    width:240px;
    padding:0 20px;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    background:#fff
`;
export const SearchInfoTitle = styled.div`
    margin-top:20px;
    margin-bottom:15px;
    line-height:20px;
    font-size:14px;
    color:#969696;
`
export const SearchInfoSwitch = styled.span`
    float:right;
    font-size:13px;
    cursor:pointer;
    .spin{
        display:block;
        float:left;
        font-size:12px;
        margin-right:2px;
        transition:all .2s ease-in;
        transform-origin:center center;
    }
`;
export const SearchInfoList = styled.div`
        overflow:hidden;
`;
export const SearchInfoItem = styled.a`
    display:block
    float:left;
    line-height:20px;
    padding:0 5px;
    margin-right:10px;
    margin-bottom:15px;
    font-size:12px;
    border:1px solid #ddd;
    color:#787878;
    border-radius:3px;
`
export const Addtion = styled.div`
    position:absolute;
    right:40px;
    top:0;
    height:56px
    // .name{
    //     font-size:18px;
    //     line-height:55px;
    //     color:#DC143C;
    //     display:inline-block;
    //     margin-right:15px;
    // }
    img{
        display:inline-block;
        width:71px;
        height:42px;
        margin-right:6px;
        margin-top:7px;
    }
`;
export const Button = styled.div`
    float:right;
    margin-top:9px;
    padding:0 20px;
    margin-right:20px;
    line-height:38px;
    font-size:14px;
    border-radius:19px;
    border:1px solid #ec6149;
    &.reg {
        color:#ec6149;
        cursor:pointer;
    }
    &.writting{
        color:#fff;
        background:#ec6149;
    }
    
`;


