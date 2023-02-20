const getMyElo = ( setMyElo, memberId, topic ) => {
    fetch( "https://javainterviewquestions-production.up.railway.app/api/v1/member/elo/"+{memberId}+"/"+{topic} )
    .then(resp => resp.json())
    .then(data => { 
        setMyElo( data.elo );
    }) // set data to state
    
  }

export default getMyElo;

