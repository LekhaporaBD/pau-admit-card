import {MongoClient} from 'mongodb';

export default async(req, res) => {
  const client = await MongoClient.connect('mongodb+srv://admitCard:admitPassword@cluster0.nblcl.mongodb.net/admitCard?retryWrites=true&w=majority' , { useUnifiedTopology: true });


  const { query : {id : ID} , method } = req

  if(method === 'GET'){
    const db = client.db();


    try{
     const data = await db.collection('studentInfo').findOne({ID});

     if(!data) { res.status(400).json({error : error}); }

      res.status(200).json(data);
    }
    catch(error){
      res.status(400).json({error : error});
    }
  }
  

  else if(method === 'PUT'){
    const db = client.db();
// console.log(req.body._id);

    try{
     const data = await db.collection('studentInfo').findOneAndUpdate( ID , req.body , { new : true });
console.log(data);

    if(!data) { res.status(400).json({error : error}); }

      res.status(200).json(data);
    }
    catch(error){
      res.status(400).json({error : error});
    }
  }

  client.close();
}

