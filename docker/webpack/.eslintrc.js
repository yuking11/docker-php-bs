module.exports = {
  root: true,
  plugins: [],
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    // ecmaVersionを指定
    // "ecmaVersion": 6,
    // type="module"をサポート
    "sourceType": "module",
    // parserを指定
    "parser": "babel-eslint",
  },
  env: {
    // browserが持っているオブジェクトをサポート
    "browser": true,
    // ES2015以降に追加された組み込みオブジェクトをサポート
    "es6": true,
    // Node.jsで実行されるコードを静的検証する
    "node": true
  },
  globals: {},
  rules: {
    // 不要なカッコは消す
    "no-extra-parens": 2,
    // 無駄なスペースは削除
    "no-multi-spaces": 2,
    // 不要な空白行は削除。2行開けてたらエラー
    "no-multiple-empty-lines": [2, {"max": 1}],
    // 関数とカッコはあけない(function hoge() {/** */})
    "func-call-spacing": [2, "never"],
    // true/falseを無駄に使うな
    "no-unneeded-ternary": 2,
    // セミコロンは禁止
    "semi": [2, "never"],
    // 文字列はシングルクオートのみ
    "quotes": [2, "single"],
    // varは禁止
    "no-var": 2,
    // jsのインデントは２
    "indent": [2, 2],
    // かっこの中はスペースなし
    "space-in-parens": [2, "never"],
    // カンマの前後にスペース入れる
    "comma-spacing": 2,
    // 配列のindexには空白入れるな(hogehoge[ x ])
    "computed-property-spacing": 2,
    // キー
    "key-spacing": 2,
    // キーワードの前後には適切なスペースを
    "keyword-spacing": 2,
    // console 記述はWarning
    // productionではdrop_consoleしているのでコードからは消される
    "no-console": 1,
    // 利用されていない変数
    "no-unused-vars": 1,
    // ホワイトスペースを注意
    "no-irregular-whitespace": 1,
    // true/falseを無駄に使うな
    "no-unneeded-ternary": 2,
    //async内にawaitがない場合
    "require-await": 1,
    //異なる演算子の混合
    "no-mixed-operators": 2,
    //return に代入式を利用しない
    "no-return-assign": 1,
    //厳密等価演算子を利用
    "eqeqeq": 1
  }
}
