
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsPlusLg } from 'react-icons/bs'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableOfQuestions from './components/TableOfQuestions';

function App() {
  const [show, setShow] = useState(false);
  const [ question, setQuestion ] = useState();
  const [ answer, setAnswer ] = useState();
  const [ topic, setTopic ] = useState();

  const submitNewQuestion = () => {
    setShow(false);
    let questionEntity = {
      question : question,
      answer : answer,
      topic : topic
    };
    console.log( questionEntity );

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( questionEntity )
    };
    fetch('https://8080-gmdeorozco-javaintervie-wwjrupxk0e6.ws-us80.gitpod.io/api/v1/question/create'
      , requestOptions)
      .then(response => response.json())
      .then(data => console.log( data ));
  } 

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button variant="primary" onClick={ handleShow }>
              <BsPlusLg/> 
            </Button> 
          </Col>
        </Row>
          <TableOfQuestions
            topic="Java"
          />
        <Row>

        </Row>
      </Container>

      

      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title> New Interview Question </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="question"> Question: </InputGroup.Text>
              <Form.Control
                placeholder="Question"
                aria-label="Question"
                aria-describedby="question"
                onChange={ ( e ) => setQuestion( e.target.value ) } 
                defaultValue = { question }
             />
          </InputGroup>



          <InputGroup className="mb-3"> 
            <InputGroup.Text> Answer: </InputGroup.Text>
              <Form.Control as="textarea" aria-label="Answer" 
                onChange={(e) => setAnswer(e.target.value)} 
                defaultValue = { answer }
              />
            </InputGroup>

            <InputGroup className="mb-3" size="sm">
            <InputGroup.Text id="topics"> Topics: </InputGroup.Text>
              <Form.Control
                placeholder="Enter coma separated topics"
                aria-label="topics"
                aria-describedby="topics"
                onChange={(e) => setTopic(e.target.value)} 
                defaultValue = { topic }
             />
          </InputGroup>
          
          
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ submitNewQuestion }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
