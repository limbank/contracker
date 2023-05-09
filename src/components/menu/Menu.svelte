<script>
	import { createEventDispatcher } from 'svelte';

	import Control from '../common/Control.svelte';

	import Contracts from './Contracts.svelte';
	import Preview from './Preview.svelte';
	import Settings from './Settings.svelte';
	import About from './About.svelte';

	const dispatch = createEventDispatcher();

	let setWindow = "contracts";

	export let tips = false;
	export let settings;
	export let version;
</script>

<div
	class="settings-container"
>
	<div class="settings-container-sidebar">
		<ul class="settings-container-menu">
			<li
				class:active={setWindow=="contracts"}
			>
				<Control
					{tips}
					size="16px"
					tiptext="Contracts"
					on:click={e => { setWindow="contracts"; }}
				>
					<i class="fas fa-file"></i>
				</Control>
			</li>
			<li
				class:active={setWindow=="preview"}
			>
				<Control
					{tips}
					size="16px"
					tiptext="Preview"
					on:click={e => { setWindow="preview"; }}
				>
					<i class="fas fa-eye"></i>
				</Control>
			</li>
			<li
				class:active={setWindow=="settings"}
			>
				<Control
					{tips}
					size="16px"
					tiptext="Settings"
					on:click={e => { setWindow="settings"; }}
				>
					<i class="fas fa-cog"></i>
				</Control>
			</li>
			<li
				class:active={setWindow=="about"}
			>
				<Control
					{tips}
					size="16px"
					tiptext="About"
					on:click={e => { setWindow="about"; }}
				>
					<i class="fas fa-question"></i>
				</Control>
			</li>
		</ul>
	</div>
	<div class="settings-container-main">
		{#if setWindow=="contracts"}
			<div class="settings-w-inner">
				<Contracts {settings} />
			</div>
		{:else if setWindow=="preview"}
			<div class="settings-w-inner">
				<Preview {settings} />
			</div>
		{:else if setWindow=="settings"}
			<div class="settings-w-inner">
				<Settings {settings} />
			</div>
		{:else if setWindow=="about"}
			<div class="settings-w-inner">
				<About {version} />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.settings-container {
		position: absolute;
		z-index: 3;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: #2F2E33;
		display: flex;

		&-sidebar {
			flex-shrink: 0;
			width: 40px;
			background: #2F2E33;
		}

		&-main {
			flex-grow: 1;
			background: #3A3940;
			overflow-y: auto;
		}

		&-menu {
			padding: 4px;
			box-sizing: border-box;
			margin: 0;
			list-style: none;
			display: flex;
			flex-direction: column;

			li {
				display: inline-flex;
				font-weight: 500;
				margin-bottom: 4px;
				border-radius: 5px;
				justify-content: center;
				cursor: pointer;
				user-select: none;

				&.active {
					background: #3A3940;
				}

				&>:global(button) {
					width: 32px;
					height: 32px;
					color: #B7B9BC;
					background: transparent;
					padding: 0;
					
					&:hover {
						background: #3A3940;
					}
				}
			}
		}
	}

	.settings-w-inner {
		padding: 8px 14px;
		box-sizing: border-box;
		height: 100%;
	}
</style>
