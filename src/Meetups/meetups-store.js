import { writable } from "svelte/store";

const meetups = writable([
    {
        id: "m1",
        title: "Coding Bootcamp",
        subtitle: "Learn to code in 2 hours",
        description:
            "In this meetup, we will have some experts who will teach you how to code!",
        imageUrl:
            "https://www.fluentin3months.com/wp-content/uploads/2018/12/language-meetup.jpg",
        address:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        contactEmail: "code@test.com",
        isFavourite: false,
    },
    {
        id: "m2",
        title: "Youtube Fanfest",
        subtitle: "Creators from  all around the world!",
        description:
            "In this meetup, we will have get an opportunity to meet your favourite content creator!",
        imageUrl:
            "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Feventimages.insider.in%2Fimage%252Fmain%252FCbDosPFQGCiBH2pKnydn_YTFF_Insider_658x360_event.jpg",
        address:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,  Bangalore-560016",
        contactEmail: "youtube@fanfest.com",
        isFavourite: false,
    },
    {
        id: "m3",
        title: "Students Reunion",
        subtitle: "Do you wanna remember your college days?",
        description:
            "In this meetup, you can meet your college friends and get connected and maybe share some sweet memories together!",
        imageUrl:
            "https://1.bp.blogspot.com/-UjVD5Zpdb7E/X_aotqi00OI/AAAAAAAABTU/hPWdcnF0e1ANiv7qXAIaCrDHf5VKCuM1QCLcBGAsYHQ/w640-h360/Students_reunion.jpg",
        address:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,  Bangalore-560016",
        contactEmail: "engineering@college.com",
        isFavourite: true,
    },
]);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavourite: false,
        };
        meetups.update((items) => {
            return [newMeetup, ...items];
        });
    },
    updateMeetup: (id, meetupData) => {
        meetups.update((items) => {
            const meetupIndex = items.findIndex((m) => m.id === id);
            const updatedMeetup = { ...items[meetupIndex], ...meetupData };
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
    removeMeetup: (id) => {
        meetups.update((items) => {
            return items.filter(m => m.id !== id);
        });
    },
    toggleFavourite: (id) => {
        meetups.update((items) => {
            const updatedMeetup = { ...items.find((m) => m.id === id) };
            updatedMeetup.isFavourite = !updatedMeetup.isFavourite;
            const meetupIndex = items.findIndex((m) => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
};

export default customMeetupsStore;
