// Menu mobile
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Fermer' : 'Menu';
  });
})();

// Calculateur « coût de l'attente » : estimation, pas une promesse
(function () {
  var form = document.getElementById('calc');
  if (!form) return;
  var fmt = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
  function num(name) {
    var v = parseFloat(String(form.elements[name].value).replace(',', '.'));
    return isFinite(v) && v > 0 ? v : 0;
  }
  function update() {
    var hoursMonth = num('hours') * num('people') * 4.33;
    var cost = hoursMonth * num('cost');
    form.elements.month.value = fmt.format(Math.round(cost / 100) * 100) + ' €';
    form.elements.hoursMonth.value = fmt.format(Math.round(hoursMonth)) + ' h';
  }
  form.addEventListener('input', update);
  update();
})();
