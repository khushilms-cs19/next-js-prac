//our-domain.com/
import { MongoClient } from 'mongodb';
import React, { useState, useEffect } from 'react'
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';
const DUMMY_DATA = [
    {
        id: "m1",
        title: "A First Meetup",
        image: "https://e0.365dm.com/21/05/2048x1152/skysports-f1-monaco_5387691.jpg",
        address: "Circuit de Monaco, Monaco",
        description: "This is our first meetup",
    },
    {
        id: "m2",
        title: "A First Meetup",
        image: "https://e0.365dm.com/21/05/2048x1152/skysports-f1-monaco_5387691.jpg",
        address: "Circuit de Monaco, Monaco",
        description: "This is our first meetup",
    },
    {
        id: "m3",
        title: "A First Meetup",
        image: "https://e0.365dm.com/21/05/2048x1152/skysports-f1-monaco_5387691.jpg",
        address: "Circuit de Monaco, Monaco",
        description: "This is our first meetup",
    },
];

function HomePage(props) {
    // we do not need the code below since all the work is done by the getStaticProps function and the contents are passes to the props

    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     //send http requests
    //     setLoadedMeetups(DUMMY_DATA);
    // }, [])

    return (
        <React.Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active react meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </React.Fragment>
    )
}
/*
    1.  The next js will first look for the function getStaticProps that will be executed before the rendering of the page.
    2.  This can even be an asynchronous function that will never appear on the client side, instead, it will be run in the build process 
        and the contents will be fetched and added to the static page.
    3.  IMPORTANT: WKT, the contents will be fetched and static pages will be generated during the BUILD. 
        Hence if the contents are updated in the backend, we need to build the contents again, we need something to update the contents of the static pages. The revalidate property can be added which will build the pages with the contents after every interval until it gets requests.
        (10 seconds according to the example given below)
*/


export const getStaticProps = async () => {
    //fetch the data from the database
    const client = await MongoClient.connect(process.env.REACT_APP_MONGODB_LINK);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const results = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: results.map((meetup) => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString(),
                }
            }),
        },
        revalidate: 10,
    }
}

/*
*
*
*
*
*
*
*
*
*
*/
/* 
    1.  There is another alternative to getStaticProps function, which is the getServerSideProps function which will run on the server side.
    2.  It will build the page for every requests. This function will run only on the server. 
    3.  It does not have the revalidate property.
*/
// export const getServerSideProps = (context) => {
//     //fetch the data from the database.
//     const req = context.req;
//     const res = context.res;
//     console.log(req);
//     return {
//         props: {
//             meetups: DUMMY_DATA,
//         }
//     }
// }

export default HomePage;