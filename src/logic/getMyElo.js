const getMyElo = ( setMyElo ) => {
    fetch( "https://javainterviewquestions-production.up.railway.app/api/v1/member/1" )
    .then(resp => resp.json())
    .then(data => { 
        setMyElo( data.elo );
    }) // set data to state
    
  }

export default getMyElo;

