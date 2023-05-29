export enum Tag {
    Health = "health",
    Home = "home",
    Work = "work",
    Other = "other"
}

export const TAGS_CLASSES = {
    [Tag.Health]: "healthTag",
    [Tag.Home]: "homeTag",
    [Tag.Work]: "workTag",
    [Tag.Other]: "otherTag",
};

export const tags: Tag[] = [Tag.Health, Tag.Work, Tag.Home, Tag.Other];