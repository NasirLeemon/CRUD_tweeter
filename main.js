
// Data Storage - memory(temporery)
// database
// LocalStorage(browser)
// session Storage

(function () {

    // 1.select the html elements
    const formElm = document.querySelector('form');
    const inputElm = document.querySelector('.input');
    // 15. Selecting ul/ol
    const listGroupElm = document.querySelector('ol');

    //  38. selecting search 
    const filterElm = document.querySelector('#filter');
    const addTweetElm = document.querySelector('.add-tweet')

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

            const htmlElm = `<li class=" mb-2 item-${item.id} Tweet-item "> ${item.tweet} <button class='btn btn-primary delete-item '>Delete</button><i class="fa fa-pencil-alt edit-item ml-3"></i></li>`


            listGroupElm.insertAdjacentHTML('afterbegin', htmlElm);
            // console.log(item); 

        })
    }
    // console.log(tweets);


    function UpdateAfterRemove(tweets, id) {
        return tweets.filter(tweet => tweet.id !== id)
    }

    //36. function
    function removeItemFromDataStore(id) {
        const tweetsAfterDelete = UpdateAfterRemove(tweets, id)
        tweets = tweetsAfterDelete;

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

        const htmlElm = `<li class=" mb-2 item-${id} Tweet-item "> ${input}
        <button class='btn btn-primary delete-item ms-5'>Delete</button>
        <i class="fa fa-pencil-alt edit-item ml-3"></i></li>`

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

    function addItemToLocalStorage(tweet) {
        let tweets;
        if (localStorage.getItem('storeTweet')) {
            tweets = JSON.parse(localStorage.getItem('storeTweet'))
            tweets.push(tweet)
            localStorage.setItem('storeTweet', JSON.stringify(tweets))

        } else {
            tweets = [];
            tweets.push(tweet);
            localStorage.setItem('storeTweet', JSON.stringify(tweets))
        }
    }
    //.54
    function removeTweetFromStorage(id) {
        //   const tweets = UpdateAfterRemove(id)
        //55. pick from local strorage
        const tweets = JSON.parse(localStorage.getItem('storeTweet'));
        // 56. filter korte hobe
        const tweetsAfterRemove = UpdateAfterRemove(tweets, id)
        // 57. add to local storage
        localStorage.setItem('storeTweet', JSON.stringify(tweetsAfterRemove))
    }


    function populateUIInEditState(foundTweet) {
        inputElm.value = foundTweet.tweet
    }

    function showUpdateButton() {
        const btnElm = `<button type="button" class="btn btn-outline-warning update-tweet" >Update</button>`

        // hide the submit Button
        addTweetElm.style.display = 'none';
        formElm.insertAdjacentHTML('beforeend', btnElm)


    }

    //entry Point
    function init() {
        let updatetItemId;
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

            // 46. as amader erokom ekta object local storage e niye jaite hobe so age eta declare korlam
            const tweet = {
                id: id,
                tweet: InputValue,
            }

            // 24. add item to data store 
            //47. 46 number line er por oi tweet ta ekahne push korbo
            tweets.push(tweet)
            // 16. add item to ui
            // 26. pass id too
            addItemToUI(InputValue, id)

            // 45. add item to localStorage
            addItemToLocalStorage(tweet)

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
                // 53. remove item from local storage
                removeTweetFromStorage(id)
                // 35. function call
                removeItemFromDataStore(id)
            } else if (evt.target.classList.contains('edit-item')) {
                // pick the item id
                updatetItemId = getItemId(evt.target);
                // console.log(id);
                // find the item 
                //khujbo data store, cause local store slow
                const foundTweet = tweets.find((tweet) => tweet.id === updatetItemId)

                // populate the item to UI
                populateUIInEditState(foundTweet)
                // show Updated button
                if(!document.querySelector('.update-tweet')){
                    showUpdateButton()
                }

               



            }
        })
 
        formElm.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('update-tweet')) {
                //pick the data from the field
                const tweet = receiveInputs()
                // console.log(tweet);
                //validate input
                const isError = validateInpuT(tweet)
                // console.log(isError);
                if (isError) {
                    alert('Please Write Less than 250 Characters')
                    return;
                }
                // updating the data (from user)
                // console.log(tweets);
                tweets = tweets.map((tweet) => {
                    if (tweet.id === updatetItemId) {
                        // item should be updated
                        return {
                            id: tweet.id,
                            tweet,
                        }
                    } else {
                        // no update
                        return tweet
                    }
                })
                // console.log(tweets);
                // uadated data should be updated to data store
                //reset input
                resetInput()

                // show Submit Button
                addTweetElm.style.display = 'block'
                
                // uadated data should be updated to UI
                showAllItemToUIi(tweets);

                // hide update button
                document.querySelector('.update-tweet').remove();
                // uadated data should be updated to Local storage
            }
        })

        // 50. jodi localstorage e kichu thake tahole browser open korar sathe stahe sheta load HTMLObjectElement. eta kora jay DOMCONTENTLOADED event listener er maddhome

        //51. amra document e ad event listener dibo 
        document.addEventListener('DOMContentLoaded', evt => {

            //52. checking item into local storage
            if (localStorage.getItem('storeTweet')) {
                tweets = JSON.parse(localStorage.getItem('storeTweet'))
                //    console.log(tweets);
                showAllItemToUIi(tweets);


            }
        })
    }

    init();

})();

