module.exports = async function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        try {
            next();
        } catch (error) {
            res.status(403);
            res.send("You are not authenticated!");
            
            return;
        }
    }else{
        res.status(403);
        res.send("You are not authenticated!");

        return;
    }
}