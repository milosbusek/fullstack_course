/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { EventInput } from '../models/EventInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Získat seznam událostí
     * @returns Event Seznam událostí
     * @throws ApiError
     */
    public static getEvents(): CancelablePromise<Array<Event>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
        });
    }
    /**
     * Přidat novou událost
     * @param requestBody
     * @returns Event Událost vytvořena
     * @throws ApiError
     */
    public static postEvents(
        requestBody: EventInput,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Získat detail události
     * @param id
     * @returns Event Detail události
     * @throws ApiError
     */
    public static getEvents1(
        id: number,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Událost nenalezena`,
            },
        });
    }
}
