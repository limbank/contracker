<script>
	import Titlebar from './components/Titlebar.svelte';
	import Desktop from './components/Desktop.svelte';
	import Backdrop from './components/Backdrop.svelte';
	import Actions from './components/Actions.svelte';
	import Menu from './components/menu/Menu.svelte';
	import Loader from './components/common/Loader.svelte';

	const { ipcRenderer } = require('electron');
	const { version } = require('../package.json');

	let settings = {};
	let proxySettings;

	let initUpdate = 0;

	let loading = false;

	ipcRenderer.on('loading', (event, arg) => {
		loading = arg;
	});

	ipcRenderer.on('settings', (event, arg) => {
		settings = arg;
		initUpdate++;

		if (initUpdate < 2) proxySettings = settings;
	});
</script>

<Backdrop />

<main>
	<Titlebar
		{version}
		tips={settings.tooltips}
	/>
	
	
	<Desktop
		settings={proxySettings}
		bind:loading
	>

		{#if loading}
			<Loader />
		{/if}

		<Menu
			settings={proxySettings}
			tips={settings.tooltips}
			{version}
		/>
		<Actions />
	</Desktop>
</main>

<style lang="scss">
	main {
		position: fixed;
		box-sizing: border-box;
		z-index: 2;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		padding: 30px 5px 5px;
	}
</style>
