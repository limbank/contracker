<script>
	const { ipcRenderer } = require('electron');

	export let settings = {};
	export let loading = false;
	export let settingsOpen;
</script>

<div
	class="desktop"
>
	<slot></slot>
</div>

<style lang="scss">
	.desktop {
		background: rgba(47, 46, 51, 1);
		flex-grow: 1;
		border-radius: 3px;
		display: flex;
		overflow: hidden;
		position: relative;
	}
</style>
