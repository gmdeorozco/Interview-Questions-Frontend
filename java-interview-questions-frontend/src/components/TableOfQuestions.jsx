import { useEffect } from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';

function TableOfQuestions( props ){

    console.log( "carga tabla" )
    const [dataOfQuestions, setDataOfQuestions ] = useState({});
    const [isLoading, setLoading] = useState(true);


    // first data grab
  useEffect(() => {
    fetch("https://8080-gmdeorozco-javaintervie-wwjrupxk0e6.ws-us80.gitpod.io/api/v1/question/topic/" + props.topic) // your url may look different
      .then(resp => resp.json())
      .then(data => { setDataOfQuestions (data);  setLoading(false); }) // set data to state
  }, []);


    if (isLoading) {
        return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>Loading the data {console.log("loading state")}</div>
      );
      }

    return(
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Topic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             { dataOfQuestions._embedded.questionModelList.map(
                (question,index) => (
                <tr key={index}>
                    <td> {question.id} </td> 
                    <td> {question.question} </td> 
                    <td> {question.answer} </td> 
                    <td> {question.topic} </td> 
                
                </tr>
                ))}
            
              
            </tbody>
          </Table>
    );
}

export default TableOfQuestions;