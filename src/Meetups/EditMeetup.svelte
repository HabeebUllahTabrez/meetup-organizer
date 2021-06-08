<script>
    import { createEventDispatcher } from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";
    import { isEmpty, isValidEmail } from "../helpers/validation.js";
    import { loop_guard } from "svelte/internal";

    let title = "";
    let subtitle = "";
    let imageUrl = "";
    let description = "";
    let address = "";
    let email = "";

    let isFormValid = false;

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: descriptionValid = !isEmpty(description);
    $: addressValid = !isEmpty(address);
    $: emailValid = isValidEmail(email);
    $: isFormValid = titleValid && subtitleValid && imageUrlValid && descriptionValid && addressValid && emailValid;
    
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
        <Button type="button" on:click={submitForm} disabled={!isFormValid}>Save</Button>
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
