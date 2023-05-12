<script>
	import { onMount } from 'svelte';
	const { ipcRenderer } = require('electron');

	export let contracts = [];

    ipcRenderer.on('contracts', (event, arg) => {
    	console.log("Got contracts back...");
    	contracts = arg;
    	console.log(contracts);
	});

	onMount(async () => {
		console.log("Sending request for contracts...");

		ipcRenderer.send('contracts:get');
	});
</script>

<div>
	<ul class="contracts">
		{#each contracts as contract}
			<li>
				<span class="contract">
					<span class="contract-icon">
						<i class="fas fa-pager"></i>
					</span>
					<span class="contract-title">
						{contract.title}
					</span>
					<span class="contract-progress">
						0/10
					</span>
				</span>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.contracts {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;

		li, .contract {
			display: inline-flex;
			align-items: center;
			width: 100%;
		}

		.contract {
			padding: 5px 8px;
			background: #2F2E33;
			border-radius: 3px;
			color: #B7B9BC;
			justify-content: flex-start;
			margin-bottom: 10px;

			&-icon {
				font-size: 16px;
				margin-right: 8px;
				height: 19px;
				width: 19px;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}

			&-progress,
			&-title {
				font-size: 14px;
			}

			&-progress {
				margin-left: auto;
			}
		}
	}
</style>
