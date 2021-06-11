<script>
    import meetups from "./Meetups/meetups-store.js";
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import Button from "./UI/Button.svelte";
    import EditMeetup from "./Meetups/EditMeetup.svelte";
    import MeetupDetails from "./Meetups/MeetupDetails.svelte";
    import LoadingSpinner from "./UI/LoadingSpinner.svelte";
    import Error from "./UI/Error.svelte";

    let editMode;
    let editedId;
    let page = "overview";
    let pageData = {};
    let isLoading = true;
    let error;

    fetch("https://meetups-organizer-default-rtdb.firebaseio.com/meetups.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Fetching meetups failed");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            const loadedMeetups = [];
            for (const key in data) {
                loadedMeetups.push({
                    ...data[key],
                    id: key,
                });
            }

            // intentionally delaying the request by a second to show a loading screen
            setTimeout(() => {
                isLoading = false;
                meetups.setMeeups(loadedMeetups.reverse());
            }, 1000);
        })
        .catch((err) => {
            error = err;
            isLoading = false;
            console.log(err);
        });

    function savedMeetup(event) {
        editMode = null;
        editedId = null;
    }

    function cancelEdit() {
        editMode = null;
        editedId = null;
    }

    function showDetails(event) {
        page = "details";
        pageData.id = event.detail;
    }

    function closeDetails() {
        page = "overview";
        pageData = {};
    }

    function startEdit(event) {
        editMode = "edit";
        editedId = event.detail;
    }

    function clearError() {
        error = null;
    }
</script>

{#if error}
    <Error message={error.message} on:cancel={clearError} />
{/if}
<Header />
<main>
    {#if page === "overview"}
        {#if editMode === "edit"}
            <EditMeetup
                id={editedId}
                on:save={savedMeetup}
                on:cancel={cancelEdit}
            />
        {/if}
        {#if isLoading}
            <LoadingSpinner />
        {:else}
            <MeetupGrid
                meetups={$meetups}
                on:showdetails={showDetails}
                on:edit={startEdit}
                on:add={() => (editMode = "edit")}
            />
        {/if}
    {:else}
        <MeetupDetails id={pageData.id} on:close={closeDetails} />
    {/if}
</main>

<style>
    main {
        margin-top: 5rem;
    }
</style>
