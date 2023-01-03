const addLineSeparators = ( text, interval ) => {
    console.log("linesep")
    
    for( let i = 0; i < text.length-interval; i++ ){
      
        let lineBreakIndex = text.indexOf("\n" , i);
        
        if(lineBreakIndex > i+interval){
            let nextSpace = text.indexOf(" ", i+interval );

            if( text.substring( i+interval, nextSpace ).indexOf("\n") ===-1 
                && nextSpace > -1){
                text = text.slice(0, nextSpace) + '\n' + text.slice(nextSpace);
                text = text.slice(0,nextSpace+1) + text.slice(nextSpace+2);

                i=nextSpace+1;
            }
          
        } if( lineBreakIndex ===-1){
            let nextSpace = text.indexOf(" ", i+interval );

            if( nextSpace > -1){
                text = text.slice(0, nextSpace) + '\n' + text.slice(nextSpace);
                text = text.slice(0,nextSpace+1) + text.slice(nextSpace+2);
                i=nextSpace+1;
            }
        }

      
    }

    return text; 
  }

  export default addLineSeparators;