import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TableOfQuestions( props ){

    console.log( "carga tabla" )
    

    if ( props.isLoadingQuestionsData ) {
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

      if ( props.dataOfQuestions.page.totalElements === 0) {
        return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>No records found {console.log("no records found")}</div>
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
             { props.dataOfQuestions._embedded.questionModelList.map(
                (question,index) => (
                <tr key={index}>
                    <td> {question.id} </td> 
                    <td> {question.question} </td> 
                    <td> {question.answer} </td> 
                    <td> {question.topic} </td> 
                    <td> 
                      <Button variant="secondary" onClick={ props.handleShowViewer} className="me-2">
                        <BsPencil/>
                      </Button>

                      <Button variant="secondary" onClick={ props.handleShowViewer} className="me-2">
                        <AiOutlineDelete />
                      </Button>

                      
                    </td>
                
                </tr>
                ))}
            
              
            </tbody>
          </Table>
    );
}

export default TableOfQuestions;