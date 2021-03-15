// Google Analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')
  
  ga('create', 'UA-111309875-3', 'auto')
  ga('send', 'pageview')

// insert header and footer template

(function () {
  const pageBody = document.querySelector('body')

  // insert header

  pageBody.insertAdjacentHTML('afterbegin', `
  <header>

  <h1>
    <a href="index.html">Home for Orbinauts</a>
  </h1>

  </header>

  <nav id="topmenu" class="menubar">
    <a id="menu_basic" href="basic/index.html">初心者ガイド</a>
    <a id="menu_tutorial" href="tutorial/index.html">チュートリアル</a>
    <a id="menu_transx" href="transximfd/index.html">TransXとIMFD</a>
    <a id="menu_iss" href="iss/index.html">スペースシャトルとISS</a>
    <a id="menu_apollo" href="apollo/index.html">アポロ計画</a>
    <a id="menu_ucgo" href="ucgo/index.html">UCGOとUMMU</a>
    <a id="menu_mods" href="mods/index.html">その他のMOD</a>
    <a id="menu_misc" href="misc/index.html">その他</a>
    <button type="button" id="button_menu">メニュー</button>
  </nav>

  o<main></main>o`)

  // insert footer

  pageBody.insertAdjacentHTML('beforeend', `
  c<main></main>c

  <!-- The Modal -->
  <div id="myModal" class="modal">
  <span id="close" class="close">&times; 画像を閉じる</span>
  <img class="modal-content" id="img_modal">
  </div>

  <footer>

  <ul>
    <li><a href="basic/comment.html">コメント</a></li>
    <li><a href="basic/privacy-policy.html">プライバシーポリシー</a></li>
  </ul>

  <p>
    管理人：<a href="https://twitter.com/4FootBlowtorch">Nikogori</a>
  </p>

  </footer>
  `)

  // remove redundant opening and closing main tag

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

// responsive menu for mobile devices

function openMenu () {
  const x = document.getElementById('topmenu')
  if (x.className === 'menubar') {
    x.className += ' responsive'
  } else {
    x.className = 'menubar'
  }
}
document.getElementById('button_menu').addEventListener('click', openMenu)
