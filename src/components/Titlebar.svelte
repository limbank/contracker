<script>
	import Control from './common/Control.svelte';

	const { ipcRenderer } = require('electron');

	export let tips = false;
	export let version;

	let pinned = false;
	let maximized = false;

	ipcRenderer.on('pin', (event, arg) => { pinned = arg; });
	ipcRenderer.on('max', (event, arg) => { maximized = arg; });
</script>

<div class="titlebar">
	<div class="titlebar-group">
	</div>
	<div class="titlebar-group">
		{#if version}
			<span class="version">v. {version}</span>
		{/if}
		<Control
			{tips}
			size="13px"
			tiptext="Pin to top"
			 on:click={e => { ipcRenderer.send('window', 'pin'); }}
		>
	    	<i class="fas fa-thumbtack" class:pinned></i>
		</Control>
		<Control
			{tips}
			tiptext="Minimize"
			on:click={e => { ipcRenderer.send('window', 'minimize'); }}
		>
	    	<i class="fas fa-minus"></i>
		</Control>
		<Control
			{tips}
			tiptext={maximized ? "Restore" : "Maximize"}
			on:click={e => { ipcRenderer.send('window', 'maximize'); }}
		>
			<i class="fas fa-plus"></i>
		</Control>
		<Control
			{tips}
			persistent={true}
			tiptext="Close"
			on:click={e => { ipcRenderer.send('window', 'close'); }}
		>
	    	<i class="fas fa-times"></i>
		</Control>
	</div>

</div>

<style lang="scss">
	.titlebar {
		position: absolute;
		z-index: 9;
		top: 0;
		right: 0;
		left: 0;
		height: 30px;
		display: flex;
		justify-content: space-between;
	   	user-select: none;
	   	-webkit-user-select: none;
   		-webkit-app-region: drag;
   		padding: 5px;
		box-sizing: border-box;

   		&.legacy {
   			border-bottom: 2px solid #3F3F3F;
   			padding: 0 10px 10px;
   			height: 35px;
   		}

   		&-group {
   			display: flex;
			justify-content: flex-end;
   		}

   		.version {
   			color: #2F2E33;
   			font-size: 10px;
   			font-weight: bold;
   			margin-right: 2px;
   			display: inline-flex;
   			align-items: center;
   			justify-content: center;
			height: 20px;
			pointer-events: none;
   		}
	}

	i.pinned {
		transform: rotate(-45deg);
	}
</style>