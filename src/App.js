
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
import SelectSources from './components/SelectSources';
import CreateSourceModal from './components/CreateSourceModal';
import { ButtonToolbar } from 'react-bootstrap';



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

  const [ isLoadingSources, setLoadingSources ] = useState(true);
  const [ sources, setSources ] = useState({});
  const [ newSource, setNewSource ] = useState({});
  const [ selectedSource, setSelectedSource ] = useState();

  

  const [ availableTopics, setAvailableTopics ] = useState({})
  const [ showCreateSourceModal, setShowCreateSourceModal ] = useState(false);

  const [ newSourceForQuestion, setNewSourceForQuestion ] = useState();

  const server = 'https://javainterviewquestions-production.up.railway.app/api/v1'

    // first data grab
  useEffect(() => {
    getDataOfQuestions();
  }, [ selectedSource, topic, page, size ]);

  useEffect(() => {
    getDataOfSources();
  }, [ topic, page, size ]);

  useEffect(() => {
    getAvailableTopics();
  }, []);

  const getDataOfQuestions = () => {

    if( !topic ){
      setDataOfQuestions({ page: { totalElements : 0 } });
     
      return; 
    }
    
    let path = server + "/question" + (topic 
        ? "/topic/" + topic+( selectedSource? "/source/"+selectedSource:"")+"?page="+page+"&size="+size
        :"/allpaginated"+"?page="+page+"&size="+size);
    
    console.log("path", path);

    fetch( path ) 
      .then(resp => resp.json())
      .then(data => { setDataOfQuestions ( data ); 
  
        setLoadingQuestionsData( false ); 
        
      }
        
        ) // set data to state
     
  }

  const getDataOfSources = () => {
    
    
    let path = server  + "/source"  + ( topic ? "/topic/"  + topic    +"/all"
      : "/all" );
    
    console.log("pathSource", path);

    fetch( path ) // your url may look different
      .then(resp => resp.json())
      .then(data => { setSources ( data );  
        setLoadingSources ( false ); 
        //console.log(data);
        }) ;
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

    let path = newSourceForQuestion ? server + '/question/create/onsource/' + newSourceForQuestion
    : server + '/question/create';

    //console.log( "path to add source at saving ", path)
    fetch( path
      , requestOptions)
      .then(response => response.json())
      .then( ( data ) => {
        getDataOfQuestions();  
        getAvailableTopics(); 
        setPage( dataOfQuestions.page.totalPages - 1);
        
      } 
        
       );

      setQuestion("");
      setAnswer("");
     
  } 

  const submitNewSource = () => {

    setShowCreateSourceModal(false);
    let sourceEntity = { ... newSource }
   
    console.log("new Source ", newSource)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( sourceEntity )
    };

    fetch( server + '/source/create'
      , requestOptions)
      .then( response => response.json() )
      .then( data => { getDataOfSources(); 
        setNewSource({}); 
        setNewSourceForQuestion( data.id );
        setSelectedSource( data.id ) 
      });

  }

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowCreateSourceModal = () => { setShowCreateSourceModal(true); }
  const handleCloseCreateSourceModal = () => setShowCreateSourceModal(false);





  return (
    <>
      <Container lg="6" >
        <Row>
          <Col> <h1>Interview Questions...</h1> </Col>
        </Row>
        <Row >
          <Col lg="1">
            
          </Col> 
         
        </Row>
        <Row>
        <Col lg="1">
            <Button variant="primary" 
              onClick={ handleShowCreateModal } className="mb-3 mt-3">
              <BsPlusLg/> 
            </Button>
          </Col> 
          <Col>
          <ButtonToolbar>
          <InputGroup className="mb-3">
          <SelectSources
              sources = { sources } 
              setSources = { setSources }
              isLoadingSources = { isLoadingSources }
              topic = { topic }
              setSelectedSource = { setSelectedSource }
              selectedSource = { selectedSource }
              setNewSourceForQuestion = { setNewSourceForQuestion }
              newSourceForQuestion = { newSourceForQuestion }
              onMain = { true }

              setPage = { setPage }
              
            />
        <Button variant="outline-secondary" id="button-addon2"
           onClick={() => handleShowCreateSourceModal()} 
           className="mb-3 mt-3"
        >
           Add new source...
        </Button>
      </InputGroup></ButtonToolbar>

          
          
            


         
          </Col>

        </Row>
        <Row>
          <Col>
            <AvailableTopicsButtons
              availableTopics = { availableTopics }
              isLoadingAvailableTopics = { isLoadingAvailableTopics }

              setTopic = { setTopic }
              topic = { topic }

              setPage = { setPage }
              handleShowCreateModal = { handleShowCreateModal }
              setNewSource = { setNewSource }
              newSource = { newSource }

              setSelectedSource = { setSelectedSource }
              onMain = { true }
              dataOfQuestions = { dataOfQuestions }
             
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {console.log("page before loading", page)}
            <TableOfQuestions
              topic = { topic }
              setTopic = { setTopic }

              dataOfQuestions = { dataOfQuestions }
              isLoadingQuestionsData = { isLoadingQuestionsData }
              getDataOfQuestions = { getDataOfQuestions }
              getAvailableTopics = { getAvailableTopics }
              server = { server }
              page = { page }
              size = { size }
              setPage = { setPage }
              setSize = { setSize }
              sources = { sources } 

              setSources = { setSources }
              isLoadingSources = { isLoadingSources }
              
              setSelectedSource = { setSelectedSource }
              selectedSource = { selectedSource }

              newSourceForQuestion = { newSourceForQuestion }
              setNewSourceForQuestion = { setNewSourceForQuestion }

              
            
             
            />
          </Col>
        </Row>
      </Container>

     < CreateSourceModal 
        showCreateSourceModal = { showCreateSourceModal }
        handleCloseCreateSourceModal = { handleCloseCreateSourceModal }
        newSource = { newSource }
        setNewSource = { setNewSource }
        setTopic ={ setTopic }
        setPage = { setPage }
        topic = { topic }
        availableTopics ={ availableTopics }
        isLoadingAvailableTopics = { isLoadingAvailableTopics }
        submitNewSource ={ submitNewSource }

        dataOfQuestions = { dataOfQuestions }

        setSelectedSource = { setSelectedSource }
        page = { page }
     />

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
                onChange={(e) => setTopic( e.target.value )} 

                value = { topic }
             />
          </InputGroup>

          <AvailableTopicsButtons
           availableTopics = { availableTopics }
           isLoadingAvailableTopics = { isLoadingAvailableTopics }

           setTopic = { setTopic }
          topic = { topic }

           setPage = { setPage }
           setSources = { setSources }
           setSelectedSource = { setSelectedSource }
           dataOfQuestions = { dataOfQuestions }

           setNewSource = { setNewSource }
          />
          
          </Form>

        </Modal.Body>
        <Modal.Footer>
        <SelectSources
              sources = { sources } 
              setSources = { setSources }
              isLoadingSources = { isLoadingSources }
              topic = { topic }
              handleShowCreateSourceModal = { handleShowCreateSourceModal } 

              setSelectedSource = { setSelectedSource }

              selectedSource = { selectedSource }
              onMain = { false }

              setNewSourceForQuestion = { setNewSourceForQuestion }
              newSourceForQuestion = { newSourceForQuestion }

              setNewSource = { setNewSource }

              setPage = { setPage }

              
            />

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
