console.log("Content js script loaded.");



// localStorage.removeItem('search_term');
// window.location.href = 'https://www.pinterest.com/search/pins/?q='+search_term;
// let search_term = localStorage.getItem('search_term');



chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "init":  

              break;

            case "scrapeTime":
            //scroll to the bottom of the amazon orders page
              window.scrollTo(0,document.querySelector(".navLeftFooter").scrollHeight+5000);
              window.location.href = 'https://www.amazon.com/gp/your-account/order-history?opt=ab&digitalOrders=1&unifiedOrders=1&returnTo=&orderFilter=year-2018';

              let search_term = message.campaign.search;
              let campaign_id = message.campaign.campaign_id;
              let client_id = message.creds.client_id;
            
              console.log('ran scrapeTime function in content.js')

              let images = document.querySelectorAll('.gridCentered img');
              let stuffToSave = [];
              console.log('these are the images:',images);
              for (i = 0; i < 5; i++) { 
                let image_description = images[i].alt;
                let image_src = images[i].src;
                stuffToSave.push({campaign_id, image_description, image_src});    
              }
              console.log(stuffToSave);
              chrome.runtime.sendMessage({type: "imageData", images: stuffToSave});

              function wait(ms){
                  var start = new Date().getTime();
                  var end = start;
                  while(end < start + ms) {
                  end = new Date().getTime();
                  }
              }

            break;
        }
    }
);


