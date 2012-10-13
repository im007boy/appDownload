    var bg = (function(){
        var appUrl = '';
        var options = ['showLink', 'autoCopy', 'autoDownload'];

        if (typeof localStorage['showLink'] == 'undefined')
            localStorage['showLink'] = '1';

        var menu = chrome.contextMenus.create({
                'type':'normal',
                'title':'Download',
                'contexts':["all"],
                'documentUrlPatterns':[
                    'https://chrome.google.com/extensions/detail/*',
                    'https://chrome.google.com/webstore/detail/*'
                ],
                'onclick': function(info, tab){
                    /*
                    * from Extension Gallery and Web Store Inspector
                    * */
                    var match = tab.url.match(/^https:\/\/chrome.google.com\/(?:extensions|webstore)\/detail\/[^/]+\/(\w+)/);
                    if(match != null && match.length == 2) {
                        appUrl = "http://clients2.google.com/service/update2/crx?response=redirect&x=id%3D" + match[1] + "%26uc%26lang%3Den-US&prod=chrome";

                        if (localStorage['showLink'] == '1')
                            chrome.tabs.create({
                                selected : true,
                                url : './download.html'
                            }, function (tab){
                            });

                        if (localStorage['autoCopy'] == '1'){
                            var text = document.getElementById('copy');
                            text.value = appUrl;
                            text.select();
                            console.log(document.execCommand('copy', false, null));
                        }
                        
                        if (localStorage['autoDownload'] == '1')
                            chrome.tabs.update(tab.id, {
                                url: appUrl
                            })
                    }
                    
                }
            });
        return {
            'getUrl': function(){
                var _ = appUrl;
                appUrl = '';
                return _ || '';
            },
            'getOptions': function(){
                return options.concat([]);
            }
        };
    })();