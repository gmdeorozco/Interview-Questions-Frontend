import { server } from "./constants";

const createNewTopic = ( name, setTopic, handleCloseCreateTopicModal, setCreatedTopic ) => {
 
    handleCloseCreateTopicModal();
   
    let topicEntity = { name: name }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( topicEntity )
    };

    fetch( server + '/topics/create'
      , requestOptions)
      .then( response => response.json() )
      .then( data => { 
        
        setCreatedTopic( data );
        setTopic ( data.name ); 
        
      });

  }

  export default createNewTopic;