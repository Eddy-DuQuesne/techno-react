module.exports.getBlankSequence = (steps = 16) => {
    const singleRow = [false, false, false, false];
    const fullArray = [];
    for (let x = 0; x < steps; x++) {
        fullArray.push(singleRow);
    }
    return fullArray;
}