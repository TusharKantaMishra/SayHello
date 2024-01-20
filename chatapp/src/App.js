//import socketIO from "socket.io-client";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import chat from './component/Chat/chat';
import join from './component/Join/join';

//const ENDPOINT = "http://localhost:4500";
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {

  // socket.on("connect", () => {
  //   console.log("Connected to server");
  // })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={join} />
          <Route path="/chat" Component={chat}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
