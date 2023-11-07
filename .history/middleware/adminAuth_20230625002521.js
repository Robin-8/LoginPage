const isLogin = async(req,res,next)=>{
    try {
        
        if(req.session.user_id){}

        else{

            res.redirect('/admin');
        }

        

    } catch (error) {
        console.log(error.message);
    }
}