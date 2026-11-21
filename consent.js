/* Συγκατάθεση για το Facebook Pixel (kleanthiliodaki.com).
   Το Pixel φορτώνει ΜΟΝΟ αν ο επισκέπτης πατήσει «Ναι» (§25 TDDDG, ν. 3471/2006 άρθ. 4).
   Η επιλογή μένει στο localStorage του επισκέπτη. Ανάκληση: g4gConsent.reset() (κουμπί στη Datenschutz). */
(function () {
  var KEY = 'g4g-pixel-consent';
  var PIXEL_ID = '942263332478058';

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  function showBanner() {
    if (document.getElementById('g4g-consent')) return;
    var css = document.createElement('style');
    css.textContent =
      '#g4g-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:560px;margin:0 auto;' +
      'background:#fffdf8;color:#3f4447;border:1px solid #e2dccf;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.15);' +
      'padding:18px 20px;font-size:16px;line-height:1.5;font-family:inherit;text-align:left}' +
      '#g4g-consent p{margin:0 0 12px}' +
      '#g4g-consent .g4g-btns{display:flex;gap:10px;flex-wrap:wrap}' +
      '#g4g-consent button{flex:1 1 160px;padding:10px 14px;border-radius:8px;font:inherit;font-weight:600;cursor:pointer;' +
      'border:1px solid #3f4447;background:#fff;color:#3f4447}' +
      '#g4g-consent a{color:inherit;text-decoration:underline}' +
      '#g4g-consent .g4g-more{display:block;margin-top:10px;font-size:14px}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.id = 'g4g-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Συγκατάθεση για το Facebook Pixel');
    box.innerHTML =
      '<p>Χρησιμοποιώ το Facebook Pixel (Meta), για να δείχνω τις διαφημίσεις μου στο Facebook και στο Instagram ' +
      'σε όσους επισκέφτηκαν τη σελίδα μου. Μου το επιτρέπεις;</p>' +
      '<div class="g4g-btns">' +
      '<button type="button" data-v="yes">Ναι, εντάξει</button>' +
      '<button type="button" data-v="no">Όχι, ευχαριστώ</button>' +
      '</div>' +
      '<a class="g4g-more" href="/datenschutz.html#facebook-pixel">Περισσότερα στη Datenschutz (μπορείς να αλλάξεις γνώμη όποτε θες)</a>';
    box.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-v');
      if (!v) return;
      save(v);
      box.parentNode.removeChild(box);
      if (v === 'yes') loadPixel();
    });
    document.body.appendChild(box);
  }

  window.g4gConsent = {
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      location.reload();
    }
  };

  var choice = read();
  if (choice === 'yes') {
    loadPixel();
  } else if (choice !== 'no') {
    if (document.body) showBanner();
    else document.addEventListener('DOMContentLoaded', showBanner);
  }
})();
