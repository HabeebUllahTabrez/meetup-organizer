<script>
    import { createEventDispatcher } from "svelte";
    import meetups from "./meetups-store";
    import Button from "../UI/Button.svelte";
    import Badge from "../UI/Badge.svelte";

    export let id;
    export let title;
    export let subtitle;
    export let image;
    export let description;
    export let address;
    export let email;
    export let isFav;

    let isLoading = false;

    const dispatch = createEventDispatcher();

    function toggleFavourite() {
        isLoading = true;
        fetch(
            `https://meetups-organizer-default-rtdb.firebaseio.com/meetups/${id}.json`,
            {
                method: "PATCH",
                body: JSON.stringify({ isFavourite: !isFav }),
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error("An error occured!");
                }
                isLoading = false;
                meetups.toggleFavourite(id);
            })
            .catch((err) => {
                console.log(err);
                isLoading = false;
            });
    }
</script>

<article>
    <header>
        <h1>
            {title}
            {#if isFav}
                <Badge>FAVOURITE</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src={image} alt={title} />
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
        <Button mode="outline" on:click={() => dispatch("edit", id)}
            >Edit</Button
        >
        {#if isLoading}
            <span>Changing..</span>
        {:else}
            <Button
                mode="outline"
                colour={isFav ? null : "success"}
                on:click={toggleFavourite}
            >
                {isFav ? "Unfavourite" : "Favourite"}
            </Button>
        {/if}
        <Button on:click={() => dispatch("showdetails", id)}
            >Show Details</Button
        >
    </footer>
</article>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: "Roboto Slab", sans-serif;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.25rem;
        margin: 0;
    }

    div {
        text-align: right;
    }

    span {
        margin: 1rem;
    }

    .content {
        height: 4rem;
    }
</style>
