import React, { Component } from 'react';

class Login extends Component {

    
    render() {
        return (
            <div>
                <form action="/api/login" method="post">
                <h3>로그인</h3>
                <div>
                    <div>
                        <label>ID</label>
                        <input type="text"  name="userId"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" 
                                name="password"
                        />
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

export default Login;