(function () {
  document.querySelector('footer').insertAdjacentHTML('afterbegin', `
  <p><a id="prev" href=""></a></p><p><a id="next" href=""></a></p>
  `)

  const pathName = window.location.pathname.split('-')
  const pageNumber = pathName.pop()
  const missionStage = parseInt(pageNumber.replace(/[^0-9]/g, ''))
  const missionName = 'transx-slingshot-'

  const prev = missionStage - 1
  const next = missionStage + 1

  const prevURL = (prev < 1) ? '/transximfd/#slingshot' : missionName + prev + '.html'
  const prevText = (prev < 1) ? '目次' : '❮ 戻る'
  const nextURL = (next > 3) ? '/transximfd/#slingshot' : missionName + next + '.html'
  const nextText = (next > 3) ? '目次' : '進む ❯'

  document.getElementById('prev').href = prevURL
  document.getElementById('prev').textContent = prevText
  document.getElementById('next').href = nextURL
  document.getElementById('next').textContent = nextText
})()
