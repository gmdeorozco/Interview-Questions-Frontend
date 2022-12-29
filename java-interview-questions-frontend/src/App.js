
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
import AvailableTopicsButtons from './components/AvailableTopicsButtons';


function App() {
  
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [ question, setQuestion ] = useState();
  const [ answer, setAnswer ] = useState();
  const [ topic, setTopic ] = useState("Java");
  const [dataOfQuestions, setDataOfQuestions ] = useState({});
  const [isLoadingQuestionsData, setLoadingQuestionsData ] = useState(true);
  const [isLoadingAvailableTopics, setLoadingAvailableTopics ] = useState(true);

  const [availableTopics, setAvailableTopics] = useState({})


    // first data grab
  useEffect(() => {
    getDataOfQuestions();
  }, [ topic ]);

  useEffect(() => {
    getAvailableTopics();
  }, []);

  const getDataOfQuestions = () => {
    fetch("https://8080-gmdeorozco-javaintervie-wwjrupxk0e6.ws-us80.gitpod.io/api/v1/question/topic/"+topic) // your url may look different
      .then(resp => resp.json())
      .then(data => { setDataOfQuestions ( data );  setLoadingQuestionsData( false ); }) // set data to state
      console.log("loaded data availableTopics")
  }

  const getAvailableTopics = () =>{
    fetch("https://8080-gmdeorozco-javaintervie-wwjrupxk0e6.ws-us80.gitpod.io/api/v1/question/topics")
    .then(resp => resp.json())
    .then(data => { setAvailableTopics ( data ); setLoadingAvailableTopics(false)}) // set data to state
    
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



  return (
    <>
      <Container lg="6" >
        <Row>
          <Col> <h1>Interview Questions</h1> </Col>
        </Row>
        <Row >
          <Col lg="1">
            <Button variant="primary" onClick={ handleShowCreateModal } className="mb-3 mt-3">
              <BsPlusLg/> 
            </Button>
          </Col> 
          <Col>
            <InputGroup className="mb-3 mt-3">
              <InputGroup.Text id="basic-addon1"> Topic: </InputGroup.Text>
              <Form.Control
                placeholder="Topic"
                aria-label="Topic"
                aria-describedby="basic-addon1"
                value={ topic }
                onChange={ ( e ) => setTopic( e.target.value ) } 
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <AvailableTopicsButtons
              availableTopics = { availableTopics }
              isLoadingAvailableTopics = { isLoadingAvailableTopics }
              setTopic = { setTopic }
             
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TableOfQuestions
              topic="Java"
              dataOfQuestions = { dataOfQuestions }
              isLoadingQuestionsData = { isLoadingQuestionsData }
              getDataOfQuestions = { getDataOfQuestions }
            />
          </Col>
        </Row>
      </Container>

     

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
