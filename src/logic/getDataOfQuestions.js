const getDataOfQuestions = ( setDataOfQuestions, server, topic, selectedSource, page, size, setLoadingQuestionsData ) => {

    if( !topic ){
      setDataOfQuestions({ page: { totalElements : 0 } });
     
      return; 
    }
    
    let path = server + "/question" + (topic 
        ? "/topic/" + topic+( selectedSource.id ? "/source/" + selectedSource.id : "")+"?page="+page+"&size="+size
        :`/allpaginated?page=${page}&size=${size}`);
    
    console.log("path", path);

    fetch( path ) 
      .then(resp => resp.json())
      .then(data => { 
        setDataOfQuestions ( data ); 
        setLoadingQuestionsData( false ); 
        
      }
        
        ) 
     
  }

  export default getDataOfQuestions;
 