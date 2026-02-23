import { set_table_header, add_table_col, add_col_element } from "./utils.js";

let currentSelectedWeapon = null;

export function select_weapon(clickedBtn) {
    const name = clickedBtn.textContent;

    if (currentSelectedWeapon === name) return;

    // すべてOFFにする
    document.querySelectorAll(".filtered-btn")
        .forEach(btn => btn.classList.remove("active"));

    // 押したものだけON
    clickedBtn.classList.add("active");

    currentSelectedWeapon = name;
    render_weapon_data(name);

    essence(name);
}

function render_weapon_data(name) {
    fetch("/weapon_data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name })
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("filtered");
            const pretable = container.querySelector("#weapon-data");
            if (pretable) pretable.remove();
            const table = document.createElement("table");
            table.id = "weapon-data";
            set_table_header(table, ["基礎効果", "付加効果", "スキル効果", "モチーフ"]);
            const tbody = document.createElement("tbody");
            add_table_col(tbody, [data.base, data.addition, data.skill, data.motif]);
            table.appendChild(tbody);
            container.appendChild(table);
        });
}

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
        const stage = document.createElement("div");
        const h3 = document.createElement("h3");
        const table = document.createElement("table");
        set_table_header(table, ["武器", "基礎効果", "付加効果", "スキル効果", "モチーフ"]);
        const tbody = document.createElement("tbody");
        h3.textContent = item.stage;
        item.common_effect_weapons.forEach(cew => {
            const col = document.createElement("tr");
            add_col_element(col, cew.name, "td");
            for (let i = 0; i < cew.effects.length; i++) {
                const td = document.createElement("td");
                td.textContent = cew.effects[i];
                if (cew.is_common_effects[i]) {
                    td.classList.add("is-common");
                }
                col.appendChild(td);
            }
            add_col_element(col, cew.motif, "td");
            tbody.appendChild(col);
        });
        stage.appendChild(h3);
        table.appendChild(tbody);
        stage.appendChild(table);
        container.appendChild(stage);
    });
}
