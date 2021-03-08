import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Login extends Component {

    state = {
        login_id : '', 
        password : '',
    }

    handleChange = (e) => { 
        this.setState ({
            [e.target.name]: e.target.value
        }); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { login_id, password } = this.state;

        if(login_id == ''){ alert('아이디를 입력해주세요'); return; }
        else if(password == ''){ alert('비밀번호를 입력해주세요'); return; }


        axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/user/login', this.state)
            .then(({data})=>{
                if(data.ResponseMetadata.HTTPStatusCode==200){
                    if(data.Items.length == 1){
                        let storageData = {data : data.Items};
                        localStorage.setItem('loginUser', JSON.stringify(storageData));
                        alert('로그인 되었습니다.');
                        this.props.history.push('/');  
                    }
                    else alert('회원이 아닙니다.')
                }
                
            })
            .catch(e => {
                console.log('틀림2')
                console.error(e);
            })





    }

    
    render() {
        return (
            <div>
                <Wrap>
                <h3>로그인</h3>
                <div>
                    <div>
                        <label>ID</label>
                        <input type="text"  name="login_id" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </div>
                </div>
                <Button>
                    <a href="#" onClick={this.handleSubmit}>로그인</a>
                    <Link to="/">취소</Link>
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

export default Login;