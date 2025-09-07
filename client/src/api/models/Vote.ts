/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Vote = {
    name?: string;
    answer?: Vote.answer;
};
export namespace Vote {
    export enum answer {
        YES = 'yes',
        NO = 'no',
        MAYBE = 'maybe',
    }
}

