import Button from 'react-bootstrap/Button';
import { FaJava } from 'react-icons/fa'
import { FaReact, FaHtml5 } from 'react-icons/fa'
import { FaGitAlt } from 'react-icons/fa'
import { GrMysql } from 'react-icons/gr'
import { SiSpring, SiKubernetes, SiCss3,SiJavascript } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'




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
        <div className='text-center'>
          {
            props.availableTopics.map((theTopic,index)=>(
              <Button key={index} 
                  variant="outline-dark" 
                  className='mb-3'
                  onClick={ () => { props.setTopic(theTopic); props.setPage(0) }} >
                      
                      { theTopic === "Java" && < FaJava className='me-3'/> }
                      { theTopic === "React" && < FaReact className='me-3'/> }
                      { theTopic === "Git" && < FaGitAlt className='me-3'/> }
                      { theTopic === "MySQL" && < GrMysql className='me-3'/> }
                      { theTopic === "Spring Boot" && <SiSpring  className='me-3'/> }
                      { theTopic === "AWS" && <FaAws  className='me-3'/> }
                      { theTopic === "Kubernetes" && <SiKubernetes  className='me-3'/> }
                      { theTopic === "HTML" && <FaHtml5  className='me-3'/> }
                      { theTopic === "CSS" && <SiCss3  className='me-3'/> }
                      { theTopic === "Javascript" && <SiJavascript  className='me-3'/> }
                        
                      { theTopic } 
                      
                      </Button>
          ))

          }
        
        </div>
      );
}

export default AvailableTopicsButtons;