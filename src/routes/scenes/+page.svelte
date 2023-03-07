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

<button on:click={()=> {getSourceActive()}}>get source</button>
{#if source}
Source: {source.videoActive} - {source.videoShowing}
{/if}

<button on:click={()=> {createInput()}}>create input</button>

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

    let source: {
        videoActive: boolean;
        videoShowing: boolean;
    }
    
    async function getScenes() {       
        scenes = await obs.call('GetSceneList')
    }

    async function getSourceActive() {       
        source = await obs.call('GetSourceActive',  { sourceName: 'Media Source'})
        console.log(source)
    }
    
    async function createInput() {       
        // const inputs = await obs.call('GetInputKindList')
        const defaultSetting = await obs.call('GetInputDefaultSettings', { inputKind: 'ffmpeg_source'})
        console.log(defaultSetting)
        const rtmpSettings = await obs.call('GetInputSettings', { inputName: "Media Source"})
        console.log(rtmpSettings);
        
        // const created = await obs.call('CreateInput', {
        //     sceneName: 'Scene',
        //     inputKind: 'ffmpeg_source', // select from inputs
        //     inputName: 'New',
        //     sceneItemEnabled: true,
        //     // inputSettings: defaultSettings && customSettings
        // })
        // console.log(created)
    }

</script>