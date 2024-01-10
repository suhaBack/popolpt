import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  let { id } = useParams();
  let [post, setPost] = useState("");
  let [login, setLogin] = useState("");
  let [comment, setComment] = useState("");
  let [allcomment, setAllcomment] = useState([]);
  console.log(allcomment);

  useEffect(() => {
    axios.get(`http://localhost:3001/Sdetail/${id}`).then((result) => {
      setPost(result.data);
    });
    axios.get(`http://localhost:3001/Scomment/${id}`).then((result) => {
      setAllcomment(result.data);
    });
    axios.get("http://localhost:3001/login/logincheck").then((result) => {
      if (result.data !== "") {
        setLogin(result.data);
      } else {
        setLogin("");
      }
    });
  }, []);

  let handelcomment = async (e) => {

    axios.post("http://localhost:3001/Scomment", {
      comment: comment,
      username: login.username,
      postId: id,
    });

    const response = await axios.get(`http://localhost:3001/Scomment/${id}`);
    setAllcomment(response.data);

    // 댓글 입력 필드 초기화
    setComment("");
  };

  return (
    <div class="detail-bg">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <img src={post.image}></img>
      <div>
        <form onSubmit={handelcomment}>
          {login && (
            <>
              <input
                placeholder="댓글 작성"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></input>
              <button type="submit">작성</button>
            </>
          )}
        </form>

        <div>댓글({allcomment.length})</div>
        {allcomment.map((a, i) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 5fr",
              columnGap: "1vw",
              border: "1px solid black",
            }}
          >
            {a.username === post.username ? (
              <div style={{ color: "blue" }}>{allcomment[i].username}</div>
            ) : (
              <div>{allcomment[i].username}</div>
            )}

            <div>{allcomment[i].comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;
