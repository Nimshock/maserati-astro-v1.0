import { atom } from 'nanostores';

export const isConfiguratorOpen = atom(false);
export const activeModelId = atom(null);

export function openConfigurator(modelId) {
    activeModelId.set(modelId);
    isConfiguratorOpen.set(true);
}

export function closeConfigurator() {
    isConfiguratorOpen.set(false);
    setTimeout(() => {
        activeModelId.set(null);
    }, 300);
}