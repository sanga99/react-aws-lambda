import React, { Component } from 'react';
import styled from 'styled-components';
import Main from './Contents/Main';
// import Register from './Contents/Register';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Route exact path="/" component={Main} />
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route path="/register" component={Register} /> */}
        {/* <Route path="/board" component={Board} /> */}
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