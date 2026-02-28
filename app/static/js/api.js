
export async function get_filtered_weapon(activeFilters) {
    const res = await fetch("/weapon_filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            filters: activeFilters
        })
    });
    return await res.json();
}