const isValidAmount = (amount) => { 

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
        return false;
    }
    return true;

}

module.exports = {
    isValidAmount
}