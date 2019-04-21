import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

// --- COMMENTS --- //
export const fetchComments = () => (dispatch) => {
    return fetch(baseURL + 'comments')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
               let errMess = new Error(error.message)
               throw errMess;
        })
         .then(response => response.json())
         .then(comments => dispatch(addComments(comments)))
         .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

// --- DISHES --- //
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseURL + 'dishes')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
               let errMess = new Error(error.message)
               throw errMess;
        })
         .then(response => response.json())
         .then(dishes => dispatch(addDishes(dishes)))
         .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// --- PROMOTIONS --- //
export const fetchPromos= () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseURL + 'promotions')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
               let errMess = new Error(error.message)
               throw errMess;
        })
         .then(response => response.json())
         .then(promos => dispatch(addPromos(promos)))
         .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// --- LEADERS --- //
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseURL + 'leaders')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
               let errMess = new Error(error.message)
               throw errMess;
        })
         .then(response => response.json())
         .then(leaders => dispatch(addLeaders(leaders)))
         .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// --- FAVORITES --- //
export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

// -- Post Comment and Add Comment -- //
export const postComment = (dishId, rating, author, commnet) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: commnet
    }
    newComment.date = new Date().toISOString();
     // POST the comment to the server
     return fetch(baseURL + 'comments', {
        method: 'POST', // default GET
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response; //optional
            throw error;
        }
     }, error => { // Even the server doesn't respond
            var  errmess = new Error(error.message);
            throw errmess;
     })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => console.log("Error has occured ", error.message))
}

export const addComment = (comment) =>({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});