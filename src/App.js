
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
import addLineSeparators from './logic/addLineSeparators';



function App() {
  
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [ question, setQuestion ] = useState();
  const [ answer, setAnswer ] = useState("");
  const [ topic, setTopic ] = useState("");
  const [dataOfQuestions, setDataOfQuestions ] = useState({});
  const [isLoadingQuestionsData, setLoadingQuestionsData ] = useState(true);
  const [isLoadingAvailableTopics, setLoadingAvailableTopics ] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  

  const [availableTopics, setAvailableTopics] = useState({})

  const server = 'http://138.197.74.229:8080/api/v1'

    // first data grab
  useEffect(() => {
    getDataOfQuestions();
  }, [ topic, page, size ]);

  useEffect(() => {
    getAvailableTopics();
  }, []);

  const getDataOfQuestions = () => {
    
    let path = server + "/question" + (topic ? "/topic/" + topic+"?page="+page+"&size="+size:"/allpaginated"+"?page="+page+"&size="+size);
    
    console.log("path", path);

    fetch( path ) // your url may look different
      .then(resp => resp.json())
      .then(data => { setDataOfQuestions ( data );  setLoadingQuestionsData( false ); }) // set data to state
      console.log("loaded data availableTopics")
  }

  const getAvailableTopics = () =>{
    fetch( server + "/question/topics")
    .then(resp => resp.json())
    .then(data => { setAvailableTopics ( data ); setLoadingAvailableTopics(false)}) // set data to state
    
  }

  const submitNewQuestion = () => {

    setShowCreateModal(false);
    let questionEntity = {
      question : question,
      answer : addLineSeparators(answer,60),
      topic : topic
    };
   

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( questionEntity )
    };

    fetch( server + '/question/create'
      , requestOptions)
      .then(response => response.json())
      .then(data => { getDataOfQuestions();  getAvailableTopics(); setPage(data.page.totalPages-1 )} );

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
          <Col> <h1>Interview Questions...</h1> </Col>
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
              setPage = { setPage }
             
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {console.log("page before loading", page)}
            <TableOfQuestions
              topic={topic}
              dataOfQuestions = { dataOfQuestions }
              isLoadingQuestionsData = { isLoadingQuestionsData }
              getDataOfQuestions = { getDataOfQuestions }
              getAvailableTopics = { getAvailableTopics }
              server = { server }
              page = { page }
              size = { size }
              setPage = { setPage }
              setSize = { setSize }
            
             
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
              <Form.Control as="textarea" aria-label="Answer" rows={15}
                onChange={(e) => setAnswer(e.target.value)} 
                defaultValue = { answer }
              />
            </InputGroup>
            
            { answer && <p> { answer.length } of 9000 Characters </p> }

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

          <AvailableTopicsButtons
           availableTopics = { availableTopics }
           isLoadingAvailableTopics = { isLoadingAvailableTopics }
           setTopic = { setTopic }
           setPage = { setPage }
          />
          
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
