let range = document.querySelector(".len-range");
let form = document.querySelector(".form");
let password_oprions = {
    numbers:   true,
    uppercase: false,
    lowercase: false,
    symbols:   false, 
    length:    16
}





let handleRange = (e) => {
    let range_value = document.querySelector(".len-value");
    range_value.textContent = e.target.value;
}
let handleSubmit = (e) => {
    e.preventDefault()
    const dataForm = new FormData(e.target);
    const data = Object.fromEntries(dataForm);
    console.log(data);
    console.log( passfather({
        numbers: false,
        uppercase: false,
        lowercase: false,
        symbols: true, 
        length: 16,
    }));
}







range.addEventListener("input", handleRange)
form.addEventListener("submit", handleSubmit);