import {MongoClient} from 'mongodb';

export default async(req, res) => {
  const client = await MongoClient.connect('mongodb+srv://admitCard:admitPassword@cluster0.nblcl.mongodb.net/admitCard?retryWrites=true&w=majority');

  // const studentId = req.query.studentId;
  // console.log(studentId)

  const { query : {id : ID} , method } = req
console.log(ID);

  if(method === 'GET'){
    const db = client.db();
    const data = await db.collection('studentInfo').findOne({ID});

    try{
      res.status(200).json(data);
    }
    catch(error){
      res.status(400).json({error : error});
    }
  }
  client.close();
}

