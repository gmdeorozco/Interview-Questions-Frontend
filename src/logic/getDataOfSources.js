const getDataOfSources = ( server, topic, setLoadingSources, setSources ) => {
    
    
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

export default getDataOfSources; 