export const  grabNBAPlayer = (url) => {
    const proxyUrl= "https://cors-anywhere.herokuapp.com/"
    return fetch(proxyUrl + url, {
        method: "GET", 
    })
    .then(res => res.json())
}
