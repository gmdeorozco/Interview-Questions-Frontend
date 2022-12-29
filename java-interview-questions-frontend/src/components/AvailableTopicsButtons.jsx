import Button from 'react-bootstrap/Button';


function AvailableTopicsButtons( props ){
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
                    
                    {theTopic}</Button>
        ))
      );
}

export default AvailableTopicsButtons;