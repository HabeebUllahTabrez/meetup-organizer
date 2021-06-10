<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import MeetupItem from "./MeetupItem.svelte";
    import MeetupFilter from "./MeetupFilter.svelte";
    import Button from "../UI/Button.svelte";
    export let meetups;

    let favsOnly = false;

    const dispatch = createEventDispatcher();

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavourite) : meetups;

    function setFilter(event) {
        favsOnly = event.detail === 1;
    }
</script>

<section id="meetup-controls">
    <MeetupFilter on:select={setFilter}/>
    <Button on:click={() => dispatch("add")}>New Meetup</Button>
</section>
<section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
        <div transition:fade animate:flip={{ duration: 350 }} >
            <MeetupItem
            id={meetup.id}
            title={meetup.title}
            image={meetup.imageUrl}
            subtitle={meetup.subtitle}
            address={meetup.address}
            description={meetup.description}
            email={meetup.contactEmail}
            isFav={meetup.isFavourite}
            on:showdetails
            on:edit
        />
        </div>
    {/each}
</section>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    #meetup-controls {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
