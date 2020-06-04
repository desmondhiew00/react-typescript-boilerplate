// import { store } from 'index';

export const { API_URL, APP_NAME, APP_DESCRIPTION } = process.env;
export { store } from 'index';

declare const Colors: ['red', 'blue', 'green'];
export declare type Colors = typeof Colors[number];

export const SIDEBAR = { theme: 'dark', width: 256, collapsedWidth: 80 };
