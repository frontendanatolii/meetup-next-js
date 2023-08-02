import { MongoClient, ObjectId } from "mongodb";
import { MeetUpDetail } from "../../components/meetups/MeetupDetail";

const MeetupDetails = ({ meetupData }) => {
  return (
    <MeetUpDetail
      imageUrl={meetupData.imageUrl}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  )  
};

export const getStaticPaths = async() => {
  const uri =
    'mongodb+srv://probro12356:xoamEy4vrJ9V8691@cluster0.wbgjpqc.mongodb.net/?retryWrites=true&w=majority';

  const client = await MongoClient.connect(uri);

  const collection = client.db('meetup').collection('meetups');

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })) 
  }
};

export const getStaticProps = async(context) => {
  const meetupId = context.params.meetupId;

  const uri =
    'mongodb+srv://probro12356:xoamEy4vrJ9V8691@cluster0.wbgjpqc.mongodb.net/?retryWrites=true&w=majority';

  const client = await MongoClient.connect(uri);

  const collection = client.db('meetup').collection('meetups');

  const selectedMeetup = await collection.find({_id: new ObjectId(meetupId)}).toArray();

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup[0]._id.toString(),
        title: selectedMeetup[0].title,
        address: selectedMeetup[0].address,
        imageUrl: selectedMeetup[0].imageUrl,
        description: selectedMeetup[0].description,
      },
    }
  }
}

export default MeetupDetails;
