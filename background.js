browser.menus.create({
  id: "https://github.com/webdkt/ff-close-similar-tabs.git",
  title: "Close similar tabs",
  contexts: ["tab"]
});

browser.menus.onClicked.addListener((info, tab) => {
  console.log("Item " + info.menuItemId + " clicked " +
              "in tab " + tab.id);
			  
  if (info.menuItemId == "https://github.com/webdkt/ff-close-similar-tabs.git"){
	  var url = extractHostnameWithProtocol(tab.url);
	  console.log(url);
	  var querying = browser.tabs.query({url: url + "/*",currentWindow: true});
	  querying.then(function(tabs){
			for (tab of tabs){
				browser.tabs.remove(tab.id);
			}
		
	  })
	  
  }
});

function extractHostnameWithProtocol(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
	var protocol = ""
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
		protocol = url.split('://')[0];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    //hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
	if (protocol.length>0){
		hostname = protocol + "://" + hostname;
	}
    return hostname;
}