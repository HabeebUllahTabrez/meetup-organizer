<script>
    import Modal from "./Modal.svelte";

    export let message;
</script>

<Modal title="An error Occured!" on:cancel>
    <p>{message}</p>
</Modal>