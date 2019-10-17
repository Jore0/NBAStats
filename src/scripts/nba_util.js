export const  grabNBAPlayer = (url) => {
    // debugger
    const proxyUrl= "https://cors-anywhere.herokuapp.com/"
    return fetch(proxyUrl + url, {
        method: "GET", 
    })
    .then(res => res.json())
}
