(function () {
  document.querySelector('footer').insertAdjacentHTML('afterbegin', `
  <p><a id="prev" href=""></a></p><p><a id="next" href=""></a></p>
  `)

  const pathName = window.location.pathname.split('/')
  const pageName = pathName.pop()

  const pageNumber = parseInt(pageName.replace(/[^0-9]/g, ''))
  const pageCharacter = pageName.replace(/[0-9]/g, '').split('.')
  const category = pageCharacter[0]

  const prev = pageNumber - 1
  const next = pageNumber + 1

  const prevURL = (prev < 0) ? '/tutorial/' : category + prev + '.html'
  const prevText = (prev < 0) ? '目次' : '❮ 戻る'
  const nextURL = (next > 22) ? '/tutorial/' : category + next + '.html'
  const nextText = (next > 22) ? '目次' : '進む ❯'

  document.getElementById('prev').href = prevURL
  document.getElementById('prev').textContent = prevText
  document.getElementById('next').href = nextURL
  document.getElementById('next').textContent = nextText
})()
