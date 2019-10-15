import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root");
    // debugger
    document.getElementById("btn").addEventListener("click", ()=>{
        let city = document.getElementById("city").value
        root.innerHTML = city
    })

})