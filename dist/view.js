"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = require("./boot");
const nunjucks = require("nunjucks");
const pathlib = require("path");
const fs = require("fs");
/**
 * TemplateLoader class
 */
class TemplateLoader extends nunjucks.Loader {
    /**
     * TemplateLoader constructor
     * @param {string} private searchPath
     */
    constructor(viewDir) {
        super();
        this.viewDir = viewDir;
        /**
         * property to your loader and it will be used asynchronously
         * @type {boolean}
         */
        this.async = true;
    }
    /**
     * Load the template
     * @param {string} name
     * @param {Function} callback
     */
    getSource(name, callback) {
        let fullPath = pathlib.join(this.viewDir, `${name}.html`);
        fs.readFile(fullPath, 'utf-8', (err, data) => {
            if (err) {
                return callback(err);
            }
            return callback(null, {
                src: data,
                path: fullPath,
                noCache: false
            });
        });
    }
}
exports.TemplateLoader = TemplateLoader;
/**
 * Set express application view engine
 * @param  {express.Server} app
 * @param  {ViewConfig} config
 * @return {void}
 */
function installViewEngine(app, viewsDir) {
    boot_1.checkAppConfig(app);
    let config = app.locals.config;
    let env = new nunjucks.Environment(new TemplateLoader(viewsDir), config.get('view'));
    app.locals.view = env;
    app.set('views', viewsDir);
    app.engine('html', (filePath, options, callback) => {
        let viewPathObj = pathlib.parse(filePath);
        let viewFilePath = pathlib.join(viewPathObj.dir.replace(viewsDir, ''), viewPathObj.name);
        env.render(viewFilePath, options, (err, res) => {
            if (err)
                return callback(err);
            callback(null, res);
        });
    });
    app.set('view engine', 'html');
}
exports.installViewEngine = installViewEngine;
//# sourceMappingURL=view.js.map