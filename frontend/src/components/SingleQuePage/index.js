import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../MainFrame/sidebar';
import "./index.css";
import MainQue from './MainQue';

function Index(){
  const {id} = useParams()
  const [question,setQuestion]= useState({})

  // console.log(id)
  useEffect(()=>{
    // console.log("fetching")
    fetchQuestion()
  },[])

  const fetchQuestion = async () =>{
    const {data} = await axios.get(`http://localhost:8000/question/${id}`)
    // console.log(data)
    setQuestion(data[0])
    // console.log(question)
  }

  return(
    <div className="main-index">
       <div className="main-index-content">
       <Sidebar />
       <MainQue qid={id} question={question}/>
    </div>
    </div>
  );
}
export default Index;