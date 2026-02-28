import { get_filtered_weapon } from "./api.js";

let activeFilters = []; // ONのボタン一覧

export function weapon_filter(pushed_btn) {
    if (pushed_btn.classList.contains("active")) {
        activeFilters.push(pushed_btn.dataset);
    } else {
        activeFilters = activeFilters.filter(f => f !== pushed_btn.dataset);
    }
    fetch("/weapon_filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            filters: activeFilters
        })
    })
        .then(res => res.json())
        .then(data => render_filtered(data));
}

function render_filtered(data) {
    const container = document.getElementById("filtered");
    container.innerHTML = ""; // clear

    // put button
    data.forEach(item => {
        const button = document.createElement("button");
        button.textContent = item.name;
        button.classList.add("filtered-btn");
        container.appendChild(button);
    });
}

export function reset() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        btn.classList.remove("active");
    });
    activeFilters = [];
    // clear
    document.getElementById("filtered").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}
