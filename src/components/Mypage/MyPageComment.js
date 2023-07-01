import React from 'react';
import Footer from '../Base/Footer';
import Header from '../Base/Header';
import axios from 'axios';
import Button from '@mui/material/Button';
import '../../styles/Mypage.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Mypagecomment = () => {
  const location = useLocation();
  const member = location.state; // notice 가 mypage로 바뀜
  const navigate = useNavigate();
  const getId = 1;
  const [questionViewData, setQuestionViewData] = useState(null);

  useEffect(() => {
    console.log(`/api/qna/question/view/${getId}`);

    axios({
      method: 'GET',
      url: `/api/qna/question/view/${getId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        setQuestionViewData(res.data.question);
        console.log(questionViewData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const myPageModifyHandler = () => {
    navigate('/mypage/modify', { state: member });
  };

  return (
    <div>
      <Header />
      <div className="title">마이 페이지</div>
      <div className="container" id="profile">
        <div className="profile_image">
          <Avatar src="/broken-image.jpg" id="image" />
        </div>
        <div className="table profile_info">
          <table>
            <tr id="firstrow">
              <td> </td>
              <td id="modify_button">
                <button type="submit" className="btn btn-primary" onClick={() => myPageModifyHandler()}>
                  수정
                </button>
              </td>
            </tr>
            <tr>
              <td>이름 : 유수빈 (유수빈)</td>
            </tr>
            <tr>
              <td>이메일 : aaaaaa@aaa.aaa</td>{' '}
            </tr>
            <tr>
              <td>교육과정 : 빅데이터 </td>
            </tr>
            <tr>
              <td> 가입날짜: 2023.05.17 </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="container" id="preview">
        <div>
          <Link to="/Mypage">
            <Button>내 프로필</Button>
          </Link>
          <Link to="/Mypage/MyPageFeed">
            <Button>내가 쓴 게시글</Button>
          </Link>
          <Link to="/Mypage/MyPageComment/1">
            <Button>내가 쓴 댓글</Button>
          </Link>
        </div>
        <div>
          {questionViewData ? ( // questionViewData가 비어있지 않은 경우에만 렌더링
            <div>
              {/* <h1>{questionViewData.title}</h1> */}
              {/* <h3>{questionViewData.memberId}</h3> */}
              <h3>{questionViewData.content}</h3>
            </div>
          ) : (
            <div>Loading...</div> // 데이터 로딩 중에는 로딩 표시
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mypagecomment;
