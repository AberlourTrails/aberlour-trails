// https://stackoverflow.com/a/11972692
var sponsorsEl = document.querySelector('ul#sponsors');
for (var i = sponsorsEl.children.length; i >= 0; i--) {
    sponsorsEl.appendChild(sponsorsEl.children[Math.random() * i | 0]);
}
