
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const COLOR_STORAGE_KEY = 'color_DB'

export const colorService = {
    add,
    update,
    remove,
    randomColor,
    getLabelById
}
window.bs = colorService


function update(type, id, title, value) {
    const formattedColors = colors()
    if (!id) return add(type, title, value)
    if (!type || !formattedColors[type] || !value) return Promise.reject('Cannot update label')
    const idx = formattedColors[type].findIndex(label => label._id === id)
    if (idx === -1) return Promise.reject('Cannot update label')
    if (title) formattedColors[type][idx].title = title
    formattedColors[type][idx].value = value
    localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(formattedColors))
    return formattedColors
}

function add(type, title, value) {
    if (!type || !title || !value) return Promise.reject('Cannot add label')
    if (!colors()[type]) return Promise.reject('Cannot add label')
    const newLabel = {
        _id: utilService.makeId(),
        title,
        value
    }
    const formattedColors = colors()
    formattedColors[type].push(newLabel)
    localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(formattedColors))
    return newLabel
}

async function remove(type, id) {
    if (!type || !id) return Promise.reject('Cannot remove label')
    const formattedColors = colors()
    if (!formattedColors[type]) return Promise.reject('Cannot remove label')
    const idx = formattedColors[type].findIndex(label => label._id === id)
    if (idx === -1) return Promise.reject('Cannot remove label')
    const label = formattedColors[type].splice(idx, 1)[0]
    localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(formattedColors))
    return label
}

function randomColor(type) {
    const colorNames = Object.keys(colors()[type])
    const idx = utilService.getRandomInt(0, colorNames.length)
    return colors()[type][colorNames[idx]]
}

function getLabelById(label, id) {
    if (!id || !label || !colors()[label]) return null
    return colors()[label].find(anyLabel => anyLabel._id === id)
}

// DONT DELETE!! Arrow function does not implement on Firefox and Edge
_createColors()

function _createColors() {

    let colors = JSON.parse(localStorage.getItem(COLOR_STORAGE_KEY))
    if (!colors) colors = colors && colors.length
        ? colors
        : {
            "priority": [
                {
                    "_id": "efv9e",
                    "title": "Critical",
                    "value": "#333333"
                },
                {
                    "_id": "acmksd",
                    "title": "High",
                    "value": "#401694"
                },
                {
                    "_id": "asckj",
                    "title": "Medium",
                    "value": "#5559df"
                },
                {
                    "_id": "gbf0g",
                    "title": "Low",
                    "value": "#579bfc"
                },
                {
                    "_id": "qwdlk",
                    "title": "Default",
                    "value": "#c4c4c4"
                },
            ],
            "status": [
                {
                    "_id": "sdc34",
                    "title": "Done",
                    "value": "#03c875"
                },
                {
                    "_id": "dfbyc",
                    "title": "Working on it",
                    "value": "#fdab3d"
                },
                {
                    "_id": "34f9e",
                    "title": "Stuck",
                    "value": "#e2445c"
                },
                {
                    "_id": "db03v",
                    "title": "Unattained",
                    "value": "#0086c0"
                },
                {
                    "_id": "qwdlk",
                    "title": "Default",
                    "value": "#c4c4c4"
                },
            ],
            "color": {
                "Green Haze": "#00a359",
                "Grass Green": "#037f4c",
                "Jade": "#03c875",
                "Light Green": "#9cd326",
                "Dark Teal": "#165a63",
                "Teal": "#175A63",
                "Aquamarine": "#4eccc6",
                "Saladish": "#cab641",
                "Egg Yolk": "#ffcb00",
                "Dark Indigo": "#401694",
                "Dark Purple": "#794bd1",
                "Berry": "#7e3b8a",
                "Purple": "#a25ddc",
                "Lavander": "#bda8f9",
                "Winter": "#9aadbd",
                "River": "#68a1bd",
                "Dark Blue": "#0086c0",
                "Royal": "#2B76E5",
                "Light Blue": "#579bfc",
                "Navy": "#225091",
                "Indigo": "#5559df",
                "Dark Indigo": "#401694",
                "Chili Blue": "#66ccff",
                "Torquise": "#a1e2f7",
                "Steel": "#a9bee8",
                "Stuck Red": "#e2445c",
                "Dark Red": "#bb3354",
                "Sunset": "#ff7575",
                "Bubble": "#faa1f1",
                "Peach": "#ffadad",
                "Sofia Pink": "#ff158a",
                "Dark Pink": "#fe5bc4",
                "Pink": "#d973b0",
                "Light Pink": "#faa1f0",
                "Dark Orange": "#ff642e",
                "Orange": "#fdab3d",
                "Light Brown": "#ac977a",
                "Coffe": "#BD816E",
                "Brown": "#7f5347",
                "Muddy": "#553e3d",
                "Explosive": "#c4c4c4",
                "American Gray": "#808080",
                "Blackish": "#333333",
                "Tan": "#AD967A",
                "Lilac": "#9D99B9",
                "Pecan": "#563E3E",
            },
            "group": {
                "Grass Green": "#037f4c",
                "Green Haze": "#00a359",
                "Jade": "#03c875",
                "Saladish": "#cab641",
                "Egg Yolk": "#ffcb00",
                "Dark Purple": "#784bd1",
                "Purple": "#a25ddc",
                "Dark Blue": "#0086c0",
                "Chili Blue": "#66ccff",
                "Dark Red": "#bb3354",
                "Red": "#e2445c",
                "Sofia Pink": "#ff158a",
                "Dark Orange": "#ff642e",
                "Orange": "#fdab3d",
                "Brown": "#7f5347",
                "Explosive": "#c4c4c4",
                "American Gray": "#808080",
            },
            "label": {
                "Grass Green": "#037f4c",
                "Jade": "#03c875",
                "Light Green": "#9cd326",
                "Saladish": "#cab641",
                "Egg Yolk": "#ffcb00",
                "Orange": "#fdab3d",
                "Dark Orange": "#ff642e",
                "Peach": "#ffadad",
                "Sunset": "#ff7575",
                "Dark Red": "#bb3354",
                "Sofia Pink": "#ff158a",
                "Bubble": "#faa1f1",
                "Purple": "#a25ddc",
                "Dark Purple": "#784bd1",
                "Berry": "#7e3b8a",
                "Dark Indigo": "#401694",
                "Indigo": "#5559df",
                "Navy": "#225091",
                "Dark Blue": "#0086c0",
                "Aquamarine": "#4eccc6",
                "Chili Blue": "#66ccff",
                "Light Blue": "#579bfc",
                "River": "#68a1bd",
                "winter": "#9aadbd",
                "American Gray": "#808080",
                "Explosive": "#c4c4c4",
                "Blackish": "#333333",
                "Brown": "#7f5347",
                "Orchid": "#d974b0",
                "Tan": "#AD967A",
                "Coffee": "#BD816E",
                "Royal": "#2B76E5",
                "Teal": "#175A63",
                "Lavender": "#BDA8F9",
                "Steel": "#A9BEE8",
                "Lilac": "#9D99B9",
                "Pecan": "#563E3E",
            }
        }
    localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(colors))

}

export function colors() {
    return JSON.parse(localStorage.getItem(COLOR_STORAGE_KEY))
}