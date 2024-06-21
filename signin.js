import { postBiasa } from "./api.js";
import { getValue } from "./element.js";
import { setCookieWithExpireHour } from "./cookies.js";
import { loginuserbarunowa } from "./gudangAPI.js"

const loadingIndicator = document.getElementById("loadingIndicator");
const loginButton = document.getElementById("btnLogin");

export default function LoginUser(){
    let username = getValue("usernamelogin");
    let password = getValue("passwordlogin");
    if (!username) {
        // alert("Username perlu untuk diisi");
        return; // Stop execution if the fields are not filled
    }
    if (!password) {
        // alert("Password perlu diisi");
        return; // Stop execution if the fields are not filled
    }


    let datainjson = {
        "username": username,
        "password": password
    }

    loginButton.style.display = "none";
    loadingIndicator.style.display = "block";

    postBiasa(loginuserbarunowa,datainjson,responseData);
}


// function responseData(data) {
//     loadingIndicator.style.display = "none";
//     if (data.message == "Selamat Datang") {
//         const token = data.token;
//         setCookieWithExpireHour("token",token,2);
//         window.location.href = "../../user";
//         console.log(token);
//     } 
// }
function responseData(result) {
    loadingIndicator.style.display = "none";

    if (result.status === true) {
        // const userData = data.data;
        const token = result.token;
        
        // Accessing individual properties from the data object
        // const username = userData.Username;
        // const password = userData.Password;
        // const privateInfo = userData.Private;
        // const publicInfo = userData.Publick;
        const username = result.username;
        // const pasetoUser = userData. 
        // Note: Typo in the property name ("Publick" instead of "Public")

        // You can use the extracted data as needed

        // For example, setting a cookie
        // setCookieWithExpireHour("name", getValue("usernamelogin"), 2);
        setCookieWithExpireHour("name", username, 2);
        setCookieWithExpireHour("token", token, 2);
        // setCookieWithExpireHour("name", data.username, 2);

        // Redirecting to another page
        window.location.href = "https://e-katalog-film.github.io/Berkemah/pages/user/";

        // Logging some information
        console.log("token", token);

        console.log("Username:", username);
        // console.log("Password:", password);
        // console.log("Private Info:", privateInfo);
        // console.log("Public Info:", publicInfo);
    }else {
        Swal.fire({
            title: "Data Yang Anda Masukan Salah",
            text: "Username Password Salah atau Akun Tidak Ada",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Coba Login Ulang",
            cancelButtonText: "Buat Akun"
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "https://e-katalog-film.github.io/Berkemah/pages/signin/";
            }
            else{
                window.location.href = "https://e-katalog-film.github.io/Berkemah/pages/signup/index.html";
            }
          });
        console.error("Gagal Login, Coba Lagi");
        return "Error: Gagal Login, Coba Lagi";
    }
    
}

// function setCookieWithExpireHour(name, value, hours) {
//     var d = new Date();
//     d.setTime(d.getTime() + hours * 60 * 60 * 1000);
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }