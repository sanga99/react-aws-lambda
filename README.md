<br/>

###  React와 AWS lambda를 이용한 로그인, 회원가입, 게시판 예제

<br/>

#### [사용기술]

front : react.js
backend : python
backend_Platform : AWS Rambda
DB : DynamoDB
hosting : AWS S3


<br/>

#### [간단한 동작설명]

client단(react)에서 axios를 이용하여 API를 서버단으로 보내다.
여기서 request data를 받을 서버단은 AWS Lambda 모듈이다.

AWS Lambda의 경우 함수 하나당 하나의 controller 역할을 한다.
람다 함수에서 AWS DynamoDB 를 연동하여 데이터 처리를 진행한다. 

파일 업로드의 경우,  AWS S3를 이용한다. 
S3의 사용은 react-aws-s3 컴포넌트를 사용하여 React + AWS S3 조함으로 구현하였다.

데이터 암호화 처리의 경우, python 코드로 암호화를 진행하였고,
local에서 python 코드로 작성하여 해당되는 AWS lambda 함수에 layer로 추가하여 import하여 암호화처리를 연결시켰다.

<br/>

#### [내용]

로그인

회원가입

게시판 - 등록/조회/수정/삭제

파일첨부

<br/>

#### [기능정의]

1. 메인
    - 헤더 : 로그인(로그아웃) / 회원가입(마이페이지) / 게시판
    - 최근에 회원가입한 10인 나타남
    - 최근에 올린 게시글 10개 나타남


2. 회원가입
    - 필수항목 및 정규화
    - 비밀번호 단방향 암호화
    - 이름, 연락처 양방향 암호화


3. 로그인

4. 마이페이지
    - 본인이 등록한 최신글 10개 나타남

5. 게시판
    - 로그인 된 사용자만 글등록 가능
    - 파일 등록 시 용량 및 파일 형식 체크
    - 파일 AWS S3 업로드
    - 본인의 글만 수정/삭제 가능






