import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import searchResultsView from './views/searchResultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODAL_CLOSE_SEC } from './config.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

if (module.hot) {
    module.hot.accept()
}
const controlRecipe = async function () {
    try {

        //Load Data
        const id = window.location.hash.slice(1)

        if (!id) return
        recipeView.renderSpinner()

        await model.loadRecipe(id)
        //Update views
        searchResultsView.update(model.getPageResults())
        bookmarksView.update(model.state.bookmarks)

        //Render recipe
        recipeView.render(model.state.recipe)

    } catch (error) {
        recipeView.renderError()
    }

}

const controlSearchResults = async function () {
    try {
        //Get search query
        const query = searchView.getQuery()

        if (!query) return
        //Load search results
        searchResultsView.renderSpinner()
        await model.loadSearchData(query)
        //Render results
        searchResultsView.render(model.getPageResults())
        paginationView.render(model.state.search)


    } catch (error) {
        searchResultsView.renderError()
        console.log(error);
        throw error
    }

}

const controlPagination = function (page) {

    searchResultsView.render(model.getPageResults(page))
    paginationView.render(model.state.search)


}

const controlServings = function (newServings) {
    model.updateServings(newServings)
    // recipeView.render(model.state.recipe)
    recipeView.update(model.state.recipe)


}

const controlAddRecipeBookmark = function () {
    //Add/remove bookmark
    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe)

    } else {
        model.removeBookmark(model.state.recipe.id)
    }
    //Update recipe view
    recipeView.update(model.state.recipe)

    //Render Bookmarks
    bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
    try {

        addRecipeView.renderSpinner()
        //Upload new recipe data
        await model.uploadRecipe(newRecipe);

        //Render recipe
        recipeView.render(model.state.recipe)

        //Success message
        addRecipeView.renderMessage()

        //Refresh bookmarks
        bookmarksView.render(model.state.bookmarks)

        //Close form
        setTimeout(function () {
            addRecipeView.toggleWindow()
        }, MODAL_CLOSE_SEC * 1000)

        //Change ID in the URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`)
    } catch (error) {
        console.error(`***${error}`)
        addRecipeView.renderError(error.message)
    }
}

const init = function () {
    //Implementing publisher subscriber pattern
    bookmarksView.addHandlerRender(controlBookmarks)
    recipeView.addHandlerRender(controlRecipe)
    recipeView.addHandlerServings(controlServings)
    recipeView.addHandlerBookmarks(controlAddRecipeBookmark)
    searchView.addHandlerSearch(controlSearchResults)
    paginationView.addHandlerClick(controlPagination)
    addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()



