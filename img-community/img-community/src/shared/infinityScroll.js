import React from "react";
import _ from "lodash";
import {Spinner} from "../elements";
import {useSelector} from "react-redux";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;
  const paging = useSelector((state)=> state.post.paging);
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    //브라우저마다 scrollTop을 가져오는 방식이 다르므로 브라우저 호환성을 위해 아래와 같이 기재
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        return;
      }
      callNext();
    }
  }, 300);
  console.log("스크롤", is_next);
  console.log("스크롤",paging.next? true:false);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading]);
  return <React.Fragment>{children}
  {is_next && <Spinner/>}</React.Fragment>;
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
export default InfinityScroll;
