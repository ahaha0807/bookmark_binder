/*
 *  input_link    登録時に入力されたページのURI
 *  input_title   登録時に入力されたページのタイトル
 *  last_number   ページ内に表示されている一番下のリンクについたシリアルナンバー
 *
 */


// == JS関数定義部 ==


//== Reactコンポーネント定義部 ==

// コンテンツボックスコンポーネント定義
var Content = React.createClass({
  render: function() {
    return(
      // TODO: ContentTime・ContentSelealNumberの追加
      <div className="content">
        <ContentLink />
        <br />
        <ContentTitle />
        <br />

      </div>
    );
  }
});

// リンクコンポーネント定義
var ContentLink = React.createClass({
  render: function() {
    return (
      <h3 id="link{last_number}" className="links">
        <a href="{input_link}">{input_link}</a>
      </h3>
    );
  }
});

// タイトルコンポーネント定義
var ContentTitle = React.createClass({
  render: function() {
    return (
      <h1 id="title{last_number}" className="titles">
        <a href="{input_link}">{input_title}</a>
      </h1>
    );
  }
});


// レンダーメソッド実行
React.render(
  <Content />,
  document.getElementById('contents')
);
