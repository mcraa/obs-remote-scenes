<script lang="ts">
    export const ssr = false

    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Select, { Option } from '@smui/select';

    import scenes, { type Scene } from '../modules/store/scenes';
    import connection, { type Connection } from '../modules/store/connection';

    import { onMount } from 'svelte';

    let prominent = false;
    let dense = false;
    let secondaryColor = false;
    let currentScenes: Scene[];
    let conn: Connection | null
    let selectedScene: string;
    
    onMount(async () => {     
      scenes.subscribe((s) => {
        currentScenes = s
      })    
      
      connection.subscribe(c => {
        conn = c
      })
    })

    function sceneSelected() {
      if (selectedScene == 'new-create') {
        alert('Not implemented')
      } else {
        const newName = currentScenes.find(v => v.sceneIndex == (selectedScene as unknown))?.sceneName        
        if (newName) {
          scenes.selectScene(newName)
        }
      }
    }
</script>

<div>
    <div>
        <TopAppBar
        variant="static"
        {prominent}
        {dense}
        color={secondaryColor ? 'secondary' : 'primary'}
      >
        <Row>
          <Section>
            <IconButton class="material-icons" disabled>view_compact_alt</IconButton>
            <Title>OBS Studio Scene manager</Title>
          </Section>
          {#if !conn?.address?.length}
          <Section>
            <IconButton class="material-icons" disabled>wifi_off</IconButton>
            <Title>Disconnected</Title>
          </Section>
          {/if}
          {#if conn && conn.address?.length}
          <Section>
            <IconButton class="material-icons" disabled>cell_tower</IconButton>
            <Title>ws://localhost:4455</Title>
          </Section>
          {/if}
          {#if currentScenes && currentScenes.length}
            <Section align="end" toolbar>
              <Select label="Scenes" bind:value={selectedScene} on:SMUISelect:change={sceneSelected}>
                  {#each currentScenes as scene}
                    <Option value={scene.sceneIndex}>{scene.sceneName}</Option>
                  {/each}
                  <Option value="new-create">+New Scene</Option>
                </Select>
            </Section>
          {/if}
        </Row>
      </TopAppBar>
    </div>
</div>
<slot/>