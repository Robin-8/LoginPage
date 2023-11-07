
const isLogin = async(req,res,next)=>{

    try {

        if(req.session.user_id){
            console.log('login')
        }
        else{
            console.log('logout')

            res.redirect('/home');
        }
        next();

    } catch (error) {
        console.log(error.message);
    }

}



const isLogout = async(req,res,next)=>{

    try {
        
        if(req.session.user_id){
            res.redirect('/home');
        }

        next();

    } catch (error) {
        console.log(error.message);
    }

}


module.exports ={
    isLogin,
    isLogout
};