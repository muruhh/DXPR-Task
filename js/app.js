import { items } from './data.js';

const number_of_items = 6;
let start = 0;
let end_of_items = false;

window.onload = () => {
    fetch_items();
}

function create_card_header(img, title, date, category){}
function create_card_body(job_title){}
function create_card_footer(capacity, total_capacity){}

function create_card(item){}

function fetch_items(){
    const end_item = start == 0 ? 9 : (start + number_of_items > items.length ? items.length : start + number_of_items);
    
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(items);
            start == 0 && document.querySelector(".loader").classList.add("loader-bottom");
            document.querySelector(".loader").style.display = "none";
        }, 1500);
    })
    .then((items) => {
        for(let i = start; i < end_item; i++){
            create_card(items[i]);
        }

        start < items.length && (start = end_item);
    })
    .catch((error) => {
        console.log(error);
    });
}