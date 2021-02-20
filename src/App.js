import React, { Component } from 'react';
import styled from 'styled-components';
import Main from './Contents/Main';
import Register from './Contents/Register';
import Login from './Contents/Login';
import Board from './Contents/Board';
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
              <Route path="/board" component={Board} />
              <Route path="/boardwrite" component={BoardWrite} />
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