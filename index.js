/**
 * @file edp-minify 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */


var fs = require('fs');
var edp = require('edp-core');

var File = require('./lib/File');

var CWD;

var EXT = {
    JS: '.js'
};

/**
 * 不合法的资源集合
 *
 * @type {Array.<Object>}
 */
var invalidResource = [];

/**
 * 获取文件夹内的js文件
 *
 * @param  {string} dir 目标文件夹
 */
function getJSFiles(dir) {
    var ret  = [];
    var list = fs.readdirSync(dir);
    list.forEach(
        function (file) {
            var absolutePath = edp.path.resolve(dir, file);
            var stat         = fs.statSync(absolutePath);
            var extName      = edp.path.extname(file);
            var fileName     = edp.path.basename(file, extName);
            if (stat && stat.isDirectory()) {
                ret = ret.concat(getJSFiles(absolutePath));
            }
            else {
                ret.push({
                    fileName: fileName,
                    filePath: absolutePath
                });
            }
        }
    );
    return ret;
}

/**
 * 处理单个文件的minify
 *
 * @param  {string} srcFilePath   文件的路径
 * @param  {string} suffixName minify后的文件后缀名
 * @param  {string} outputDir  输出目录
 */
function processFile(srcFilePath, suffixName, outputDir) {
    var filePath = edp.path.resolve(CWD, srcFilePath);
    var extName = edp.path.extname(srcFilePath);
    var fileName = edp.path.basename(srcFilePath, extName);
    if (!extName) {
        edp.log.info(
            '`%s`未能获取文件扩展名信息，默认使用js类型。',
            fileName
        );
        extName = EXT.JS;
        filePath += extName;
    }
    var sfile = new File({
        fileName: fileName,
        extName: extName,
        filePath: filePath
    });

    sfile.on('NOTFOUNDFILE', function (d) {
        invalidResource.push({
            type: 'file',
            path: d
        });
    });

    if (sfile.read()) {
        var targetFileName = sfile.fileName + suffixName;
        var targetFileExtName = sfile.extName;
        var targetFilePath = edp.path.dirname(sfile.filePath)
            + require('path').sep + targetFileName + targetFileExtName;

        if (outputDir) {
            require('mkdirp').sync(edp.path.resolve(CWD, outputDir));
            targetFilePath = outputDir + require('path').sep
                + targetFileName + targetFileExtName;
        }

        var targetFile = new File({
            fileName: targetFileName,
            extName: targetFileExtName,
            filePath: targetFilePath
        });

        targetFile.data = sfile.getMinifyData();
        targetFile.write();
    }
}

/**
 * 处理文件夹
 *
 * @param  {string} srcFilePath   文件夹的路径
 * @param  {string} suffixName minify后的文件后缀名
 * @param  {string} outputDir  输出目录
 */
function processDir(srcFilePath, suffixName, outputDir) {
    if (fs.existsSync(srcFilePath)) {
        var stat = fs.statSync(srcFilePath);
        if (stat && stat.isDirectory()) {
            var files = getJSFiles(srcFilePath);
            files.forEach(
                function (file) {
                    processFile(file.filePath, suffixName, outputDir);
                }
            );
        }
        else {
            invalidResource.push({
                type: 'dir',
                path: srcFilePath
            });
        }
    }
    else {
        invalidResource.push({
            type: 'dir',
            path: srcFilePath
        });
    }
}

exports.start = function (args, opts) {

    CWD = process.cwd();

    if (!args.length) {
        edp.log.error('→ args not null');
        return;
    }

    invalidResource = [];

    // 输出目录
    var outputDir = opts.o;

    // 生成minify文件的后缀名
    var suffixName = opts.n || '.compiled';

    // minify命令调用的类型，是文件(file)还是文件夹(dir)，默认为文件
    var type = opts.t || 'file';

    while (args.length) {
        var arg = args.shift();
        if (arg !== ',') {
            // 把文件名的最后一个逗号去掉，
            // 这个逗号是args分隔得到的，不是文件名的一部分
            arg = arg.replace(/,$/, '');

            // 把arg当文件夹处理
            if (type === 'dir') {
                processDir(arg, suffixName, outputDir);

            }
            // 把arg当文件处理
            else {
                processFile(arg, suffixName, outputDir);
            }

        }
    }

    if (invalidResource.length) {
        invalidResource.forEach(
            function (item) {
                var relativePath = edp.path.relative(CWD, item.path);
                edp.log.info('%s', relativePath);
                edp.log.error('→ No such %s `%s`', item.type, relativePath);
            }
        );
    }
};

if (module === require.main) {
    exports.start();
}