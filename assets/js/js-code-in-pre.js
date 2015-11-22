
(function(doc){
    var configs = doc.querySelectorAll('script[data-config]');
    var pre = doc.body.getElementsByTagName('pre')[0];
    [].forEach.call(configs, function(config) {
        if(pre){
            var lt = new RegExp('<', 'g');
            var gt = new RegExp('>', 'g');
            pre.innerHTML += config.innerHTML
                                .replace(lt, '&lt;')
                                .replace(gt, '&gt;');
        }
    });
})(document);
