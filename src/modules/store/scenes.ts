import { writable } from 'svelte/store';

export type Scene = {
    sceneName: string
    sceneIndex?: number
}

const SCENES: Array<Scene> = [ ];
const SELECTEDSCENE: { sceneName?: string } = {}

const { subscribe, set, update } = writable(SCENES);
const { subscribe: subscribeToSelected, set: setSelectedScene } = writable(SELECTEDSCENE);

const addScene = (scene: Scene) => update(scenes => {
    return [...scenes, scene];
});

const selectScene = (sceneName: string) => setSelectedScene({ sceneName })

const reset = () => {
    set(SCENES);
};

export default {
    subscribe,
    addScene,
    reset,
    set,
    subscribeToSelected,
    selectScene
}