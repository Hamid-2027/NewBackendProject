class ApiError extends Error {

    constructor( // Error tack on node.js so we can overriding it.
       statusCode,
       message= "Something went wrong",
       errors =[],
       stack=""
    ){
        super(message) // for override 
        this.statusCode = statusCode
        this.data= null
        this.message= message
        this.success= false
        this.errors= errors

        if (stack){
            this.stack= stack
        }else{
            Error.captureStackTrace(this, this.constrctor) // accept as it is 
        }
    }
}

export { ApiError }
