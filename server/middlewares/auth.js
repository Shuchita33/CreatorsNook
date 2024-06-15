import jwt from 'jsonwebtoken';
const auth=async(req,res,next)=>{
    try { //checking if the user is really who he's claiming to be
        //check if the token is valid
        const token= req.headers.authorisation.split(" ")[1];
        const isCustomAuth=token.length<500;

        let decodedData;
        if(token && isCustomAuth){
            decodedData= jwt.verify(token,process.env.SECRET_KEY);
            req.userId=decodedData?.id;
        }
        else{
            decodedData=jwt.decode(token);
            req.userId=decodedData?.sub;
        }
        next();    //pass action to next functionality that user wants to 
    } catch (error) {
        console.log(error);
    }
}
export default auth;