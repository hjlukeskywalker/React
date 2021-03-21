// 아래 배열을 합치고, num 기준 역순으로 정렬하기!
// num이 같으면? 다른 속성이 많은 쪽을 앞으로 보내주세요 :)!
let good = [
    { num: 4, name: "good" },
    { num: 2, name: "good2" },
    { num: 1, turn: "up!" },
    { num: 7, key: "good2" },
  ];
  let night = [
    { num: 5, name: "good" },
    { num: 3, abc: "def" },
    { num: 0, yarn: "global" },
    { num: 1, hello: "my name is perl!", key: "ㅎ1ㅎ1" },
  ];

ans = good.concat(night);

const count = Object.keys(ans).length;


ans.reverse().sort(function(a,b){
    return b.num-a.num
});
console.log(ans);