<script lang="ts">
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Select, { Option } from '@smui/select';
    // import FormField from '@smui/form-field';
   
    let prominent = false;
    let dense = false;
    let secondaryColor = false;
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
            <IconButton class="material-icons">menu</IconButton>
            <Title>OBS Studio Scene manager</Title>
          </Section>
          <Section align="end" toolbar>
            <span class="active">
                <Select label="Scenes" outlined>
                  <Option value="light">Scene 1</Option>
                  <Option value="dark">New Scene</Option>
                </Select>
            </span>
            <Select label="Sources" outlined>
              <Option value="light">Source 1</Option>
              <Option value="dark">New source</Option>
            </Select>
          </Section>
        </Row>
      </TopAppBar>
    </div>
</div>
<slot/>


<style>
    .active {
        margin-right: 5rem;
    }
</style>