
(function(win, doc){
    win.onresize = displayForkMe;
    function displayForkMe(){
        var forkMe = doc.getElementById('forkMe');
        if(forkMe){
            forkMe.parentNode.removeChild(forkMe);
        }
        if(Math.max(doc.documentElement.clientWidth, win.innerWidth || 0) > 1300) {
            var frag = doc.createDocumentFragment();
            var cont = doc.createElement('div');
            cont.id = 'forkMe';
            cont.innerHTML = '<a id="forkMe" href="https://github.com/koalyptus/TableFilter" target="_blank" style="background:none;"><img style="position: absolute; top: -10px; left: -10px; border: 0; z-index:10000;" src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>';
            frag.appendChild(cont);
            doc.body.appendChild(frag);
        }
    }
    displayForkMe();
})(window, document);
