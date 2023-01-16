import { Spinner, Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';


function SelectSources ( props ) {

    let sourceOptions;

    if( props.isLoadingSources ){
        return(<div>
            <Spinner animation="grow" /> Loading Sources...
        </div>)
    } 

   if( Object.keys( props.sources ).length  === 0 || !props.topic ){
    return(<div></div>)
   }
 
    sourceOptions = props.sources._embedded.sourceModelList.map(
        s => <option 
                value={ s.id } 
                key = { s.id } 
                > 
                            { s.name } 
            </option>
        
    )
    

    

    return(
        <InputGroup className="mb-3 mt-3">
        <InputGroup.Text id="basic-addon1"> Source: </InputGroup.Text>
        <Form.Select size="sm" value={ props.onMain 
            ? props.selectedSource : props.newSourceForQuestion }
            
            onChange={
                (e) => { 

                    if( props.onMain ){
                        props.setSelectedSource (e.target.value); 
                        props.setPage(0); 
                    }else{
                        props.setNewSourceForQuestion( e.target.value );
                    }
                        

                    
                    console.log( e.target.value );
                
                }
                
                }
        
        >
            <option value=""> </option>
           
            { sourceOptions }
            
        </Form.Select>
        </InputGroup>

    )

}
export default SelectSources;