const isLogin = async(req,res,next)=>{
    try {
        
        if(req.session.user_id){}

        else{

            res.redirecrt()
        }

    } catch (error) {
        console.log(error.message);
    }
}