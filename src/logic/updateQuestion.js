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
  getOneQuestionData ) =>{
    
    let questionEntity = {
      id: id,
      question : newQuestion ? newQuestion : question,
      answer : newAnswer ? newAnswer : answer,
      topic : newTopic ? newTopic : topic
    };

    console.log("TO SEND AL SERVER " + questionEntity);

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