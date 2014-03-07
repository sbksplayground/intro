/**
 * Pretty Number
 * @param number
 * @returns {string}
 */
function pNum(number) {
    return ( ("" + number).replace(/\B(?=(\d{3})+(?!\d))/g, " ") );
}

function pPerc(number) {
    return Math.floor(number * 10000) / 10000 + "%";
}

function pHeading(column, desc) {
    return '<td><a data-column="' + column + '" href="">' + desc + '</a></td>';
}

function pArrow(data) {
    if (data > 0) {
        return '<img src="../img/up.png" alt="More"/>';
    }
    else if (data < 0) {
        return '<img src="../img/down.png" alt="Less"/>';
    }
    else {
        return '';
    }
}