import Button from 'react-bootstrap/Button';
import { FaJava } from 'react-icons/fa'
import { FaReact, FaHtml5 } from 'react-icons/fa'
import { FaGitAlt } from 'react-icons/fa'
import { GrMysql } from 'react-icons/gr'
import { SiSpring, SiKubernetes, SiCss3,SiJavascript, SiApachemaven, SiCplusplus } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { FiDatabase } from 'react-icons/fi'
import { GiComputing } from 'react-icons/gi'
import { BsDiagram3, BsPlusLg } from 'react-icons/bs'
import { CgTemplate } from 'react-icons/cg'
import { AiOutlineConsoleSql } from 'react-icons/ai'





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
                  onClick={ () => { 
                    props.setPage(0); 
                    props.setTopic(theTopic); 
                    props.setSelectedSource( "" );
                    props.setNewSource({...props.newSource, topic:theTopic }) }} >
                      
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
                      { theTopic === "Maven" && <SiApachemaven className='me-3'/> }
                      { theTopic === "Data Structures" && <FiDatabase className='me-3'/>}
                      { theTopic === "Algorithms" && <GiComputing className='me-3'/> }
                      { theTopic === "UML" && <BsDiagram3 className='me-3'/>}
                      { theTopic === "C++" && <SiCplusplus className='me-3' />}
                      { theTopic === "Templates" && <CgTemplate className='me-3' />}
                      { theTopic === "SQL" && <AiOutlineConsoleSql className='me-3' />}
                        
                      { theTopic } 
                      
                      </Button>
          ))

          }
        <Button variant="outline-dark" 
                  className='mb-3'
           onClick={ () => { 
            
            props.setTopic(""); 
            
            }}
        > NONE </Button>
        </div>
      );
}

export default AvailableTopicsButtons;