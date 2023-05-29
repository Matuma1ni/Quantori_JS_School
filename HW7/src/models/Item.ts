import {Tag} from './Tag'

export interface Item {
    title: string;
    isCompleted: boolean;
    id: number;
    tag: Tag;
} 