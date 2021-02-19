import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from 'styled-components';
import Register from '../Contents/Register';

class Header extends Component {
    render() {
      return (
        <div>
            {/* <Container> */}
                {/* <Link to="/login">로그인</Link> */}
                <Link to="/register">회원가입</Link>
                {/* <Link to="/board">게시판</Link> */}
            {/* </Container> */}
            <Route path="/register" component={Register} />
        </div>
      );
    }
  }
  
export default Header;

// const Container = styled.div`
//     width: 100%;
//     border-bottom: 1px solid #d1d8e4;
// `