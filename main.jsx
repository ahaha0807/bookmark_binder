  /*
 *  input_link    登録時に入力されたページのURI
 *  input_title   登録時に入力されたページのタイトル
 *  last_number   ページ内に表示されている一番下のリンクについたシリアルナンバー
 *
 */
var input_link = "http://qiita.com/ahaha0807_alg";
var input_title = "Qiitaサイト";
var last_number = 0;

// == JS関数定義部 ==


function set_date() { //日付・時刻の取得
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();

  date = year + "/" + month + "/" + day + " ";
  date += hour + ":" + minute;

  return date;
}

//== Reactコンポーネント定義部 ==

// コンテンツボックスコンポーネント定義
var Content = React.createClass({
  render: function() {
    return(
      <div className="content">
        <ContentLink />
        <br />
        <ContentTitle />
        <br />
        <ContentTime />
        <br />
        <ContentSelealNumber />
      </div>
    );
  }
});

// リンクコンポーネント定義
var ContentLink = React.createClass({
  render: function() {
    return (
      <h3 id={"link_" + last_number} className="links">
        <a href={input_link}>{input_link}</a>
      </h3>
    );
  }
});

// タイトルコンポーネント定義
var ContentTitle = React.createClass({
  render: function() {
    return (
      <h1 id={"title_" + last_number} className="titles">
        <a href={input_link}>{input_title}</a>
      </h1>
    );
  }
});

// 登録日時コンポーネント定義
var ContentTime = React.createClass({
  render: function() {
    return (
        <span id={"time_" + last_number} className="submint_time">{
          set_date()
        }</span>
    );
  }
});

// シリアルナンバーコンポーネント定義
var ContentSelealNumber = React.createClass({
  render: function() {
    return (
      <span id={"num_" + last_number} className="seleal_number">{last_number}</span>
    );
  }
});


// サンプルコンポーネント定義
var SampleContent = React.createClass({
  render: function() {
    return (
      <div id="sample_content">
        <h3 id="sample_links" className="link"><a href="#">http://sample.com</a></h3>
        <br />
        <h1 id="sample_title" className="title"><a href="#">サンプルレコード</a></h1>
        <br />
        <span id="sample_time" className="submint_time">2000/01/01 0:00:00</span>
        <span id="sample_num" className="seleal_number">0</span>
      </div>
    )
  }
});

// レンダーメソッド実行
if (1 == 1){  //コンポーネントがひとつもなかった場合は、サンプルコンテンツを表示する。
  React.render(
    <Content />,
    document.querySelector('#contents')
  );
} else {
  React.render(
    <SampleContent />,
    document.querySelector('#contents')
  );
}
