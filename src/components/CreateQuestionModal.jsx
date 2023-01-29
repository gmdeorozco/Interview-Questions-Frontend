import { useState } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { createNewQuestion } from "../logic";
import { AvailableTopicsButtons, SelectSources } from "./";

function CreateQuestionModal( props ){

  const [ newTopic, setNewTopic ] = useState();
  const [ newCodeSnippet, setNewCodeSnippet ] = useState();

    return(
        <Modal show={ props.showCreateModal } onHide={ props.handleCloseCreateQuestionModal }>
        <Modal.Header closeButton>
          <Modal.Title> New Interview Question </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="question" > Question: </InputGroup.Text>
              <Form.Control
                as="textarea"
                placeholder="Question"
                aria-label="Question"
                aria-describedby="question"
                onChange={ ( e ) => props.setQuestion( e.target.value ) } 
                defaultValue = { props.question }
             />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="code_snippet" > Code Snippet: </InputGroup.Text>
              <Form.Control
                as="textarea"
                placeholder="code_snippet"
                aria-label="code_snippet"
                aria-describedby="code_snippet"
                onChange={ ( e ) => setNewCodeSnippet( e.target.value ) } 
                defaultValue = { newCodeSnippet }
             />
          </InputGroup>          

          <InputGroup className="mb-3"> 
            <InputGroup.Text> Answer: </InputGroup.Text>
              <Form.Control as="textarea" aria-label="Answer" rows={15}
                onChange={(e) => props.setAnswer(e.target.value)} 
                defaultValue = { props.answer }
              />
            </InputGroup>
            
            { props.answer && <p> { props.answer.length } of 9000 Characters </p> }

          <div className="m-3"> Topic: <b>{ props.topic }</b> </div>
          <AvailableTopicsButtons
           availableTopics = { props.availableTopics }
           isLoadingAvailableTopics = { props.isLoadingAvailableTopics }
           setTopic = { props.setTopic }
            topic = { props.topic }
           setPage = { props.setPage }
           setSources = { props.setSources }
           setSelectedSource = { props.setSelectedSource }
           dataOfQuestions = { props.dataOfQuestions }
           setNewSource = { props.setNewSource }

          />
          
          </Form>

        </Modal.Body>
        <Modal.Footer>
         <SelectSources
              sources = { props.sources } 
              setSources = { props.setSources }
              isLoadingSources = { props.isLoadingSources }
              topic = { props.topic }
              handleShowCreateSourceModal = { props.handleShowCreateSourceModal } 

              setSelectedSource = { props.setSelectedSource }

              selectedSource = { props.selectedSource }
              onMain = { false }

              setNewSourceForQuestion = { props.setNewSourceForQuestion }
              newSourceForQuestion = { props.newSourceForQuestion }

              setNewSource = { props.setNewSource }

              setPage = { props.setPage }
              setSelectedSourceName = { props.setSelectedSourceName }

              
            /> 

          <Button variant="secondary" 
            onClick={ props.handleCloseCreateModal }>

            Close
          </Button>
          <Button variant="primary" 
          onClick={ 
            () => {
              createNewQuestion( 
                props.question, 
                props.setQuestion, 
                props.setCreatedQuestion, 
                props.answer, 
                props.setAnswer, 
                newTopic ? newTopic : props.topic, 
                props.newSourceForQuestion, 
                props.setPage, 
                props.dataOfQuestions, 
                props.handleCloseCreateQuestionModal ,
                newCodeSnippet
                );
              
                setNewTopic("");

              setNewCodeSnippet("");
            } }>

                

            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CreateQuestionModal;