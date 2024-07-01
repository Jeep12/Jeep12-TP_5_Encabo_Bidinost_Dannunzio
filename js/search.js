let form = document.getElementById("searchForm");

const horses = [
    {
        name:"Caba",
        age:15,
        sex:"hembra",
        colors:["negro","blanco"],
        profile:"horse2.jpg"
    }
    ,
    {
        name:"Llito",
        age:8,
        sex:"macho",
        colors:["blanco"],
        profile:"horse1.jfif"
    }
    ,
    {
        name:"Pepito",
        age:3,
        sex:"macho",
        colors:["rojizo,blanco"],
        profile:"horse4.png"
    }
    ,
    {
        name:"Rocinante",
        age:7,
        sex:"macho",
        colors:["negro","blanco"],
        profile:"horse3.jpg"
    }
    ,
    {
        name:"Hecarim",
        age:15,
        sex:"macho",
        colors:["negro","blanco","castaño"],
        profile:"horse7.jpg"
    }
    ,
    {
        name:"Lilia",
        age:9,
        sex:"hembra",
        colors:["rojizo","blanco"],
        profile:"horse6.jpg"
    }
    ,
    {
        name:"Asd",
        age:1,
        sex:"hembra",
        colors:["negro"],
        profile:"horse8.jpg"
    }
    ,
    {
        name:"Dsa",
        age:4,
        sex:"hembra",
        colors:["negro","castaño"],
        profile:"horse5.jpg"
    }
    ,
];

let cardDeck = document.getElementById("card-deck");
let btn = document.getElementById("searchBtn");

function filter(name,age,sex,colors){
    let array = [];
    for (const horse of horses) {
        if(cumple(horse,name,age,sex,colors)){
            array.push(horse);
        }
    }
    return array;
}

function showHorses(selectedHorses){
    cardDeck.replaceChildren();
    for (const horse of selectedHorses) {
        cardDeck.appendChild(createCard(horse));
    }
}

function cumple(horse,name,age,sex,colors){
    if(name!=null && !horse.name.toLowerCase().includes(name.toLowerCase())){
        return false;
    }
    if(age!=null && horse.age!=age){
        return false;
    }
    if(sex!=null && horse.sex!=sex){
        return false;
    }
    if(colors.length>0){
        for (const color of colors) {
            if(!horse.colors.includes(color)){
                return false;
            }
        }
    }
    return true;
}

function createCard(horse){
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("flex-row");

    let img = document.createElement("img");
    img.src="images/horse-profiles/"+horse.profile;
    img.classList.add("card-img-top");
    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerHTML = horse.name;
    cardBody.appendChild(title);

    let p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML="Sexo: "+ horse.sex;
    cardBody.appendChild(p);

    p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML="Edad: "+ horse.age + " años"; //TODO meses?
    cardBody.appendChild(p);

    p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML="Colores: ";
    for (const color of horse.colors) {
        p.innerHTML = p.innerHTML + color +", ";
    }
    p.innerHTML = p.innerHTML.slice(0,p.innerHTML.length-2);
    cardBody.appendChild(p);

    return card;
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    let name = formData.get("name");
    console.log(formData.get("name"));
    name.trim();
    if(name.length==0){
        name = null;
    }
    //let age = formData.get("age");
    let sex = formData.get("sex");
    sex.trim();
    if(sex.length==0){
        sex = null;
    }
    let age = formData.get("age");
    if(age.length==0){
        age=null;
    }
    let colors = formData.getAll("color");
    let selectedHorses = filter(name,age,sex,colors);
    showHorses(selectedHorses);
});

showHorses(horses);