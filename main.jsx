/*
 *  content['title']  タイトルを保持する
 *  content['link']   リンクを保持する
 *  content['id']     idを保持する
 *  content['time']   登録日時を保持する
 *  cnt               id用のカウンタ
 *  contentsList[]    コンテンツオブジェクト保持用配列
 *
 */

//  変数・配列宣言
var contentsList = [];
var cnt = 0;

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
      <div id={props.index} className="data">
        <ContentTime time={content.time} index={props.index} />
        <ContentNumber index={props.index} />
      </div>
    </li>
  )
}

const ContentTitle = props => {   //タイトルコンポーネント定義
  return (
    <h1 id={"title_" + props.index} className="title">
      {props.title}
    </h1>
  )
}

const ContentLink = props => {    //リンクコンポーネント定義
  return (
    <h2 id={"link_" + props.index} className="link">
      <a href={props.link}  target="_blank">{props.link}</a>
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

const MenuContentsList = props => {   //メニューリストコンポーネント定義
  return (
    <ul>
      {props.menuList.map(menuItem => <MenuContent item={menuItem}/>)}
    </ul>
  )
}

const MenuContent = props => {    //メニューボタンコンポーネント定義
  return (
    <li>
      <button id={props.item.id} className="menu_item" onClick={props.item.clickHandler}>{props.item.id}</button>
    </li>
  )
}

const ModalWindow = props => {
  return (
    <div id="modal_content">
      {modal_textbox(props.mode)}
      <button className="submit" onClick={props.modalList[props.mode].clickHandler}>{props.modalList[props.mode].btnName}</button>
      <button className="close" onClick={modal_close}>閉じる</button>
    </div>
  )
}

const InportList = props => {
  return (
    <ul className="contents">
      {props.fileList.map((content, index)=> <InportContent content={content} index={index} />)}
    </ul>
    )
}

const InportContent = props => {
  var content = props.content;
  return (
    <li id={"content_" + (props.index)} className="content">
      <InportContentLink link={content.link} index={props.index} />
      <br />
      <ContentTitle title={content.title} index={props.index} />
      <div id={props.index} className="data">
        <ContentTime time={content.time} index={props.index} />
        <ContentNumber index={props.index} />
      </div>
    </li>
  )
}

const InportContentLink = props => {    //読み込み時用リンク定義
  var propslink = inport_link_convert(props.link);
  return (
    <h2 id={"link_" + props.index} className="link">
      <a href={propslink}  target="_blank">{propslink}</a>
    </h2>
  )
}

// === ＪＳ関数定義 ===

var set_date = () => { //日付・時刻の取得
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

var data_registor = () => {  //データの登録・描画
  var content = {
    link  : "",
    title : "",
    id    : 0,
    time  : ""
  };
  if(document.querySelector('#textbox_1').value != "" && document.querySelector('#textbox_2').value != ""){
    content['link']  = document.querySelector('#textbox_1').value;
    content['title'] = document.querySelector('#textbox_2').value;
    content['id']    = cnt++;
    content['time']  = set_date();

    contentsList.push(content);

    ReactDOM.render(
      <ContentsList contentsList={contentsList} />,
      document.querySelector('#container')
    );
  }
}
var data_export = () => {   //データの書き出し
  var data = get_fab_data();
  var blob = new Blob([data], {type : "text/json"});
  var file_title;
  if(document.querySelector('#textbox_1').value != ''){
    file_title = document.querySelector('#textbox_1').value + "_bf.json";
  }
  if(file_title != undefined){
    if(window.navigator.msSaveBlob){
      window.navigator.msSaveBlob(blob, file_title);
      window.navigator.msSaveOrOpenBlob(blob, file_title);
    }
    else
    {
      window.URL = window.URL || window.webkitURL;
      var links = document.querySelector('#download_links');
      var temp = document.createElement("a");
      temp.innerHTML = file_title;
      temp.href = window.URL.createObjectURL(blob);
      temp.setAttribute("class", "link")
      temp.setAttribute("download", file_title);
      links.appendChild(temp);
    }
  }
}

var data_inport = () => {   //データの読み込み
  var inp_file = document.querySelector('#file_1').files[0];
  var reader = new FileReader();
  reader.addEventListener('load', e => {
    var file_data = reader.result;
    file_data = JSON.parse(file_data);
    file_data = Object.values(file_data);
    ReactDOM.render(
      <InportList fileList={file_data} />
      ,document.querySelector('#container')
    );
  }, true);
  reader.readAsText(inp_file);
}

var modal_textbox = _mode => {  //モーダル内のテキストボックス追加
  var box_ret = [];
  switch (_mode) {
    // TODO: ここを関数・テンプレートで表示できるようにしたい
    case 0:
      box_ret.push(<label for="regist_url">URL</label>);
      box_ret.push(<input name="regist_url" type="text" id="textbox_1" placeholder="URLを入力してください"></input>);
      box_ret.push(<br />);
      box_ret.push(<label for="regist_title">タイトル・登録名</label>);
      box_ret.push(<input name="regist_title" type="text" id="textbox_2"　placeholder="登録名を入力してください"></input>);
      box_ret.push(<br />);
      break;
    case 1:
      box_ret.push(<div id="download_links"></div>);
      box_ret.push(<label for="export_name">書き出しファイル名</label>);
      box_ret.push(<input name="export_name" type="text" id="textbox_1"placeholder="ファイル名を入力してください"></input>);
      box_ret.push(<br />);
      break;
    case 2:
      box_ret.push(<label for="inport_name">読み込みファイル</label>);
      box_ret.push(<input name="inport_name" type="file" id="file_1"></input>);
      box_ret.push(<br />);
      break;
    default:
      break;
    }
    return box_ret;
}


var modal_display = _mode => { //モーダル表示
  ReactDOM.render(
    <ModalWindow modalList={modalList} mode={_mode} />,
    document.querySelector('#modal')
  );
  //  モーダルのセンタリング
  var width   = $(window).width();
  var height  = $(window).height();
  var cont_width  = $('#modal').width();
  var cont_height = $('#modal').outerHeight();
  var cont_left = ((width - cont_width) / 2);
  var cont_top = ((height - cont_height) / 2);
  $('#modal').css({"left": cont_left + "px"});
  $('#modal').css({"top": cont_top + "px"});
  $('#modal').fadeIn();
  $('#modal_overlay').fadeIn('slow');
  document.querySelector('#modal_overlay').addEventListener("click", modal_close, false);
}

var get_fab_data = () => {  //お気に入りデータの取得
  var ret_data = new Object();
  var inner_data = [].slice.call(document.querySelectorAll('.content'));
  //内部データの読み込み
  inner_data.forEach((value, index) => {
    var content = {};
    var link_id = "#link_" + index;
    var title_id = "#title_" + index;
    var time_id = "#time_" + index;
    var number_id = "#number_" + index;
    content["link"] = document.querySelector(link_id).innerHTML;
    content["title"] = document.querySelector(title_id).innerHTML;
    content["time"] = document.querySelector(time_id).innerHTML;
    content["number"] = document.querySelector(number_id).innerHTML;
    ret_data[index] = content;
  });
  // 連想配列の文字列変換
  ret_data = JSON.stringify(ret_data, (index ,value) => {
		return value;
	} ,"\n ");
  return ret_data;
}

var inport_link_convert = _link => {  //読み込み後リストの修正
  var start = _link.search(/\">/) + 2;
  var end = _link.search(/<\/a>/);
  return _link.slice(start, end);
}

var modal_close = () => {
  $('#modal').fadeOut();
  $('#modal_overlay').fadeOut();
}

//  データリスト配列
var menuList = [    //メニューボタン要素オブジェクト
  {
    id: "ADD",
    clickHandler: () => {return modal_display(0)}//data_registor
  },
  {
    id: "EXPORT",
    clickHandler: () => {return modal_display(1)}//data_export
  },
  {
    id: "INPORT",
    clickHandler: () => {return modal_display(2)}//data_inport
  }
];

var modalList = [
  {
    btnName:"登録",
    clickHandler: data_registor
  },
  {
    btnName:"書き出し",
    clickHandler: data_export
  },
  {
    btnName:"読み込み",
    clickHandler: data_inport
  }
];

// 一括レンダー関数
var render = () => {
  ReactDOM.render(
    <MenuContentsList menuList={menuList} />,
    document.querySelector('#menu')
  );
}

render();
