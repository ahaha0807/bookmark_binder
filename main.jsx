/*
 *  content['title']  タイトルを保持する
 *  content['link']   リンクを保持する
 *  content['id']     idを保持する
 *  content['time']   登録日時を保持する
 *  cnt               id用のカウンタ
 *  contentsList[]    コンテンツオブジェクト保持用配列
 *
 */
var contentsList = [];
var cnt = 0;

// === ＪＳ関数定義 ===

var data_registor = () => {  //データの登録・描画
  var content = {
    link  : "",
    title : "",
    id    : 0,
    time  : ""
  };
  content['title'] = document.querySelector('#data1').value;
  content['link']  = document.querySelector('#data2').value;
  content['id']    = cnt++;

  contentsList.push(content);

  ReactDOM.render(
    <ContentsList contentsList={contentsList} />,
    document.querySelector('#container')
  );
}

const set_date = () => { //日付・時刻の取得
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  date = year + "/" + month + "/" + day + " ";
  date += hour + ":" + minute;

  return date;
}


// === Reactコンポーネント定義 ===
const ContentsList = props => {     //コンテンツリストコンポーネント定義
  return(
    <ul className="contents">
      {props.contentsList.map((content, index)=> <Content content={content} index={index} />)}
    </ul>
  )
}

const Content = props => {      //コンテンツコンポーネント定義
  var content = props.content;
  return (
    <li id={"content_" + (props.index)} className="content">
      <ContentLink link={content.link} index={props.index} />
      <br />
      <ContentTitle title={content.title} index={props.index} />
      <ContentTime time={set_date()} index={props.index} />
      <ContentNumber index={props.index} />
    </li>
  );
}

const ContentTitle = props => {   //タイトルコンポーネント定義
  return (
    <h1 id={"title_" + props.index}>
      {props.title}
    </h1>
  );
}

const ContentLink = props => {    //リンクコンポーネント定義
  return (
    <h2 id={"link_" + props.index} className="link">
      <a href={props.link}>{props.link}</a>
    </h2>
  )
}

const ContentTime = props => {   //登録時刻コンポーネント定義
  return (
    <span id={"time_" + props.index} className="time">
      {props.time}
    </span>
  )
}

const ContentNumber = props => {  //シリアルナンバーコンポーネント定義
  return (
    <span id={"number_" + props.index} className="number">
      {" " + props.index}
    </span>
  )
}
