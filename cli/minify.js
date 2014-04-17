/**
 * @file 使用minify命令来让js、css、json文件获得最小化的输出。
 * @author ielgnaw(wuji0223@gmail.com)
 */


/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令选项信息
 *
 * @type {Array}
 */
cli.options = ['output:', 'name:', 'type:'];

/**
 * @const
 * @type {string}
 */
cli.description = '使用minify命令来让js、css、json文件获得最小化的输出。';

/**
 * @param {Array.<string>} args 命令行参数.
 * @param {Object.<string, string>} opts 命令的可选参数.
 */
cli.main = function(args, opts) {
    require('../index').start(args, opts);
};

exports.cli = cli;