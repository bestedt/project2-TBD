module.exports = {
    // handle mysql datetime to javascript date
    format_time: (datetime) => {
        const date = convert_datetime_str_to_date(datetime)
        return date.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    },

    eq: (a, b) => {
        if (a === b) return true;
        return false;
    }
}

function convert_datetime_str_to_date(str) {
    const dt = str.split(/[-T .:]/);
    return new Date(dt[0], dt[1]-1, dt[2], dt[3], dt[4], dt[5])
}