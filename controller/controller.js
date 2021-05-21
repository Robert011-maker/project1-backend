let userdb=require('../server/models/model');

exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:'Content can be empty'});
    }
    const user=new userdb({
        name:req.body.name,
        email:req.body.email,
        balance:req.body.balance,
    })
// console.log(`${user.name}`)
    user
       .save(user)
       .then(data=>{
           res.redirect('/home/transfermoney/VieallCustomers');
       })
       .catch(err=>{
        //    console.log('error');
           res.status(500).send({
               message:err.message || "some error occured while creating a databse"
           });
       });
}



//retreive all users

exports.findAll=(req,res) => {
    userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({
            messahe:err.message || 'Error occurred while geeting required'
        })
    });
}

exports.findOne=(req,res)=>{
    let id = req.query.id;
    userdb.findOne({id:id})
    .then(data => {
        if(!data){
            res.status(404).send({message:`not found any data related to id ${id}`})
        } else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:`Error to getting data with id ${id}`})
    })
}

