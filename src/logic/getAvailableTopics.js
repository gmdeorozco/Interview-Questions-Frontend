 const getAvailableTopics = ( server, setAvailableTopics, setLoadingAvailableTopics ) =>{
    fetch( server + "/question/topics")
    .then(resp => resp.json())
    .then(data => { setAvailableTopics ( data ); setLoadingAvailableTopics(false)}) // set data to state
    
  }

  export default getAvailableTopics;