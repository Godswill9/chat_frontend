import React from 'react';
import SendMessage from './pages/sendMessage';
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import AuthPage from './pages/authPage';
import ChatRoom from './pages/chatRoom';
import LoginPage from './pages/loginPage';

function App() {
  const {id}=useParams()
  return (
    <div className="App">
        <BrowserRouter>
         <Routes>
           <Route path={'/'} element={<AuthPage/>}></Route>
           <Route path={'/login'} element={<LoginPage/>}></Route>
           <Route path={`/sendMessage:${id}`} element={<SendMessage/>}></Route>
           <Route path={`/chatRoom:${id}`} element={<ChatRoom/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
