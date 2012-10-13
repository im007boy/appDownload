    function init(){
        var bg = chrome.extension.getBackgroundPage().bg;
        var options = bg.getOptions();
        var checkbox;
        for (var i = 0;i < options.length;i ++){
            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (localStorage[options[i]] == '1')
                checkbox.checked = true;
            checkbox.onchange = (function(){
                var key = options[i];
                console.log(key);
                return function(){
                    if (this.checked)
                        localStorage[key] = '1';
                    else
                        localStorage[key] = '0';
                };
            })();

            var label = document.createElement('label');
            label.innerHTML = options[i];
            label.appendChild(checkbox);
            document.body.appendChild(label);
        }

        document.body.appendChild(document.createElement('hr'))
        var url = bg.getUrl();
        var dom = document.createElement('a');
        dom.href = url;
        dom.innerHTML = url;
        document.body.appendChild(dom);
    }
window.addEventListener('load', init, false);