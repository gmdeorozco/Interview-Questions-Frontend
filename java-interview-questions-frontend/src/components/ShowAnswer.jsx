import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineSave } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import {MdOutlineCancelPresentation} from 'react-icons/md'
import { BsPencil } from 'react-icons/bs'

function ShowAnswer ( props ) {

    const [ editingElement, setEditingElement ] = useState();
    const [ newAnswer, setNewAnswer] = useState();
  
  if ( editingElement === props.showQuestionId  ){
   
                    return(
                        <>
                        <Offcanvas show={ props.show }  
                            onHide={ () => props.setShow( false )} placement = "bottom"
                            scroll= "true"
                            >
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title> { props.showQuestionId }. { props.question }</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                        <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@answer</InputGroup.Text>
                                <Form.Control as="textarea"
                                    placeholder="Answer"
                                    aria-label="Answer"
                                    aria-describedby="basic-addon1"
                                    defaultValue={ newAnswer? newAnswer : props.answer }
                                    onChange = { (e) => setNewAnswer( e.target.value )}
                                />
                                </InputGroup>
                                <Button variant="danger" onClick={ () => {
                                    props.updateQuestion(
                                        editingElement, 
                                        props.question, 
                                        newAnswer, 
                                        props.topic )
                                        
                                    setEditingElement(-1);
                                    }} className="me-2">
                                <AiOutlineSave/>
                            </Button>

                            <Button variant="secondary"  className="me-2"
                              onClick={ ()=>setEditingElement(-1) }
                            >
                                <MdOutlineCancelPresentation />
                            </Button>
                            </Offcanvas.Body>
                        </Offcanvas>



                    
                  </>
                    );
  }

  return (
    <>
     
      <Offcanvas show={ props.show }  
        onHide={ () => props.setShow( false )} placement = "bottom"
        scroll= "true"
        >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> { props.showQuestionId }. { props.question } 
                        <Button variant="secondary" onClick={ 
                            () => setEditingElement( props.showQuestionId )} className="me-2 ms-3">
                        <BsPencil/>
                      </Button></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <pre>{ props.answer } </pre>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShowAnswer;