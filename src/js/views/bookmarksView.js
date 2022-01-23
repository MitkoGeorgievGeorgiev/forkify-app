import View from './View.js'
import previewView from './previewView.js'
import icons from "url:../../img/icons.svg"

class BookmarksView extends View {
    _parrentEl = document.querySelector('.bookmarks__list')
    _errorMessage = 'No bookmarks yet'
    _successMessage = ''

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateHTML() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }

}

export default new BookmarksView()