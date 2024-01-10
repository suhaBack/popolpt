import logo from './logo.svg';
import './App.css';
import Main from './component/main';
import Login from './component/login';
import { Route, Routes } from 'react-router-dom';
import Header from './component/header';
import List from './component/list';
import Write from './component/write';
import Detail from './component/detail';
import Edit from './component/edit';
import Register from './component/register';
import Card from './component/card';
import Cardupload from './component/cardupload/cardupload';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={ <Main/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/list" element={ <List/> } />
        <Route path="/write" element={ <Write/> } />
        <Route path="/detail/:id" element={ <Detail/> } />
        <Route path="/edit/:id" element={ <Edit/> } />
        <Route path="/card/:search" element={ <Card/> } />
        <Route path="/cardupload" element={ <Cardupload/> } />
      </Routes>
    </div>
  );
}

export default App;