import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CheckboxGroup from './CheckboxGroup';
import Checkbox from './Checkbox';
import axios from 'axios';
import '../../styles/checkbox.css';

function App() {
  const [skill, setSkill] = useState(['Java']);
  const navigate = useNavigate();

  const checkHandler = () => {
    const data = {
      myskill: skill,
    };

    axios
      .post('url', data)
      .then((response) => {
        console.log(response.data);
        alert('스킬 추가');
        navigate('/Mypage');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="grid">
      <article>
        <header>
          <h3>체크박스 그룹</h3>
        </header>
        <CheckboxGroup
          label="Skill"
          values={skill}
          onChange={setSkill}
          //   onChange={(e) => setSkill(e.target.values)}
        >
          <Checkbox value="Java" className="">
            Java
          </Checkbox>
          <Checkbox value="Python">Python</Checkbox>
          <Checkbox value="C">C</Checkbox>
          <Checkbox value="C#">C#</Checkbox>
          <Checkbox value="C++">C++</Checkbox>
          <Checkbox value="Javascript">Javascript</Checkbox>
          {/* <button class="btn-hover color-2">BUTTON</button> */}
          <div>[{skill.join(', ')}]</div>

          <Button href="/Mypage" onClick={() => checkHandler()}>
            스킬 추가
          </Button>
        </CheckboxGroup>
      </article>
    </div>
  );
}

export default App;
