<script>
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import TextInput from "./UI/TextInput.svelte";
    import Button from "./UI/Button.svelte";

    let title = "";
    let subtitle = "";
    let imageUrl = "";
    let description = "";
    let address = "";
    let email = "";

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
                "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
            contactEmail: "youtube@fanfest.com",
        },
    ];

    function addMeetup() {
        const newMeetup = {
            id: Math.random().toString(),
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail: email,
        };

        meetups = [newMeetup, ...meetups];
    }
</script>

<Header />
<main>
    <form on:submit|preventDefault={addMeetup}>
        <TextInput
            id="title"
            label="Title"
            type="text"
            value={title}
            on:input={(event) => (title = event.target.value)}
        />
        <TextInput
            id="subtitle"
            label="Subtitle"
            type="text"
            value={subtitle}
            on:input={(event) => (subtitle = event.target.value)}
        />
        <TextInput
            id="address"
            label="Address"
            type="text"
            value={address}
            on:input={(event) => (address = event.target.value)}
        />
        <TextInput
            id="imageUrl"
            label="Image URL"
            type="text"
            value={imageUrl}
            on:input={(event) => (imageUrl = event.target.value)}
        />
        <TextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            on:input={(event) => (email = event.target.value)}
        />
        <TextInput
            id="description"
            label="Description"
            controlType="textarea"
            type="text"
            value={description}
            on:input={(event) => (description = event.target.value)}
        />
        <Button type="submit" caption="Save" />
    </form>
    <MeetupGrid {meetups} />
</main>

<style>
    main {
        margin-top: 5rem;
    }
    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>
