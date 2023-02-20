export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomInt,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getReasonableTimeDiff,
    getTimeDifference
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getTimeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 7;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return '5m';
    }

    else if (elapsed < msPerHour) {
        if (Math.round(elapsed / msPerMinute) < 6) return '5m'
        else return Math.round(elapsed / msPerMinute) + 'm';

    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + 'h';
    }

    else if (elapsed < msPerWeek) {
        return Math.round(elapsed / msPerDay) + 'd';
    }
    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerWeek) + 'w';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + 'm';
    }

    else {
        return Math.round(elapsed / msPerYear) + 'y';
    }
}

Date.DateDiff = function (p_Interval, p_Date1, p_Date2, p_FirstDayOfWeek = 1) {
    // p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0) ? 1 : parseInt(p_FirstDayOfWeek);

    var dt1 = new Date(p_Date1);
    var dt2 = new Date(p_Date2);

    //correct Daylight Savings Ttime (DST)-affected intervals ("d" & bigger)
    if ("h,n,s,ms".indexOf(p_Interval.toLowerCase()) == -1) {
        if (p_Date1.toString().indexOf(":") == -1) { dt1.setUTCHours(0, 0, 0, 0) };	// no time, assume 12am
        if (p_Date2.toString().indexOf(":") == -1) { dt2.setUTCHours(0, 0, 0, 0) };	// no time, assume 12am
    }


    // get ms between UTC dates and make into "difference" date
    var iDiffMS = dt2.valueOf() - dt1.valueOf();
    var dtDiff = new Date(iDiffMS);

    // calc various diffs
    var nYears = dt2.getUTCFullYear() - dt1.getUTCFullYear();
    var nMonths = dt2.getUTCMonth() - dt1.getUTCMonth() + (nYears != 0 ? nYears * 12 : 0);
    var nQuarters = parseInt(nMonths / 3);

    var nMilliseconds = iDiffMS;
    var nSeconds = parseInt(iDiffMS / 1000);
    var nMinutes = parseInt(nSeconds / 60);
    var nHours = parseInt(nMinutes / 60);
    var nDays = parseInt(nHours / 24);	//now fixed for DST switch days
    var nWeeks = parseInt(nDays / 7);

    if (p_Interval.toLowerCase() == 'ww') {
        // set dates to 1st & last FirstDayOfWeek
        var offset = Date.DatePart("w", dt1, p_FirstDayOfWeek) - 1;
        if (offset) { dt1.setDate(dt1.getDate() + 7 - offset); }
        var offset = Date.DatePart("w", dt2, p_FirstDayOfWeek) - 1;
        if (offset) { dt2.setDate(dt2.getDate() - offset); }
        // recurse to "w" with adjusted dates
        var nCalWeeks = Date.DateDiff("w", dt1, dt2) + 1;
    }

    // return difference
    switch (p_Interval.toLowerCase()) {
        case "yyyy": return nYears;
        case "q": return nQuarters;
        case "m": return nMonths;
        case "y": // day of year
        case "d": return nDays;
        case "w": return nWeeks;
        case "ww": return nCalWeeks; // week of year	
        case "h": return nHours;
        case "n": return nMinutes;
        case "s": return nSeconds;
        case "ms": return nMilliseconds;
        default: return "invalid interval: '" + p_Interval + "'";
    }
}

export function getReasonableTimeDiff(formerTime, latterTime) {
    return Date.DateDiff('d', formerTime, latterTime)
}

function _stringToTimeStamp(date) {
    const { day, month } = date
    const year = date.year
        ? date.year
        : (Date.now()).getFullYear()
    return (new Date(year, month, day)).getTime()
}