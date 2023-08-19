
console.log('content script loaded')

let searchTerm = ''

const addSearchBar = (node) => {
    const searchbar = document.createElement('input')
    searchbar.setAttribute('type', 'text')
    searchbar.classList.add('searchbarmysearchbar')
    searchbar.setAttribute('id', 'searchbarmy')
    searchbar.setAttribute('placeholder', 'Search')
    searchbar.setAttribute('style', 'width: 100%; height: 100%; border-color: gray; background-color: inherit; color: white; font-size: 2rem;padding-left: 0.5rem;padding-top:1rem;padding-bottom:1rem;border-radius: 0.8rem;border-width: 0.2rem;')

    searchbar.addEventListener('input', (e) => {
        console.log(e.target.value)
        // const searchterm = e.target.value
        searchTerm = e.target.value;
    })

    const searchbarContainer = document.createElement('div')
    searchbarContainer.setAttribute('id', 'searchbarContainer')
    searchbarContainer.appendChild(searchbar)
    searchbarContainer.setAttribute('style', 'width: 90%; height: 30%; display: flex; justify-content: center; align-items: center;margin-top: 1rem;margin-left:0.5rem;margin-right:0.5rem')
    
    if(!document.getElementById('searchbarmy')){
        node.appendChild(searchbarContainer)
    }
}


const observerDom1 = () => {
    const targetNode = document.body;
    const config = { attributes: true, childList: true, subtree: true };

    const cb = (mutationList, observer) => {
        for(const mutation of mutationList){
            if(mutation.type === 'childList'){
                mutation.addedNodes.forEach(node => {
                    // console.log(node.nodeName)
                    // console.log(node.className)
                    // console.log(node)
                    if(node.nodeName === 'TP-YT-PAPER-DIALOG'){
                       const injectnode = node.childNodes[1].childNodes[2]
                       injectnode.setAttribute('style', 'display:flex;flex-direction:column;align-items:center;justify-content:center;')
                       addSearchBar(node.childNodes[1].childNodes[2])

                       const playlistvals = node.childNodes[1].childNodes[4].childNodes

                       const itemsvalue = playlistvals[1].textContent

                       if(itemsvalue.includes(searchTerm)){
                            console.log('yes')
                       }

                       
                    //    playlistvals[1].classList.add('hidden')

                       
                    //    console.log(node.childNodes[1].childNodes[4].childNodes)
                      
                    //    playlistvals.forEach(playlist => {
                    //     console.
                    //    })
                    }
                    
                })
        }
        }
    observer.observe(targetNode, config);
    }



    const observer = new MutationObserver(cb);

    observer.observe(targetNode, config);
}


const observerDom2 = () => {
    const targetNode = document.body;
    const config = { attributes: true, childList: true, subtree: true };

    const cb1 = (mutationList, observer) => {
        for(const mutation of mutationList){
            if(mutation.type === 'childList'){
                mutation.addedNodes.forEach(node => {

                        // console.log(node)
                        // node.addEventListener('change', (e) => {
                        //     console.log(e.target.value)
                        //     const searchterm = e.target.value
    
                    //     if(document.getElementById('playlists')){
                    // //  const playlistvals = document.getElementById('playlists').childNodes
                    //     //     console.log(playlistvals)
                    //         playlistvals.forEach(playlist => {
                    //             const playlistname = playlist.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText
                    //             console.log(playlistname)
                    //             if(playlistname.toLowerCase().includes(searchTerm.toLowerCase())){
                    //                 playlist.classList.remove('hidden')
                    //             }else{
                    //                 playlist.classList.add('hidden')
                    //             }
                    //         }
                    //         )
                    //     }
                        })
        }
        }

    observer.observe(targetNode, config);
    }

    const observer = new MutationObserver(cb1);

    observer.observe(targetNode, config);
}


observerDom1();
// observerDom2();


// style-scope ytd-add-to-playlist-renderer scrollable
//  id playlists
// tp-yt-iron-overlay-background