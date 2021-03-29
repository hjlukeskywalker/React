import React from "react";
import {Button} from "../elements";
import {storage} from "../shared/firebase";
import {actionCreators as imageActions} from "../redux/modules/image";
import {useDispatch, useSelector} from "react-redux";

const Upload = ()=>{

    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);

    const fileInput = React.useRef();

    const selectFile = (e)=>{
        console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);

    console.log(fileInput.current.files[0]);
    }

    const uploadFB = () =>{
        let image = fileInput.current.files[0];
        //middleware로 대체
        // const _upload = storage.ref(`images/${image.name}`).put(image);
        dispatch(imageActions.uploadImageFB(image));
    }
    
    return (
        <React.Fragment>
<input disabled = {is_uploading} ref={fileInput} type="file" onChange={selectFile}></input>
<Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>

    );
}

export default Upload;