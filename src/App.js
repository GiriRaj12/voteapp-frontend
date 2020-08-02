import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import VoterComponent from './components/VoterComponent/VoterComponent.js';
import { VoterContext } from './contextComponent/VoteContext';
import { get } from './/services/HttpService.js'
import AdminPage from './components/AdminPage/AdminPage.js'

function App() {
  const [message, setMessage] = useState(' ');
  const [data, setData] = useContext(VoterContext);
  console.log(data);


  let fetch = () => {
    //setMessage('Lodaing ... ');
    // get(null, "/candidate/get")
    //   .then(res => {
    //     let obj = {};
    //     res.datas.map(e => obj[e.id] = e);
    //     console.log(JSON.stringify(obj));
    //     setData(obj);
    //     setMessage(' ');
    //   })
    let a = { "2f703f3d-b45c-4397-88c9-3f855d7e5c6a": { "id": "2f703f3d-b45c-4397-88c9-3f855d7e5c6a", "name": "Salman", "noOfChallengesSolved": 35, "cadidateExpertiseLevel": 3, "expert": { "ds": 4, "algorithms": 5, "c": 0, "java": 5, "python": 4, "hacking": 0 }, "votes": 2 }, "50573cfe-6098-43d4-88c7-7a8213d87e2d": { "id": "50573cfe-6098-43d4-88c7-7a8213d87e2d", "name": "Anush", "noOfChallengesSolved": 35, "cadidateExpertiseLevel": 4, "expert": { "ds": 4, "algorithms": 5, "c": 0, "java": 5, "python": 4, "hacking": 0 }, "votes": 0 }, "85990562-778f-489b-828b-d41a5acc2d87": { "id": "85990562-778f-489b-828b-d41a5acc2d87", "name": "Addam", "noOfChallengesSolved": 23, "cadidateExpertiseLevel": 3, "expert": { "ds": 4, "algorithms": 5, "c": 0, "java": 5, "python": 4, "hacking": 0 }, "votes": 2 }, "995e75db-7c44-4d63-9b7e-b6ffd8d425bd": { "id": "995e75db-7c44-4d63-9b7e-b6ffd8d425bd", "name": "Raj", "noOfChallengesSolved": 45, "cadidateExpertiseLevel": 5, "expert": { "ds": 4, "algorithms": 5, "c": 0, "java": 5, "python": 4, "hacking": 0 }, "votes": 0 }, "a1e5ae2b-5eca-42b0-b9c8-dd6a3fad8098": { "id": "a1e5ae2b-5eca-42b0-b9c8-dd6a3fad8098", "name": "Venkat", "noOfChallengesSolved": 25, "cadidateExpertiseLevel": 3, "expert": { "ds": 4, "algorithms": 5, "c": 0, "java": 5, "python": 4, "hacking": 0 }, "votes": 0 }, "de4ff43f-8b7d-451e-96d2-c52d3898a7ab": { "id": "de4ff43f-8b7d-451e-96d2-c52d3898a7ab", "name": "Giri", "noOfChallengesSolved": 25, "cadidateExpertiseLevel": 3, "expert": { "ds": 4, "algorithms": 5, "c": 0, "java": 5, "python": 4, "hacking": 0 }, "votes": 0 } };
    setData(a);
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <Router>
      <div className="App">
        <header className="app-headder">
          <p>Best Hacker Challenge</p>
        </header>
        <p style={{ textAlign: 'center' }}>{message}</p>
        {/* <div className='admin-login'><Link to="/admin">Admin Login</Link><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></div> */}
        <div className="voter-container">
          <Route path='/' exact>
            <VoterComponent getData={() => fetch()}></VoterComponent>
          </Route>
          <Route path="/edit/:id">
            <AdminPage objdata={data} getData={() => fetch()} ></AdminPage>
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
