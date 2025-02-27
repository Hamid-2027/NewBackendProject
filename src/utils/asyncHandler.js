
// wrapper function
const asyncHandler=(requestHandler)=>{ // HOC
   return (req, res, next)=>{
        Promise.resolve(requestHandler(req,res, next)).
        catch((error)=>next(error))
    }
}


export {asyncHandler}

// const asyncHandler=(fun)=> async(req, res, next)=>{ // HOC >> const asyncHandler=(fun)=>{()=>{}}

//     try{
//         await fun(req, res, next);
//     }
//     catch(error ){
//        res.status(error.code||500).json({
//         success: false,
//         message:error.message
//        })
//     }

// }