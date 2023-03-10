import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlineSave } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import {MdOutlineCancelPresentation} from 'react-icons/md'
import { BsPencil } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import addLineSeparators from '../logic/addLineSeparators';
import SelectSources from './SelectSources';
import { Row, Table } from 'react-bootstrap';
import { RiEmotionHappyLine, RiEmotionUnhappyLine  } from 'react-icons/ri'
import { CiFaceMeh } from 'react-icons/ci'
import { CodeBlock, dracula, androidstudio, codepen } from 'react-code-blocks';
import sendAnswerReport from '../logic/sendAnswerReport';

function ShowAnswer ( props ) {

   console.log("print show answer")

    const [ editingElement, setEditingElement ] = useState();
    const [ newAnswer, setNewAnswer] = useState();
    const [ newCodeSnippet, setNewCodeSnippet ] = useState();
    const [ reported, setReported ] = useState( false );
   


  if ( props.isLoadingShowQuestionsData ) {
      return (
        <>
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={ props.show }  
        onHide={ () => { props.setShow( false ); setReported(false); setEditingElement(-1); }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>Loading the Interview Question to show {console.log("loading state")}</div>
      </Modal.Body>
      </Modal>

      </>
    );
    }
  else
  if ( editingElement === props.showQuestionData.id  ){

    
   
    return(
        <><Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={ props.show }  
        onHide={ () => props.setShow( false )}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          { props.showQuestionData.question } 
              
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
                <InputGroup.Text id="code_snippet">@Code Snippet</InputGroup.Text>
                <Form.Control as="textarea"
                    placeholder="Code Snippet"
                    aria-label="Code Snippet"
                    aria-describedby="code_snippet"
                    rows={ 15 }
                    defaultValue={ props.showQuestionData.code_snippet }
                    onChange = { (e) => setNewCodeSnippet( e.target.value )}
                />
                </InputGroup>

        <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@answer</InputGroup.Text>
                <Form.Control as="textarea"
                    placeholder="Answer"
                    aria-label="Answer"
                    aria-describedby="basic-addon1"
                    rows={ 15 }
                    defaultValue={ props.showQuestionData.answer }
                    onChange = { (e) => setNewAnswer( e.target.value )}
                />
                </InputGroup>
                

                { newAnswer && <p> { newAnswer.length } of 9000 Characters </p> }

                <SelectSources
              sources = { props.sources } 
              setSources = { props.setSources }
              isLoadingSources = { props.isLoadingSources }
              topic = { props.topic }
              setSelectedSource = { props.setSelectedSource }
              selectedSource = { props.selectedSource }
              default = { props.showQuestionData.source ? props.showQuestionData.source.id :"" }
              newSourceForQuestion = { props.newSourceForQuestion }
              setNewSourceForQuestion = { props.setNewSourceForQuestion }
              onMain = { false }

              setPage = { props.setPage }
            />

                <Button variant="danger" onClick={ () => {
                        

                    props.updateQuestion(
                        editingElement, 
                        props.showQuestionData.question, 
                        props.showQuestionData.answer, 
                        props.showQuestionData.topic,
                        props.showQuestionData._links.update.href,
                        props.showQuestionData._links.self.href,
                        props.newSourceForQuestion,
                        props.showQuestionData.question,
                        addLineSeparators( newAnswer, 60 ),
                        props.topic,
                        props.setUpdatedQuestion,
                        props.getOneQuestionData,
                        props.showQuestionData.code_snippet,
                        newCodeSnippet
                        
                        )

                    
                        setNewAnswer("");
                        setEditingElement(-1);
                        
                    setEditingElement(-1);
                    props.setShow( false );
                    setNewCodeSnippet("");
                    //props.setShow( true );

                    }} className="me-2">
                <AiOutlineSave/>
            </Button>

            <Button variant="secondary"  className="me-2"
              onClick={ ()=>setEditingElement(-1) }
            >
                <MdOutlineCancelPresentation />
            </Button>

        </Modal.Body>
        <Modal.Footer>

          
          <Button onClick={() => {props.setShow( false );
            setEditingElement(-1);
          }}>Close</Button>
        </Modal.Footer>
      </Modal>


        



    
  </>
    );
  }
  else{

    return (
      <>
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={ props.show }  
        onHide={ () => props.setShow( false )}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <div>Elo: { props.showQuestionData.elo } Answers: { props.showQuestionData.numberOfAnswers }</div>
          { props.showQuestionData.question } 
          
                          <Button variant="secondary" onClick={ 
                              () => {
                                setNewAnswer( props.showQuestionData.answer );
                                props.setNewSourceForQuestion( 
                                  props.showQuestionData.source ?
                                  props.showQuestionData.source.id
                                  :""
                                  )
                                setEditingElement( props.showQuestionData.id );
                                //props.setPage ( 0 );
                                //props.setTopic( props.showQuestionData.topic );
                              }} className="me-2 ms-3">
                          <BsPencil/>
                        </Button>


          </Modal.Title>
          
        
        </Modal.Header>
        <Modal.Body>
        {  props.showQuestionData.code_snippet && <CodeBlock 
            text = { props.showQuestionData.code_snippet }
            language = { props.showQuestionData.topic }
            showLineNumbers = { true }
            theme = { codepen }
          />
          }
          <pre>{ props.showQuestionData.answer } </pre>

          {!reported && <div>
          <div>Evaluate your answer:</div>
            <Button variant='success'
              onClick={ () => {  props.setShow( false ); 
                sendAnswerReport(1,props.showQuestionData.id,1, props.setSentEloSubmit) } }
            >
              <RiEmotionHappyLine />
            </Button>
            <Button variant='warning'
             onClick={ () => {  props.setShow( false );
              sendAnswerReport(1,props.showQuestionData.id,0, props.setSentEloSubmit)  } }
            >
              <CiFaceMeh />
            </Button>
            <Button variant='danger'
              onClick={ () => {  props.setShow( false ); 
                sendAnswerReport(1,props.showQuestionData.id,2, props.setSentEloSubmit)  } }
            >
              <RiEmotionUnhappyLine />
            </Button>
            </div>}

        </Modal.Body>
        <Modal.Footer>

        {props.showQuestionData.source &&<> 
          <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Source Name:</th>
          <th>Link:</th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> { props.showQuestionData.source.name }</td>
          <td>
            <a href={props.showQuestionData.source.sourceLink } 
            target="_blank" rel="noreferrer" >
              { props.showQuestionData.source.sourceLink }
            </a> </td>
        
        </tr>
        
      </tbody>
    </Table>

          </>}

          <Button onClick={() => {
            setEditingElement(-1);
            props.setShow( false );
            setReported(false) ;
            }
            
            }>Close</Button> 
        </Modal.Footer>
      </Modal>
  
  
      </>
    );
  }

  
}

export default ShowAnswer;