export const grabNBAPlayer = url => {
  // debugger
  // const proxyUrl= "https://cors-anywhere.herokuapp.com/"
  const proxyUrl = "";
  return fetch(proxyUrl + url, {
    method: "GET"
  }).then(res => res.json());
};
