
document.querySelector('#button').onmousemove = function (e) {
    let x = e.pageX - e.target.offsetLeft;
    let y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', x + 'px');
    e.target.style.setProperty('--y', y + 'px');
};

button.onclick = function() {

    document.location.href = "game.html";
}