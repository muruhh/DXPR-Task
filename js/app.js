import { items } from './data.js';

const number_of_items = 6;
let start = 0;
let end_of_items = false;

function create_card_header(img, title, date, category){
    const card_header = document.createElement("div");
    card_header.className = "card-header";
    
    const card_brand = document.createElement("div");
    card_brand.className = "card-brand";
    
    const card_img_container = document.createElement("div");
    card_img_container.className = "card-img";
    
    const card_img = document.createElement("img");
    card_img.src = img;
    
    const card_title_container = document.createElement("div");

    const card_title = document.createElement("h2");
    card_title.className = "card-title";
    card_title.textContent = title;
    
    const card_date = document.createElement("span");
    card_date.className = "card-date";
    card_date.textContent = date;

    const card_category = document.createElement("span");
    card_category.className = "card-category";
    card_category.textContent = category;

    card_title_container.appendChild(card_title);
    card_title_container.appendChild(card_date);

    card_img_container.appendChild(card_img);
    card_brand.appendChild(card_img_container);
    card_brand.appendChild(card_title_container);

    card_header.appendChild(card_brand);
    card_header.appendChild(card_category);

    return card_header;
}

function create_card_body(job_title){
    const card_body = document.createElement("p");
    card_body.className = "card-body";
    card_body.textContent = job_title;

    return card_body;
}

function create_card_footer(capacity, total_capacity){
    const progress_width = (capacity / total_capacity) * 100;
    let progressbar_class = "card-progressbar";

    if(capacity == total_capacity){
        progressbar_class += " card-progressbar-completed";
    }

    const card_footer = document.createElement("div");
    card_footer.className = "card-footer";

    const card_progressbar = document.createElement("div");
    card_progressbar.className = progressbar_class;

    const card_progress = document.createElement("div");
    card_progress.style.width = `${progress_width}%`;

    const card_capacity_container = document.createElement("div");
    card_capacity_container.className = "card-capacity";
    
    const card_capacity = document.createElement("span");
    card_capacity.textContent = `${capacity} Applied `;

    card_capacity_container.appendChild(card_capacity);    
    card_capacity_container.innerHTML += `of ${total_capacity} capacity`;

    card_progressbar.appendChild(card_progress);    
    card_footer.appendChild(card_progressbar);
    card_footer.appendChild(card_capacity_container);

    return card_footer;
}

function create_card(item){
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card";
    
    const header = create_card_header(item.img, item.title, item.date, item.category);
    const body = create_card_body(item.job_title);
    const footer = create_card_footer(item.capacity, item.total_capacity);

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    col.appendChild(card);
    document.querySelector(".row").appendChild(col);
}

window.onload = () => {
    fetch_items();
}

window.onscroll = () => {
    if (((window.innerHeight + window.scrollY) + 50) >= document.body.scrollHeight) {
        if(start == items.length){
            if(end_of_items === false){
                end_of_items = true;

                const no_more_items = document.createElement("div");
                no_more_items.className = "no-more-items";
                no_more_items.textContent = "No more items";
                document.querySelector(".container").appendChild(no_more_items);
            }
        }
        else{
            document.querySelector(".loader").style.display = "flex";
            fetch_items();
        }
    }
}

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