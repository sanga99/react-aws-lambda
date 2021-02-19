import React, { Component } from 'react';
import Header from '../Layout/Header';
import styled from 'styled-components';

class Register  extends Component {
    render() {
      return (
        <div>
            <Header/>
            <div>회원가입</div>
        </div>
      );
    }
  }
  
export default Register;
// import React, { Component } from 'react';
// import Header from '../Layout/Header';
// import styled from 'styled-components';

// class Register  extends Component {

//         state = {
//             login_id: '',
//             password: '',
//             password2: '',
//             name: '',
//             email: '',
//             phone: '',
//         };

//         handleChange = (e) => {
//             const {name, value} = e.target;
//             this.setState({
//                [name]:value,
//             });
//         }

//         handleOnSubmit = (e) => {
//             e.preventDefault();

//             const { login_id, password, password2, name, email, phone } = this.state;

//             if(login_id == null){
//                 alert('아이디를 입력해주세요');
//                 return;
//             } 
//             else if(password == null){
//                 alert('비밀번호를 입력해주세요');
//                 return;
//             } 
//             else if(password2 == null){
//                 alert('비밀번호를 재입력해주세요');
//                 return;
//             } 
//             else if(password != password2){
//                 alert('비밀번호 재확인이 다릅니다.');
//                 return;
//             } 

//             alert('성공')
//         }


//     render() {
//       return (
//         <div>
//             <Header/>
//             <h3>회원가입</h3>
//             <div/>
//             <form onSubmit={this.handleOnSubmit}>
//                 <div>
//                     <div>
//                         <span>ID</span>
//                         <inpy type="text" name="login_id" value={this.state.login_id} onChange={this.handleChange} placeholder="아이디 필수" />
//                     </div>
//                     <div>
//                         <span>password</span>
//                         <inpy type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="비밀번호 필수"/>
//                     </div>
//                     <div>
//                         <span>password2</span>
//                         <inpy type="text" name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="비밀번호 재입력 필수" />
//                     </div>
//                     <div>
//                         <span>name</span>
//                         <inpy type="text" name="name" value={this.state.name} onChange={this.handleChange} />
//                     </div>
//                     <div>
//                         <span>email</span>
//                         <inpy type="text" name="email" value={this.state.email} onChange={this.handleChange} />
//                     </div>
//                     <div>
//                         <span>phone</span>
//                         <inpy type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
//                     </div>
//                 </div>
//                 <div>
//                     <button type="submit">회원가입</button>
//                 </div>
//                 <hr/>
//             </form>
//         </div>
//       );
//     }
//   }
  
// export default Register;

