import React, { Component } from 'react';
import styled from 'styled-components';
import Main from './Contents/Main';
import Register from './Contents/Register';
import MyPage from './Contents/MyPage';
import Login from './Contents/Login';
import Board from './Contents/Board';
import BoardDetail from './Contents/BoardDetail';
import BoardWrite from './Contents/BoardWrite';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Router>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/mypage" component={MyPage} />
              <Route path="/board" component={Board} />
              <Route path="/boarddetail/:id" component={BoardDetail} />
              <Route exact path="/boardwrite" component={BoardWrite} />
              <Route path="/boardwrite/:id" component={BoardWrite} />
            </Switch>
          </Router>
        </Layout>
      </div>
    );
  }
}

export default App;


const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`