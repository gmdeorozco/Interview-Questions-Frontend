import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineSave } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import {MdOutlineCancelPresentation} from 'react-icons/md'
import { BsPencil } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import addLineSeparators from '../logic/addLineSeparators';
import SelectSources from './SelectSources';
import { Table } from 'react-bootstrap';

function ShowAnswer ( props ) {

   console.log("print show answer")

    const [ editingElement, setEditingElement ] = useState();
    const [ newAnswer, setNewAnswer] = useState();
   


  if ( props.isLoadingShowQuestionsData ) {
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
          { props.showQuestionData.id }. { props.showQuestionData.question } 
                          <Button variant="secondary" onClick={ 
                              () => setEditingElement( props.showQuestionData.id )} className="me-2 ms-3">
                          <BsPencil/>
                        </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            />

                <Button variant="danger" onClick={ () => {
                    props.updateQuestion(
                        editingElement, 
                        props.showQuestionData.question, 
                        addLineSeparators( newAnswer, 60 ), 
                        props.showQuestionData.topic,
                        props.showQuestionData._links.update.href,
                        props.showQuestionData._links.self.href,
                        props.newSourceForQuestion
                        
                        )
                        
                    setEditingElement(-1);
                    props.setShow( false );
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
          { props.showQuestionData.id }. { props.showQuestionData.question } 
                          <Button variant="secondary" onClick={ 
                              () => setEditingElement( props.showQuestionData.id )} className="me-2 ms-3">
                          <BsPencil/>
                        </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{ props.showQuestionData.answer } </pre>
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
            target="_blank">{ props.showQuestionData.source.sourceLink }
            </a> </td>
        
        </tr>
        
      </tbody>
    </Table>

          </>}

          <Button onClick={() => {
            setEditingElement(-1);
            props.setShow( false ); 
            }
            
            }>Close</Button> 
        </Modal.Footer>
      </Modal>
  
  
      </>
    );
  }

  
}

export default ShowAnswer;