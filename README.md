minify
---------

### Usage

    edp minify <input> [--type/-t=file] [--output/-o=outputDir] [--name/-n=name]

### Description

最小化`JS`、`CSS`、`HTML`或`JSON`文件，以便获得最小化的输出。

支持文件后缀名(extname)：`.htm`、`.html`、`.js`、`.css`、`.json`，如果没有文件后缀名，则默认使用`.js`。

**type**：minify的类型，如果不指定，则默认会把`input`当作**文件**来处理，设置`--type/-t=dir`，则会把`input`当作**文件夹**来处理。

**name**：输出文件的名字，如果不指定，默认使用`input.compiled.extName`。

**output**：输出文件的目录，如果不指定，默认保存在与输入文件同级的目录中。

**同时minify多个文件/文件夹时，多个文件/文件夹之间用逗号空格分隔**

例如：
    
    edp minify page.js, page.css, page.html  // 在同级目录下生成page.compiled.js, page.compiled.css, page.compiled.html

    edp minify page.js, page.css, page.html -o=asset -n=.min // 在asset目录下生成page.min.js, page.min.css, page.min.html

    edp minify src -t=dir // 在src目录下生成page.compiled.js, page.compiled.css, page.compiled.html

    edp minify src -t=dir -o=asset // 在asset目录下生成page.compiled.js, page.compiled.css, page.compiled.html



#### 默认压缩引擎
+ `JS`：使用[uglifyJS](https://github.com/mishoo/UglifyJS)
+ `CSS`：使用[uglifyCSS](https://github.com/fmarcia/UglifyCSS)
+ `JSON`：使用JSON.stringify & JSON.parse
+ `HTML`：使用[html-minifier](https://github.com/kangax/html-minifier)
