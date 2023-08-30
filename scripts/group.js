
const observerDom = () => {
    const target = document.body;
    const config = { childList: true, subtree: true, attributes: true };

    const callback = function (mutationsList, observer) {
        // for(const mutation of mutationsList){
            

        // }
        // console.log('somehting')
    };

    const observer = new MutationObserver(callback);
    observer.observe(target, config);
}

observerDom();

// const subs =  document.getElementById('expandable-items')
// console.log(subs)
// console.log('hehsvhbdsf+')