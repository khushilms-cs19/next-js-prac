//our-domain.com/[meetupId]
import React from 'react'
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
function MeetupDetails(props) {
    return (
        <React.Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </React.Fragment>
    )
}

export const getStaticPaths = async () => {
    const client = await MongoClient.connect(process.env.REACT_APP_MONGODB_LINK);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}).toArray();

    client.close();
    return {
        fallback: true,
        paths: meetups.map((meetup => ({
            params: {
                meetupId: meetup._id.toString(),
            }
        }))),
    }
}
// [
//     {
//         params: {
//             meetupId: "m1",
//         },
//     },
//     {
//         params: {
//             meetupId: "m2",
//         },
//     }
// ]

export const getStaticProps = async (context) => {
    //fetch data from the database
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(process.env.REACT_APP_MONGODB_LINK);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    client.close()
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        }
    }
}

export default MeetupDetails;