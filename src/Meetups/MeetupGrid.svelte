<script>
    import MeetupItem from "./MeetupItem.svelte";
    export let meetups;
</script>

<section id="meetups">
    {#each meetups as meetup, i}
        <MeetupItem
            title={meetup.title}
            image={meetup.imageUrl}
            subtitle={meetup.subtitle}
            address={meetup.address}
            description={meetup.description}
            email={meetup.contactEmail}
        />
    {/each}
</section>

<style>
    section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        section {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
