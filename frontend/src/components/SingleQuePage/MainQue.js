import React , { useState } from 'react';
import {Link} from 'react-router-dom';
import {Bookmark} from '@mui/icons-material';
import {History} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import axios from 'axios';

function MainQue(props){
  const [show,setShow] = useState(false);
  // console.log(props.qid)
  // console.log(props.question)
  // async function sendAnswer(data){
  //   let response = await axios.post("http://localhost:8000/newAnswer",data)
  // }

  async function postAnswer(){
    let details={}
    details["question"] = props.question._id
    details["user"] = window.localStorage.getItem("username")
    details["answer"] = document.querySelector(".quill .ql-container .ql-editor").innerHTML
    console.log(details)
    let {data} = await axios.post("http://localhost:8000/newAnswer",details)
    data = await data.data
    console.log(data)
    window.alert("answer is posted.")

  }
  // console.log(props.question.title)
  return(
    <div className="main">
          <div className="main-container">
            <div className="main-top">
              <h2 className="main-question">{props.question.title}</h2>
              <Link to="/add-question">
                <button>Ask Question</button>
              </Link>
              {/* <a href="/add-question">
                <button>Ask Question</button>
              </a> */}
            </div>
            <div className="main-desc">
              <div className="info">
                <p>
                  Asked
                  <span>{props.question.created_at}</span>
                </p>
                <p>
                  Active<span>today</span>
                </p>
                <p>
                  Viewed<span>43times</span>
                </p>
              </div>
            </div>
            <div className="all-questions" style={{
              borderBottom: "1px solid #eee",

            }}>
              <div className="all-questions-container">
                <div className="all-questions-left">
                  <div className="all-options">
                  <div className="all-option">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>

                    <Bookmark style={{color: "rgba(0, 0, 0, 0.25)",
                    fontSize: "large",
                    margin: "5px 0", }} />

                    <History style={{color: "rgba(0, 0, 0, 0.25)",
                    fontSize: "large",
                    margin: "5px 0", }}/>
                  </div>
                  </div>
                </div>
                <div className="question-answer">
                  <p dangerouslySetInnerHTML={{__html:props.question.body}}></p>
                  <div className="user">
                    <small>
                      asked "{props.question.created_at}"
                    </small>
                    <div className="user-details">
                      <Avatar />
                      <p>{props.question.user}
                      </p>
                    </div>
                  </div>
                  <div className="comments">
                    <div className="comment">
                          <p>Here is a comment -
                            <span>
                              User name
                            </span>
                            <small>
                              Timestamp
                            </small>
                          </p>
                    </div>
                    <p onClick={() => setShow(!show)}>Add a comment</p>
                    {show && (
                      <div className="title">
                        <textarea
                          style={{
                            margin: "5px 0px",
                            padding: "10px",
                            border: "1px solid rgba(0, 0, 0, 0.2)",
                            borderRadius: "3px",
                            outline: "none",
                            width : "100%",
                          }}
                          type="text"
                          placeholder="Add your comment..."
                          rows={5}
                        ></textarea>
                        <button style={{maxWidth: "fit-content",}}>
                          Add comment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display:"flex",
                flexDirection: "column",
                marginTop : "30px",
                borderBottom: "1px solid #eee"
              }}
              className="all-questions">
              <p
                style={{
                  marginBottom : "20px",
                  fontSize :"1.3rem",
                  fontWeight : "300",
                  color: "rgba(0, 0, 0, 0.4)",
                }}

              >
                No of Answers
              </p>

                  
            </div>
            {/* <div className="questions">
              <div className="question">
                <AllQuestions />
                <AllQuestions />
                <AllQuestions />
                <AllQuestions />
              </div>
            </div> */}
          </div>
          <div className="main-answer">
            <h3
              style={{
                fontSize: "20px",
                marginTop: "30px",
                fontWeight: "400",
              }}
            >
              Your Answer
            </h3>
            <ReactQuill
              className="react-quill"
              theme="snow"
              style={{
                height: "200px",
              }}
            />
          </div>
          <button
            onClick={()=>postAnswer()}
            style={{
              marginTop: "50px",
              maxWidth: "fit-content",
            }}
          >
            Post your answer
          </button>
        </div>
  );
}
export default MainQue;
