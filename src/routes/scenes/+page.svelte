<h1>Scene: {currentScene.sceneName ? currentScene.sceneName : ''}</h1>


<button on:click={()=> {getSourceActive()}}>get source</button>
{#if source}
Source: {source.videoActive} - {source.videoShowing}
{/if}

<button on:click={()=> {newScene()}}>new seen</button>

<button on:click={()=> {createInput()}}>create input</button>

<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import obs from '../../modules/obs'
    import scenes, { type Scene } from '../../modules/store/scenes'
    import connection from '../../modules/store/connection';

    let currentScene: { sceneName?: string } = {};

    onMount(async () => {
        connection.subscribe(c => {
            if (!c.address?.length) {
                goto('/');
            }
        })

        scenes.subscribeToSelected(sel => { currentScene = sel })

        const existingScenes = await obs.call('GetSceneList')
        scenes.set(existingScenes.scenes as Scene[])
        
        obs.on('SceneCreated', ({ sceneName, isGroup}) => {
            scenes.addScene({ sceneName })
        })        
    });   

    let source: {
        videoActive: boolean;
        videoShowing: boolean;
    }
    
    async function getSourceActive() {       
        source = await obs.call('GetSourceActive',  { sourceName: 'Media Source'})
        console.log(source)
    }

    async function newScene() {
        const sceneName = await prompt('Name it????????????');
        if (!sceneName) return;
        await obs.call('CreateScene', { sceneName });
    }
    
    async function createInput() {
        const url = await prompt('rtmp url? (rtmp://ip:port)');
        
        // const inputs = await obs.call('GetInputKindList')
        // const defaultSetting = await obs.call('GetInputDefaultSettings', { inputKind: 'ffmpeg_source'})
        // console.log(defaultSetting)
        // const rtmpSettings = await obs.call('GetInputSettings', { inputName: "Media Source"})
        // console.log(rtmpSettings);

        const randomName = Math.random().toString(36).substring(7);
        const created = await obs.call('CreateInput', {
            sceneName: 'Scene',
            inputKind: 'ffmpeg_source', // select from inputs
            inputName: `New-${randomName}`,
            sceneItemEnabled: true,
            inputSettings: {
                input: url,
                is_local_file: false
            }
        })
    }

</script>