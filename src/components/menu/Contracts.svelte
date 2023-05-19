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

<div class="contracts">
	<ul class="contracts-header">
		<li class="title">
			Contracts
		</li>
		<li>
			<button>
				<i class="fas fa-sync-alt"></i>
			</button>
		</li>
		<li>
			<button>
				<i class="fas fa-folder"></i>
			</button>
		</li>
	</ul>
	<ul class="contracts-list">
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

		&-header,
		&-list {
			display: flex;
			padding: 0;
			margin: 0;
			width: 100%;
			list-style: none;
			flex-shrink: 0;
		}

		&-header {

			margin-bottom: 8px;

			li,
			button {
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}

			li {
				margin-left: 5px;
			}

			.title {
				margin-left: 0;
				margin-right: auto;
				color: #B7B9BC;
				font-weight: 500;
				font-size: 15px;
			}

			button {
				border: 0px solid transparent;
				padding: 6px 8px;
				background: #2F2E33;
				border-radius: 3px;
				color: #B7B9BC;
				font-size: 12px;
				cursor: pointer;

				&:hover {
				    background: #3A3940;
				}
			}
		}

		&-list {
			flex-grow: 1;
			flex-direction: column;

			li, .contract {
				display: inline-flex;
				align-items: center;
				width: 100%;
			}
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
