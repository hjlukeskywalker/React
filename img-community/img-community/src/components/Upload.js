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
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    //읽기가 끝나면 발생하는 이벤트 핸들러로 값을 받아온다.
    reader.onloadend = ()=>{
        console.log(reader.result);
        dispatch(imageActions.setPreview(reader.result));
    }
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