import { Modal } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import AvailableTopicsButtons from "./AvailableTopicsButtons";

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
          <InputGroup className="mb-3">
            <InputGroup.Text id="Topic"> Topic: </InputGroup.Text>
              <Form.Control
                placeholder="Topic"
                aria-label="Topic"
                aria-describedby="Topic"
                onChange={ ( e ) => props.setNewSource( {...props.newSource, topic:e.target.value } ) } 
                defaultValue = { props.topic }
             />
          </InputGroup>

          <AvailableTopicsButtons 
            setTopic = { props.setTopic }
            setPage = { props.setPage }
            availableTopics = { props.availableTopics }
            isLoadingAvailableTopics = { props.isLoadingAvailableTopics }
            newSource = { props.newSource }
            setNewSource = { props.setNewSource }
          />
          
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ props.handleCloseCreateSourceModal }>
            Close
          </Button>
          <Button variant="primary" onClick={() => props.submitNewSource()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    );

    
}

export default CreateSourceModal;
