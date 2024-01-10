import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Main() {

  axios.get('http://localhost:3001/main').then((result) => {
    console.log(result.data);
  })

  return (
    <div>
      메인페이지입니당~~~
    </div>
  );
}

export default Main;