import { server } from "./constants";

const sendAnswerReport = ( memberId, questionId, whoWon, setSentEloSubmit ) => {
    fetch( server + "/member/"+memberId+"/"+questionId+"/"+whoWon )
    .then(resp => resp.json())
    .then(data => { 
        setSentEloSubmit(data);
        console.log(data);
    }) // set data to state
    
  }

  export default sendAnswerReport;