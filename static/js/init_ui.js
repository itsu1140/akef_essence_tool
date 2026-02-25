import { weapon_filter, reset } from "./filter.js"

export default function init() {
    document.getElementById("reset").addEventListener("click", reset);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // ON/OFF
            btn.classList.toggle("active");
            weapon_filter(e.target);
        });
    });
}
