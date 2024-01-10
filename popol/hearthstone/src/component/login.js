import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/login', formData)
      .then((result) => {
        // 서버에서의 응답 처리
        console.log("성공", result.data);
        window.location.href = '/';
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
      });
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleSubmit}>
        <h4>로그인</h4>
        <input name="username" onChange={handleChange} value={formData.username} />
        <input name="password" type="password" onChange={handleChange} value={formData.password} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default Login;