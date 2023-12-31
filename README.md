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
  - `useMediaQuery`は渡されたメディアクエリとの一致を判定してその結果をbooleanで返す
- React Query
  - 呼び出し側で利用準備をする必要がある
    - QueryClientを初期化`const cli = QueryClient()`
    - QueryClientProviderに渡す`<QueryClientProvider client={cli}>`
  - クエリを発行するのはuseQuery関数
    - `useQuery(key, query [,opts])`
      - key: クエリキー
      - query: クエリ関数
      - opts: 動作オプション
  - useQuery関数の戻り値は決まっており、data/isLoading/isErrorなどを全て内部的に管理してくれるのでそのプロパティを使えばstateで管理する必要がなくなる
  - React Queryでは標準でSuspenseモードを用意しているため、QueryClientオブジェクトでoptionsを設定すればSuspenseモードが有効になる
- useEffect
  - 使う状況はReactの外側と連携する時に限られる
    - ブラウザーAPI、文書ツリーへのアクセスを伴う捜査
    - ネットワークからのデータ取得
    - 非Reactアプリで管理された領域との同期
  - 関数コンポーネントのトップレベルで呼び出すことがルール
  - 第二引数を省略した場合、useEffectは再描画時に常に実行され、空配列にした場合には初期描画時にのみ処理を実行する
  - useLayoutEffect
     - useEffectがページを描画した後に処理を非同期実行するのに対して、useLayoutEffectはページが描画される前に同期的に実行する
     - 同期的に実行されるため、以降の描画を止めてしまい体感速度が低下してしまう
- useRef
  - React本来の仕組みから離れて要素や値を操作することになるので、濫用しないこと
  - 戻り値であるRefオブジェクトはコンポーネントが生成されてから破棄されるまで維持される変更可能なオブジェクト
  - stateは変更されると再描画が走るが、Ref値が変更されても再描画は発生しない
  - 子コンポーネントの要素を参照したい場合はforwardRefを使用する
- useReducer
  - state更新に利用する関数、stateの更新をReducer経由で行うのがルール
  - dispatch関数に対してActionを渡すことでReducerを実行できる
  - Reducerであることの条件
    - 引数として現在のstateとactionを受け取る
    - 戻り値として更新したstateを返す
- useContext
  - バケツリレーを解消するための仕組みがコンテキスト、しかしコンポーネントの再利用性を損なうことにもなるので注意
  - 値を共有すべき最上位のコンポーネントにてコンテキストを準備
    - `export const MyAppContext = createContext();`で以下のContextオブジェクトを作成する
      - コンテキストに値を渡すContext.Providerコンポーネント
      - コンテキストの変更を受け取るContext.Consumerコンポーネント
  - `<MyAppContext.Provider />`要素がコンテキストに具体的な値を引き渡す役割を果たす
    - `<MyAppContext.Provider value={hoge}>`で配下のコンポーネントからコンテキスト値にアクセスできる
  - 子コンポーネントからは`useContext(MyAppContext)`で登録されたコンテキストを参照できる
- 関数や結果をメモ化する
  - 関数呼び出しの結果をキャッシュしておき、後で再利用することをメモ化という
  - 関数が重たい演算を行う場合メモ化で繰り返しの処理を防ぐことでパフォーマンスを改善できる
  - useMemo
    - メモ化したい関数をuseMemoで括り、第二引数には依存する変数を入れる
    - そうすることで依存する変数が変化した場合にだけ関数は再実行されるようになる
    - なお、useMemo関数の戻り値はあくまでも戻り値のため、呼び出し側も変数として呼び出す必要がある
  - memo
    - stateが更新されると子コンポーネントもすべて再描画の対象となってしまう
    - 関数コンポーネント全体をmemoでくくってあげると、新旧のpropsが等価でない場合のみに再描画されるようになる
  - useCallback
    - 親コンポーネントが再描画されると関数も再生成されてしまう
    - useCallbackで関数を囲むことで再生成されることを防ぐことができる
    - memoと併用して使用しないと意味がない
