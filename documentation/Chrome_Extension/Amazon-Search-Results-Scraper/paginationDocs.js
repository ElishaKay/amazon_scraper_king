let pagination = document.querySelectorAll('.a-pagination');
if(pagination[0]){
    let paginationDetails = pagination[0].textContent.split('\n') 
    console.log(paginationDetails);
} else {
        console.log({mutliPage:false});
}


Next Page: 

https://www.amazon.com/s?k=javascript&page=2