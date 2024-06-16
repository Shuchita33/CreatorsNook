import jwt from 'jsonwebtoken';
const auth=async(req,res,next)=>{
    try { //checking if the user is really who he's claiming to be
        //check if the token is valid
        const token= req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        
        let decodedData;
        if(token && isCustomAuth){            
            decodedData= jwt.verify(token,process.env.SECRET_KEY);
            // console.log(decodedData);
            req.userId=decodedData?.id;
        }
        else{
            const parsedToken=JSON.parse(token); 
            // console.log(parsedToken)       
            req.userId=parsedToken?.sub;
        }
        next();    //pass action to next functionality that user wants to 
    } catch (error) {
        console.log(error);
    }
}
export default auth;