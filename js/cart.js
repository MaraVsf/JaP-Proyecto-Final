document.addEventListener('DOMContentLoaded', ()=> {
   let cantidad=document.getElementById('cantidad').value;
   let costo=document.getElementById('costo').value;
    let subtotal=document.getElementById("subtotal")

    function CalcularSubtotal(){
        subtotal=cantidad*costo;
    }
    function CalcularTotal(){
        let subtotales=document.getElementsByClassName(subtotal);
        for(i=0;i<subtotales.length;i++)
        Total=subtotales.value+subtotales.value;
    }
    cantidad.addEventListener("input",CalcularSubtotal);
    CalcularSubtotal();
   });
  
  