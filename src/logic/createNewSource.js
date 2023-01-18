import { server } from "./constants";

const createNewSource = ( handleCloseCreateSourceModal, setNewSource, newSource, setCreatedSource, setNewSourceForQuestion, setSelectedSource ) => {
 
    handleCloseCreateSourceModal();
    let sourceEntity = { ...newSource }
   
    //console.log("new Source ", newSource)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( sourceEntity )
    };

    fetch( server + '/source/create'
      , requestOptions)
      .then( response => response.json() )
      .then( data => { setCreatedSource ( data ); 
        setNewSource({}); 
        setNewSourceForQuestion( data.id );
        setSelectedSource( data ) 
      });

  }

  export default createNewSource;