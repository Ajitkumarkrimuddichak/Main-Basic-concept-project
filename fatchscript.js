document.getElementById("btn").addEventListener("click", makerequest);

// function makerequest() {
//     console.log("Button Clicked");
//     const probj = fetch('data.txt');
//     console.log(probj);
//     probj.then((res) => {
//         console.log(res);
//         return res.text()
//     }).
//         then((data) => {
//             console.log(data)
//         })
// }

function makerequest() {
    console.log("Button Clicked")
    fetch('data.txt').then((res) => {
        console.log(res);
        return res.text()
    }).
        then((data) => {
            console.log(data)
        })

}