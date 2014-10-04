;(function($, si) {
    var defaults, replacement, placeholderReplacement;

    $.fn.customFile = function(params, callback) {
        /** Create a placeholder element **/
        placeholderReplacement = $('<div />')
            .html('Set the <code>replacement</code> parameter.')

        /** Set the defaults **/
        defaults = {
            replacement: placeholderReplacement // the replacement elem wraps the file input button
        };

        /** Infer the first argument data type **/
        if (params instanceof $) {
            replacement = params;
        } else {
            if (typeof params === 'object') {
                params = $.fn.extend(defaults, params);
                replacement = params.replacement;
            } else {
                console.warn("The replacement element is either invalid or missing.");
                return;
            }
        }

        /** Apply some needed CSS to the replacement elem **/
        replacement
            .css({
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
            });

        /** Hide the file input button (and make sure it adapts to the parent node dimensions) **/
        this.css({
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
            opacity: 0
        });

        /** Wrap the file input button around the replacement elem **/
        this.wrap(replacement);

        /** Apply the SI.FILES library **/
        si.stylize(this.get(0));

        /** Apply the callback **/
        if (typeof callback === typeof Function) {
            callback(this);
        }

        return this;
    }
}(
    jQuery,
    /** Call Shaun Inman's SI.FILES class **/
    (function() {
        if (window.SI && window.SI.FILES) {
            return window.SI.FILES;
        } else {
            return {
                htmlClass : 'SI-FILES-STYLIZED',
                fileClass : 'file',
                wrapClass : 'cabinet',
                fini : false,
                able : false,
                init : function()
                {
                    this.fini = true;

                    var ie = 0 //@cc_on + @_jscript_version
                    if (window.opera || (ie && ie < 5.5) || !document.getElementsByTagName) { return; } // no support for opacity or the DOM
                    this.able = true;

                    var html = document.getElementsByTagName('html')[0];
                    html.className += (html.className != '' ? ' ' : '') + this.htmlClass;
                },

                stylize : function(elem)
                {
                    if (!this.fini) { this.init(); };
                    if (!this.able) { return; };

                    elem.parentNode.file = elem;
                    elem.parentNode.onmousemove = function(e)
                    {
                        if (typeof e == 'undefined') e = window.event;
                        if (typeof e.pageY == 'undefined' &&  typeof e.clientX == 'number' && document.documentElement)
                        {
                            e.pageX = e.clientX + document.documentElement.scrollLeft;
                            e.pageY = e.clientY + document.documentElement.scrollTop;
                        };

                        var ox = oy = 0;
                        var elem = this;
                        if (elem.offsetParent)
                        {
                            ox = elem.offsetLeft;
                            oy = elem.offsetTop;
                            while (elem = elem.offsetParent)
                            {
                                ox += elem.offsetLeft;
                                oy += elem.offsetTop;
                            };
                        };

                        var x = e.pageX - ox;
                        var y = e.pageY - oy;
                        var w = this.file.offsetWidth;
                        var h = this.file.offsetHeight;

                        this.file.style.top		= y - (h / 2)  + 'px';
                        this.file.style.left	= x - (w - 30) + 'px';
                    };
                },

                stylizeById : function(id)
                {
                    this.stylize(document.getElementById(id));
                },

                stylizeAll : function()
                {
                    if (!this.fini) { this.init(); };
                    if (!this.able) { return; };

                    var inputs = document.getElementsByTagName('input');
                    for (var i = 0; i < inputs.length; i++)
                    {
                        var input = inputs[i];
                        if (input.type == 'file' && input.className.indexOf(this.fileClass) != -1 && input.parentNode.className.indexOf(this.wrapClass) != -1)
                        {
                            this.stylize(input);
                        };
                    };
                }
            };
        }
    }())
));