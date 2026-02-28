
export function add_col_element(col, data, element_type) {
    const element = document.createElement(element_type)
    element.textContent = data
    col.appendChild(element)
}

export function set_table_header(table, rows) {
    const thead = document.createElement("thead");
    const tr = get_set_tr(true, rows);
    thead.appendChild(tr);
    table.appendChild(thead);
}

export function add_table_col(tbody, rows) {
    const tr = get_set_tr(false, rows);
    tbody.appendChild(tr);
}

function get_set_tr(is_header, rows) {
    const tr = document.createElement("tr");
    const att = is_header ? "th" : "td";
    for (const element of rows) {
        add_col_element(tr, element, att);
    }
    return tr;
}