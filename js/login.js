document.getElementById("loginForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const username=document.querySelector('[name="nombre"]').value;
    const password=document.querySelector('[name="contraseña"]').value;
    
    if(username!=="" && (password!=="" && password.length >= 6)){
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username",username);
        location.href="index.html";
    }else{alert("Usuario invalido, ingresa una contaseña con 6 o más caracteres.");
    }
});

