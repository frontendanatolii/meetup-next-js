import { MongoClient } from 'mongodb';
 
async function handler(req, res) {
  if (req.method === 'POST') {

    try {
      const data = req.body;
 
      const uri =
          'mongodb+srv://probro12356:xoamEy4vrJ9V8691@cluster0.wbgjpqc.mongodb.net/?retryWrites=true&w=majority';
     
      const client = await MongoClient.connect(uri);
     
      const collection = client.db('meetup').collection('meetups');
     
      const result = await collection.insertOne(data);

      console.log(result);
     
      client.close();
     
      res.status(201).json({ message: 'Meetup inserted!' });
    } catch (err) {
      console.log(err);
    }
  }
}
 
export default handler;