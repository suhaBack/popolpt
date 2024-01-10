import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [image, setImage] = useState("");

  function titlechange(e) {
    setTitle(e.target.value);
  }

  function contentchange(e) {
    setContent(e.target.value);
  }

  function imageChange(e) {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/edit/${id}`).then((result) => {
      console.log(result.data);
      setTitle(result.data.title);
      setContent(result.data.content);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("img", image);

    axios
      .post(`http://localhost:3001/edit/${id}`, formData)
      .then((result) => {
        // 서버에서의 응답 처리
        console.log(result.data);
        navigate("/list");
      })
      .catch((error) => {
        // 에러 처리
        console.error(error);
      });
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleSubmit}>
        <h4>게시글 수정하기</h4>
        <input
          name="title"
          placeholder="제목칸"
          value={title}
          onChange={titlechange}
        />
        <input
          name="content"
          placeholder="내용칸"
          value={content}
          onChange={contentchange}
        />
        <input name="img" type="file" accept="image/*" onChange={imageChange} />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default Edit;
