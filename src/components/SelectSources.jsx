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
        (s)  => <option 
                value={ s.id } 
                key = { s.id } 
                > 
                            { s.name } 
            </option>
        
    )
    

    const getLink = ( id ) => {
    
        if( !id ){
            props.setSelectedSource( {id:""} );
            return;
        }
        for (let source of props.sources._embedded.sourceModelList ) {
            console.log("NAME ", source.name );
            if (source.id == id ){
               
                props.setSelectedSource( source );
                break;
            } 
          }
        
    }
    

    return(
        <InputGroup className="mb-3 mt-3">
        <InputGroup.Text id="basic-addon1"> Source: </InputGroup.Text>
        <Form.Select size="sm" 
        
            value={ props.onMain 
            ? props.selectedSource.id 
            : props.newSourceForQuestion }
            
            onChange={
                (e) => { 

                    if( props.onMain ){
                        
                        getLink( e.target.value ) ;
                        props.setPage(0); 
                    }else{
                        props.setNewSourceForQuestion( e.target.value );
                    }
                        

                
                }
                
                }
        
        >
            <option value=""
            
            > </option>
           
            { sourceOptions }
            
        </Form.Select>
        </InputGroup>

    )

}
export default SelectSources;