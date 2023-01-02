import Button from 'react-bootstrap/Button';
import { FaJava } from 'react-icons/fa'


function AvailableTopicsButtons( props ){

let icon;


    if ( props.isLoadingAvailableTopics ) {
        return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
               }}>Loading the data {console.log("loading state")}</div>
      );
      }

      return(
        props.availableTopics.map((theTopic,index)=>(
            <Button key={index} 
                variant="outline-dark" 
                className='mb-3'
                onClick={ () => props.setTopic(theTopic)} >
                    
                    { theTopic === "Java" && < FaJava className='me-3'/> }
                    { theTopic } 
                    
                    </Button>
        ))
      );
}

export default AvailableTopicsButtons;