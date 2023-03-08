<div style="margin: 0 auto; width: 300px; height: 100vh; overflow: hidden; padding: 100px">
    
    <div>
        <Textfield bind:value={address} label="Address" placeholder="ws://localhost:4455">
            <Icon class="material-icons" slot="leadingIcon">cell_tower</Icon>
            <HelperText slot="helper">eg.: ws://localhost:4455</HelperText>
        </Textfield>
        <Textfield bind:value={pass} label="Password">
            <Icon class="material-icons" slot="leadingIcon">lock</Icon>
            <HelperText slot="helper">eg.: *****</HelperText>
        </Textfield>

        <button on:click={()=> {connect()}}>Connect</button>      
    </div>
   
</div>
   
  <script lang="ts">
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte';

    import Textfield from '@smui/textfield';
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';

    import connection from '../modules/store/connection';
   
    let address = 'ws://localhost:4455';
    let pass = ''

    onMount(() => {
        connection.subscribe(c => {
            if (c.address?.length) {
                goto('scenes')
            }
        })
    })

    async function connect() {   
        connection.createConnection(address, pass);
    }               
           
  </script>