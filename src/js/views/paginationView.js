import View from './View.js'
import icons from "url:../../img/icons.svg"

class PaginationView extends View {
    _parrentEl = document.querySelector('.pagination')

    addHandlerClick(handler) {
        this._parrentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline')

            if (!btn) return
            const gotoPage = Number(btn.dataset.goto)
            handler(gotoPage)
        })
    }
    _generateHTML() {
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        //We are on page 1 and there is other pages
        if (this._data.page === 1 && numOfPages > 1) {
            return `
            <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`
        }
        //We are on page 1 and there are No other pages
        if (this._data.page === 1 && numOfPages <= 1) {
            return ''
        }
        //We are on the last page
        if (this._data.page === numOfPages && numOfPages > 1) {
            return `
            <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>`
        }
        //Other page
        if (this._data.page < numOfPages) {
            return `
            <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
            <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
          </button>`
        }
    }
}

export default new PaginationView()