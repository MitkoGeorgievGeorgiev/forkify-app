import View from './View.js'
import previewView from './previewView.js'
import icons from "url:../../img/icons.svg"
import { Fraction } from 'fractional'

class AddRecipeView extends View {
    _parrentEl = document.querySelector('.upload')
    _successMessage = 'Successfuly added recipe'

    _window = document.querySelector('.add-recipe-window')

    _overlay = document.querySelector('.overlay')

    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super()
        this._addHandlerShowWindow()
        this._addHandlerCloseWindow()
    }
    toggleWindow() {
        this._window.classList.toggle('hidden')
        this._overlay.classList.toggle('hidden')
    }
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))

    }
    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))


    }

    addHandlerUpload(handler) {
        this._parrentEl.addEventListener('submit', function (e) {
            e.preventDefault()
            e.target.closest('.upload__btn')
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }

    _generateHTML() {
    }

}

export default new AddRecipeView()