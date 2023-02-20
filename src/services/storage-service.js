function load(key) {
    var val = localStorage.getItem(key)
    return val ? JSON.parse(val) : []
}

function save(key, val) {
    localStorage[key] = JSON.stringify(val)
}

export const storageService = {
    load,
    save,
}
