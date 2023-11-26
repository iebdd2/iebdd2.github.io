export interface Recipe {
    names: string[];
    overview: string[];
    ingredients: string[][];
    preparation: string[][];
}

export interface Config {
    phrases: string[][];
    config: string[][];
    alphabet: string[][];
    tags: number[][];
    tag_names: string[][];
}

export interface Names {
    name: string[][];
}

export enum State {
    recipe,
    search,
    main,
    all,
    advanced
}

export enum Lang {
    de,
    en,
    fr
}

export enum Screen {
    notHandheld,
    handheld
}
