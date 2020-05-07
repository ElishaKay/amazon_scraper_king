<h3>Next Steps: April 5th, 2020</h3>

Verift that the scraper stops after the final page, and goes to the MyAmazonHistory Profile Page on Completion.



<h3>Next Steps: March 20, 2020</h3>

In content.js
"images sent correctly. fix get pagination function on 2018 page"


In Background.js:
 //to-do: log whichever page has already been visited
 //to-do: log whichever year has been completely scraped

Other stuff:

b) Define functions in Background.js and Server to keep track of which years have already been scraped. If a given year contains pagination, the DB's purchase_year table should be filled within one record per page (of the given year).

<h3>Messaging: Important Note</h3>

'if you're debugging your extension and the Dev Tools window is open and focused, the array will be empty. You should check for that.'

<a href='https://stackoverflow.com/questions/29681477/background-script-messaging-with-javascript'>source</a>

<h3>Never Post from the Content Page - only Background.js!</h3>

This type of structure can support scraping on any social network. Why? Github.com and LinkedIn.com know when someone is making post requests directly from the DOM. But, there's no way they can know what's happening from the 'popup.js' page (or the 'background.js' pages) because popup.js and background.js are part of the Chrome Browser's Internal Structure.

Here's a code example of how the communication between background.js and content.js work:


Content.js:
```javascript
chrome.runtime.sendMessage({type: "imageData", images: stuffToSave});
```

Popup.js (or Background.js):
```javascript
chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
                case "imageData":
                    console.log('got image Data from content.js: ', message)

```


Because the chrome.runtime.onMessage API goes out to the content.js, background.js, and popup.js pages, Chrome Extension developers frequently use the JavaScript switch statement when listening for these events.

You can use the following template in any of your main extension pages:

```
chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
            	case x:
				    // code block
				    break;
				case y:
				    // code block
				    break;
				default:
				    // code block
            }
        }
);
```
