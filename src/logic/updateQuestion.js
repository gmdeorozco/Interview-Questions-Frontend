const updateQuestion = ( 
  id, 
  question, 
  answer, 
  topic,
  updateLink, 
  selfLink, 
  sourceId, 
  newQuestion, 
  newAnswer, 
  newTopic, 
  setUpdatedQuestion, 
  getOneQuestionData, code_snippet, new_code_snippet ) =>{

    newQuestion = newQuestion ? newQuestion : question;
    newAnswer = newAnswer ? newAnswer : answer;
    newTopic = newTopic ? newTopic : topic;
    new_code_snippet = new_code_snippet ? new_code_snippet : code_snippet;
    
    let questionEntity = {
      id: id,
      question : newQuestion,
      answer : newAnswer,
      topic : newTopic,
      code_snippet : new_code_snippet 
    };

    console.log("TO SEND AL SERVER " + id);
    console.log("TO SEND AL SERVER " + newQuestion);
    console.log("TO SEND AL SERVER " + newAnswer);
    console.log("TO SEND AL SERVER " + newTopic);
    console.log("to server ", JSON.stringify( questionEntity ));

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( questionEntity )
    };

    fetch( updateLink.replace("http", "https") 
      + ( sourceId ? "/source/" + sourceId :"" )
      , requestOptions)
      .then(response => response.json())
      .then((data) => { 
        setUpdatedQuestion( data );
        getOneQuestionData( selfLink );
           });
        }
  export default updateQuestion;