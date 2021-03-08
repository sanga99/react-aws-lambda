import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

class MyPage extends Component {

    state = {
        data : [],
    }


    loadItem = async () => {
        const login_user = localStorage.getItem('loginUser');
        const login_id = JSON.parse(login_user).data[0].login_id
        const data = {
            'type':'me',
            'login_id' : login_id
        }
        await axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/list', data)
            .then(({data})=>{
                console.log(data)
            //  최신 데이터 10개 
            //   data.sort((a, b)=>{
            //     return a.regist_date > b.regist_date ? a.regist_date
            //   })
                this.setState({
                    data : data
                })
            })
            .catch(e => {
                console.error(e);
            })
    }

    componentDidMount(){
        this.loadItem();
    }

    
    render() {
        const { data } = this.state;
        return (
            <div>
            <h3>마에페이지</h3>
            <Button>
                <Link to="/">메인으로</Link>
            </Button>
            <Table>
                <h4>나의 최근 게시글</h4>
                <table border="1"> 
                    <tbody> 
                        <tr align="center"> 
                            <td width="50">No.</td> 
                            <td width="300">Title</td> 
                            <td width="100">Name</td> 
                            <td width="150">Date</td> 
                        </tr> 
                        { 
                          typeof data == 'object' ? 
                            data.map((item, index)=>{
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

export default MyPage;