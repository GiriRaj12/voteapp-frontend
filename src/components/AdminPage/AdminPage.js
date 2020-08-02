import React, { useContext, useState, useEffect } from 'react';
import { VoterContext } from '../../contextComponent/VoteContext';
import { useParams, useHistory } from 'react-router-dom';
import '../AdminPage/AdminPage.css';
import { put, del } from '../../services/HttpService';

function AdminPage(props) {
    const [data, setData] = useContext(VoterContext);
    const [editCandidate, setEditCandidate] = useState();
    const [message, setMessage] = useState('');
    const [adminCode, setAdminCode] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!data) {
            history.push("/");
        } else {
            setEditCandidate(data[id]);
        }
    }, [])

    let editHanlder = (value, toChange, isExpert) => {
        if (!isExpert) {
            let candidate = editCandidate;
            candidate[toChange] = Number(value);
            setEditCandidate(candidate);
            console.log(candidate);
        }
        else {
            let candidate = editCandidate;
            candidate.expert[toChange] = Number(value);
            setEditCandidate(candidate);
            console.log(candidate);
        }
    }

    let editCandidateDetails = () => {
        if (adminCode) {
            let obj = {
                ...editCandidate,
                secretCode: adminCode
            }
            console.log(obj);
            put(null, obj, "/candidate/edit")
                .then(res => {
                    if (!res.response) {
                        setMessage(res.message)
                    }
                    else {
                        alert("Details edited")
                        history.push("/");
                    }
                })
        }
        else {
            setMessage("Please enter the admin code");
        }
    }

    let deleteCandidate = () => {
        if (adminCode) {
            let params = {
                id: editCandidate.id,
                code: adminCode
            }

            del(params, "/candidate/delete")
                .then(res => {
                    if (!res.response) {
                        setMessage(res.message)
                    }
                    else {
                        alert("Candidate Deleted")
                        history.push("/");
                    }
                })
        }
        else {
            setMessage("Please enter the admin code");
        }

    }

    return <div className='admin-conatiner'>
        <div className='admin-candidate-list'>
            {getData(editCandidate) ? <div className="admin-edit-container">
                Name : {editCandidate.name}
                <br></br>
            ExpertLevel : <input type='number' contentEditable='true' placeholder={editCandidate.cadidateExpertiseLevel} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'cadidateExpertiseLevel', false)}></input>
            Challenges Solved : <input type='number' contentEditable='true' placeholder={editCandidate.noOfChallengesSolved} min={0} onChange={(e) => editHanlder(e.target.value, 'noOfChallengesSolved', false)} ></input>
                <p>Expertise : </p>
            Algorithms : <input type='number' contentEditable='true' placeholder={editCandidate.expert.algorithms} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'algorithms', true)}></input>
                <br></br>
            DS : <input type='number' contentEditable='true' placeholder={editCandidate.expert.c} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'c', true)}></input>
                <br></br>
            C : <input type='number' contentEditable='true' placeholder={editCandidate.expert.ds} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'ds', true)}></input>
                <br></br>
            Hacking : <input type='number' contentEditable='true' placeholder={editCandidate.expert.hacking} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'hacking', true)}></input>
                <br></br>
            Python : <input type='number' contentEditable='true' placeholder={editCandidate.expert.java} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'java', true)}></input>
                <br></br>
            Java : <input type='number' contentEditable='true' placeholder={editCandidate.expert.python} min={0} max={5} onChange={(e) => editHanlder(e.target.value, 'python', true)}></input>
                <br></br>
            Admin Code
            <input type='password' placeholder='Admin Secret code' contentEditable='true' onChange={e => { setMessage(''); setAdminCode(e.target.value) }}></input>
                <p style={{ color: 'red' }}>{message}</p>
                <button className='admin-button blue' onClick={() => editCandidateDetails()}>Edit</button>
                <button className='admin-button red' onClick={() => deleteCandidate()} >Delete</button>
            </div> : <div></div>}
        </div>
    </div>
}
function getData(editCandidate) {
    if (editCandidate) {
        return true;
    }
    else {
        return false;
    }
}

function changeHanlder(data, toChange, value, callback,) {
    data[toChange] = value;
    callback(data);
}
export default AdminPage;
