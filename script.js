let range = document.querySelector(".len-range");
let form = document.querySelector(".form");
let cpy_btn = document.querySelector(".copy-btn");
const strength = [
    {
        "strenght":"strong",
        "color": "green",
        "index": 4
    },
    {
        "strenght":"medium",
        "color": "yellow",
        "index": 3
    },
    {
        "strenght":"weak",
        "color": "orange",
        "index": 2
    },
    {
        "strenght":"too weak!",
        "color": "red",
        "index": 1
    },
]
let estimateStrength = (options) => {
    let symb_pull = (options.uppercase)? 26 : 0 
                  + (options.lowercase)? 26 : 0
                  + (options.numbers)  ? 10 : 0
                  + (options.symbols)  ? 40 : 0;
    let E = Math.log2(Math.pow(symb_pull, options.length));
    console.log("E = " + E)
    if(E > 80)           return strength[0];
    if(50 < E && E < 80) return strength[1];
    if(20 < E && E < 50) return strength[2];
    if(E < 20)           return strength[3];
}
let createPassword = (data) => {
    let password_options = new Object;
    password_options.length    = (data.len) ? parseInt(data.len) : password_options.len;
    password_options.uppercase = (data.uppercase) ? true : false;
    password_options.lowercase = (data.lowercase) ? true : false;
    password_options.numbers   = (data.numbers)   ? true : false;
    password_options.symbols   = (data.symbols)   ? true : false;
    let password = passfather(password_options);
    let strength = estimateStrength(password_options);
    return [password, strength];

}
let populateHtml = ([password, strength]) => {
    console.log(strength.index);

    let result = document.querySelector(".result-password");
    let result_text = document.querySelector(".strength-result-text");
    let bars = document.querySelectorAll(".strength-bar");
    result.value = password;
    result_text.textContent = strength.strenght;
    for(let i = 0; i < bars.length; i++){
        bars[i].dataset.color = "none";
        if(i < strength.index) bars[i].dataset.color = strength.color;
    }
}
let validationInputData = () => {
    let isValid = true;
    let chboxes = document.querySelectorAll("[type='checkbox']:checked")
    if(range.value < 1) {
        range.classList.add("error");
        isValid = false;
    }
    if(chboxes.length == 0){
        document.querySelector(".list-container").classList.add("error")
        isValid = false;
    }
    return isValid;
}
let removeError = (e) => {
    if(e.target.type == "range" && range.value > 0) e.target.classList.remove("error");
    if(e.target.type == "checkbox"){
        document.querySelector(".list-container").classList.remove("error")
    }
}
let handleRange = (e) => {
    let range_value = document.querySelector(".len-value");
    range_value.textContent = e.target.value;
}
let handleSubmit = (e) => {
    e.preventDefault()
    document.querySelector(".copy-btn p").classList.add("hidden");
    if(validationInputData()){
        const dataForm = new FormData(e.target);
        const data = Object.fromEntries(dataForm);
        console.log(data);
        populateHtml(createPassword(data));
    }
}
let handleCopy = (e) => {
    let password =  document.querySelector(".result-password").value;
    if(password){
        navigator.clipboard.writeText(password);
        document.querySelector(".copy-btn p").classList.remove("hidden");
    }
}

range.addEventListener("input", handleRange)
form.addEventListener("submit", handleSubmit);
form.addEventListener("input", removeError);
cpy_btn.addEventListener("click", handleCopy);