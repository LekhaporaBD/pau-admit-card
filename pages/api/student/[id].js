import {MongoClient} from 'mongodb';

export default async(req, res) => {
  const client = await MongoClient.connect('mongodb+srv://admitCard:admitPassword@cluster0.nblcl.mongodb.net/admitCard?retryWrites=true&w=majority');

  const studentId = req.query.studentId;

  if(req.method === 'GET'){
    const db = client.db();
    const data = await db.collection('studentInfo').findOne({ID: studentId});
    res.status(200).json(data);
  }
  client.close();
}

