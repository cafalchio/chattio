import Chat from "./chat.jsx";
import { useState } from "react";
import Login from "./login.jsx";


function App() {
  const [userName, setUserName] = useState("");
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);


  return (
    <main className="container mx-auto bg-slate-200">
      {logged ? 
       <Chat user={userName} users={users} /> 
       : <Login setUserName={setUserName} setLogged={setLogged} logged={logged} setUsers={setUsers} /> 
     }
    </main>
  );
}

export default App;
