/**
 * @file 大搜索 商业广告 tip，信誉v
 * @author Ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    // 已经通过
    var yijingtonguo = '\u5df2\u7ecf\u901a\u8fc7';

    // 具有
    var juyou = '\u5177\u6709';

    // 百度信誉认证
    var baiduxinyurenzheng = '\u767e\u5ea6\u4fe1\u8a89\u8ba4\u8bc1';

    // 优惠详情
    var youhuixiangqing = '\u4f18\u60e0\u8be6\u60c5';

    // 咨询电话
    var zixundianhua = '\u54a8\u8be2\u7535\u8bdd';

    // 国家药监局
    var guojiayaojianju = '\u56fd\u5bb6\u836f\u76d1\u5c40';

    // 授权的网上售药资格
    var shouquanwangshangyouyaozige =
        '\u6388\u6743\u7684\u7f51\u4e0a\u552e\u836f\u8d44\u683c';

    // 正规药品销售网站
    var zhengguiyaopinxiaoshouwangzhan =
        '\u6b63\u89c4\u836f\u54c1\u9500\u552e\u7f51\u7ad9\uff1a';

    //中航协认证
    var zhonghangxierenzheng = '\u4e2d\u822a\u534f\u8ba4\u8bc1';

    //正规网上售票网站
    var zhengguiwangshangxiaoshouwangzhan =
        '\u6b63\u89c4\u7f51\u4e0a\u552e\u7968\u7f51\u7ad9\uff1a';

    //的机票代理资格
    var dejipiaodalizige = '\u7684\u673a\u7968\u4ee3\u7406\u8d44\u683c';

    /**
     * 浮层内容模板
     */
    var TPL = {
        // a标签 链接模板
        a: ''
            + '<span#{billing}>'
            +     '<a target="_blank"  href="#{url}" onmousedown="return c({'
            +         '\'title\':this.innerHTML,'
            +         '\'url\':this.href'
            +         ',#{options}'
            +         '});">'
            +         '#{text}'
            +     '</a>'
            + '</span>',

        // 浮层列表模板
        list : ''
            + '<div class="c-tip-cer">'
            +     '<ul>'
            // +         '#{medical}#{airline}#{dfa}#{identity}#{personal}'
            +         '#{credit}#{medical}#{dfa}#{airline}'
            +         '#{identity}#{personal}'
            +     '</ul>'
            + '</div>',

        // 医疗模板
        medical : ''
            // + '<li class="c-tip-item-i">'
            // +     '<i class="c-icon c-icon-right '
            // +                'c-gap-icon-right-small c-tip-item-icon"></i>'
            // +     '<span>#{text}</span>'
            // + '</li>',
            + '<li>'
            +     '<span>#{text}</span>'
            + '</li>',

        // 企业v模板
        identity : ''
            + '<li class="c-tip-item-i">'
            +     '<i class="c-icon c-icon-v-noborder '
            +                 'c-gap-icon-right-small c-tip-item-icon"></i>'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>',

        // 企业v传入自定义图片
        identityImg : ''
            + '<li class="c-tip-item-i">'
            +     '<img class="c-customicon c-gap-icon-right-small '
            +                 'c-tip-item-icon" src="#{img}">'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>',

        // 信誉v
        credit: ''
            + '<li class="EC-credit">'
            // +     '郭勇组件的占位符'
            + '</li>',

        // 个人v模板
        personal : ''
            + '<li class="c-tip-item-i">'
            +     '<i class="c-icon c-icon-person-noborder '
            +                 'c-gap-icon-right-small c-tip-item-icon"></i>'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>',

        // 个人v传入自定义图片
        personalImg : ''
            + '<li class="c-tip-item-i">'
            +     '<img height=16 width=16 class="c-customicon '
            +         'c-gap-icon-right-small c-tip-item-icon" src="#{img}">'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>',

        // 航协模板
        airline : ''
            // + '<li class="c-tip-item-i">'
            // +     '<img height=16 width=16 class="c-customicon '
            // +         'c-gap-icon-right-small c-tip-item-icon" src="#{img}">'
            // + juyou
            // + '#{a}的#{text}</li>',
            + '<li>'
            + juyou
            + '#{a}的#{text}</li>',

        // 药监局模板
        dfa : ''
            // + '<li class="c-tip-item-i">'
            // +     '<img height=16 width=16 class="c-customicon '
            // +         'c-gap-icon-right-small c-tip-item-icon" src="#{img}">'
            // +     '#{text}'
            // + '</li>',
            + '<li>'
            +     '#{text}'
            + '</li>',

        // 惠模板
        coupon : ''
            + '<div class="c-tip-info EC_PP">'
            +     '<a target="_blank" href="#{url}" class="coupon-ck" '
            +       'onmousedown="return c({'
            +         '\'title\':this.innerHTML,'
            +         '\'url\':this.href,'
            +         '\'fm\':\'#{fm}\','
            +         '\'rsv_ct\':\'#{rsv_ct}\','
            +         '\'p1\':#{p1},'
            +         '\'p2\':#{p2}'
            +         '});">'
            +         '#{text}'
            +     '</a>'
            + '</div>',

        // 电话模板
        tel : ''
            + '<div class="c-tip-info">'
            +     '#{text}'
            + '</div>',

        // 承诺模板
        commitmentList : ''
            + '<div class="c-tip-info">'
            +     '<ul>'
            +         '#{commitmentContent}'
            +     '</ul>'
            + '</div>',

        commitmentItem : ''
            +  '<li class="c-tip-item-i">'
            +      '<span>'
            +          '<i class="c-icon c-icon-circle-blue-s '
            +               'ec-vertical-baseline c-gap-icon-right-small '
            +                   'c-tip-item-icon"></i>'
            +          '<a href=#{url} target="_blank" onmousedown="return c({'
            +               '\'title\': this.innerHTML,'
            +               '\'url\': this.href,'
            +               '\'fm\': \'#{fm}\','
            +               '\'p1\': \'#{p1}\''
            +               '});">'
            +             '#{text}'
            +          '</a>'
            +      '</span>'
            +  '</li>',

        // 药监模板
        med : ''
            + '<div class="c-tip-info">'
            +   '<ul>'
            +       '<li class="c-tip-item-i">'
            +           '<i class="c-icon c-icon-sfda c-gap-icon-right-small'
            +               ' c-tip-item-icon"></i>'
            +           juyou
            +               '<a href=\'http://www.sda.gov.cn/WS01/CL0001/\' '
            +                   ' target="_blank">'
            +                   guojiayaojianju
            +               '</a>'
            +           shouquanwangshangyouyaozige
            +       '</li>'
            +   '</ul>'
            + '</div>',

        // 航空模板
        air : ''
            + '<div class="c-tip-info">'
            +   '<ul>'
            +       '<li class="c-tip-item-i">'
            +           '<img class="c-customicon c-gap-icon-right-small '
            +               'c-tip-item-icon" '
            +               'src="http://bs.baidu.com/chuangxin/n2_jp_bg.gif">'
            // +           '<i class="c-icon c-icon-sfda c-gap-icon-right-small'
            // +            ' c-tip-item-icon"></i>'
            +           juyou
            +           '<a href=\'http://www.cata.org.cn/\' '
            +               ' target="_blank">'
            +               zhonghangxierenzheng
            +           '</a>'
            +           dejipiaodalizige
            +       '</li>'
            +   '</ul>'
            + '</div>'

    };

    /**
     * 各种类型的浮层的偏移配置等等
     */
    var conf = {
        offset: {
            identity: {
                x: 10,
                y: 25
            },
            commitment: {
                x: 10,
                y: 25
            },
            coupon: {
                x: 10,
                y: 25
            },
            tel: {
                x: 10,
                y: 25
            },
            med: {
                x: 10,
                y: 25
            },
            air: {
                x: 10,
                y: 25
            }
        }
    };

    // 浮层的宽度
    var TIPWIDTH = 374;

    /**
     * ps页面上需要出的浮层类型的配置
     * @property {Array} clsList   该类型的tip的class集合
     * @property {String} attrKey   该类型的tip获取数据的dom的属性名
     * @property {?String} tipTitle   该类型的tip的标题
     */
    var tipTypeConf = {
        // 认证
        identity: {
            clsList: ['c-icon-v', 'c-icon-high-v', 'c-icon-person'],
            attrKey: 'data-renzheng'
        },
        // 惠
        coupon: {
            clsList: ['c-icon-hui', 'asdsa'],
            attrKey: 'data-coupon',
            tipTitle: youhuixiangqing + '：'
        },
        // 电话
        tel: {
            clsList: ['c-icon-phone'],
            attrKey: 'data-phone',
            tipTitle: zixundianhua + '：'
        },
        // 承诺
        commitment: {
            clsList: ['c-icon-nuo'],
            attrKey: 'data-commitment'
        },
        // 药监
        med: {
            clsList: ['c-icon-med'],
            attrKey: 'data-med'
        },
        // 航协
        air: {
            clsList: ['c-icon-air'],
            attrKey: 'data-air'
        }
    };

    /**
     * 对字符串进行%#&+=以及和\s匹配的所有字符进行url转义
     * from tangram
     *
     * @param  {String} source 需要转义的字符串
     */
    function escapeSymbol(source) {
        return String(source).replace(
            /[#%&+=\/\\\ \　\f\r\n\t]/g,
            function(all) {
                return ''
                    + '%'
                    + (0x100 + all.charCodeAt())
                            .toString(16)
                            .substring(1)
                            .toUpperCase();
            }
        );
    }

    /**
     * 类ES5 Function.bind 的实现
     *
     * @param  {Function} fn      要执行的函数
     * @param  {Object}   context 上下文对象(this)
     */
    function bind(fn, context) {
        if (arguments.length < 2 && context === undefined) {
            return fn;
        }

        var _method = fn;
        var _slice = Array.prototype.slice;
        var args = _slice.call(arguments, 2);

        return function () {
            var array = _slice.call(arguments, 0);
            _method.apply(context, args.concat(array));
        };
    }

    /**
     * 将json对象解析成query字符串
     * from tangram
     *
     * @param  {Object} json        需要解析的json对象
     * @param  {?Function} replacerOpt 对值进行特殊处理的函数，
     *                                     function (value, key)
     */
    function jsonToQuery(json, replacerOpt) {
        var result = [];
        var itemLen;
        var replacer = replacerOpt || function (value) {
            return escapeSymbol(value);
        };

        $.each(json, function(key, item){
            // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
            if ($.isArray(item)) {
                itemLen = item.length;
                // value的值需要encodeURIComponent转义吗？
                // FIXED 优化了escapeSymbol函数
                while (itemLen--) {
                    result.push(key + '=' + replacer(item[itemLen], key));
                }
            } else {
                result.push(key + '=' + replacer(item, key));
            }
        });

        return result.join('&');
    }

    /**
     * 对目标字符串进行格式化
     * from tangram
     *
     * @param  {String} source 目标字符串
     * @param  {Object|String} opts   提供相应数据的对象或多个字符串
     */
    // function bFormat(source, opts) {
    //     source = String(source);
    //     var data = Array.prototype.slice.call(arguments,1);
    //     var toString = Object.prototype.toString;
    //     if(data.length){
    //         data =
    //             data.length == 1
    //                 ?
    //         // ie 下 Object.prototype.toString.call(null) == '[object Object]'
    //                 (
    //                     opts !== null
    //                         && (/\[object Array\]|\[object Object\]/
    //                                 .test(toString.call(opts)))
    //                     ?
    //                     opts
    //                     :
    //                     data
    //                 )
    //                 :
    //                 data;
    //         return source.replace(
    //             /#\{(.+?)\}/g,
    //             function (match, key) {
    //                 var replacer = data[key];
    //                 // chrome 下 typeof /a/ == 'function'
    //                 if ('[object Function]' == toString.call(replacer)) {
    //                     replacer = replacer(key);
    //                 }
    //                 return ('undefined' == typeof replacer ? '' : replacer);
    //             }
    //         );
    //     }
    //     return source;
    // }

    /**
     * from baidu.json.parse
     */
    function parseJson(data) {
        return (new Function('return (' + data + ')'))();
    }

    /**
     * 发送日志地址
     *
     * @type {String}
     */
    var sendLogUrl = '';

    /**
     * 发送日志方法，摘自zxui
     */
    var send = (function () {
        var list = [];
        var encode = function (value) {
            return encodeURIComponent(value);
        };

        return function (data) {
            var index = list.push(new Image()) - 1;

            list[index].onload = list[index].onerror = function () {
                list[index] = list[index].onload = list[index].onerror = null;
                delete list[index];
            };

            var url = sendLogUrl + '?' + jsonToQuery(data, encode);
            list[index].src = url;
        };
    })();

    /**
     * 显示浮层时，发送日志
     *
     * @param {String} logType 日志类型：
     * v身份： identity
     */
    function sendLog(logType) {
        // 从浮层配置中读取发送日志地址以及发送参数
        var statistics = conf.statistics;

        if(statistics && statistics[logType] && statistics[logType]['url']) {
            // 若是大搜索页面，需添加 searchId ，如下qid即为 searchId
            var bds = window.bds || {};
            var qid = '';
            if (bds && bds.comm && bds.comm.qid) {
                qid = bds.comm.qid;
            }

            // 日志约定必选参数有，searchId，当前页面的url，时间戳
            var query = {
                qid: qid,
                url: window.document.location.href,
                timestamp: +new Date()
            };

            // 获取发送日志地址
            sendLogUrl = statistics[logType]['url'];

            // 合并对应日志类型的下可选参数
            $.extend(query, statistics[logType]['query'] || {});

            // 发送日志
            send(query);
        }
    }

    // 根据数据，渲染模板
    function format(type, obj) {
        obj = obj || {};
        // return bFormat(TPL[type], obj);
        return $.format(TPL[type], obj);
    }

    /**
     * 格式化链接数据
     *
     * @param {Object} obj 链接数据
     * @param {String} text 链接文本
     * @return {String} 返回拼装好的html
     */
    function dataFormatForA(obj, text) {
        // 格式后数据
        var formatObj = {};
        // 返回的html
        var html = '';

        if (obj) {
            // 链接中自定义的属性数据
            var optionArray = [];
            for (var key in obj) {
                // 过滤billing、url、text为key的数据
                if ('billing' === key || 'url' === key || 'text' === key) {
                    continue;
                }
                optionArray.push(
                    ''
                    + '\''
                    + key
                    + '\''
                    + ':'
                    + '\''
                    + obj[key]
                    + '\''
                );
            }

            formatObj = {
                // 若需要计费，则给外层span增加class为EC_PP
                billing: obj.billing && ' class="EC_PP"',
                // 链接的url
                url: obj.url,
                // 链接的文本
                text: obj.text || text,
                // 链接中自定义的属性数据
                options: optionArray.join(',')
            };

            html = format('a', formatObj);

        }
        return html;
    }

    /**
     * 格式化新样式数据
     *
     * @param {String} type 新样式类型
     * @param {Object} obj 新样式数据
     * @return {String} 返回拼装好的html
     */
    function dataForamtForRow(type, obj) {
        var html = '';
        if (obj) {
            // 格式化链接数据
            var aHtml = dataFormatForA(obj.a, baiduxinyurenzheng);
            html = format(type, {
                text: obj.text,
                a: aHtml,
                img: obj.img
            });
        }
        // 返回拼装好的html
        return html;
    }

    /**
     * 获取元素指定属性的值，并返回json格式
     *
     * @param {jQuery} ele dom元素
     * @param {String} type dom元素的指定属性
     */
    function getDataFromAttr(ele, type) {
        // 获取元素指定属性的值
        var attr = ele.attr(type);
        // 返回json对象
        return attr && parseJson(attr);
    }

    /**
     * v身份新样式html
     *
     * @param {Object} json v身份数据
     * @return {String} 返回拼装好的标题html
     */
    function authBodyHtml(json) {
        // 医疗 html
        var medical = dataForamtForRow('medical', json.medical);

        // 企业加v html
        var identity;
        if (json.identity) {
            if (json.identity.img) {
                identity = dataForamtForRow(
                    'identityImg',
                    json.identity
                );
            }
            else {
                identity = dataForamtForRow(
                    'identity',
                    json.identity
                );
            }
        }

        // 信誉v，用的是 identity 的数据
        var credit = dataForamtForRow('credit', json.identity);

        // 个人加v html
        var personal;
        if (json.personal && json.personal.img) {
            personal = dataForamtForRow('personalImg', json.personal);
        }
        else {
            personal = dataForamtForRow('personal', json.personal);
        }

        // 航协 html
        var airline = dataForamtForRow('airline', json.airline);

        // 药监局 html
        var dfa = dataForamtForRow('dfa', json.dfa);

        // 所有新样式，有则显示，没有不显示
        var list = format(
            'list',
            {
                medical: medical,
                // identity: identity,
                credit: credit,
                airline: airline,
                dfa: dfa,
                personal: personal
            }
        );

        var contentHTML = '' + list;

        return contentHTML;
    }

    /**
     * 承诺浮层html
     *
     * @param  {Object} json v身份数据
     * @return {string}      返回拼装好的标题html
     */
    function commitmentBodyHtml(json) {
        var itemHtml = '';

        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                itemHtml += format('commitmentItem', {
                    text: json[key].text,
                    url: json[key].url,
                    fm: json[key].fm,
                    p1: json[key].p1
                });
            }
        }

        var html = format(
            'commitmentList',
            {
                commitmentContent: itemHtml
            }
        );

        return html;
    }

    /**
     * 渲染浮层
     *
     * @param  {String} tipType 浮层类型
     * @param  {Object} params 参数
     */
    function renderTip(tipType, params) {
        // 获取当前tipType的dom节点集合
        var domList = $('.' + params.clsList.join(',.'));

        // 获取当前tipType获取数据的dom的属性名
        var attrKey = params.attrKey;

        // 获取当前tipType的标题
        var tipTitle = params.tipTitle;

        for (var i = 0, len = domList.length; i < len; i++) {
            var $el = $(domList[i]);
            if (tipType !== 'identity') {
                var $parentDom = $el.parent();
                if (
                    $parentDom.length
                    &&
                    $parentDom.hasClass('EC_PP')
                ) {
                    var tip = new bds.se.tip({
                        target: $el[0]
                    });
                    tip.onShow = bind(doShow, tip, tipType, attrKey, tipTitle);
                }
            }
            else {
                // 筛选商业结果
                if (
                    $el.parents('.EC_ppim_top').length
                    ||
                    $el.parents('.EC_im').length
                    ||
                    $el.parents('.ec_pp_top').length
                ) {
                    var tip = new bds.se.tip({
                        target: $el[0]
                    });
                    tip.onShow = bind(doShow, tip, tipType, attrKey);
                }
            }
        }
    }

    /**
     * tip浮层显示时的回调
     *
     * @param  {String} tipType  浮层类型
     * @param  {String} attrKey  用于获取dom属性的key
     * @param  {?String} tipTitle 浮层里面的标题
     */
    function doShow(tipType, attrKey, tipTitle) {
        if (tipType === 'identity') {
            sendLog(tipType);
        }

        var me = this;
        if (!me.alreadyRender) {
            me.op.offset = conf.offset[tipType];
            var triggerEl = me.getTarget();
            var $triggerEl = $(triggerEl);

            var triggerElWidth = $triggerEl.width();
            if (isNaN(triggerElWidth)) {
                triggerElWidth = 0;
            }

            if (triggerElWidth > 20) {
                me.op.arrow.offset = triggerElWidth / 2;
            }

            // 右侧im的浮层居左对齐
            if ($triggerEl.attr('data-tip-limite')) {
                // 参照的dom
                // 以每个v标的父`.EC_im`节点作为参照
                var referenceDom = $triggerEl.parents('.EC_im');

                // 参照dom的left
                var referenceLeft =
                    parseInt(
                        referenceDom.position().left,
                        10
                    );

                // 参照dom的width
                var referenceWidth =
                    parseInt(
                        referenceDom.width(),
                        10
                    );

                // v标的偏移
                var domOffset = parseInt(
                    $triggerEl.position().left,
                    10
                );

                var sub =
                    Math.abs(
                        (referenceLeft + referenceWidth - TIPWIDTH) - domOffset
                    );

                me.op.offset = {
                    x: sub,
                    y: 25
                };

                me.op.arrow = {
                    has :  1,
                    // offset : sub
                    offset : triggerElWidth > 20
                                ? sub + triggerElWidth / 3
                                : sub
                };

            }

            // 浮层的内容
            var tipContent = '';

            var data = getDataFromAttr($triggerEl, attrKey);

            switch (tipType) {
                case 'identity':
                    var url = $triggerEl.attr('href');
                    if (
                        data.identity
                        &&
                        data.identity.a
                        &&
                        !data.identity.a.url
                    ) {
                        data.identity.a.url = url;
                    }
                    if (
                        data.personal
                        &&
                        data.personal.a
                        &&
                        !data.personal.a.url
                    ) {
                        data.personal.a.url = url;
                    }
                    tipContent = authBodyHtml(data);
                    me.setTitle(data.title);
                    break;
                case 'commitment':
                    tipContent = commitmentBodyHtml(data);
                    break;
                case 'med':
                    tipContent = format(tipType, data);
                    me.setTitle(zhengguiyaopinxiaoshouwangzhan);
                    break;
                case 'air':
                    tipContent = format(tipType, data);
                    me.setTitle(zhengguiwangshangxiaoshouwangzhan);
                    break;
                case 'coupon':
                    var aChildren = me.getDom().find('a');
                    var aList = [];
                    for (
                        var j = 0, aLen = aChildren.length;
                        j < aLen;
                        j++
                    ) {
                        if (
                            aChildren[j].tagName.toLowerCase()
                            ===
                            'a'
                        ) {
                            aList.push(aChildren[j]);
                        }
                    }
                    if (aList.length) {
                        E.pl.ck(aList, E.pl.imTimesign);
                    }
                case 'tel':
                default:
                    tipContent = format(tipType, data);
                    tipTitle && me.setTitle(tipTitle);
            }
            me.setContent(tipContent);

            // 只有setContent后tip.getDom才会取到设置进去的content
            if (tipType === 'identity') {
                if (data[tipType] && data[tipType].process) {

                    var processValue = data[tipType].process;
                    var processLevel = data[tipType].process_level;

                    A.use(
                        'honourCard',
                        function () {
                            A.ui.honourCard(
                                me.getDom().find('.EC-credit')[0],
                                data[tipType].a.url,
                                processLevel,
                                processValue,
                                data[tipType].a
                            )
                        }
                    );
                }

            }

            me.alreadyRender = true;
        }
    }

    /**
     * 检测大搜索页面中bds.se.tip对象
     */
    var checkTipComponentTimer;
    function checkTipComponent() {
        if (!bds || !bds.se || !bds.se.tip) {
            checkTipComponentTimer = setTimeout(function () {
                checkTipComponent();
            }, 10);
        }
        else {
            checkTipComponentTimer && clearTimeout(checkTipComponentTimer);
            $.each(tipTypeConf, function (key, value) {
                renderTip(key, value);
            });
        }
    }

    /**
     * 初始化
     */
    function init(opts) {
        $(document).ready(function () {
            $.extend(true, conf, opts || {});
            checkTipComponent();
        });
    }

    return {
        init: init
    };
});
