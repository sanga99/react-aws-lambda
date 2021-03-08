import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Register  extends Component {

        state = {
            login_id: '',
            password: '',
            password2: '',
            name: '',
            email: '',
            phone: '',
            regist_date: moment().format('YYYY-MM-DD HH:MM'),
        };

        handleChange = (e) => {
            const {name, value} = e.target;
            this.setState({
               [name]:value,
            });
        }

        handleOnSubmit = (e) => {
            e.preventDefault();

            const { login_id, password, password2, name, email, phone, regist_date } = this.state;

            if(login_id == null || login_id == '' ){
                alert('아이디를 입력해주세요');
                return;
            } 
            else if(password == null || password == ''){
                alert('비밀번호를 입력해주세요');
                return;
            } 
            else if(password2 == null || password2 == ''){
                alert('비밀번호를 재입력해주세요');
                return;
            } 
            else if(password != password2){
                alert('비밀번호 재확인이 다릅니다.');
                return;
            } 

            axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/user/insert', this.state)
            .then(({data})=>{
                if(data.ResponseMetadata.HTTPStatusCode==200)
                    alert('등록되었습니다.');
                this.props.history.push('/');  
            })
            .catch(e => {
                console.error(e);
            })
        }


    render() {
      return (
        <div>
            <Wrap>
                <h3>회원가입</h3>
                <div/>
                <form onSubmit={this.handleOnSubmit}>
                    <div>
                        <div>
                            <span>ID</span>
                            <input type="text" name="login_id" value={this.state.login_id} onChange={this.handleChange} placeholder="아이디 필수" />
                        </div>
                        <div>
                            <span>password</span>
                            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="비밀번호 필수"/>
                        </div>
                        <div>
                            <span>password2</span>
                            <input type="text" name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="비밀번호 재입력 필수" />
                        </div>
                        <div>
                            <span>name</span>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div>
                            <span>email</span>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div>
                            <span>phone</span>
                            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <Button>
                        <Link to="/">취소</Link>
                        <a href="#" onClick={this.handleOnSubmit}>회원가입</a>
                    </Button>
                </form>
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
  
export default Register;

