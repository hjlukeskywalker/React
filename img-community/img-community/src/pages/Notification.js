import React from "react";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const Notification = (props) => {
  const user = useSelector(state => state.user.user);
  const [noti, setNoti] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }
    
      const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", snapshot => { //의미 데이터 일회성으로 가져오고(once), value를 snapshot에 담아올거야
      if (snapshot.exists()) { //snapshot,즉 가져올 값이 존재하는 지 확인하는 함수
        let _data = snapshot.val(); //스냅샷의 데이터를 변수에 저장 storage의 doc.data()와 같은 의미

        let _noti_list = Object.keys(_data).reverse().map(s => {
          return _data[s];
        })
        setNoti(_noti_list);
      }
    })
  }, [user])


  return <React.Fragment>
    <Grid padding="16px" bg="#EFF6FF">
      {noti.map((n, idx) => {
        console.log(n);
        return (
          <Card {...n} key={`noti_${idx}`}></Card>
        );
      })}
    </Grid>
  </React.Fragment>;
};

export default Notification;
