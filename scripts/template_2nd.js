(function () {
  const pageBody = document.querySelector('body')
  pageBody.insertAdjacentHTML('afterbegin', `
  <header>

  <h1>
    <a href="../../index.html">Home for Orbinauts</a>
  </h1>

  </header>

  <nav id="topmenu" class="menubar">
    <a id="menu_basic" href="../../basic/index.html">初心者ガイド</a>
    <a id="menu_tutorial" href="../../tutorial/index.html">チュートリアル</a>
    <a id="menu_transx" href="../../transximfd/index.html">TransXとIMFD</a>
    <a id="menu_iss" href="../../iss/index.html">スペースシャトルとISS</a>
    <a id="menu_apollo" href="../../apollo/index.html">アポロ計画</a>
    <a id="menu_ucgo" href="../../ucgo/index.html">UCGOとUMMU</a>
    <a id="menu_mods" href="../../mods/index.html">その他のMOD</a>
    <a id="menu_misc" href="../../misc/index.html">その他</a>
    <button type="button" id="button_menu">メニュー</button>
  </nav>

  o<main></main>o`)
  pageBody.insertAdjacentHTML('beforeend', `
  c<main></main>c

  <!-- The Modal -->
  <div id="myModal" class="modal">
  <span id="close" class="close">&times; 画像を閉じる</span>
  <img class="modal-content" id="img_modal">
  </div>

  <footer>

  <ul>
    <li><a href="../../basic/comment.html">コメント</a></li>
    <li><a href="../../basic/privacy-policy.html">プライバシーポリシー</a></li>
  </ul>

  <p>
    管理人：<a href="https://twitter.com/4FootBlowtorch">Nikogori</a>
  </p>

  </footer>
  `)
  function removeMain (full, half) {
    document.body.innerHTML = document.body.innerHTML.replace(full, half)
  }
  removeMain('o<main></main>o', '<main>')
  removeMain('c<main></main>c', '</main>')

  // modal for images

  const modal = document.getElementById('myModal')
  const allImages = document.querySelectorAll('img')
  function openModal () {
    modal.style.display = 'block'
    document.getElementById('img_modal').src = this.src
  }
  allImages.forEach(function (img) {
    img.addEventListener('click', openModal)
  })
  function closeModal () {
    modal.style.display = 'none'
  }
  document.getElementById('close').addEventListener('click', closeModal)
})()

function openMenu () {
  const x = document.getElementById('topmenu')
  if (x.className === 'menubar') {
    x.className += ' responsive'
  } else {
    x.className = 'menubar'
  }
}
document.getElementById('button_menu').addEventListener('click', openMenu)
