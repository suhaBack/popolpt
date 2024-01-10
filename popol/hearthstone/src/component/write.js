import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Write() {
  let [user, setUser] = useState("");
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3001/login/logincheck").then((result) => {
      if (result.data === "") {
        navigate('/login')
      } else {
        setUser(result);
      }
    });
  }, []);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    // 파일 입력을 따로 처리합니다.
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);

    // 이미지 프리뷰 업데이트
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageClick = () => {
    // 이미지 클릭 시 파일 선택 인풋창 클릭
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData 객체를 생성합니다.
    const formDataWithImage = new FormData();
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("content", formData.content);
    formDataWithImage.append("img", imageFile);

    axios
      .post("http://localhost:3001/write", formDataWithImage)
      .then((result) => {
        // 서버에서의 응답 처리
        navigate("/list");
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
      });
  };

  const imageInputRef = React.createRef();

  return (
    <div>
      <form className="form-box" onSubmit={handleSubmit}>
        <h4>글쓰기</h4>
        <input
          name="title"
          placeholder="제목칸"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          name="content"
          placeholder="내용칸"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <input
          ref={imageInputRef}
          style={{ display: "none" }}
          name="img"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="이미지 미리보기"
              style={{ maxWidth: "100%", cursor: "pointer" }}
              onClick={handleImageClick}
            />
          </div>
        )}
        {!imagePreview && (
          <button type="button" onClick={handleImageClick}>
            이미지 선택
          </button>
        )}
          <button type="submit" style={{ marginLeft: "10px" }}>
            전송
          </button>
      </form>
    </div>
  );
}

export default Write;