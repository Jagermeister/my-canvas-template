'use strict';

var utility = {};
utility.colors = ["gray", "#9467bd", "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

utility.getParameterByName = function(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

utility.canvasCreate = function(containerId, id, dimensions) {
    let container = document.getElementById(containerId);
    if (container) {
        let canvas = document.createElement('CANVAS');
        canvas.id = id;
        canvas.setAttribute('width', dimensions.width);
        canvas.setAttribute('height', dimensions.height);
        canvas.oncontextmenu = 'return false;';
        canvas.style.background = 'rgb(130, 187, 236)';
        container.appendChild(canvas);
        return canvas;
    }
};

utility.strokeText = function(ctx, text, x, y, isAlignedRight) {
    if (isAlignedRight) x -= ctx.measureText(text).width;
    ctx.strokeText(text, x, y);
};

utility.strokeLines = function(ctx, data) {
    ctx.moveTo(...data.shift());
    for (let i = 0, l = data.length; i < l; i++) {
        ctx.lineTo(...data[i]);
    }
    ctx.stroke();
};

utility.keyCodes = {
    'space': 32,
    'leftArrow': 37,
    'upArrow': 38,
    'rightArrow': 39,
    'downArrow': 40
};

utility.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

utility.padLeft = function(padValue, value, count) {
    return (Array(count).join(padValue) + value).slice(-1 * count);
};

utility.angleFromPoints = function(x1, y1, x2, y2) {
    let tv = x2 - x1;
    let uv = y2 - y1;
    let x_mult = tv > 0 ? 1 : -1;
    let y_mult = uv > 0 ? 1 : -1;
    uv = Math.abs(uv);
    tv = Math.abs(tv);
    let theta_r = Math.abs(Math.atan(uv/tv));
    return {theta: theta_r, x_mult: x_mult, y_mult: y_mult};
};