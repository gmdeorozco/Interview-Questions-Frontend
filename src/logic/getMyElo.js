const getMyElo = ( setMyElo, topic ) => {
    console.log("the topic  *********** " + topic )
    fetch( "https://javainterviewquestions-production.up.railway.app/api/v1/member/elo/1/"+{topic} )
    .then(resp => resp.json())
    .then(data => { 
        setMyElo( data.elo );
    }) // set data to state
    
  }

export default getMyElo;

