import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>
          Next Meetups
        </title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
};


export const getStaticProps = async() => {
  const uri =
    'mongodb+srv://probro12356:xoamEy4vrJ9V8691@cluster0.wbgjpqc.mongodb.net/?retryWrites=true&w=majority';

  const client = await MongoClient.connect(uri);

  const collection = client.db('meetup').collection('meetups');

  const meetupsFromServer = await collection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetupsFromServer.map(meetup => {
        return {
          title: meetup.title,
          imageUrl: meetup.imageUrl,
          address: meetup.address,
          id: meetup._id.toString(),
        }
      }),
    },
    revalidate: 1,
  }
}

export default HomePage;