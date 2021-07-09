import {MongoClient} from 'mongodb';

export default async(req, res) => {
  const client = await MongoClient.connect('mongodb+srv://admitCard:admitPassword@cluster0.nblcl.mongodb.net/admitCard?retryWrites=true&w=majority' , { useUnifiedTopology: true });


  const { query : {id : ID} , method } = req

  if(method === 'GET'){
    const db = client.db();
     const data = await db.collection('studentInfo').findOne({ID});

      if(!data) { res.status(200).json({notFound : true}); }
      else {
        res.status(200).json(data);
      }
  }
  

else if(method === 'PUT'){
  const db = client.db();

  try{ 
   const data = await db.collection('studentInfo').updateOne( {ID : req.body.ID} , 
    {
      $set :{
        [' Cumulative Dues '] : req.body[' Cumulative Dues '],
        havePermission : req.body.havePermission
      }
   } );


  if(!data) { res.status(400).json({error : ' in if'}); }

    res.status(200).json(data);
  }
  catch(error){
    res.status(400).json({error : 'in catch'});
  }
}


  client.close();
}