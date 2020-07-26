$(function(){

    //Creates Pass and Fail Array
    var passValueArray = ["wqry", "pxza", "plgk"];
    var failValueArray = ["vftd", "yuyt", "guzx"];
    
    //Creates codenames
    var codeNamesArray = ["dinosaur","conception", "movie"];
    
    //Random number generator
    var randomSelector = Math.floor(Math.random() * 3); 
    
    //Randomly chooses the pass and fail values
    var passValue = passValueArray[randomSelector];
    var failValue = failValueArray[randomSelector];
    
    //Inputs pass and fail codes
    $("#passCode").text(passValue);
    $("#failCode").text(failValue);
    
    
    $("#test").click(function(){
        
        //Collects entered in input 
        var codeNameSelector = parseInt( $("#nameGen").val() );
        
        console.log(codeNameSelector);
        
        if ( isNaN(codeNameSelector) || codeNameSelector >= 3){
            $("#codeName").text("Please enter a correct number");
        }
        else{
            //Randomly chooses the pass and fail values
            var codeName = codeNamesArray[codeNameSelector];
        
            $("#codeName").text(codeName);
        }
        
        
    })
    
    
    //Submit command
    $("#commandSubmit").click(function(){
       
        
        //Collects entered in input 
        var inputValue = $("#pPhrase").val();
        
    
        //Data Trap for Invalid Entry
        if( -1 == $.inArray( inputValue, passValueArray ) && -1 == $.inArray( inputValue, passValueArray ) ){
           
            $("#result").text("Invalid Entry");
            
        }
        
        //Win If Statement
        if( -1 != $.inArray( inputValue, passValueArray ) ){
            
            if (randomSelector == $.inArray( inputValue, passValueArray ) ){
                $("#result").text("Nice Try but don't type in your own code");
            }
            else{
                 $("#result").text("Red Wins");
            }
           
            
        }
        
        //Loose If Statement
        if( -1 != $.inArray( inputValue, failValueArray ) ){
            if (randomSelector == $.inArray( inputValue, failValueArray ) ){
            }
            else{
               $("#result").text("Red Looses"); 
            }
            
            
        }
    
    });

    
})