- useTransition
  - 特定のstateの更新をトランジションとしてマークしておくことで優先度の高い更新を先に反映して、優先度の低い更新を後回しにすることが可能
  - トランジションを利用するための準備
    - `const [isPending, startTransition] = useTransition();`
  - トランジションの配下でstateを更新
    - `startTransition(() => { setComments(commentList.filter(c => c.isbn === isbn));});`
  - 優先度の低い更新をこの中に入れる
  - `isPending`はトランジションの反映が保留になっているかを返すbooleanのため、その値に応じてローディングを表示できる
- カスタムhook
  - 関数名がuseXxxxである
  - 関数名で他のhooksを利用していること
  - コンポーネントで再利用したい値やコードを戻り値として返すこと
- useDebugValue
  - カスタムフック内の値を監視してReact Developer Toolsに出力できる
  - `useDebugValue(state.count >= 10 ? '10 Over' : '10 Less');`
- ルーティング
  - アプリにルーター機能を付与するのは`RouterProvider`コンポーネントの役割
    - このrouter属性に対してルート情報を渡す
  - `createBrowserRouter(routes, options)`関数でルーティング情報を定義する
    - pathやelementを使う
    - オブジェクト形式で書くこともできるしタグ形式で表現することも可能
      - タグ形式の場合は`createRoutesFromElements`関数でオブジェクト配列に変換してから`createBrowserRouter`関数に渡す
  - `Outlet`はあらかじめ用意しておいたリンク先が表示されるようにするものなので実質必須
  - ルートパラメーターを送るには`/book/:id`のような形式でルートを定義する
    - 受け取り側はuseParamsを用いてルートパラメーターを取得し、`params.名前` or `params['名前']`でアクセスする・もしくは分割代入でも構わない
  - ?や*などの記号を使うことでより複雑なパスを表現できる
    - ?をつけることで省略可能なパラメーターを表現可能
    - *をつけることで/を跨いで残りのパスをすべて取得することが可能
      - 取得するときは`params['*']`とするか分割代入で別名を付与する`{'*': keywords}`
  - useSearchParams関数を使うことでクエリ情報を受け取ることができる
    - `[params, setParams] = useSearchParams()`で宣言して`params.get("hoge")`でクエリを取得できる
  - ルートパラメータとクエリ情報だと、ルートパラメータを優先して利用した方が良い
    - ルート定義で名前を明示するため受け渡しする情報が明確になる
    - 受け渡しのためのコードもuseParamsの方がシンプル
    - 一般的なパス記法の一部として表現するのでパスそのものの見通しにも慣れる
  - state属性を利用することでリンク固有の情報を引き渡すことも可能
    - useLocation関数で現在の場所に関わる情報を取得できるが、ページを区別するならばURLにも反映した方が良いため、文字列で表現できない情報を受け渡す場合のみで使用した方が良い
  - useRouteError関数を使うことでルート上で発生した例外を取得することができる
  - loader属性を使うことでコンポーネントで利用するデータを準備可能
    - loaderとはコンポーネントで利用するデータを準備するための関数のことで、コンポーネント本体とデータ取得のためのコードを明確に分離できる
    - 引数としてリクエスト情報を受け取る、戻り値として取得したデータorそのPromiseを返すことが条件
    - コンポーネント側ではuseLoaderData関数でデータを取得することが可能
- test
  - 単体テスト
    - describe関数の第一引数に名前、第二引数にアローを入れる
    - test関数の第一引数に名前、第二引数にアロー関数でテストを書く
    - `expect(テストしたい関数).toBe()`のようなマッチャーで検証する
    - テスト実行は`npm run test`
    - テストのカバレッジ分析をしたい場合は`npm run test -- --coverage --watchAll=false`
      - より詳細な確認をしたい場合は`/coverage/lcov-report/index.html`を開く
    - コンポーネントのテストは以下手順が良い
      - コンポーネントを描画
      - 目的の要素を取得・操作
      - 描画・操作結果をMatcherで確認
    - タイマーを伴うテストの場合には、タイマーによる経過時間をJestでシュミレートする必要がある
      - テスト前にuseFakeTimersで偽タイマーを有効化
      - テストケースで偽タイマーを操作（`advanceTimersByTime`など）
      - テスト後にuseRealTimersで本来のタイマーを復元
    - 非同期通信を伴うテストでは非同期通信をモック化する
      - msw(Mock Service Worker)を利用するのが簡単

