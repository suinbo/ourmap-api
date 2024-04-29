const getDateString = dt => {
    const date = new Date(dt)
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}`
    return formattedDate
}

module.exports = {
    getDateString,
}
