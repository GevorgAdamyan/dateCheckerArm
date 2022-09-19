module.exports = {
    getCurrentTime() {
        return new Date().toLocaleString('hy-AM', {
            timeZone: 'Asia/Yerevan'
        })
    },

    compareArrays(a, b) {
        if (a.length !== b.length) return false;
        let uniqueValues = new Set([...a, ...b]);
        for (let v of uniqueValues) {
            let aCount = a.filter(e => e === v).length;
            let bCount = b.filter(e => e === v).length;
            if (aCount !== bCount) return false;
        }
        return true;
    },

    findDifference(a, b) {
        return a.filter(x => !b.includes(x))
    }
}