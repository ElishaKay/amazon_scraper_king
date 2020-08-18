<h3>Best Practices: Make all HTTP Post Requests from the Background.js</h3>

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

```javascript
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

<h3>DONE</h3>

<ul>
  <li>Save Product Title</li>
  <li>Save Product Description</li>
  <li>Save Product Image</li>
  <li>Save Product Reviews</li>	
  <li>Log whichever page has been visited</li>	
  <li>Log whichever year has been completely scraped</li>
  <li>Toggable Div to show which year is currently being scraped</li>
</ul>

