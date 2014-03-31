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
}

describe('minify file test: ', function () {
    it('edp minify index.html', function (done) {
        process.chdir(Project);
        minify.start(['index.html'], {});
        var dir = '.';
        var ret = checkDirFile(dir, ['index.compiled.html']);
        expect(ret).toBe(true);
        done();

        // 还原testcase
        restoreCase(dir, ['index.compiled.html']);
    });

    it('edp minify index.html, src/page.css, src/page.js -o=asset', function (done) {
        process.chdir(Project);
        minify.start(['index.html', 'src/page.css', 'src/page.js'], {o: 'asset'});
        var dir = 'asset';
        var ret = checkDirFile(dir, ['index.compiled.html', 'page.compiled.js', 'page.compiled.css']);
        expect(ret).toBe(true);
        done();

        // 还原testcase
        rmdir(dir);
    });

    it('edp minify index.html, src/page.css, src/page.js -o=output -n=.min', function (done) {
        process.chdir(Project);
        minify.start(['index.html', 'src/page.css', 'src/page.js'], {o: 'output', n: '.min'});

        var dir = 'output';
        var ret = checkDirFile(dir, ['index.min.html', 'page.min.js', 'page.min.css']);
        expect(ret).toBe(true);
        done();

        // 还原testcase
        rmdir(dir);
    });
});

describe('minify dir test: ', function () {
    it('edp minify src -t=dir', function (done) {
        process.chdir(Project);
        minify.start(['src'], {t: 'dir'});
        var dir = 'src';
        var ret = checkDirFile(dir, ['page.compiled.js', 'page.compiled.css']);
        expect(ret).toBe(true);
        done();
        restoreCase(dir, ['page.compiled.js', 'page.compiled.css']);
    });

    it('edp minify src -t=dir -o=diroutput -n=.min', function (done) {
        process.chdir(Project);
        minify.start(['src'], {t: 'dir', o: 'diroutput', n: '.min'});
        var dir = 'diroutput';
        var ret = checkDirFile(dir, ['page.min.js', 'page.min.css']);
        expect(ret).toBe(true);
        done();

        // 还原testcase
        rmdir(dir);
    });
});