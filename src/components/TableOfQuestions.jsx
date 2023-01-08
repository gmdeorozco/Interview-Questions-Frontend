import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineSave } from 'react-icons/ai'
import {MdOutlineCancelPresentation} from 'react-icons/md'
import Modal from 'react-bootstrap/Modal';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ShowAnswer from './ShowAnswer'

function TableOfQuestions( props ){

  console.log("entry page", props.page)

  const [ editingElement, setEditingElement ] = useState(-1);
  const [ delitingElement, setDelitingElement ] = useState(-1);

  const [newQuestion, setNewQuestion] = useState();
  const [newAnswer, setNewAnswer] = useState();
  const [newTopic, setNewTopic] = useState();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowComfirmDelete = ( id ) => {setShowConfirmDelete(true); setDelitingElement(id)}
  const [ showAnswer, setShowAnswer ] = useState("");
  const [ showQuestion, setShowQuestion ] = useState("");
  const [ showShowAnswer, setShowShowAnswer ] = useState( false );
  const [ showQuestionId, setShowQuestionId ] = useState();
  const [ showQuestionTopic, setShowQuestionTopic ] = useState();
  
  const [ showQuestionLink, setShowQuestionLink ] = useState();
  const [ showQuestionData, setShowQuestionData ] = useState();
  const [ isLoadingShowQuestionsData, setLoadingShowQuestionsData ] = useState(true);

  const deleteElement=()=>{
    const requestOptions = {
      method: 'DELETE'
    }
     
    fetch( props.server + "/question/"+delitingElement+"/delete"
      , requestOptions)
      .then(response => response.json())
      .then(data => props.getDataOfQuestions() );

      handleCloseConfirmDelete();
      setDelitingElement(-1);

    };

    const getShowQuestionData = ( link ) => {
      if( link ){
       
        fetch( link.replace("http","https") ) // your url may look different
        .then(resp => resp.json())
        .then(data => { setShowQuestionData ( data );  setLoadingShowQuestionsData( false ); }) // set data to state
        console.log("loaded data showQuestion")
      }
      
    }


  const updateQuestion = ( id, question, answer, topic,updateLink, selfLink ) =>{
    setEditingElement(-1);
    let questionEntity = {
      id: id,
      question : newQuestion ? newQuestion : question,
      answer : newAnswer ? newAnswer : answer,
      topic : newTopic ? newTopic : topic
    };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( questionEntity )
    };

    fetch( updateLink.replace("http", "https")
      , requestOptions)
      .then(response => response.json())
      .then(data => { 
          props.getDataOfQuestions(); 
          props.getAvailableTopics();
          getShowQuestionData( selfLink);
           });

      setNewQuestion("");
      setNewAnswer("");
      setNewTopic("");
  }


    console.log( "carga tabla" )
    

    if ( props.isLoadingQuestionsData ) {
        return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>Loading the data {console.log("loading state")}</div>
      );
      }
      

      if ( props.dataOfQuestions.page.totalElements === 0) {
        return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>No records found {console.log("no records found")}</div>
      );
      }

    return( <>
      <div className='text-center mb-4'> 

      <Button variant="success" className='me-4'
      onClick={ () => { 
        let newValue = 0;
        props.setPage( newValue );
        console.log( "page ", props.page )
      }}
      >First</Button>

      <Button variant="success" className='me-4'
      onClick={ () => { 
        let newValue = props.page-1;
        props.setPage( newValue > -1 ? newValue : props.page );
        console.log( "page ", props.page )
      }}
      >Prev</Button>
      Page { props.dataOfQuestions.page.number + 1 } ---   
       Total: { props.dataOfQuestions.page.size  }    of { props.dataOfQuestions.page.totalElements } Interview Questions 
     
     <Button variant="success" className='ms-4'
        onClick={ () => { 
          let newValue = props.page+1;
          props.setPage( newValue < props.dataOfQuestions.page.totalPages 
              ? newValue : props.page  );
          console.log( "page ", props.page )
        }}
          
     >Next</Button>

<Button variant="success" className='ms-4'
      onClick={ () => { 
        let newValue = props.dataOfQuestions.page.totalPages -1;
        props.setPage( newValue );
        console.log( "page ", props.page )
      }}
      >Last</Button>
     
      </div>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Topic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             { props.dataOfQuestions._embedded.questionModelList.map(
                (question,index) => (
                <tr key={index}>
                    <td> {question.id} </td> 

                    <td>  { editingElement===question.id && 
                    
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@question</InputGroup.Text>
                      <Form.Control
                        placeholder="Question"
                        aria-label="Question"
                        aria-describedby="basic-addon1"
                        defaultValue={ question.question }
                        onChange = { (e) => setNewQuestion( e.target.value )}
                      />
                    </InputGroup>
                    }

                    { editingElement!==question.id && <>{question.question} </>}
                    
                    </td>

                    <td> 

          
                    <Button variant="secondary" onClick={ () => { 
                        setShowShowAnswer(true); 
                        getShowQuestionData( question._links.self.href )

                        }} className="me-2">
                        


                      Show
                    </Button>
                    </td>

                    <td>  { editingElement===question.id && 
                    
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@topic</InputGroup.Text>
                      <Form.Control
                        placeholder="Topic"
                        aria-label="Topic"
                        aria-describedby="basic-addon1"
                        defaultValue={ question.topic }
                        onChange = { (e) => setNewTopic( e.target.value )}
                      />
                    </InputGroup>
                    }

                    { editingElement!==question.id && <>{question.topic} </>}
                    
                    </td>

                  
                    <td> 
                    { editingElement===question.id && 
                      <>
                      <Button variant="danger" onClick={ () => updateQuestion(question.id, question.question, question.answer, question.topic,question._links.update.href,question._links.self.href )} className="me-2">
                        <AiOutlineSave/>
                      </Button>

                      <Button variant="secondary"  className="me-2"
                        onClick={ () => setEditingElement(-1)}
                      >
                        <MdOutlineCancelPresentation />
                      </Button>
                      </> }

                    { editingElement!==question.id && 
                      <>
                      <Button variant="secondary" onClick={ () => setEditingElement(question.id)} className="me-2">
                        <BsPencil/>
                      </Button>

                      <Button variant="secondary"  className="me-2" onClick={ () => handleShowComfirmDelete( question.id )}>
                        <AiOutlineDelete />
                      </Button>
                      </> }

                      
                    </td>
                
                </tr>
                ))}
            
              
            </tbody>
          </Table>

          

      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to DELETE question id : { delitingElement }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>deleteElement()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowAnswer 
        show = { showShowAnswer }
        setShow = { setShowShowAnswer }
        updateQuestion = { updateQuestion }
        showQuestionData = { showQuestionData }
        isLoadingShowQuestionsData = { isLoadingShowQuestionsData }
       
        
      />

    </>
    );
}

export default TableOfQuestions;