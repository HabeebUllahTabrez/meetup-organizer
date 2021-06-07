<script>
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import Button from "./UI/Button.svelte";
    import EditMeetup from "./Meetups/EditMeetup.svelte";

    let meetups = [
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
            subtitle: "Creators from all around the world!",
            description:
                "IN this meetup, we will have get an opportunity to meet your favourite content creator!",
            imageUrl:
                "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Feventimages.insider.in%2Fimage%252Fmain%252FCbDosPFQGCiBH2pKnydn_YTFF_Insider_658x360_event.jpg",
            address:
                "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,  Bangalore-560016",
            contactEmail: "youtube@fanfest.com",
            isFavourite: false,
        },
    ];

    let editMode;

    function addMeetup(event) {
        const newMeetup = {
            id: Math.random().toString(),
            ...event.detail,
        };

        meetups = [newMeetup, ...meetups];
        editMode = null;
    }

    function cancelEdit() {
        editMode = null;
    }

    function toggleFavourite(event) {
        const id = event.detail;
        const updatedMeetup = { ...meetups.find((m) => m.id === id) };
        updatedMeetup.isFavourite = !updatedMeetup.isFavourite;
        const meetupIndex = meetups.findIndex((m) => m.id === id);
        const updatedMeetups = [...meetups];
        updatedMeetups[meetupIndex] = updatedMeetup;
        meetups = updatedMeetups;
    }
</script>

<Header />
<main>
    <div class="meetup-controls">
        <Button on:click={() => (editMode = "add")}>New Meetup</Button>
    </div>
    {#if editMode === "add"}
        <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid {meetups} on:togglefavourite={toggleFavourite} />
</main>

<style>
    main {
        margin-top: 5rem;
    }
    .meetup-controls {
        margin: 1rem;
    }
</style>
