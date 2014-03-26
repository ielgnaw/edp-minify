/**
 * minify的测试用例
 *
 * @author ielgnaw(wuji0223@gmail.com)
 */

var edp = require('edp-core');
var fs = require('fs');
var Project = edp.path.resolve(__dirname, 'data', 'minify-project');

var minify = require('../index');

/**
 * 对 child_process.spawn 的包装
 *
 * @param {string} command 要支持的命令
 * @param {?Array.<string>} args 要传递给 command 的参数列表
 * @property {?Object} options 配置项
 * @return {ChildProcess} 同原 spawn 的返回对象
 */
var spawnExt = function () {
    var spawn = require('child_process').spawn;
    if (process.env.comspec) {
        return function (command, args, options) {
            return spawn(
                process.env.comspec,
                ['/c', command].concat(args),
                options
            );
        }
    }
    else {
        return function (command, args, options) {
            return spawn(command, args, options);
        }
    }
}();

/**
 * 检测文件夹中的文件
 *
 * @param  {string} dir      目录路径
 * @param  {Array.<string>}
 */
function checkDirFile(dir, fileList) {
    var ret = true;
    if (!fs.existsSync(dir)) {
        ret = false;
    }
    else {
        var stat = fs.statSync(dir);
        if (stat && stat.isDirectory()) {
            fileList.forEach(
                function (file) {
                    var absolutePath = edp.path.resolve(dir, file);
                    if (!fs.existsSync(absolutePath)) {
                        ret = false;
                    }
                }
            );
        }
        else {
            ret = false;
        }
    }
    return ret;
}

/**
 * 还原testcase
 *
 * @param  {string} dir      目录
 * @param  {string} fileList 本次测试用例添加的文件的集合
 */
function restoreCase(dir, fileList) {
    fileList.forEach(
        function (file) {
            var absolutePath = edp.path.resolve(dir, file);
            fs.unlinkSync(absolutePath);
        }
    );
}

/**
 * 删除目录
 *
 * @param {string} dir 目录路径
 */
function rmdir(dir) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        fs.readdirSync(dir).forEach(
            function (file) {
                var fullPath = edp.path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    rmdir(fullPath);
                }
                else {
                    fs.unlinkSync(fullPath);
                }
            }
        );

        fs.rmdirSync(dir);
    }
};

describe('minify file test: ', function () {
    it('edp minify index.html', function (done) {
        var minify = spawnExt(
            'edp',
            ['minify', 'index.html'],
            {
                cwd: process.chdir(Project)
            }
        );
        minify.on('exit', function() {
            var dir = '.';
            var ret = checkDirFile(dir, ['index.compiled.html']);
            expect(ret).toBe(true);
            done();
            restoreCase(dir, ['index.compiled.html']);
        });
        minify.stdin.end();
    });

    it('edp minify index.html, src/page.css, src/page.js -o=asset', function (done) {
        var minify = spawnExt(
            'edp',
            ['minify', 'index.html', 'src/page.css', 'src/page.js', '-o=asset'],
            {
                cwd: process.chdir(Project)
            }
        );
        minify.on('exit', function() {
            var dir = 'asset';
            var ret = checkDirFile(dir, ['index.compiled.html', 'page.compiled.js', 'page.compiled.css']);
            expect(ret).toBe(true);
            done();

            // 还原testcase
            rmdir(dir);
        });
        minify.stdin.end();
    });

    it('edp minify index.html, src/page.css, src/page.js -o=output -n=.min', function (done) {
        var minify = spawnExt(
            'edp',
            ['minify', 'index.html', 'src/page.css', 'src/page.js', '-o=output', '-n=.min'],
            {
                cwd: process.chdir(Project)
            }
        );
        minify.on('exit', function() {
            var dir = 'output';
            var ret = checkDirFile(dir, ['index.min.html', 'page.min.js', 'page.min.css']);
            expect(ret).toBe(true);
            done();

            // 还原testcase
            rmdir(dir);
        });
        minify.stdin.end();
    });
});

describe('minify dir test: ', function () {
    it('edp minify src -t=dir', function (done) {
        var minify = spawnExt(
            'edp',
            ['minify', 'src', '-t=dir'],
            {
                cwd: process.chdir(Project)
            }
        );
        minify.on('exit', function() {
            var dir = 'src';
            var ret = checkDirFile(dir, ['page.compiled.js', 'page.compiled.css']);
            expect(ret).toBe(true);
            done();
            restoreCase(dir, ['page.compiled.js', 'page.compiled.css']);
        });
        minify.stdin.end();
    });

    it('edp minify src -t=dir -o=diroutput -n=.min', function (done) {
        var minify = spawnExt(
            'edp',
            ['minify', 'src', '-t=dir', '-o=diroutput', '-n=.min'],
            {
                cwd: process.chdir(Project)
            }
        );
        minify.on('exit', function() {
            var dir = 'diroutput';
            var ret = checkDirFile(dir, ['page.min.js', 'page.min.css']);
            expect(ret).toBe(true);
            done();

            // 还原testcase
            rmdir(dir);
        });
        minify.stdin.end();
    });
});