import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineSave } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import {MdOutlineCancelPresentation} from 'react-icons/md'
import { BsPencil } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';

function ShowAnswer ( props ) {

    const [ editingElement, setEditingElement ] = useState();
    const [ newAnswer, setNewAnswer] = useState();
  
  if ( editingElement === props.showQuestionId  ){
   
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
                          { props.showQuestionId }. { props.question } 
                                          <Button variant="secondary" onClick={ 
                                              () => setEditingElement( props.showQuestionId )} className="me-2 ms-3">
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
                                    rows={15}
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
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={() => props.setShow( false )}>Close</Button>
                        </Modal.Footer>
                      </Modal>


                       



                    
                  </>
                    );
  }

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
        { props.showQuestionId }. { props.question } 
                        <Button variant="secondary" onClick={ 
                            () => setEditingElement( props.showQuestionId )} className="me-2 ms-3">
                        <BsPencil/>
                      </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{ props.answer } </pre>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setShow( false )}>Close</Button>
      </Modal.Footer>
    </Modal>


    </>
  );
}

export default ShowAnswer;