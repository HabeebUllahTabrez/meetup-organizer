<script>
    import { createEventDispatcher } from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";

    let title = "";
    let subtitle = "";
    let imageUrl = "";
    let description = "";
    let address = "";
    let email = "";

    const dispatch = createEventDispatcher();

    function submitForm() {
        dispatch("save", {
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail: email,
        });
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
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}
            >Cancel</Button
        >
        <Button type="button" on:click={submitForm}>Save</Button>
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
