
import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { createNewTopic } from "../logic";

function CreateTopicModal( props ){

    const [ name, setName ] = useState();

    return(
        <Modal  show={props.showCreateTopicModal} onHide={props.handleCloseCreateTopicModal} >
        <Modal.Header closeButton>
          <Modal.Title>Create a new Topic</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasictopic">
                    <Form.Label>Topic name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter topic" 
                        defaultValue = { name }
                        onChange={(e) => setName( e.target.value )}
                    />
                   
                </Form.Group>

            </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"
            onClick={()=> props.handleCloseCreateTopicModal()}
          >Close</Button>
          <Button variant="primary"
            onClick = { () => createNewTopic( name, props.setTopic, props.handleCloseCreateTopicModal, props.setCreatedTopic ) }
          >Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default CreateTopicModal;