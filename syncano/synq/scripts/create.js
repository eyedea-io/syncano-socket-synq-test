const firstExampleResponse = META.metadata.response.examples[0]
const example = firstExampleResponse.example		
setResponse(new HttpResponse(		 
	firstExampleResponse.exit_code,		
	example,		
	META.metadata.response.mimetype		
))