import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';
import { applyPenders } from 'redux-pender/lib/utils';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';


//export const getPost = (postId) => dispatch => {
    // 요청 시작을 알림
    // dispatch(getPostPending());

    // // 요청 시작.
    // // 여기서 promise 를 리턴해야 .then 을 사용할 수 있다.
    // return getPostAPI(postId).then((response) => {
    //     // 요청이 성공한 것으로, 성공 액션에 디스패치
    //     dispatch(getPostSuccess(response))
    //     // 프라미스 리턴.
    //     return response;
    // }).catch(error => {
    //     //오류 발생
    //     dispatch(getPostFailure(error));
    //     // 에러를 throw 하여 다시한번 캐치 가능 
    //     throw(error);
    // })
//}

// export const getPost = (postId) => ({
//     type: GET_POST,
//     payload: getPostAPI(postId)
// })

export const getPost = createAction(GET_POST, getPostAPI);

const initialState = {
    data: {
        title: '',
        body: ''
    }
}

// export default handleActions({
//     [GET_POST_PENDING]: (state, action) => {
//         return {
//             ...state,
//             peding: true,
//             error: false
//         }
//     },
//     [GET_POST_SUCCESS]: (state, action) => {
//         const { title, body } = action.payload.data;
//         return {
//             ...state,
//             pending: false,
//             data: {
//                 title,
//                 body
//             }
//         }
//     },
//     [GET_POST_FAILURE]: (state, action) => {
//         return {
//             ...state,
//             pending: false,
//             error: true
//         }
//     }
// }, initialState);

const reducer = handleActions({
    // 다른 일반 액션들을 관리
}, initialState)




export default applyPenders(reducer, [
    {
        type: GET_POST,
        onSuccess: (state, action) => {
            const { title, body } = action.payload.data;
            return {
                data: {
                    title,
                    body
                }
            }
        },
        onCancel: (state, action) => {
            return {
                data: {
                    title: '취소됨',
                    body: '취소됨'
                }
            }
        }
    }
])

