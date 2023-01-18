const deleteQuestion=( server, delitingQuestion, getDataOfQuestions, handleCloseConfirmDelete, setDelitingElement ,setDeletedQuestion )=>{
    const requestOptions = {
      method: 'DELETE'
    }
     
    fetch( server + "/question/" + delitingQuestion + "/delete"
      , requestOptions)
      .then(response => response.json())
      .then(data =>  { setDeletedQuestion( data ); handleCloseConfirmDelete();  setDelitingElement(-1); } );

    };

export default deleteQuestion;