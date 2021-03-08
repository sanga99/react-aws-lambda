import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import S3 from 'react-aws-s3';

class BoardWrite extends Component {

    constructor(props){
        super(props);

        this.state = ({
            type: 'insert',
            board_id: '',
            title: '',
            writer: JSON.parse(localStorage.getItem('loginUser')).data[0].login_id,
            content: '',
            regist_date: moment().format('YYYY-MM-DD HH:MM'),
            regist_datetime: moment(),

            selectedFile: null,
            new_file_name: ''
        });

    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.setState({
                type : 'update',
                board_id : this.props.match.params.id
            })

            this.loadData(this.props.match.params.id);
        }
    }

    loadData = (board_id) => {
        board_id = board_id.slice(0,-1);
        const data = {
            board_id : board_id
        }

        axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/detail', data)
        .then(({data})=>{
            this.setState({
                title : data.title,
                content : data.content
            })
        })
        .catch(e => {
            console.error(e);
        })

    }

    handleChange = (e) => { 
        this.setState ({
            [e.target.name]: e.target.value
        }); 
    }

    handleSave = () => { 
        const { board_id, title, writer, content, regist_datetime } = this.state;

            if(title == null || title == '' ){
                alert('제목을 입력해주세요');
                return;
            }
            else if(content == null || content == ''){
                alert('내용을 입력해주세요');
                return;
            } 

            this.setState({
                board_id : title + regist_datetime
            })

            this.pushItem();

    }


    handleUpdate = (e) => {
        const { board_id, title, content, regist_date, writer } = this.state;

        const updateData = {
            board_id : board_id.slice(0,-1),
            title : title,
            content : content,
            regist_date : regist_date,
            writer : writer
        }

        if(title == null || title == '' ){
            alert('제목을 입력해주세요');
            return;
        }
        else if(content == null || content == ''){
            alert('내용을 입력해주세요');
            return;
        }
        else if(board_id == undefined || board_id == null || board_id == '' ){
            alert('해당글을 찾을수 없습니다.');
            return;
        }
        
        axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/update', updateData)
        .then(({data})=>{
            if(data.ResponseMetadata.HTTPStatusCode==200)
                    alert('수정되었습니다.');
            this.props.history.push('/board');
        })
        .catch(e => {
            console.error(e);
            alert('수정에 실패하였습니다.');
        })

    }

    fileUpload = (board_id) => {


        const newFileName = board_id+'_'+this.state.writer+'_'+this.state.selectedFile.name

        const config = {
            bucketName: 'file-test-react',
            dirName: 'origin', /* optional */
            region: 'ap-northeast-2',
            accessKeyId: 'AKIA4IDLT6A4KFN7IR5X',
            secretAccessKey: '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',
            s3Url: 'https://file-test-react.s3.ap-northeast-2.amazonaws.com', /* optional */
        }

        const ReactS3Client = new S3(config);

        ReactS3Client
            .uploadFile(this.state.selectedFile, newFileName)
            .then(data => {
                console.log(data)
                this.setState({
                    new_file_name : newFileName
                })
            })
            .catch(err => console.error(err))

        return newFileName

    }

    pushItem = async () => {
        
        let newFileName = ''
        let { title, writer, content, regist_date, regist_datetime, new_file_name } = this.state;
        let board_id = title + regist_datetime

        // file upload
        if(this.state.selectedFile)
            newFileName = this.fileUpload(board_id)

        const data = {
            'board_id' : board_id,
            // 'state' : this.state
            'state' : {
                board_id : board_id,
                title : title,
                writer : writer,
                content : content,
                regist_date : regist_date,
            },
            'file' : newFileName,
        }


        await axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/board/insert', data)
            .then(({data})=>{
                if(data.ResponseMetadata.HTTPStatusCode==200)
                    alert('등록되었습니다.');
                this.props.history.push('/board');  
            })
            .catch(e => {
                console.error(e);
            })
    }

    handleFileInput = (e) => {
        this.setState({
            selectedFile : e.target.files[0],
        })

        // if (/^image\//.test(this.state.selectedFile.type)) {
        //     this.encodeBase64ImageFile(this.state.selectedFile)
        //     .then((data) => {
        //         console.log(data)
        //     })
        // }
    }


    // handlePost = () => {
    //     // file upload
    //     const newFileName = this.state.board_id+'_'+this.state.writer+'_'+this.state.selectedFile.name

    //     const config = {
    //         bucketName: 'file-test-react',
    //         dirName: 'origin', /* optional */
    //         region: 'ap-northeast-2',
    //         accessKeyId: 'AKIA4IDLT6A4KFN7IR5X',
    //         secretAccessKey: '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',
    //         s3Url: 'https://file-test-react.s3.ap-northeast-2.amazonaws.com', /* optional */
    //     }

    //     const ReactS3Client = new S3(config);

    //     ReactS3Client
    //         .uploadFile(this.state.selectedFile, newFileName)
    //         .then(data => {
    //             console.log(data)
    //             this.setState({
    //                 new_file_name : newFileName
    //             })
    //         })
    //         .catch(err => console.error(err))
    // }

    // react-aws-s3 에서 파일 등록 
    // handlePost = () => {

    //     const { title,  regist_datetime } = this.state
    //     const board_id = title + regist_datetime

    //     const newFileName = board_id+'_'+this.state.writer+'_'+this.state.selectedFile.name

    //     const config = {
    //         bucketName: 'file-test-react',
    //         dirName: 'origin', /* optional */
    //         region: 'ap-northeast-2',
    //         accessKeyId: 'AKIA4IDLT6A4KFN7IR5X',
    //         secretAccessKey: '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',
    //         s3Url: 'https://s3.file-test-react.amazonaws.com', /* optional */
    //     }

    //     const ReactS3Client = new S3(config);

    //     ReactS3Client
    //         .uploadFile(this.state.selectedFile, newFileName)
    //         .then(data => {
    //             console.log(data)
    //             this.setState({
    //                 new_file_name : newFileName
    //             })
    //         })
    //         .catch(err => console.error(err))

    // }

    // labmda(python)으로 전송 하여 file upload ( aws api gateway와 연결)
    // handlePost = () => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(this.state.selectedFile);
        
    //     // 변환 완료!
    //     const base64data = reader.result;


    //     const formData = new FormData();
    //     // formData.append('file', this.state.selectedFile);
    //     formData.append('file', base64data);
    //     // console.log(this.state.selectedFile)
    //     console.log(base64data)
    //     // form-data 확인
    //     // for (let value of formData.values()) {
    //     //     console.log(value);
    //     //   }


    //     // axios.post("https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/file", formData, {
    //     axios.post("https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/file/filetest", formData, {
    //         headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                   }
    //     })
    //     .then(res => {
    //       console.log('성공'+JSON.stringify(res.data))
    //     }).catch(err => {
    //       alert('실패')
    //     })
    //   }

    //   // 파일다운로드
    //   handleGetFile = () => {
    //     axios.get("https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/file")
    //     .then(res => {
    //       console.log('성공'+JSON.stringify(res))
    //     }).catch(err => {
    //       alert('실패')
    //     }) 
    //   }
    // handleUpload = (e) => {
    //     const updateValue = this.props.handleChange;
    //     e.preventDefault();
    // ​
    //     const data = new FormData();
    //     data.append("file", this.uploadInput.files[0]);
    //     data.append("filename", this.uploadInput.files[0].name);
    //     axios
    //       .post(
    //         `이미지 업로드할 api route`,
    //         data
    //       )
    //       .then(function(response) {
    //         console.log(response)// 옆과 같이 response를 로그를 찍어볼수 있습니다. 여기서 setState등의 작업        을 통해 aws s3 에 올라간 이미지 정보를 저장할 수 있다.
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   }

    // handleUpload = (e) => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     data.append("file", this.uploadInput.files[0]);
    //     data.append("filename", this.uploadInput.files[0].name);

    //     axios.post('https://pmnn50rls9.execute-api.ap-northeast-2.amazonaws.com/proto/file', data)
    //         .then((res)=>{
    //             console.log(res)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // }

    
    render() {
        return (
            <div>
                <Wrap>
                <h3>{this.state.type == 'insert' ? '글등록' : '글수정'}</h3>
                <p>
                    <input width='500px' placeholder="title" name="title" value={this.state.title} onChange={this.handleChange} /> 
                </p>
                <p>
                    <textarea width='200px;' placeholder="content" name="content" value={this.state.content} onChange={this.handleChange} /> 
                </p>
                {/* 파일 1  */}
                {/* 파일 2  */}
                {/* 파일 특정 확장자 1) 특정확장자 지정 accept=".gif, .jpg, .png" 2) 미디어 타입지정 accept="image/gif, image/jpeg, image/png" 3) 해당부분(이미지)의 모든 확장자 지정 accept="image/*" */}
                <div>
                    <input type="file" name="file" accept=".pdf, .doc, .docx, .cvs, .xlsx, .xls, .jpg, .png, .txt" onChange={this.handleFileInput}/>
                    {/* <button type="button" onClick={this.handlePost}>저장</button> */}
                    <br/><br/>
                    {/* <button type="button" onClick={this.handleGetFile}>다운로드</button> */}
                    {/* <Button> */}
                        {/* <a href="#" type="button" onClick={this.handlePost}>저장</a> */}
                    {/* </Button> */}
                </div>
                {/* 파일 테스트 코드 end*/}
                {/* <form enctype="multipart/form-data" onSubmit={this.handleUpload}>
                    <div className="form-group">
                        <input
                        className="form-control"
                        ref={ref => {
                            this.uploadInput = ref;
                        }}
                        type="file"
                        />
                    </div>
            ​
                    <button className="btn btn-success" type="submit">
                        Upload
                    </button>
                    </form> */}


                <Button>
                    <Link to="/board">목록</Link> 
                    {this.state.type == 'insert' ? 
                        <a href="#" onClick={this.handleSave}>등록</a> 
                        :
                        <a href="#" onClick={this.handleUpdate}>수정</a> 

                    }
                </Button>
                </Wrap> 
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

const Wrap = styled.div` 
    padding: 20px; 
    input { 
        width: 300%; 
        height: 30px; 
        border: 1px solid #ccc; 
    } 
    textarea { 
        width: 300%; 
        height: 300px; 
        border: 1px solid #ccc; 
    } 
`;


export default BoardWrite;