
const isLogin = async(req,res,next)=>{

    try {

        if(req.session.user_id){}
        else{
            res.re
        }
    } catch (error) {
        console.log(error.message);
    }

}



const isLogout = async(req,res,next)=>{

    try {
        
        

    } catch (error) {
        console.log(error.message);
    }


}