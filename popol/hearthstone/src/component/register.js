import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (pw === pw2) {
      axios.post('http://localhost:3001/register', { id: id, pw: pw })
        .then((result) => {
          // 서버에서의 응답 처리
          console.log("성공", result.data);
          navigate("/");
        })
        .catch((error) => {
          // 에러 처리
          if (error.response.status === 400) {
            // 아이디 중복일 경우 알림창 표시
            alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.");
          } else {
            console.error(error);
          }
        });
    } else {
      alert("비번 다시 확인해주세요");
    }
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleSubmit}>
        <h4>회원가입</h4>
        <input
          name="username"
          onChange={(e) => {
            setId(e.target.value);
          }}
          value={id}
          placeholder="아이디"
        />
        <input
          name="password"
          type="password"
          onChange={(e) => {
            setPw(e.target.value);
          }}
          value={pw}
          placeholder="비번"
        />
        <input
          name="password2"
          type="password"
          onChange={(e) => {
            setPw2(e.target.value);
          }}
          value={pw2}
          placeholder="비번확인"
        />
        <button type="submit">가입</button>
      </form>
    </div>
  );
}

export default Register;
