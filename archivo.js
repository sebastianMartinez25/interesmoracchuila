const vue = new Vue({
    el:'#app',
    data:{
       
    seleccionado: {},
    listaDatos : [],
    textoI: "",
    },

    created(){
    this.getLista()
    //this.textoInicia()
    },
    methods:{
    recargar(){
    console.log("recargando");
    this.getLista()
    //this.textoInicia()
    },
    liquidacion(){

var ultimaFile=this.listaDatos.length;
var tasaAjustada=(this.listaDatos[ultimaFile-1][3]);
tasaAjustada=tasaAjustada.replace(",",".");
var tasaDiaria=(parseFloat(tasaAjustada)/365)/100;

var fechaUno=new Date(document.getElementById("fechaUno").value);
var fechaDos=new Date(document.getElementById("fechaDos").value);
var fechaHoy= new Date;
var milisegundos=1000*60*60*24;
var resultado=document.getElementById("resultado");
var diasMora=document.getElementById("diasMora");
valorLiquidacion=document.getElementById("valorLiquidacion");
var liquidar=(valorLiquidacion.value);

if(liquidar.indexOf(".")!=-1)
{
  liquidar=liquidar.split(".").join("");
}

const regex=/^[0-9]+$/;

var fechaBuscar=document.getElementById("fechaDos").value
const partOneMes= fechaBuscar.indexOf("-");
const partEndMes= fechaBuscar.lastIndexOf("-");
const mesBuscar=fechaBuscar.substring(partOneMes+1,partEndMes);
const anoBuscar=fechaBuscar.substring(0,partOneMes);

if(fechaUno.getTime()<=fechaDos.getTime() && regex.test(liquidar) && parseInt(anoBuscar)>=2018)
{
    var diasM=(((fechaDos.getTime())-(fechaUno.getTime()))/milisegundos)+1;

var fechaRecorrido;
var mesOneRecorrido;
var mesEndRecorrido;
var mesRecorrido;
var anoRecorrido;
var lengthRecorrido;
var tasaEncontrada;
for(var l=0;l<=ultimaFile-1;l++)
{
  fechaRecorrido=this.listaDatos[l][1];
  lengthRecorrido=(fechaRecorrido.length);
  mesOneRecorrido=fechaRecorrido.indexOf("/");
  mesEndRecorrido=fechaRecorrido.lastIndexOf("/");
  mesRecorrido=fechaRecorrido.substring(mesOneRecorrido+1,mesEndRecorrido);
  anoRecorrido=fechaRecorrido.substring(mesEndRecorrido+1,lengthRecorrido);
  if(parseInt(anoBuscar)==parseInt(anoRecorrido) && parseInt(mesBuscar)==parseInt(mesRecorrido))
  {
    tasaEncontrada=this.listaDatos[l][3];
    break;
  }
}
tasaEncontrada=tasaEncontrada.replace(",",".");
var tasaDay=(parseFloat(tasaEncontrada)/365)/100;
var valorFinal=(liquidar*tasaDay*diasM);
//console.log(valorFinal);
///NEW COMMIT 6/3/2023 -- VERSION 0.2
if (valorFinal<=50 && valorFinal>0)
{
  valorFinal=100;
}
else{
valorFinal=Math.round(valorFinal.toFixed(0)/100)*100;
}
//FIN DEL NEW COMMIT -- VERSION 0.2

//var mensajeFinal=document.createTextNode("El valor de los Intereses de Mora es de: " + valorFinal + ", para un total de " + diasM + " días en Mora.");
  
  //resultado.appendChild(mensajeFinal);
  var valorem=new Intl.NumberFormat('en-EN').format(valorFinal);
  valorem=valorem.replace(/,/g,".");

  resultado.textContent="$"+ valorem;
  diasMora.textContent=diasM;
}
else
{
    alert("ERROR, por favor ingrese correctamente los valores!!!");
    document.getElementById("fechaUno").value="";
    document.getElementById("fechaDos").value="";
    valorLiquidacion.value="";
    resultado.textContent="*$";
    diasMora.textContent="*#";
}
    },
getLista(){
    // id de la hoja de calculo
    idSheets = '1Bd6qpAW36V8sVbcpjFkfD17t4IPPYiVkPFpXHNCGFLQ';
    //// nuestra      APIKey
    apiKey = 'AIzaSyAYGHByZLx72_QpK8jSCkz-v54vnkjhdfU'; 
    // rango de la hoja de calculo que queremos leer
    values = 'A2:E1000';
   // fetch es un método nativo para hacer peticiones http
   // en el navegador 
    fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/A2:E1000?access_token="+ apiKey +"&key="+  apiKey)
    .then((lista)=>{
    return lista.json()
    
}).then((valores)=>{
this.listaDatos = valores.values.reverse();
//PRUEBITAS
var numeroFilas=(this.listaDatos.length);
var valorTasaAjustada=(this.listaDatos[0][3]);
valorTasaAjustada=valorTasaAjustada.replace(",",".");
var valorTasaDiaria=(parseFloat(valorTasaAjustada)/365);

    textoInicial=document.getElementById("textoInicial");

    fechaActual= new Date();
    mes= fechaActual.getMonth();
    año= fechaActual.getFullYear();
    meses=[];
    meses[0]="Enero";
    meses[1]="Febrero";
    meses[2]="Marzo";
    meses[3]="Abril";
    meses[4]="Mayo";
    meses[5]="Junio";
    meses[6]="Julio";
    meses[7]="Agosto";
    meses[8]="Septiembre";
    meses[9]="Octubre";
    meses[10]="Noviembre";
    meses[11]="Diciembre";
    
    var mensaje=document.createTextNode("En este mes de " + meses[mes] + " del año " + año + ", la tasa de Usura ajustada es de: " + valorTasaAjustada+"%"+" y la tasa de Usura diaria equivale a "+ valorTasaDiaria+"%");
    
        textoInicial.appendChild(mensaje);
       textoI= mensaje
  
//FIN PRUEBITAS

}).catch(err=>{
console.log(err);
})



   } // fin funcion getLista()
   } // fin methods 
   }) // fin instancia

