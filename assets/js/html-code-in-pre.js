(function(doc){
    var elms = doc.querySelectorAll('div[data-config]');
    var pre = doc.querySelector('pre.html>code');
    pre.innerHTML = elms.length===0 ? 'N/A' : '';

    [].forEach.call(elms, function(elm) {
        if(pre){
            var lt = new RegExp('<', 'g');
            var gt = new RegExp('>', 'g');
            pre.innerHTML += elm.innerHTML
                                .replace(lt, '&lt;')
                                .replace(gt, '&gt;');
        }
    });
})(document);
