import { Subject } from './subject.interface';

export interface Student{
    id: number;
    surname: string;
    name: string;
    subjects: Subject[];
}