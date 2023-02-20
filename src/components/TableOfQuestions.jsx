import { BsPencil, BsLightbulb } from 'react-icons/bs'
import { AiOutlineDelete, AiOutlineSave } from 'react-icons/ai'
import {MdOutlineCancelPresentation} from 'react-icons/md'

import React, { useState } from 'react';
import { Badge, Table, Button, Form, InputGroup, Modal, Alert } from 'react-bootstrap';
import { ShowAnswer }  from './'
import { deleteQuestion, updateQuestion } from '../logic';
import { CodeBlock, dracula, androidstudio, codepen } from 'react-code-blocks';
import { useEffect } from 'react';
import getMyElo from '../logic/getMyElo';

function TableOfQuestions( props ){

  console.log("entry page", props.page)

  const [ editingElement, setEditingElement ] = useState(-1);
  const [ delitingQuestion, setDelitingElement ] = useState(-1);
  const [newQuestion, setNewQuestion] = useState();
  const [newAnswer, setNewAnswer] = useState();
  const [newTopic, setNewTopic] = useState();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowComfirmDelete = ( id ) => {setShowConfirmDelete(true); setDelitingElement(id)}
  const [ showShowAnswer, setShowShowAnswer ] = useState( false );
  const [ showQuestionData, setShowQuestionData ] = useState();
  const [ isLoadingShowQuestionsData, setLoadingShowQuestionsData ] = useState( true );
  const [ myElo,setMyElo ] = useState();
  const [ challengeMe, setChallengeMe] = useState( false );
  const [ challengeMeOffset, setChallengeMeOffset ] = useState( 100 );

  
  let newCodeSnippet;

  useEffect(() => {
    console.log("topic >>>>>>> " + props.topic )
    getMyElo( setMyElo, 1, props.topic )
  }
  )

    const getOneQuestionData = ( link ) => {
      if( link ){
       
        fetch( link.replace("http","https") ) // your url may look different
        .then(resp => resp.json())
        .then(data => { setShowQuestionData ( data );  setLoadingShowQuestionsData( false ); }) // set data to state
        //console.log("loaded data showQuestion")
      }
      
    }

    //console.log( "carga tabla" )
    if ( !props.topic ) {
      return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}>Please select a TOPIC </div>
    );
    }

    if ( props.isLoadingQuestionsData ) {
        return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>Loading the data </div>
      );
      }
      

      if ( props.dataOfQuestions.page.totalElements < 1 ) {
        return (
          <>
          

          <Alert variant="info" className='text-center'>
          No Records Found!
        </Alert></>
      );
      }

      

    return(   <>
   
   
   
    
   
   

      <div className='text-center mb-4'> 

      <Button variant="success" className='me-4'
      onClick={ () => { 
        let newValue = 0;
        props.setPage( newValue );
        //console.log( "page ", props.page )
      }}
      >First</Button>

      <Button variant="success" className='me-4'
      onClick={ () => { 
        let newValue = props.page-1;
        props.setPage( newValue > -1 ? newValue : props.page );
        //console.log( "page ", props.page )
      }}
      >Prev</Button>
      | Page { props.dataOfQuestions.page.number + 1 }  of  { props.dataOfQuestions.page.totalPages }    |
           
     <Button variant="success" className='ms-4'
        onClick={ () => { 
          let newValue = props.page+1;
          props.setPage( newValue < props.dataOfQuestions.page.totalPages 
              ? newValue : props.page  );
          //console.log( "page ", props.page )
        }}
          
     >Next</Button>

<Button variant="success" className='ms-4'
      onClick={ () => { 
        let newValue = props.dataOfQuestions.page.totalPages -1;
        props.setPage( newValue );
        //console.log( "page ", props.page )
      }}
      >Last</Button>

      <h4 className='mt-4'> From: { props.dataOfQuestions.page.size * (props.dataOfQuestions.page.number+1) - 9  }     to { Math.min( props.dataOfQuestions.page.size * (props.dataOfQuestions.page.number+1),props.dataOfQuestions.page.totalElements)   }  of  { props.dataOfQuestions.page.totalElements } 
      
      { props.selectedSource.id && <><div className='fs-3'> from { props.selectedSource.name } </div>
      <div className='fs-5'> at  <a href={ props.selectedSource.sourceLink } target="_blank" rel="noreferrer"> { props.selectedSource.sourceLink } </a> </div></>
      }
      </h4>
     
      </div>
      <h3> My Elo: { myElo } </h3>  
      
      Challenge Me? <Form.Check 
        type="switch"
        id="custom-switch"
        label= { challengeMe ? "YES": "No"}
        defaultChecked = {false}
        onClick = {() =>  setChallengeMe( value => !value)}
      />

      <InputGroup className="mb-3">
        <InputGroup.Text id="challengeMeOffset"> ChallengeMe Offset: </InputGroup.Text>
          <Form.Control
            placeholder="challengeMeOffset"
            aria-label="challengeMeOffset"
            aria-describedby="challengeMeOffset"
            onChange={ ( e ) => setChallengeMeOffset( e.target.value ) } 
            defaultValue = { challengeMeOffset }
            />
        </InputGroup>
      
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Topic</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                { props.dataOfQuestions._embedded.questionModelList.map(
                (question,index) => (
                <tr key={index}>
                    <td>   {  (challengeMe &&  question.elo >= myElo - challengeMeOffset) 
                      ? <><Badge bg="success">  <BsLightbulb  className='success'/>   </Badge>  CH  </>            
                     :""}  
                     
                     { (props.dataOfQuestions.page.size *  props.dataOfQuestions.page.number) + index + 1 } </td> 

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

                    { 
                      editingElement !== question.id && question.answer 
                        && <>
                        <div>Elo: { question.elo } Answers: { question.numberOfAnswers }</div>
                        <b>
                        {
                        
                        question.question 
                        } </b></>

                        
                        
                   
                    }
                    
                    { 
                      editingElement !== question.id && !question.answer
                        && <>{
                        question.question 
                        } <Badge bg="danger">
                        No Answer!!
                      </Badge>
                        </>
                   
                    }
                    { editingElement !== question.id && question.code_snippet &&
                        <CodeBlock 
                          text = { question.code_snippet }
                          language = { question.topic.toLowerCase() }
                          showLineNumbers = { true }
                          theme = { codepen }
                        /> }


                    
                    </td>

                    <td> 

          
                    <Button variant="secondary" onClick={ () => { 
                        setShowShowAnswer(true); 
                        getOneQuestionData( question._links.self.href )

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

                    { editingElement !== question.id && <>{ question.topic } </>}
                    
                    </td>
                    <td>
                      { question.source ? question.source.name : "" }
                    </td>

                  
                    <td> 
                    { editingElement === question.id && 
                      <>
                      <Button variant="danger" 
                      onClick={ () => {
                        
                        updateQuestion(
                          question.id, 
                          question.question, 
                          question.answer, 
                          question.topic,
                          question._links.update.href,
                          question._links.self.href, 
                          props.newSourceForQuestion,
                          newQuestion,
                          newAnswer,
                          newTopic,
                          props.setUpdatedQuestion,
                          getOneQuestionData,
                          question.code_snippet,
                          newCodeSnippet

                           );
                          
                        setNewQuestion("");
                        setNewAnswer("");
                        setNewTopic("");
                        setEditingElement(-1);
                        console.log("call it ", question.id)

                      } } className="me-2">
                        
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
                      <Button variant="secondary" 
                        onClick={
                           () => {
                            setEditingElement(question.id);
                            console.log( question.source );
                            props.setNewSourceForQuestion( question.source ? question.source.id : "");
                           }
                          } className="me-2">
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
        <Modal.Body>Are you sure you want to DELETE question id : { delitingQuestion }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Close
          </Button>
          <Button variant="danger" 
          onClick={()=>{
              
              deleteQuestion( props.server, delitingQuestion, props.getDataOfQuestions,handleCloseConfirmDelete, setDelitingElement, props.setDeletedQuestion );
              
          
            }
          }
          >
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
        sources = { props.sources } 
              setSources = { props.setSources }
              isLoadingSources = { props.isLoadingSources }
              
              topic = { props.topic }
              setTopic = { props.setTopic }

              setSelectedSource = { props.setSelectedSource }
              selectedSource = { props.selectedSource }

              setNewSourceForQuestion = { props.setNewSourceForQuestion }
              newSourceForQuestion = { props.newSourceForQuestion }

              setPage = { props.setPage }
              setUpdatedQuestion = { props.setUpdatedQuestion }
              getOneQuestionData = { getOneQuestionData }

              setSentEloSubmit = { props.setSentEloSubmit }
              
       
        
      />

    </>
    );
}

export default TableOfQuestions;