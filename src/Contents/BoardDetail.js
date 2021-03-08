import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

class BoardDetail extends Component {

    constructor(props){
        super(props);

        this.state = ({
            data: [],
            indexData : {
                board_id : this.props.match.params.id
            }
        });

    }


    componentDidMount(){
        this.loadItem();
    }

    loadItem = async () => {
        axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/detail', this.state.indexData)
            .then(({data})=>{
                this.setState({
                    data : data
                })
            })
            .catch(e => {
                console.error(e);
            })
    }

    handleUpdate = (e) => {

        if(localStorage.getItem('loginUser')){
            if(this.state.data.writer !== JSON.parse(localStorage.getItem('loginUser')).data[0].login_id){
                alert('본인의 글만 수정할 수 있습니다.')
                return;
            }         
        }
        else{
            alert('본인의 글만 수정할수 있습니다.')
            return;
        }

        this.props.history.push(`/boardwrite/${this.state.indexData.board_id}}`);
    }



    handleDelete = (e) => {

        if(localStorage.getItem('loginUser')){
            if(this.state.data.writer !== JSON.parse(localStorage.getItem('loginUser')).data[0].login_id){
                alert('본인의 글만 삭제할 수 있습니다.')
                return;
            }         
        }
        else{
            alert('본인의 글만 삭제할수 있습니다.')
            return;
        }


        e.preventDefault();
        axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/delete', this.state.indexData)
        .then(({data})=>{
            if(data.ResponseMetadata.HTTPStatusCode==200)
                    alert('삭제되었습니다.');
            this.props.history.push('/board');
        })
            .catch(e => {
                console.error(e);
                alert('삭제에 실패하였습니다.');
                this.loadItem();
            })
    }


    

    
    render() {
        const { data } = this.state;
        return (
            <div>
               <Wrap> 
                   <h2>{data.title}</h2> 
                   <p>{data.content}</p> 
                    <a href={`https://file-test-react.s3.ap-northeast-2.amazonaws.com/origin/${data.file}`} >파일 : {data.file} </a> 
                    {/* <a href="https://file-test-react.s3.ap-northeast-2.amazonaws.com/origin/_aaa_s3_bukett.png" >file download </a>  */}
                   <Button> 
                       <Link to="/board">목록</Link> 
                       <a href="#" onClick={this.handleDelete} > 삭제 </a> 
                       <a href="#" onClick={this.handleUpdate} > 수정 </a> 
                       {/* <Link to={`/boardwrite/${this.state.indexData.board_id}`}>수정</Link>  */}
                    </Button>
                </Wrap>
            </div>
        );
    }
}

const Wrap = styled.div`
 padding: 20px; 
 h2 { 
     padding-bottom: 20px; 
     border-bottom: 1px solid #ccc; 
} 
p { min-height: 200px; } 
`; 
const Button = styled.div` 
    border-top: 1px solid #eee; 
    padding: 20px; 
    a { float: right; padding: 10px 20px; border-radius: 5px; text-decoration: none; background: #f2f2f2; border: 1px solid #ddd; color: #424242;
    font-size: 16px; } a + a { margin-right: 5px; } 
`;


export default BoardDetail;