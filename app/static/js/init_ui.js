import { weapon_filter, reset } from "./filter.js"
import { select_weapon } from "./select.js"

export default function init() {
    document.getElementById("reset").addEventListener("click", reset);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // ON/OFF
            btn.classList.toggle("active");
            weapon_filter(e.target);
        });
    });

    // select filtered weapon
    document.getElementById("filtered").addEventListener("click", (e) => {
        select_weapon(e.target);
    });
}
