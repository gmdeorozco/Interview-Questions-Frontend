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

function TableOfQuestions( props ){

  const [ editingElement, setEditingElement ] = useState(-1);
  const [ delitingElement, setDelitingElement ] = useState(-1);

  const [newQuestion, setNewQuestion] = useState();
  const [newAnswer, setNewAnswer] = useState();
  const [newTopic, setNewTopic] = useState();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowComfirmDelete = ( id ) => {setShowConfirmDelete(true); setDelitingElement(id)}
  

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



  const updateQuestion = ( id, question, answer, topic ) =>{
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

    fetch(props.server+'/question/update'
      , requestOptions)
      .then(response => response.json())
      .then(data => { props.getDataOfQuestions(); props.getAvailableTopics() });

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

                    <td>  { editingElement===question.id && 
                    
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@answer</InputGroup.Text>
                      <Form.Control as="textarea"
                        placeholder="Answer"
                        aria-label="Answer"
                        aria-describedby="basic-addon1"
                        defaultValue={ question.answer }
                        onChange = { (e) => setNewAnswer( e.target.value )}
                      />
                    </InputGroup>
                    }

                    { editingElement!==question.id && <>{question.answer} </>}
                    
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
                      <Button variant="danger" onClick={ () => updateQuestion(question.id, question.question, question.answer, question.topic)} className="me-2">
                        <AiOutlineSave/>
                      </Button>

                      <Button variant="secondary"  className="me-2">
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

    </>
    );
}

export default TableOfQuestions;