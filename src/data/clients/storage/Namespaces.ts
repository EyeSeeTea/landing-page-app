export const dataStoreNamespace = "landing-page-app";
export const glassNamespace = "glass";
export const constantPrefix = "Landing Page App Storage";

export type Namespace = typeof Namespaces[keyof typeof Namespaces];

export const Namespaces = {
    NOTIFICATIONS: "notifications",
    CONFIG: "config",
    MODULES: "modules",
};

export const NamespaceProperties: Record<Namespace, string[]> = {
    [Namespaces.NOTIFICATIONS]: [],
    [Namespaces.CONFIG]: [],
};
