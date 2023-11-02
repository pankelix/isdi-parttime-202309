class Component {
    constructor(container) {
        this.container = container
    }

    show() {
        this.container.style.display = ''
    }

    hide() {
        this.container.style.display = 'none'
    }
}