<h1>Scenes</h1>
<button on:click={()=> {getScenes()}}>list scenes</button>
{#if scenes}
Current: {scenes.currentProgramSceneName} - {scenes.currentPreviewSceneName}
<ul>
	{#each scenes.scenes as scene}
		<li>{JSON.stringify(scene)}</li>
	{/each}
</ul>
{/if}

<script lang="ts">
    import { onMount } from 'svelte';
    import obs from '../../modules/obs'
    
    onMount(async () => {
        const connection = await obs.connect('ws://localhost:4455');
        console.log(connection)
    });

    let scenes: {
            currentProgramSceneName: string;
            currentPreviewSceneName: string;
            scenes: any[];
        }; 
    
    async function getScenes() {       
        scenes = await obs.call('GetSceneList')
    }
</script>