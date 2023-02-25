import { server } from "./constants";
import { addLineSeparators } from "./";

const createNewQuestion = ( question, setQuestion, setCreatedQuestion, answer, setAnswer, topic, newSourceForQuestion, setPage, dataOfQuestions, handleCloseCreateQuestionModal, newCodeSnippet) => {

    handleCloseCreateQuestionModal();

    let questionEntity = {
      question : question,
      answer : addLineSeparators(answer,50),
      topic : topic,
      code_snippet : newCodeSnippet
    };
   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( questionEntity )
    };

    console.log( "sending to server >>>  " + requestOptions.body );

    let path = newSourceForQuestion ? server + '/question/create/onsource/' + newSourceForQuestion
    : server + '/question/create';

    //console.log( "path to add source at saving ", path)
    fetch( path
      , requestOptions)
      .then(response => response.json())
      .then( ( data ) => { 
        setCreatedQuestion( data );
        setPage( dataOfQuestions.page.totalPages ? dataOfQuestions.page.totalPages - 1 : 0 );  //this will trigger getDataOfQuestions  
        
      });
      setQuestion("");
      setAnswer("");     
  } 

  export default createNewQuestion;