
import { Routes , Route } from 'react-router-dom';
import './App.css';
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import NewAccount from './component/NewAccount';
import Account from './component/Account';
import NewBank from './component/NewBank';


function App() {
  return (
      <Routes >
        <Route  exact path="/" element = {<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/signup" element = {<Signup />} /> 
        <Route path = "/newAccount"  element = {<NewAccount />} />
        <Route path = "/newBank" element = {<NewBank />} />
        <Route path = "/account/:bankName" element={<Account />} />
      </Routes>
  );
}

export default App;
