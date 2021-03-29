import {createAction, handleActions} from "redux-actions";
import produce from "immer";
import {storage} from "../../shared/firebase";

//action type
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
//action creator
const uploading = createAction(UPLOADING, (uploading)=>({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url)=>({image_url}));

const initialState = {
    image_url:"",
    uploading: false,
}
export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft)=>{
draft.image_url = action.payload.image_url;
draft.uploading = false; 
//url이 기록되었으니 업로드 종료.
    }),
    [UPLOADING]: (state, action) => produce(state, (draft) =>{
draft.uploading = action.payload.uploading;
    })
}, initialState);

//middleware
const uploadImageFB = (image)=>{
    return function(dispatch, getState, {history}){

        dispatch(uploading(true));

        const _upload = storage.ref(`images/${image.name}`).put(image);

_upload.then((snapshot)=>{
    console.log(snapshot);
    snapshot.ref.getDownloadURL().then((url)=>{
        dispatch(uploadImage(url));
        console.log(url);
    });

    })
}}

const actionCreators = {
    uploadImage,
    uploadImageFB,
}

export {actionCreators};