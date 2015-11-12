
(function(doc){
    var configs = doc.querySelectorAll('style[data-config]');
    var pre = doc.querySelector('pre.css');
    [].forEach.call(configs, function(config) {
        if(pre){
            pre.innerHTML += config.innerHTML
                                .replace('<', '&lt;')
                                .replace('>', '&gt;');
        }
    });
})(document);
