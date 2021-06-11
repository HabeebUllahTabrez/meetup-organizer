<script>
    import { createEventDispatcher } from "svelte";
    import meetups from "./meetups-store";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";
    import { isEmpty, isValidEmail } from "../helpers/validation.js";

    export let id = null;

    let title = "";
    let subtitle = "";
    let imageUrl = "";
    let description = "";
    let address = "";
    let email = "";

    if (id) {
        const unsubscribe = meetups.subscribe((items) => {
            const selectedMeetup = items.find((i) => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            imageUrl = selectedMeetup.imageUrl;
            description = selectedMeetup.description;
            address = selectedMeetup.address;
            email = selectedMeetup.contactEmail;
        });

        unsubscribe();
    }

    let isFormValid = false;

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: descriptionValid = !isEmpty(description);
    $: addressValid = !isEmpty(address);
    $: emailValid = isValidEmail(email);
    $: isFormValid =
        titleValid &&
        subtitleValid &&
        imageUrlValid &&
        descriptionValid &&
        addressValid &&
        emailValid;

    const dispatch = createEventDispatcher();

    function submitForm() {
        const meetupData = {
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail: email,
        };

        if (id) {
            fetch(
                `https://meetups-organizer-default-rtdb.firebaseio.com/meetups/${id}.json`,
                {
                    method: "PATCH",
                    body: JSON.stringify(meetupData),
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("An error occured!");
                    }
                    meetups.updateMeetup(id, meetupData);
                })
                .catch((err) => console.log(err));
        } else {
            fetch(
                "https://meetups-organizer-default-rtdb.firebaseio.com/meetups.json",
                {
                    method: "POST",
                    body: JSON.stringify({ ...meetupData, isFavourite: false }),
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("An error occured!");
                    }
                    return res.json();
                })
                .then((data) => {
                    meetups.addMeetup({
                        ...meetupData,
                        isFavourite: false,
                        id: data.name,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        dispatch("save");
    }

    function deleteMeetup() {
        fetch(
                `https://meetups-organizer-default-rtdb.firebaseio.com/meetups/${id}.json`,
                {
                    method: "DELETE",
                }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("An error occured!");
                    }
                    meetups.removeMeetup(id);
                })
                .catch((err) => console.log(err));
        dispatch("save");
    }

    function cancel() {
        dispatch("cancel");
    }
</script>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput
            id="title"
            label="Title"
            valid={titleValid}
            validityMessage="Please enter a valid title."
            type="text"
            value={title}
            on:input={(event) => (title = event.target.value)}
        />
        <TextInput
            id="subtitle"
            label="Subtitle"
            valid={subtitleValid}
            validityMessage="Please enter a valid subtitle."
            type="text"
            value={subtitle}
            on:input={(event) => (subtitle = event.target.value)}
        />
        <TextInput
            id="address"
            label="Address"
            valid={addressValid}
            validityMessage="Please enter a valid address."
            type="text"
            value={address}
            on:input={(event) => (address = event.target.value)}
        />
        <TextInput
            id="imageUrl"
            label="Image URL"
            valid={imageUrlValid}
            validityMessage="Please enter a valid image url."
            type="text"
            value={imageUrl}
            on:input={(event) => (imageUrl = event.target.value)}
        />
        <TextInput
            id="email"
            label="Email"
            valid={emailValid}
            validityMessage="Please enter a valid email."
            type="email"
            value={email}
            on:input={(event) => (email = event.target.value)}
        />
        <TextInput
            id="description"
            label="Description"
            valid={descriptionValid}
            validityMessage="Please enter a valid description."
            controlType="textarea"
            type="text"
            value={description}
            on:input={(event) => (description = event.target.value)}
        />
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!isFormValid}
            >Save</Button
        >
        <Button on:click={deleteMeetup}>Delete</Button>
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
