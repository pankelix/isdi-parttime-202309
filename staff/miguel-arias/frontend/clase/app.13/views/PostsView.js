class PostsView extends Component {
    constructor() {
        super(document.getElementById('posts-view'))
    }

    renderPosts() {
        this.container.innerHTML = ''

        try {
            const posts = logic.retrievePosts()

            posts.forEachReverse(function (post, index) {
                const article = document.createElement('article')
                article.setAttribute('class', 'post')

                const title = document.createElement('h2')
                title.innerText = post.author

                const image = document.createElement('img')
                image.setAttribute('class', 'post-image')
                image.src = post.image

                const text = document.createElement('p')
                text.innerText = post.text

                const likeButton = document.createElement('button')
                likeButton.innerText = `${post.likes.includes(logic.loggedInEmail) ? '❤️' : '🤍'} ${post.likes.length ? `(${post.likes.length})` : ''}`
                likeButton.onclick = function () {
                    try {
                        logic.toggleLikePost(index)

                        this.renderPosts()
                    } catch (error) {
                        alert(error.message)
                    }
                }.bind(this)

                article.append(title, image, text, likeButton)

                this.container.append(article)
            }.bind(this))
        } catch (error) {
            alert(error.message)
        }
    }
}