
console.log('content script loaded')

let searchTerm = ''
let injectnode = ''


const filterPlaylists = () => {

        const playlistvals = document.getElementById('playlists').childNodes

        playlistvals.forEach(playlist => {
            const playlistname = playlist.childNodes[2].childNodes[2].childNodes[1].childNodes[1].textContent
            
        if(playlistname.toLowerCase().includes(searchTerm.toLowerCase())){
            playlist.classList.remove('hidden')
        }else{
            playlist.classList.add('hidden')
        }
        })
}

const addSearchBar = (node) => {
    //creating the seachbar

    const searchbar = document.createElement('input')
    searchbar.setAttribute('type', 'text')
    searchbar.classList.add('searchbarmysearchbar')
    searchbar.setAttribute('id', 'searchbarmy')
    searchbar.setAttribute('placeholder', 'Search')
    searchbar.setAttribute('style', 'width: 100%; height: 100%; border-color: gray; background-color: inherit; color: white; font-size: 2rem;padding-left: 0.5rem;padding-top:1rem;padding-bottom:1rem;border-radius: 0.8rem;border-width: 0.1rem;')

    //add searchbar event listener

    searchbar.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        console.log(searchTerm)
        filterPlaylists(searchTerm)
    })

    //creating the search bar container
    
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
                    if(node.nodeName === 'TP-YT-PAPER-DIALOG'){
                        if(node.childNodes[1].childNodes[2]){
                          injectnode = node.childNodes[1].childNodes[2]
                        }
                       injectnode.setAttribute('style', 'display:flex;flex-direction:column;align-items:center;justify-content:center;')
                       addSearchBar(node.childNodes[1].childNodes[2])
                    }
                    
                })
        }
        }
    observer.observe(targetNode, config);
    }



    const observer = new MutationObserver(cb);

    observer.observe(targetNode, config);
}



observerDom1();
