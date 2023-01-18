import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { AvailableTopicsButtons } from "./";
import { createNewSource } from "../logic";

function CreateSourceModal( props ){

    return(
        <Modal show={ props.showCreateSourceModal } 
          onHide={ props.handleCloseCreateSourceModal }>
        <Modal.Header closeButton>
          <Modal.Title> New Source </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="name"> Name: </InputGroup.Text>
              <Form.Control
                placeholder="Name"
                aria-label="Name"
                aria-describedby="name"
                onChange={ ( e ) => props.setNewSource( {...props.newSource, name:e.target.value } ) } 
                defaultValue = { props.newSource.name }
             />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="link"> Link: </InputGroup.Text>
              <Form.Control
                placeholder="link"
                aria-label="link"
                aria-describedby="link"
                onChange={ ( e ) => props.setNewSource( {...props.newSource, sourceLink:e.target.value } ) } 
                defaultValue = { props.newSource.sourceLink }
             />
          </InputGroup>
          
          <div className="mb-4"> Topic: { props.topic } </div> 

          <AvailableTopicsButtons 
            setTopic = { props.setTopic }
            setPage = { props.setPage }
            availableTopics = { props.availableTopics }
            isLoadingAvailableTopics = { props.isLoadingAvailableTopics }
            newSource = { props.newSource }
            setNewSource = { props.setNewSource }
            dataOfQuestions = { props.dataOfQuestions }

            topic = { props.topic }

            setSelectedSource = { props.setSelectedSource }

            page = { props.page }
          />
          
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ props.handleCloseCreateSourceModal }>
            Close
          </Button>
          <Button variant="primary" 
            onClick={() => {

              props.setNewSource( {...props.newSource, topic: props.topic } );
              createNewSource( props.handleCloseCreateSourceModal, 
                props.setNewSource, 
                props.newSource, 
                props.setCreatedSource, 
                props.setNewSourceForQuestion, 
                props.setSelectedSource );

            }
              }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    );

    
}

export default CreateSourceModal;
