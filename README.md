- `npm run build`
  - アプリをビルドして本番環境にデプロイするためのファイル一式を作成するコマンド
  - /buildフォルダーにビルド済みのファイルが生成される
- `npm run eject`
  - create react appを構成するwebpack/Babelの設定をカスタマイズするためのコマンド
- index.html → index.js → App.jsのラインで連携して、Reactアプリが動作する
  - index.html
    - ブラウザからアクセスする際の基点ファイル、/publicフォルダに配置されている
    - `<div id="root"></div>`の要素を起点として開始される
    - バンドルによって生成された.jsファイルの名前に基づいてwebpackが後から.htmlファイルに反映してくれるため、script要素は存在しない
  - index.js
    - Reactアプリを実行する際に最初に呼び出されるエントリーポイント
    - createRootメソッドでReactアプリを埋め込むべきルート要素を取得する
    - 特定したらrenderメソッドでコンポーネントを実行してページに反映させる
    - 「`<React.StrictMode>`コンポーネントを実行してその結果を`id="root"`である要素に描画してね」という意味となる
    - renderの引数にはJSXを渡す必要がある
  - App.js
    - 関数名はパスカルケース（単語の頭文字は大文字）で定義する
    - 戻り値はReact
    - exportしないと他のモジュールから呼び出すことができない
- Reactではアプリの状態が変化した時に実際のDOMではなく仮想DOMを操作する
  - 仮想DOM = メモリ上に置かれたDOMのコピー
  - 真に変更された最終的な差分だけを適切なタイミングで実際のDOMに書き戻す
  - 更新の範囲も頻度も最小限に抑えられるため、パフォーマンスを改善できる
- Reactがコンポーネントを再描画するタイミング
  - Stateが更新された場合
  - 渡されたPropsが変更された場合
  - 親コンポーネントが再描画された場合
- key属性があることでReactはリスト項目を特定することができる
  - key属性がない状態ではReactは配列の変更を検知できないため、変更/削除があった際にリスト全体を再生成しなければならない
  - map関数のindexを渡すことで一意なkeyになるので警告の抑制はできるが、要素の追加/削除・ソートによって変化する可能せがあるため望ましくない
- `props.children`で親コンポーネントの子要素を取得することが可能
  - childrenプロパティの実体はは以下のコンテンツを表すJSX要素の配列
  - そのため親コンポーネントで特定のchildにkey属性を持たせていた場合は、子コンポーネントでfindメソッドで該当の要素を取り出すことも可能
    - `const title = children.find((element) => element.key === 'title')`
- Reactのイベント
  - mouseenter/mouseleaveイベント →　対象となる要素の出入りに際してのみ発生
  - mouseover/mouseoutイベント →　内側の要素に出入りした際にも発生
  - ReactのイベントオブジェクトはJavaScriptと全く同じものというわけではなく、ブラウザ間の使用さを吸収したSyntheticEventgaseiseisareru
  - イベントハンドラーに任意の引数を渡す際の手法
    - 実行時に引数の値が変化するとき
      - `<button onClick={e => func(e, 'hogehoge')}>date</button>`
    - あらかじめ引数の値が決まるとき
      - `<button data-type='hogehoge' onClick={func}>date</button>`
      - 関数内では`e.target.dataset.type`で"hogehoge"を取得できる
  - イベントの処理はイベントの発生元だけで実行されるわけではない
    - 伝播の過程で対応するハンドラーが存在する場合（親要素等に同様のハンドラーがある場合）には、それらも順に実行される
    - 処理の順序を変更することももちろんできる
      - 通常は「孫→子→親」の順で伝播される
      - `onClickCapture`などの`onXxxxCapture`を使うことで「親→子→孫」の順に伝播する
      - そもそも伝播を抑制したい場合には呼び出される関数内で`e.stopPropagation()`を呼び出す
      - クリックしたら別ページに遷移するなどのイベント既定の動作をキャンセルしたい場合には`e.preventDefault()`を使うことでキャンセル可能
- フォーム
  - useStateを用いてフォームの値は一つのオブジェクトに束ねる
  - フォーム要素のname属性とstate上のプロパティ名は一致させる
  - そうすることで更新用関数内で`[e.target.name]: e.target.value`とすることで算出プロパティ名を用いてstateを更新できる
  - React(State)で入力を管理する方式のコンポーネントを制御コンポーネントと呼ぶ
  - もちろん個々の入力要素ごとにstateを管理することもできるが、要素の数だけstateを定義しないといけないため記述量が増えてしまう
