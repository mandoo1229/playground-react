import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from '../Base/Footer';
import Header from '../Base/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import '../../styles/Mypage.css';
import axios from '../Token/Interceptor';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.prototype = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyPage = () => {
  // const location = useLocation();
  // const member = location.state; // notice 가 mypage로 바뀜
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [mypage, setMypage] = useState([]);
  const [folowMyPage, setFollowMyPage] = useState([]);
  const [myPageFeedDtoList, setMyPageFeedDtoList] = useState([]);
  const [myPageCommentDtoList, setMyPageCommentDtoList] = useState([]);
  const [myPageQuestionDtoList, setMyPageQuestionDtoList] = useState([]);
  const createdDateProfile = new Date(mypage.createdDate);
  const createdDate = new Date(myPageFeedDtoList.createdDate);
  const formattedDate = createdDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const createdDateComment = createdDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const creactedDatePro = createdDateProfile.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  //refreshTokne을 다시 받습니다.
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/mypage',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        setMypage(response.data.memberDto);
        setFollowMyPage(response.data.followMyPageDto);
        setMyPageFeedDtoList.filter(response.data.myPageFeedDtoList);
        setMyPageQuestionDtoList(response.data.myPageQuestionDtoList[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const myPageModifyHandler = () => {
  //   navigate('/mypage/modify', { state: member });
  // };

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
            <tbody>
              {mypage && folowMyPage && (
                <tr id="firstrow">
                  <td>
                    <div>
                      <p>이름 : {mypage.name} </p>
                      <p>이메일 : {mypage.email} </p>
                      <p>교육과정 : {mypage.curriculum} </p>
                      <p>가입날짜 : {creactedDatePro} </p>
                      <p navigate="/mypage/following">팔로잉 : {folowMyPage.followingCount}</p>
                      <p>팔로워 : {folowMyPage.followerCount}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '500px' }}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="프로필" {...a11yProps(0)} />
            <Tab label="내가 쓴 글" {...a11yProps(1)} />
            <Tab label="내가 쓴 댓글" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div>
              <Button>
                {' '}
                <Link to="/Mypage/MySkill">스킬 추가</Link>
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              {myPageFeedDtoList && (
                <div>
                  <table>
                    <tbody>
                      <td>
                        <tr>
                          <th>닉네임 : </th>
                          <td>{myPageFeedDtoList.userId}</td>
                          <th>내용 : {myPageFeedDtoList.content} </th>
                          <th>작성일 : {formattedDate} </th>
                        </tr>
                      </td>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div>
              {myPageQuestionDtoList && (
                <div>
                  <table>
                    <tbody>
                      <td>
                        <tr>
                          <th>닉네임: {myPageQuestionDtoList.userId}</th>
                          <th>내용 : {myPageQuestionDtoList.content}</th>
                          <th>작성일 : {createdDateComment} </th>
                        </tr>
                      </td>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabPanel>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default MyPage;
