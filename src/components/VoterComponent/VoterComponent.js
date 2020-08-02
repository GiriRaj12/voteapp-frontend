import React, { useContext, useState } from 'react';
import { VoterContext } from '../../contextComponent/VoteContext';
import '../VoterComponent/VoterComponent.css';
import Candidate from '../../components/Candidate/CandidateComponent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function VoterComponent(props) {
    const [candidate, setCandidate] = useState();
    const [data] = useContext(VoterContext);
    const [edit, setEdit] = useState(false);

    let getData = (click, editHandler) => {
        if (data) {
            console.log(data);
            return getListView(data, click, editHandler);
        }
        else {
            return '';
        }
    }

    let editHandler = (e) => {
        setEdit(true);
        setCandidate(data[e.target.id]);
    }

    let clickHandler = (e) => {
        setCandidate(data[e.target.id]);
    }

    let closeView = () => {
        setCandidate(undefined);
    }

    return <div className='voter-container-holder'>
        {getData(clickHandler, editHandler)}
        <div className='voter-select-view'>
            <Candidate viewOption={edit} fetch={() => props.getData()} data={candidate} close={() => closeView()}></Candidate>
        </div>
    </div >
}

function getListView(data, click, editHanlder) {
    return <div className='voter-list-view'>
        <p style={{ textAlign: 'center' }}>Candidates</p>
        {Object.keys(data).map(e => getVoterView(data[e], click, editHanlder))}
    </div>
}

function getVoterView(e, click, editHanlder) {
    return <div className='voter-list-view_element' key={e.id}>
        <div className="voter-element-votes">
            <FontAwesomeIcon icon={faArrowAltCircleUp}></FontAwesomeIcon> Votes : {e.votes}
        </div>
        <div className='voter-avatar'>
            <p className='voter-avatar-name'>{e.name.slice(0, 1)}</p>
        </div>
        <p>Name : {e.name}</p>
        <button id={e.id} onClick={(e) => click(e)}>Vote</button>
        <Link to={getLink(e.id)}>Edit</Link>
    </div>
}

function getLink(id) {
    return "/edit/" + id;
}

export default VoterComponent;