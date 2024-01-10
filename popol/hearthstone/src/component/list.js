import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";

function List() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [login, setLogin] = useState("");
  console.log("login: ", login);

  let filterlist = list; // const 대신에 let 사용

  if (search === "") {
    filterlist = list;
  } else if (search !== "") {
    // 검색어가 타이틀에 포함되어 있는 경우 필터링 (대소문자 무시, 특수문자도 검색)
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegExp = new RegExp(escapedSearch, "i");
    filterlist = list.filter((a) => searchRegExp.test(a.title));
  }

  const del = (id) => {
    axios.post(`http://localhost:3001/delete/${id}`).then((result) => {
      console.log("aaa");
      setList(result.data);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/list1").then((result) => {
      console.log(result.data);
      setList(result.data);
    });
    axios.get("http://localhost:3001/login/logincheck").then((result) => {
      if (result.data !== "") {
        setLogin(result.data);
      } else {
        setLogin("");
      }
    });
  }, []); // 빈 의존성 배열을 사용하여 한 번만 실행되도록 설정

  return (
    <div className="grey-bg">
      <input
        placeholder="검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div className="white-bg">
        {filterlist.map((item, index) => (
          <div className="list-box" key={index}>
            <Link to={`/detail/${item._id}`}>
              <h4>
                {item.title} 글쓴이:({item.username})
              </h4>
            </Link>
            <p>{item.content}</p>
            {item.userid === login._id ? (
              <>
                <Link to={`/edit/${item._id}`}>✏️수정</Link>
                <span class="delete" onClick={() => del(item._id)}>
                  🗑️삭제
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
