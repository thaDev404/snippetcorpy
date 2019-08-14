    let copyid = 0;
    let selector;
    let w3href = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?(w3schools\.com)+(\W|\w+)*/igm
    let w3 = (w3href.test(window.location.href));

    if (w3 == true){
        selector = '.w3-code';
    }
    else{
        selector = 'pre';
    }

    [...document.querySelectorAll(`${selector}`)].forEach(function(el) {
        const wrapper = document.createElement('div');
        wrapper.className = 'pre-wrapper';
        wrapper.setAttribute('pre-copyid', copyid);
        el.parentNode.insertBefore(wrapper, el);
        el.parentNode.removeChild(el);
        wrapper.appendChild(el);
        el.parentElement.style.margin = el.ownerDocument.defaultView.getComputedStyle(el,null).margin;
        const button = document.createElement('button');
        button.className = 'copy-snippet';
        button.textContent = 'Copy';
        button.setAttribute('copyid', copyid);
        if (el.parentNode) {
            el.parentNode.insertBefore(button, el.nextSibling);
        }
        copyid++; 
    });

    [...document.querySelectorAll(".pre-wrapper")].forEach(function(wrapper) {
        wrapper.addEventListener("mouseover", function() {      
            copyid = wrapper.getAttribute('pre-copyid');
            document.querySelector(`button[copyid='${copyid}']`).style.visibility = "visible";            
        });
        wrapper.addEventListener("mouseout", function() {      
            copyid = wrapper.getAttribute('pre-copyid');
            document.querySelector(`button[copyid='${copyid}']`).style.visibility = "hidden";            
        });
    });

    [...document.querySelectorAll('.copy-snippet')].forEach(function(item) {
        item.addEventListener('click', function() {
            let snippet = item.previousSibling.textContent;
            let copyFrom = document.createElement("textarea");
            copyFrom.textContent = snippet;
            document.body.appendChild(copyFrom);
            copyFrom.select();
            try {
                document.execCommand('copy');
                item.textContent  = 'Copied';
            } catch (err) {
                item.textContent  = 'FAILED: Could not copy';   
                console.error(err.message);             
            }
            setTimeout(function(){
                item.textContent  = 'Copy';
            }, 1000);
            copyFrom.blur();
            document.body.removeChild(copyFrom);
            });
        });