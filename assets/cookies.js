(function(){
  var KEY='mu_consent',VER=1;
  function get(){try{var v=JSON.parse(localStorage.getItem(KEY));return v&&v.v===VER?v:null}catch(e){return null}}
  function set(m){try{localStorage.setItem(KEY,JSON.stringify({v:VER,m:!!m,t:new Date().toISOString()}))}catch(e){}}
  var box;
  function build(){
    box=document.createElement('div');box.className='ck';box.setAttribute('role','dialog');box.setAttribute('aria-labelledby','ckT');
    box.innerHTML='<h2 id="ckT">Pliki cookies</h2>'+
    '<p>Używamy niezbędnych plików do działania strony. Za Twoją zgodą także cookies marketingowych (Meta Pixel), które pomagają nam mierzyć skuteczność reklam. Zgodę możesz w każdej chwili zmienić. Szczegóły w <a href="polityka-prywatnosci.html#cookies">polityce prywatności</a>.</p>'+
    '<div class="opts">'+
      '<div class="opt"><div><b>Niezbędne</b><span>Zapamiętanie Twojego wyboru dotyczącego cookies. Zawsze włączone.</span></div><input type="checkbox" checked disabled aria-label="Niezbędne"></div>'+
      '<div class="opt"><div><b>Marketingowe</b><span>Meta Pixel: pomiar skuteczności reklam na Facebooku i Instagramie.</span></div><input type="checkbox" id="ckM" aria-label="Marketingowe"></div>'+
    '</div>'+
    '<div class="row"><button type="button" id="ckN">Odrzuć wszystkie</button><button type="button" id="ckS">Ustawienia</button><button type="button" class="pri" id="ckA">Akceptuję wszystkie</button></div>';
    document.body.appendChild(box);
    box.querySelector('#ckA').onclick=function(){save(true)};
    box.querySelector('#ckN').onclick=function(){save(false)};
    box.querySelector('#ckS').onclick=function(){
      if(box.classList.contains('det')){save(box.querySelector('#ckM').checked)}
      else{box.classList.add('det');this.textContent='Zapisz wybór'}
    };
  }
  function save(m){set(m);apply(m);if(box)box.classList.remove('show','det')}
  function apply(m){
    if(m&&typeof window.muLoadPixel==='function'){window.muLoadPixel()}
    if(!m&&window.fbq){try{fbq('consent','revoke')}catch(e){}}
  }
  function open(){
    if(!box)build();
    var c=get();box.querySelector('#ckM').checked=!!(c&&c.m);
    box.querySelector('#ckS').textContent='Ustawienia';box.classList.remove('det');
    box.classList.add('show');
  }
  window.muCookieSettings=open;
  document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-cookie-settings]');if(t){e.preventDefault();open()}});
  function init(){var c=get();if(c){apply(c.m)}else{open()}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
