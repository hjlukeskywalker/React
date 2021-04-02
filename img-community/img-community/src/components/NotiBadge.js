import React from "react";
import {Badge} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {realtime} from "../shared/firebase";
import{useSelector} from "react-redux";

const NotiBadge = (props)=>{
const [is_read, setIsRead]= React.useState(true);
const user_id = useSelector(state=>state.user.user.uid);

    const notiCheck=()=>{
        const notiDB = realtime.ref(`noti/${user_id}`);
        notiDB.update({read:true});
        props._onClick();

    };

    React.useEffect(()=>{
        if(!user_id){
            return;
        }
        const notiDB = realtime.ref(`noti/${user_id}`);
        notiDB.on("value", (snapshot)=>{//구독on, value가 바뀔 때마다 해줄 행동
            setIsRead(snapshot.val().read);

            return() => notiDB.off(); //구독해제

        });

    },[])

    return(
        <React.Fragment>
              <Badge onClick={notiCheck} color="secondary" variant="dot" invisible={is_read}>
<NotificationsIcon fontSize="large"></NotificationsIcon>
            </Badge>

        </React.Fragment>

    );
}
NotiBadge.defaultProps ={
    _onClick:()=>{}
};
export default NotiBadge;