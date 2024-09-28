// ==UserScript==
// @name         RemoveDollarForQiita
// @namespace    http://example.com/qiita-code-block-cleaner
// @version      2024-09-28
// @description  コードブロックをコピーしたときにコマンドの前の $ を除去する
// @author       You
// @match        https://qiita.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

;(function () {
  // ページ内のクリックイベントを監視する
  document.addEventListener("click", function (event) {
    // クリックされた要素の親に `.code-copy__button` があるか確認
    const copyButton = event.target.closest(".code-copy__button")

    // `.code-copy__button` がクリックされた場合のみ処理を実行
    if (copyButton) {
      console.log("code-copy__button was clicked")

      // コードブロックのテキストを取得
      const codeBlock = copyButton.closest(".code-frame").querySelector("code")

      console.log("Code block element:", codeBlock) // コードブロックをコンソールに表示

      if (codeBlock) {
        let codeText = codeBlock.innerText

        // コマンドの行頭にある $ とその後ろのスペースを除去
        codeText = codeText.replace(/^\$\s+/gm, "")

        // コピー内容をクリップボードに保存
        navigator.clipboard
          .writeText(codeText)
          .then(function () {
            console.log("コードがクリップボードにコピーされました: ", codeText)
          })
          .catch(function (error) {
            console.error("クリップボードへのコピーに失敗しました: ", error)
          })
      }

      // コピー成功のメッセージを表示（必要に応じて）
      const copyMessage = copyButton
        .closest(".code-copy")
        .querySelector(".code-copy__message")
      if (copyMessage) {
        copyMessage.style.display = "block"
        setTimeout(() => {
          copyMessage.style.display = "none"
        }, 1000)
      }

      // デフォルトのコピー処理をキャンセル
      event.preventDefault()
    }
  })
})()
