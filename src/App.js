import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { ButtonToolbar, Row, Col, Container, InputGroup, Button } from 'react-bootstrap';
import { getDataOfSources, getDataOfQuestions, getAvailableTopics } from './logic';
import { SelectSources, CreateSourceModal, CreateQuestionModal, TableOfQuestions, AvailableTopicsButtons, CreateTopicModal } 
  from './components';
import { server } from './logic/constants';

function App() {
  
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
  const [ selectedSourceName, setSelectedSourceName ] = useState();

  const [ availableTopics, setAvailableTopics ] = useState({})
  
  const [ showCreateModal, setShowCreateModal ] = useState(false);
  const [ showCreateSourceModal, setShowCreateSourceModal ] = useState(false);
  
  const [ newSourceForQuestion, setNewSourceForQuestion ] = useState();
  const [ deletedQuestion, setDeletedQuestion ] = useState();
  const [ createdQuestion, setCreatedQuestion ] = useState();
  const [ createdSource, setCreatedSource ] = useState();
  const [ updatedQuestion, setUpdatedQuestion ] = useState();
  const [ createdTopic, setCreatedTopic ] = useState();


  const [showCreateTopicModal, setShowCreateTopicModal ] = useState(false);

  const [ sentEloSubmit, setSentEloSubmit ] = useState();

  const handleCloseCreateTopicModal = () => setShowCreateTopicModal(false);
  const handleShowCreateTopicModal = () => setShowCreateTopicModal(true);

    // first data grab
  useEffect(() => {
    getDataOfQuestions( setDataOfQuestions, server, topic, selectedSource, page, size, setLoadingQuestionsData  );
    
    
  }, [ selectedSource, topic, page, size, deletedQuestion, createdQuestion, updatedQuestion,sentEloSubmit ]);

  useEffect(() => {
    getDataOfSources( server, topic, setLoadingSources, setSources );
    
  }, [ topic, createdSource ]);

  useEffect(
    () => {
      setSelectedSource( {id:""} );
    }, [ topic ]
  )

  useEffect(() => {
    getAvailableTopics( server, setAvailableTopics, setLoadingAvailableTopics );
  }, [ createdQuestion, updatedQuestion, createdTopic ]);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateQuestionModal = () => setShowCreateModal(false);

  const handleShowCreateSourceModal = () =>  setShowCreateSourceModal(true); 
  const handleCloseCreateSourceModal = () => setShowCreateSourceModal(false);

  return (
    <>
      <Container lg="6" >
        <Row>
          <Col className='text-center'> 
            <h1 className='m-5 display-3'>Interview Questions...</h1> 
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


        </Row>
        <div className='text-center mt-4 mb-4'>
              <b className='display-4'>{ topic } </b>
              
            { !topic && <p> Select a Topic to add Questions and Sources,<br></br> or create one</p>}
            </div> 
        <Row>
        
          <Col className='nav justify-content-center' >
          

          <ButtonToolbar>
          <InputGroup>
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
              setSelectedSourceName = { setSelectedSourceName }         
            />
      <Button variant="outline-secondary" id="button-addon2"
           onClick={() => handleShowCreateTopicModal()} 
           className="mb-3 mt-3"
        >
           Add new Topic...
        </Button> 
            
       
      { topic &&<Button variant="outline-secondary" id="button-addon2"
           onClick={() => handleShowCreateSourceModal()} 
           className="mb-3 mt-3"
        >
           Add new source...
        </Button> }
        {  selectedSource && selectedSource.id && <Button className="mb-3 mt-3" variant="outline-secondary" 
          href={ selectedSource.sourceLink } target="_blank"> Open Source...</Button>}
          
          { topic &&<Button variant="outline-secondary" id="button-addon2"
           onClick={() => handleShowCreateModal()} 
           className="mb-3 mt-3"
        >
           Add new Quesion...
        </Button> }
        
        </InputGroup></ButtonToolbar>
          
       
        
        
          </Col>

        </Row>

        <Row className='mt-4'>
          <Col>
            
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
              deletedQuestion = { deletedQuestion }
              setDeletedQuestion = { setDeletedQuestion }  
              selectedSourceName = { selectedSourceName }
              setUpdatedQuestion = { setUpdatedQuestion }
              handleShowCreateModal = { handleShowCreateModal }
              setSentEloSubmit = { setSentEloSubmit }
              
            />
          </Col>
        </Row>
      </Container>

     < CreateSourceModal 
        
        newSource = { newSource }
        setNewSource = { setNewSource }
        setTopic ={ setTopic }
        setPage = { setPage }
        topic = { topic }
        availableTopics ={ availableTopics }
        isLoadingAvailableTopics = { isLoadingAvailableTopics }
        showCreateSourceModal = { showCreateSourceModal }
        setNewSourceForQuestion = { setNewSourceForQuestion }
        dataOfQuestions = { dataOfQuestions }
        setCreatedSource = { setCreatedSource }
        setSelectedSource = { setSelectedSource }
        page = { page }
        handleShowCreateSourceModal = { handleShowCreateSourceModal }
        handleCloseCreateSourceModal = { handleCloseCreateSourceModal }
     />
    <CreateQuestionModal 
      showCreateModal = { showCreateModal }
      handleCloseCreateQuestionModal = { handleCloseCreateQuestionModal }
      question = { question }
      setQuestion = { setQuestion }
      answer = { answer }
      setAnswer = { setAnswer }
      topic = { topic }
      availableTopics = { availableTopics }
      isLoadingAvailableTopics = { isLoadingAvailableTopics }
      setTopic = { setTopic }
      setPage = { setPage }
      setSources = { setSources }
      setSelectedSource = { setSelectedSource }
      dataOfQuestions = { dataOfQuestions }
      setNewSource = { setNewSource }
      sources = { sources } 
      isLoadingSources = { isLoadingSources }
      handleShowCreateSourceModal = { handleShowCreateSourceModal } 
      
      selectedSource = { selectedSource }
      onMain = { false }
      setNewSourceForQuestion = { setNewSourceForQuestion }
      newSourceForQuestion = { newSourceForQuestion }
      setCreatedQuestion = { setCreatedQuestion }
      setSelectedSourceName = { setSelectedSourceName }
      
      />
      <CreateTopicModal 
        setTopic = { setTopic }
        handleCloseCreateTopicModal = { handleCloseCreateTopicModal }
        showCreateTopicModal = { showCreateTopicModal }
        setCreatedTopic = { setCreatedTopic }
      />
    </>
  );
}

export default App;
