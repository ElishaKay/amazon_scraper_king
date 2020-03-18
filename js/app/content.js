console.log('content script ran')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello"){
    	window.location.href='https://www.amazon.com/gp/your-account/order-history';
    }
      sendResponse({farewell: "goodbye"});
    }
);