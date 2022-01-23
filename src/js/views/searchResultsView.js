import View from './View.js'
import previewView from './previewView.js'
import icons from "url:../../img/icons.svg"
import { Fraction } from 'fractional'


class SearchResultsView extends View {
    _parrentEl = document.querySelector('.results')
    _errorMessage = 'Please search for recipe'
    _successMessage = ''

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateHTML() {
        return this._data.map(result => previewView.render(result, false)).join('')
    }
}

export default new SearchResultsView()