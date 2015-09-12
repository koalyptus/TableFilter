
(function(doc){
    var configs = doc.querySelectorAll('script[data-config]');
    var pre = doc.body.getElementsByTagName('pre')[0];
    [].forEach.call(configs, function(config) {
        if(pre){
            pre.innerHTML += config.innerHTML
                                .replace('<', '&lt;')
                                .replace('>', '&gt;');
        }
    });
})(document);