window.addEventListener("load",iniciar);
function iniciar()
{
    var validarLiquidacion=document.getElementById("valorLiquidacion");
    validarLiquidacion.addEventListener("keypress",validar);
    var valorResultado=document.getElementById("valorResultado");
    var diasMora=document.getElementById("diasMora");
    var entrada=[];
    function validar(e)
    {
        const regex=/^[\d]+$/;    
        var caracter=e.key; //.which;
        if (regex.test(caracter))
        {    
        
        }
        else
        {
            e.preventDefault();   
        }
    };
validarLiquidacion.addEventListener("keyup",validarUp);
function validarUp(e)
{
  entrada=validarLiquidacion.value.split(".").join("");
  var valorcito=new Intl.NumberFormat('en-EN').format(entrada);
  valorcito=valorcito.replace(/,/g,".");
  validarLiquidacion.value=valorcito;
}

    validarLiquidacion.onpaste= function(e) {
        e.preventDefault();
        alert("Esta prohibida la acción pegar.");
      };
      valorResultado.onpaste= function(e) {
        e.preventDefault();
        alert("Esta prohibida la acción pegar.");
      };
      diasMora.onpaste= function(e) {
        e.preventDefault();
        alert("Esta prohibida la acción pegar.");
      };
      valorResultado.addEventListener("keypress",bloquear);
      diasMora.addEventListener("keypress",bloquear);
      function bloquear(ev)
      {
        ev.preventDefault();
        alert("Esta prohibida la acción escribir.");
      }
}

/////////////////////////////////////////17.07.2023
//hover icon-alert
const messageAlert=document.querySelector(".message-alert");
const iconAlert=document.querySelector(".icon-alert");

iconAlert.addEventListener('mouseover',() => {
  messageAlert.style.opacity='1';
});
iconAlert.addEventListener('mouseout',() => {
  messageAlert.style.opacity='0';
});

//mobile-menu
const iconmenu=document.querySelector(".menu");
const displaymenu=document.querySelector(".mobile-menu");
let activationmenu=0;
iconmenu.addEventListener('click', () =>{
  
  if (activationmenu>0)
  {
    activationmenu=0;
    displaymenu.style.display='none';
  }
  else
  {
    activationmenu=1;
    displaymenu.style.display='inline-block';
  }
});