- JavaScriptのchangeイベントとReactのonChange属性は異なるもの
- 入力値をstateで保持しないコンポーネントのことを非制御コンポーネントと呼ぶ
  - stateを用いないため`<input>`や`<select>`の要素に直接アクセスする必要がある
  - stateを使わないので再描画は発生しないが、リアルタイムな入力値検証やフォーム操作は苦手
  - useRef関数は要素に紐づける場合は引数はnullとする`const name = useRef(null);`
  - 実際にRefオブジェクトに要素を紐づけるのはref属性`input id="name" name="name" type="text" ref={name} defaultValue="佐藤大輔" />`
  - 非制御コンポーネントはstateを使わないため、既定値は要素のdefaultValue属性として割り当てる
  - value属性として割り当ててしまうと値はロックされてしまい、変更できなくなる
- `...form`などのスプレッド構文はオブジェクトの複製を生成してそれを分解する
  - スプレッド構文による複製は「浅い」複製のため、ネストされたオブジェクトを扱う際には注意が必要
  - 2階層目以降のstateを更新しようとすると、`...form.address`のようにaddressプロパティも複製しないと、stateを更新できない
  - そのため入れ子が増えていくと辛いため、stateは極力フラットにするのが良い
  - useImmerを使うことでスプレッド構文を用いずとも、入れ子になったstateを更新できる
- 配列型のstateもオブジェクトと同様にstateを直接更新することはできない
  - 配列操作で利用すべきメソッドとそうでないメソッド（破壊的メソッド）
    - 追加
      - 利用すべき
        - `concat`, `[...list]`
      - 避けるべき
        - `push`, `unshift`
    - 更新
      - 利用すべき
        - `map`
      - 避けるべき
        - `splice`, `list[i]=hogehoge`
    - 削除
      - 利用すべき
        - `filter`, `slice`
      - 避けるべき
        - `pop`, `shift`, `splice`
    - ソート
      - 利用すべき
        - あらかじめ配列を複製
      - 避けるべき
        - `sort`, `reverse`
  - 追加の際
    - `...`演算子でもとの配列を複製して新規要素を並べる
  - 更新
    - 各Todoにidプロパティを割り当てておき、data-id属性からidを特定してmapメソッドを用いてitemのisDoneをtrueに置き換える
  - 削除
    - 各Todoにidプロパティを割り当てておき、data-id属性からidを特定してfilterメソッドを用いてクリックされたTodoのidが合致しない要素だけを残すことで除去している
  - ソート
    - Stateの値をソートする場合には直接更新できないため、`[...todo]`で複製した上でsortを行う
- react-hook-form
  - stateを初期化するためにuseStateを用いたように、react-hook-formではuseForm関数でフォームを初期化する
  - registerは指定されたフィールドに対応するイベントハンドラー、参照などを登録するための関数
    - `register(name, {options})`
  - errorsオブジェクトでは検証の成否を参照することができる
    - `errors.フィールド名?.message`
  - サブミット時に呼び出す処理は`handleSubmit`関数
    - `handleSubmit(onsubmit, onerror)`
      - `onsubmit`ではdataとeを引数として受け取る
      - `onerror`ではerrorとeを引数として受け取る
  - validateオプションを使うことで独自の検証ルールを適用可能
    - `検証名: 検証ルール`の形式で表し、引数は入力値（`value`）とフォーム全体の入力値（`formValues`）
    - `formValues`に関しては複数項目にまたがるもの（メールアドレスとメールアドレス確認用を検証したい場合など）の場合に使用する
      - `formValues.フィールド名`でアクセスできる
    - `validate: (value) => {}`
  - `isDirty`を使用することでフォームが変更されていないという検証を行える
  - `isValid`は検証に失敗しているかどうかを検知できる
  - `isSubmitting`はフォームを処理している間はtrueになるため、それによってボタンを制御することもできる
- Promiseと状態管理
  - Promiseは非同期処理の状態を管理するためのオブジェクト
    - Promiseオブジェクトが生成された直後はPending
    - 非同期処理が終了することで、成功したらFulfilled、失敗したらRejectedという状態に変化する
- Profiler
  - プログラム実行時の各種情報を収集・解析するツールのこと
  - `<Profiler id="id" onRender={handleRender}>`
    - id: Profilerを識別するid
    - handleRender: 配下のコンポーネントが描画される際に実行するコールバック
    - contents: パフォーマンスを計測する対象
- Error Boundary
  - エラーが起きた場合には発生したエラーを記録して代わりのUIを表示するのがError Boundaryの役割
  - Reactコンポーネントの一種
  - クラスコンポーネントを利用しなければならないが、react-error-boundaryというライブラリを使うと簡単に導入できる
- mui
  - アルファベットは全て大文字になるがこれはデフォルトの挙動
  - 