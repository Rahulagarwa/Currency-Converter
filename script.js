const Base_URL="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newsrc='https://flagsapi.com/'+countryCode+'/shiny/64.png';
let img=element.parentElement.querySelector("img");
img.src=newsrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }

    const URL= `${Base_URL}${fromcurr.value}_${tocurr.value}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data['rate'];
    console.log(rate);
    let finalAmount=amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
})