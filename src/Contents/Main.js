import React, { Component } from 'react';
import Header from '../Layout/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Main  extends Component {

    state = {
      boardData : [],
      usersData : [],
    }

    boardLoadItem = async () => {
        const data = {'type':'main'}
        await axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/list', data)
            .then(({data})=>{
            //  최신 데이터 10개 
            //   data.sort((a, b)=>{
            //     return a.regist_date > b.regist_date ? a.regist_date
            //   })
                this.setState({
                    boardData : data
                })
            })
            .catch(e => {
                console.error(e);
            })
    }

    usersLoadItem = async () => {
        await axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/user/get')
            .then(({data})=>{
            //  최신 데이터 10개 
            //   data.sort((a, b)=>{
            //     return a.regist_date > b.regist_date ? a.regist_date
            //   })
                this.setState({
                    usersData : data
                })
            })
            .catch(e => {
                console.error(e);
            })
    }

    componentDidMount(){
        this.boardLoadItem();
        this.usersLoadItem();
    }
    render() {
      const { boardData, usersData } = this.state;
      return (
        <div>
            <Header/>
            <Table>
              <h4>최근 가입한 회원</h4>
                <table border="1"> 
                    <tbody> 
                        <tr align="center"> 
                            <td width="50">No.</td> 
                            <td width="100">ID</td> 
                            <td width="100">Name</td> 
                            <td width="100">Regist Date</td> 
                        </tr> 
                        { typeof usersData == 'object' ? 
                            usersData.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.login_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.regist_date}</td>
                                    </tr>
                                )
                            })
                            :
                            <div></div>
                        }
                    </tbody> 
                </table>
                <Div></Div>
                <h4>최근 게시글</h4>
                <table border="1"> 
                    <tbody> 
                        <tr align="center"> 
                            <td width="50">No.</td> 
                            <td width="300">Title</td> 
                            <td width="100">Name</td> 
                            <td width="150">Date</td> 
                        </tr> 
                        {/* <div>{typeof data == 'object'}</div> */}
                        { 
                          typeof boardData == 'object' ? 
                          boardData.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td><Link to={`/boarddetail/${item.board_id}`}>{item.title}</Link></td>
                                        <td>{item.writer}</td>
                                        <td>{item.regist_date}</td>
                                    </tr>
                                )
                            })
                            : 
                          <div></div>
                        }
                    </tbody> 
                </table>
                </Table>
        </div>
      );
    }
  }
  
export default Main;


const Button = styled.div` 
    border-top: 1px solid #eee; 
    padding: 20px; 
    a { float: right; padding: 10px 20px; border-radius: 5px; text-decoration: none; background: #f2f2f2; border: 1px solid #ddd; color: #424242;
    font-size: 16px; } a + a { margin-right: 5px; } 
`;
const Table = styled.div`
    margin-top: 30px;
`;

const Div = styled.div`
      margin: 30px;
`;
