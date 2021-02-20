import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Board extends Component {

    
    render() {
        return (
            <div>
                <h3>게시판</h3>
                <Link to="/boardwrite">글쓰기</Link>
                <table border="1"> 
                    <tbody> 
                        <tr align="center"> 
                            <td width="50">No.</td> 
                            <td width="300">Title</td> 
                            <td width="100">Name</td> 
                            <td width="100">Date</td> 
                        </tr> 
                        <tr> 
                            <td>1</td> 
                            <td>
                                제목1
                            </td> 
                            <td>글쓴이</td> 
                            <td>날짜</td> 
                        </tr>
                        {/* <tr> 
                            <td>{row.brdno}</td> 
                            <td>
                                <a onClick={() => this.handleUpdateForm(row.brdno) }>{row.brdtitle}</a>
                            </td> 
                            <td>{row.brdwriter}</td> 
                            <td>{row.brddate.toLocaleDateString('ko-KR')}</td> 
                            <td>
                                <a onClick={() => { this.props.dispatch(board_remove(row.brdno)) }}>X</a>
                            </td> 
                        </tr> */}

                    </tbody> 
                </table>

            </div>
        );
    }
}

export default Board;