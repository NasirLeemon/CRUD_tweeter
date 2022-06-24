
(function () {

    // 1.select the html elements
const formElm = document.querySelector('form');
const inputElm = document.querySelector('.input');
// 15. Selecting ul/ol
const listGroupElm = document.querySelector('ol');

//  38. selecting search 
const filterElm = document.querySelector('#filter');


//  23. age ekta data source lagbe jeta te amader tweet and id thakbe
let tweets = [
    // {
    //     id : 0,
    //     tweet : 'I am well Now!'
    // },
    // {
    //     id : 1,
    //     tweet : 'I am not well Now!'
    // },

]



// 43. show Item to UI
function showAllItemToUIi(items) {
    // 44.  liselm er inner html faka korte hobe cause ager jegulo tweet thakbe shegulokeo muche felte hobe
    listGroupElm.innerHTML = ''
    items.forEach((item) => {

        const htmlElm = `<li class=" mb-2 item-${item.id} Tweet-item "> ${item.tweet} <button class='delete-item ms-5'>Delete</button></li>`


        listGroupElm.insertAdjacentHTML('afterbegin', htmlElm);
        // console.log(item); 
       
    })
}
// console.log(tweets);



//36. function
function removeItemFromDataStore(id) {
    tweets = tweets.filter(tweet => tweet.id !== id)

    // console.log(tweets);

}


// 32. removeItemFromUI function
function removeItemFromUI(id) {
    //34. but we will delete it in a different function
    document.querySelector(`.item-${id}`).remove()

}

// 28. get id function
function getItemId(elem) {
    const lielm = elem.parentElement
    // 30. getting the id in parent element of delete button
    return Number(lielm.classList[1].split('-')[1]);
}

//20. taking the function
function resetInput() {

    inputElm.value = ''
}


// 17. function
function addItemToUI(input, id) {
    //22. generate unique id

    const htmlElm = `<li class=" mb-2 item-${id} Tweet-item "> ${input} <button class='delete-item ms-5'>Delete</button></li>`

    // 18. add element to ui
    listGroupElm.insertAdjacentHTML('afterbegin', htmlElm);


}



// 12. validate input function
function validateInpuT(input) {
    let isError = false;
    if (!input || input.length > 250) {
        // console.log('Invalid Input');
        isError = true;

    }
    return isError;
}

// 6. Single Responsibility Principel
// ---- ekta function er ektai responsibility thakbe
// ----- alada alada function nibo

// 8. function nilam
function receiveInputs() {

    // 9. ekhan theke return korbo data upore
    const InputValue = inputElm.value
    return InputValue;
}


//entry Point
function init() {

    // 2. add event to formElm 
    formElm.addEventListener('submit', (evt) => {
        // 3. prevent reload
        evt.preventDefault();
        // 4. console.log(evt);

        // 5. getting input value
        // console.log(inputElm.value);

        // 7. function call
        // 10. ekhane receive korbo input
        const InputValue = receiveInputs();
        // console.log(InputValue);

        // 11. validate input
        // 13 inputValue pass korlam
        const isError = validateInpuT(InputValue)
        // console.log(isError);

        //37 if eserror hoy tahole alert diye dibo
        if (isError) {
            alert('Please Write Less than 250 Characters')
            return;
        }

        // 14. error na thakle update korbo ui e

        // 25. global id variable
        const id = tweets.length
        // 24. add item to data store 
        tweets.push({
            id: id,
            tweet: InputValue,
        })
        // 16. add item to ui
        // 26. pass id too
        addItemToUI(InputValue, id)
        // 19. reset input after adding tweet
        // console.log(tweets);
        resetInput();
    })


    // 39. add event listener to filter element to get filtered value
    filterElm.addEventListener('keyup', (evt) => {

        // 40. filtered value
        const filterValue = evt.target.value

        // 41. as we tracked everything in the Tweets so we will filtere tweets to check if it is in the array or not 
        const filteredArr = tweets.filter((tweet) =>
            tweet.tweet.includes(filterValue)

        )
        // console.log(result);
        // 42. show Item to UI
        showAllItemToUIi(filteredArr)
    })


    // 21. Deeting Item;
// as this is a dynamic element so we cant delete item
// we should take event delegation
// puro parent ke event listen korabo
listGroupElm.addEventListener('click', (evt) => {
    // console.log(evt);
    // ei click event er target jodi delete item hoy taile delete korbo
    if (evt.target.classList.contains('delete-item')) {
        // console.log('delete-item');
        // 27. ekhane id ta khuje nibo
        // 29. ekahne theke evt.target pass korbo
        const id = getItemId(evt.target);
        // console.log(id);

        //33. we can delete item from here
        // document.querySelector(`.item-${id}`).remove()

        // 31. delete item from UI function call
        removeItemFromUI(id);
        // 35. function call
        removeItemFromDataStore(id)
    }
})

}

init();

})();

