import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

class Board extends Component {

    state = {
        data: [],
        checkedData: [],
        // checkedData: [{
        //     title: '',
        //     regist_date : '',
        //     regist_datetime : '',
        // }],
    };


    loadItem = async () => {
        const data = {
            type : 'default'
        }
        axios.post( 'https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/list', data)
            .then(({data})=>{
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

    handleChange = (e) => { 
        // let checked = this.state.checkedData.push(e.target.value)
        // console.log(checked)
        // const checked = e.target.checked;
        // if(checked){ e.target.checked = false }
        // else{ e.target.checked = true }
        this.setState ({
            [e.target.name]: e.target.value
        }); 
    }


    handleInsert = (e) => {
        e.preventDefault();

        if(!(localStorage.getItem('loginUser'))){
            alert('회원만 이용할 수 있습니다.')
            return;
        }
        else this.props.history.push('/boardwrite');
    }
    

    handleDelete = (e) => {
        e.preventDefault();

        const { checkedData } = this.state;
        if(checkedData == null || checkedData == ''){
            alert('삭제할 게시글을 선택해 주세요')
            return;
        }
        if(localStorage.getItem('loginUser')){
            if(JSON.parse(checkedData).writer !== JSON.parse(localStorage.getItem('loginUser')).data[0].login_id){
                alert('본인의 글만 삭제할 수 있습니다.')
                return;
            }         
        }
        else{
            alert('본인의 글만 삭제할수 있습니다.')
            return;
        }

        axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/delete', checkedData)
        .then(({data})=>{
            this.setState({
                checkedData : []
            })
            if(data.ResponseMetadata.HTTPStatusCode==200)
                    alert('삭제되었습니다.');
            this.loadItem();
        })
            .catch(e => {
                console.error(e);
                alert('삭제에 실패하였습니다.');
                this.loadItem();
            })
    }

    
    render() {
        const { data, checkedData } = this.state;
        return (
            <div>
                <h3>게시판</h3>
                <Button>
                    <Link to="/">메인으로</Link>
                    {/* <Link to="/boardwrite">글쓰기</Link> */}
                    <a href="#" onClick={this.handleInsert}>글쓰기</a>
                    <a href="#" onClick={this.handleDelete}>글삭제</a>
                </Button>
                <Table>
                <table border="1"> 
                    <tbody> 
                        <tr align="center"> 
                            <td width="30"></td> 
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
                                            <td><input type="checkbox" name="checkedData" value={JSON.stringify(item)}
                                                        // checked={false}
                                                        onChange={this.handleChange}/>
                                            </td>
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

export default Board;