import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Header extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.setItem('loginUser', []);
        alert('로그아웃되었습니다.')
        window.location.reload();
    }

    render() {
      return (
        <div>
            <Button>
                {localStorage.getItem('loginUser') ?
                    <div>
                        {/* <Button> */}
                            <a href="#" onClick={this.handleLogout}>로그아웃</a>
                            <Link to="/mypage">마이페이지</Link>
                            <Link to="/board">게시판</Link>
                        {/* </Button> */}
                    </div> 
                    : 
                    <div>
                        {/* <Button> */}
                            <Link to="/register">회원가입</Link>
                            <Link to="/login">로그인</Link>
                            <Link to="/board">게시판</Link>
                            {/* </Button> */}
                    </div>
                } 
                    {/* <div>
                        <Link to="/board">게시판</Link>
                    </div> */}
            </Button>
        </div>
      );
    }
  }
  
export default Header;
const Button = styled.div` 
    border-top: 1px solid #eee; 
    padding: 30px; 
    a { float: right; padding: 10px 10px; border-radius: 5px; text-decoration: none; background: #f2f2f2; border: 1px solid #ddd; color: #424242;
    font-size: 16px; } a + a { margin-right: 20px; } 
`;