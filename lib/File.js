/**
 * @file edp-minify File类
 * @author ielgnaw(wuji0223@gmail.com)
 */

var fs = require('fs');
var edp = require('edp-core');
var EventEmitter = require('events').EventEmitter;


/**
 * 文件信息类
 *
 * @constructor
 * @extends EventEmitter
 *
 * @param  {Object} options 配置项
 * @property {string} fileName   文件名
 * @property {string} extName  文件后缀
 * @property {string} filePath  文件路径
 * @property {?string} data  数据
 */
function File(options) {
    this.fileName = options.fileName;
    this.extName = options.extName;
    this.filePath = options.filePath;

    var data = options.data;
    if (data) {
        this.processData(data);
    }
}

File.prototype.__proto__ = EventEmitter.prototype;

/**
 * 读取文件信息
 * @param  {Object} options 配置项
 * @property {string=} encoding   编码，默认为utf8
 */
File.prototype.read = function (options) {
    var me = this;
    var opts = edp.util.extend({}, {encoding: 'utf8'}, options);
    var filePath = me.filePath;
    if (!filePath || !fs.existsSync(filePath)) {
        me.emit('NOTFOUNDFILE', filePath);
        return false;
    }

    var data = fs.readFileSync(filePath, opts);
    me.processData(data);

    return true;
}

/**
 * 处理数据【读取的或者传入的】
 *
 * @param {string} 指定数据，不传则读取this.data
 */
File.prototype.processData = function (data) {
    var me = this;
    var data = data || me.data;
    me.data =
        /\x00/.test(
            data.toString('ascii', 0, Math.min(data.length, 4096))
        )
        ? data
        : data.toString('UTF-8');
};

/**
 * 向文件写入数据，当前数据
 *
 * @inner
 * @param {string} data 指定数据，不传则读取this.data
 */
File.prototype.write = function (data) {
    var me = this;
    var data = data || me.data;
    fs.writeFileSync(me.filePath, data, 'UTF-8');
};

/**
 * 向文件写入minify之后的数据
 *
 * @param {string} data 指定数据，不传则读取this.data
 * @param {string} path 指定路径，不传则读取this.path
 */
File.prototype.writeMinify = function (data, path) {
    var me = this;
    var data = data || me.data;
    var path = path || me.filePath;

    if(!fs.existsSync(path)) {
        console.log('指定的输出文件不存在');
        return;
    }

    fs.writeFileSync(me.filePath, me.getMinifyData(data), 'UTF-8');
};

/**
 * 获取最小化数据
 *
 * @inner
 * @param {string} data 指定数据，不传则读取this.data
 */
File.prototype.getMinifyData = function (data) {
    var me = this;

    var data = data || this.data;

    var compressedData;
    var processor;
    var extraParam;
    switch (me.extName) {
        case '.htm':
        case '.html':
            var options = {
                  "removeIgnored": true,
                  "removeComments": true,
                  "removeCommentsFromCDATA": true,
                  "removeCDATASectionsFromCDATA": true,
                  "collapseWhitespace": true,
                  "collapseBooleanAttributes": true,
                  "removeAttributeQuotes": true,
                  "removeRedundantAttributes": true,
                  "useShortDoctype": true,
                  "removeEmptyAttributes": true,
                  "removeEmptyElements": true,
                  "removeOptionalTags": true,
                  "removeScriptTypeAttributes": true,
                  "removeStyleLinkTypeAttributes": true
            };
            // 读取当前目录下的'.htmlminifierrc'配置文件
            var conf = process.cwd() + '/.htmlminifierrc';
            if ( fs.existsSync( conf ) ) {
                var rcBuffer = fs.readFileSync( conf );
                conf = JSON.parse( rcBuffer.toString( 'UTF-8' ) );

                for ( var key in conf ) {
                    options[key] = conf[key];
                }
            }

            if (options.lint) {
                options.lint = new require('html-minifier').HTMLLint();

            }

            processor = require('html-minifier').minify;
            compressedData = processor(data, options);
            break;
        case '.js':
            processor = require('./util').compressJavascript;
            compressedData = processor(data);
            break;
        case '.css':
            processor = require('uglifycss').processString;
            extraParam = {
                maxLineLen: 0,
                expandVars: false,
                cuteComments: true
            };
            compressedData = processor(me.data, extraParam);
            break;
        case '.json':
            compressedData = JSON.parse(JSON.stringify(data));
            break;
        default:
            edp.log.info(
                '不支持的文件类型：`%s`，文件未被压缩。',
                me.extName
            );
            compressedData = me.data;
            break;
    }

    return compressedData;
};

module.exports = File;