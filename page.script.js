window.__nightmare = {};
__nightmare.ipc = require('electron').ipcRenderer;

window.productSelector = '[itemtype=\"http://schema.org/Product\"]'

window.productCounter = () => {
    return document.querySelectorAll(window.productSelector).length
}

window.thereAreProducts = () => {
    return window.productCounter() > 0
}

window.getPageState = () => {
    return {
        windowSize: document.body.offsetHeight,
        totalProducts: window.productCounter()
    }
} 