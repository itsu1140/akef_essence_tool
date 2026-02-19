const buttons = document.querySelectorAll(".filter-btn");

let activeFilters = []; // ONのボタン一覧

const reset_btn = document.getElementById("reset");
reset_btn.setAttribute("onclick", "reset()");
function reset() {
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });
    activeFilters = [];
    // clear
    document.getElementById("filtered").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // ON/OFF
        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {
            activeFilters.push(btn.dataset);
        } else {
            activeFilters = activeFilters.filter(f => f !== btn.dataset);
        }
        weapon_filter();
    });
});

function weapon_filter() {
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
        button.classList.add("result-btn");
        button.dataset.name = item.name;
        container.appendChild(button);
    });
}

let currentSelectedWeapon = null;

document.getElementById("filtered").addEventListener("click", (e) => {

    if (!e.target.classList.contains("result-btn")) return;

    const clickedBtn = e.target;
    const name = clickedBtn.dataset.name;

    if (currentSelectedWeapon === name) {
        clickedBtn.classList.remove("active");
        currentSelectedWeapon = null;
        return;
    }

    // すべてOFFにする
    document.querySelectorAll(".result-btn")
        .forEach(btn => btn.classList.remove("active"));

    // 押したものだけON
    clickedBtn.classList.add("active");

    currentSelectedWeapon = name;

    essence(name);
});

function essence(name) {
    fetch("/essence", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ weapon: name })
    })
        .then(res => res.json())
        .then(data => { render_essence(data) });
}

function render_essence(data) {
    const container = document.getElementById("result");
    container.innerHTML = ""; // clear

    data.forEach(item => {
        const stage = document.createElement("div")
        const h3 = document.createElement("h3");
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const head_col = document.createElement("tr");
        add_col_element(head_col, "武器", "th");
        add_col_element(head_col, "基礎効果", "th");
        add_col_element(head_col, "付加効果", "th");
        add_col_element(head_col, "スキル効果", "th");
        add_col_element(head_col, "モチーフ", "th");
        thead.appendChild(head_col);
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        h3.textContent = item.stage;
        item.common_effect_weapons.forEach(cew => {
            const col = document.createElement("tr")
            add_col_element(col, cew.name, "td");
            for (let i = 0; i < cew.effects.length; i++) {
                const td = document.createElement("td")
                td.textContent = cew.effects[i];
                if (cew.is_common_effects[i]) {
                    td.classList.add("is-common");
                }
                col.appendChild(td);
            }
            add_col_element(col, cew.motif, "td");
            tbody.appendChild(col)
        })
        stage.appendChild(h3);
        table.appendChild(tbody);
        stage.appendChild(table);
        container.appendChild(stage);
    });
}

function add_col_element(col, data, element_type) {
    const element = document.createElement(element_type)
    element.textContent = data
    col.appendChild(element)
}
