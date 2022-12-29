
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsPlusLg } from 'react-icons/bs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableOfQuestions from './components/TableOfQuestions';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';


function App() {
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const [ question, setQuestion ] = useState();
  const [ answer, setAnswer ] = useState();
  const [ topic, setTopic ] = useState("Java");
  const [dataOfQuestions, setDataOfQuestions ] = useState({});
  const [isLoadingQuestionsData, setLoadingQuestionsData ] = useState(true);


    // first data grab
  useEffect(() => {
    getDataOfQuestions();
  }, [ topic ]);

  const getDataOfQuestions = () => {
    fetch("https://8080-gmdeorozco-javaintervie-wwjrupxk0e6.ws-us80.gitpod.io/api/v1/question/topic/"+topic) // your url may look different
      .then(resp => resp.json())
      .then(data => { setDataOfQuestions ( data );  setLoadingQuestionsData( false ); }) // set data to state
      console.log("loaded data")
  }

  const submitNewQuestion = () => {

    setShowCreateModal(false);
    let questionEntity = {
      question : question,
      answer : answer,
      topic : topic
    };
   

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( questionEntity )
    };

    fetch('https://8080-gmdeorozco-javaintervie-wwjrupxk0e6.ws-us80.gitpod.io/api/v1/question/create'
      , requestOptions)
      .then(response => response.json())
      .then(data => getDataOfQuestions() );

      setQuestion("");
      setAnswer("");
      setTopic("");
  } 

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowViewer = () => setShowViewer(true);
  const handleCloseViewer = () => setShowViewer(false);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button variant="primary" onClick={ handleShowCreateModal } className="mb-3">
              <BsPlusLg/> 
            </Button> 
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"> Topic: </InputGroup.Text>
              <Form.Control
                placeholder="Topic"
                aria-label="Topic"
                aria-describedby="basic-addon1"
                onChange={ ( e ) => setTopic( e.target.value ) } 
              />
            </InputGroup>
          </Col>
        </Row>
          <TableOfQuestions
            topic="Java"
            dataOfQuestions = { dataOfQuestions }
            isLoadingQuestionsData = { isLoadingQuestionsData }
            handleShowViewer = { handleShowViewer }
            handleCloseViewer = { handleCloseViewer }

          />
        <Row>

        </Row>
      </Container>

      
      <Offcanvas show={showViewer} onHide={handleCloseViewer} placement = 'end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={ showCreateModal } onHide={ handleCloseCreateModal }>
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
          <Button variant="secondary" onClick={ handleCloseCreateModal }>
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
