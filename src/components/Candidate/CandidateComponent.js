import React, { useState } from 'react';
import '../Candidate/Candidate.css';
import { post } from '../../services/HttpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAward, faCode, faUser } from '@fortawesome/free-solid-svg-icons';

function Candidate(props) {
    const [message, setMessage] = useState('');
    const data = props.data;
    const viewOption = props.viewOption;
    console.log(data);

    let closeView = () => {
        setMessage(' ');
        props.close();
    }

    let vote = () => {
        console.log(data.id);
        let payload = {
            id: data.id,
            name: data.name
        }

        post(payload, "/vote")
            .then(res => {
                console.log(res);
                if (res.response) {
                    setMessage('Thanks for voting !');
                    props.fetch();
                } else {
                    setMessage(res.message);
                }
            })

    }

    let textStyling = { textAlign: 'center', color: 'red' };

    return <div className='candidate-select-view'>
        {getSelectedCandidateView(data, closeView, vote)}
        <p style={textStyling}>{message}</p>
    </div>
}

function getSelectedCandidateView(e, closeView, vote) {
    if (e) {
        return (
            <div className='selected-candidate'>
                <p><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> {e.name}</p>
                <p><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Expert Score : {e.cadidateExpertiseLevel}</p>
                <p><FontAwesomeIcon icon={faAward}></FontAwesomeIcon> Challenges : {e.noOfChallengesSolved}</p>
                <div className='candidate-expertise'>
                    <p><FontAwesomeIcon icon={faCode}></FontAwesomeIcon>  Skills </p>
                    <p>Algorithms - {' ' + e.expert.algorithms}</p>
                    <p>C - {e.expert.c}</p>
                    <p>Data Structures - {e.expert.ds}</p>
                    <p>Hacking Skill - {e.expert.hacking}</p>
                    <p>Java - {e.expert.java}</p>
                    <p>Python - {e.expert.python}</p>
                </div>
                <button className='voter-buttons blue' onClick={() => vote()}>Vote</button>
                <button className='voter-buttons red' onClick={() => closeView()}>Close</button>
            </div>
        )
    }
}

export default Candidate;