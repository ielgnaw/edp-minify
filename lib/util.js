/**
 * @file 工具函数
 * @author ielgnaw(wuji0223@gmail.com)
 */

/**
 * 压缩Javascript代码
 *
 * @param {string} code Javascript源代码
 * @return {string}
 */
exports.compressJavascript = function ( code ) {
    var UglifyJS = require( 'uglify-js' );
    var ast = UglifyJS.parse( code );

    // compressor needs figure_out_scope too
    ast.figure_out_scope();
    ast = ast.transform( UglifyJS.Compressor() );

    // need to figure out scope again so mangler works optimally
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names( {
        except: [ '$', 'require', 'exports', 'module' ]
    } );

    return ast.print_to_string();
};