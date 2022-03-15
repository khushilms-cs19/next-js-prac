//our-domain.com/new-meetup

import React from 'react';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';
import Head from "next/head";
function NewMeetupPage() {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        console.log(data);
        router.replace("/");
    }
    return (
        <React.Fragment>
            <Head>
                <title>New Meetup</title>
                <meta name="description" content="Add a new react meetup" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </React.Fragment>
    )
}

export default NewMeetupPage;