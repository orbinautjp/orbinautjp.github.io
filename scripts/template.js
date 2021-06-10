// insert header and footer template

(function () {
  const pageBody = document.querySelector('body')

  // insert header

  pageBody.insertAdjacentHTML('afterbegin', `
  <header>

  <h1>
    <a href="/">Home for Orbinauts</a>
  </h1>

  </header>

  <nav id="topmenu" class="menubar">
    <a id="menu_basic" href="/basic/">初心者ガイド</a>
    <a id="menu_tutorial" href="/tutorial/">チュートリアル</a>
    <a id="menu_transx" href="/transximfd/">TransXとIMFD</a>
    <a id="menu_iss" href="/iss/">スペースシャトルとISS</a>
    <a id="menu_apollo" href="/apollo/">アポロ計画</a>
    <a id="menu_ucgo" href="/ucgo/">UCGOとUMMU</a>
    <a id="menu_mods" href="/mods/">その他のMOD</a>
    <a id="menu_misc" href="/misc/">その他</a>
    <button type="button" id="button_menu">メニュー</button>
  </nav>
  `)

  // insert footer

  pageBody.insertAdjacentHTML('beforeend', `
  <!-- The Modal -->
  <div id="myModal" class="modal">
  <span id="close" class="close">&times; 画像を閉じる</span>
  <img class="modal-content" id="img_modal">
  </div>

  <footer>

  <ul>
    <li><a href="../basic/comment.html">コメント</a></li>
    <li><a href="../basic/privacy-policy.html">プライバシーポリシー</a></li>
    <li>管理人：<a href="https://twitter.com/4FootBlowtorch">Nikogori</a></li>
  </ul>

  </footer>
  `)

  // modal for images

  const modal = document.getElementById('myModal')
  const allImages = document.getElementsByTagName('img')
  function openModal () {
    modal.style.display = 'block'
    document.getElementById('img_modal').src = this.src
  }
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].addEventListener('click', openModal)
    const imgWidth = parseInt(allImages[i].getAttribute('width'))
    const imgHeight = parseInt(allImages[i].getAttribute('height'))
    const imgRatio = imgHeight / imgWidth
    // for vertical images
    if (imgRatio >= 1.1) {
      allImages[i].setAttribute('class', 'vertical')
    }
  }
  function closeModal () {
    modal.style.display = 'none'
  }
  document.getElementById('close').addEventListener('click', closeModal)

  // abbreviations can have focus

  const allAbbr = document.getElementsByTagName('abbr')
  for (let i = 0; i < allAbbr.length; i++) {
    allAbbr[i].setAttribute('tabindex', '-1')
  }
})()

// responsive menu for mobile devices

function openMenu () {
  const x = document.getElementById('topmenu')
  if (x.className === 'menubar') {
    x.className += ' responsive'
  }
}
document.getElementById('button_menu').addEventListener('click', openMenu)

function closeMenu (event) {
  const menuArea = document.getElementById('topmenu')
  const insideMenu = menuArea.contains(event.target)
  if (!insideMenu) {
    menuArea.className = 'menubar'
  }
}
document.addEventListener('click', closeMenu)

// Scroll to anchor

function pgshow () {
  const elId = window.location.hash
  if (elId.length > 1) {
    const el = document.getElementById(elId.substr(1))
    if (el) el.scrollIntoView(true)
  }
}

// pageshow fires after load and on Back/Forward

window.addEventListener('pageshow', pgshow)
