/**
 * @file edp-minify 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */


var fs = require('fs');
var edp = require('edp-core');

var File = require('./lib/File');

var CWD = process.cwd();

var EXT = {
    js: '.js'
}

/**
 * 处理文件
 *
 * @param  {File} sfile File实例
 */
function processFile(sfile) {
    var targetFileExtName = sfile.extName;
    var targetFileName = '';
    var targetFilePath = '';

    var textname = sfile.extname;
    var tfilename = '';
    var tpath;
    // 读取-o参数，可以没有，会进行默认处理
    if (!opts.o) {
        tfilename = sfile.filename + '.compiled';
        tpath = path.resolve('.', tfilename + '.' + targetFileExtName);
        console.log('未能获取到指定的输出文件，系统自动指定为：' + tpath);
    }
    else {
        tfilename = opts.o.replace(sfileextPlus, '');
        tpath = path.resolve('.', opts.o);
    }
    var targetFile = new File({
        filename: tfilename,
        extname: targetFileExtName,
        path: tpath
    });
    targetFile.data = sfile.getMinifyData();
    targetFile.write();
}

exports.start = function (args, opts) {

    var source = args[0];
    // console.log(args,opts, 111);

    var commandArgs = {};
    var isEnd = true;
    var lastMatchKey = '';

    while (args.length) {
        // edp minify newtip.src.js    ,    aaa.js,    rrrer,   -o=output
        var arg = args.shift();
        if (arg !== ',') {

            // 把文件名的最后一个逗号去掉，
            // 这个逗号是args分隔得到的，不是文件名的一部分
            arg = arg.replace(/,$/, '');

            var filePath = edp.path.resolve(CWD, arg);
            var extName = edp.path.extname(arg);
            var fileName = edp.path.basename(arg, extName);

            if (!extName) {
                edp.log.info(
                    '`%s`未能获取文件扩展名信息，默认使用js类型。',
                    fileName
                );
                extName = EXT.js;
                filePath += extName;
            }

            var sfile = new File({
                fileName: fileName,
                extName: extName,
                filePath: filePath
            });

            if (sfile.read()) {
                if (!opts.o) {
                    console.log();
                    // tfilename = sfile.filename + '.compiled';
                    // tpath = path.resolve('.', tfilename + '.' + targetFileExtName);
                    // console.log('未能获取到指定的输出文件，系统自动指定为：' + tpath);
                }
                else {
                    // tfilename = opts.o.replace(sfileextPlus, '');
                    // tpath = path.resolve('.', opts.o);
                }
            }


            // setTimeout(
            //     function () {
            //         console.log(99);
            //         sfile.emit('data', 'asssssss');
            //     },
            //     1000
            // );
            // sfile.on('data', function(data) {
            //     console.log('Received data: ' + data);
            // });
        }
    }
}

if (module === require.main) {
    exports.start();
}