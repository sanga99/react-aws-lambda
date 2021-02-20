import React, { Component } from 'react';

class BoardWrite extends Component {


    state = {
        brdtitle: '',
        brdwriter: '',
        brdwcontent: '',
    };



    handleChange = (e) => { 
        this.setState ({
            [e.target.name]: e.target.value
        }); 
    }

    handleSave = () => { 
        const { brdtitle, brdwriter, brdwcontent } = this.state;

            if(brdtitle == null || brdtitle == '' ){
                alert('제목을 입력해주세요');
                return;
            }
            else if(brdwcontent == null || brdwcontent == ''){
                alert('내용을 입력해주세요');
                return;
            } 
    }

    
    render() {
        return (
            <div> 
                <div>
                    <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange} /> 
                    <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange} /> 
                </div>
                <div>
                    <textarea placeholder="content" name="brdwcontent" value={this.state.brdwcontent} onChange={this.handleChange} /> 
                </div>
                {/* 파일 1  */}
                {/* 파일 2  */}
                <button onClick={this.handleSave}>등록</button> 
            </div>

        );
    }
}

export default BoardWrite;