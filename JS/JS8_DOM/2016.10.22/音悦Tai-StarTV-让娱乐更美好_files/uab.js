(function (global, doc, script_tag_name) {function loadJS(src, id) {var s = doc.createElement(script_tag_name);s.async = true;s.src = src;s.id = id;var m = doc.getElementsByTagName(script_tag_name)[0];m.parentNode.insertBefore(s, m);}function normalizeURL(url) {if (location.protocol === 'file:' && /^\/\//.test(url)) {url = 'https:' + url;}return url;}loadJS(normalizeURL('//aeu.alicdn.com/js/cj/79.js'), 'sd-collina-acjs');if (global.UA_Opt && !UA_Opt.reload) {UA_Opt.reload = function () {};}global.acjs = 1;})(window, document, 'script');