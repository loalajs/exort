import * as express from 'express';
/**
 * Install assets
 * @param  {T} app
 * @param  {string} rootDir
 * @return {void}
 */
export declare function installAssets<T extends express.Server>(app: T, rootDir: string): void;
/**
 * Install app favicon
 * @param  {T} app
 * @param  {string} faviconPath
 * @return {void}
 */
export declare function installFavicon<T extends express.Server>(app: T, faviconPath: string): void;
