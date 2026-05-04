// ── Menu hamburguesa ──
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !nav.contains(e.target)) closeMenu();
});

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}

// ── Selector inteligente ──
const quizAnswers = {};

function quizAnswer(question, value, nextStep) {
  quizAnswers[question] = value;
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  if (nextStep === 'resultado') {
    showQuizResult();
  } else {
    document.getElementById(nextStep).classList.add('active');
  }
}

function showQuizResult() {
  const resultEl = document.getElementById('quiz-result');
  const { personas, objetivo, modalidad } = quizAnswers;
  const online = modalidad === 'online' ? ' en formato online' : '';
  const grande = personas === 'corporativo' || personas === 'grande';

  const recomendaciones = {
    onboarding: { titulo: 'Onboarding Experiencial', desc: `Perfecto para integrar nuevos empleados de forma dinamica${online}.` },
    comunicacion: { titulo: 'Escape Room "El Virus"', desc: `Alta intensidad que obliga al equipo a comunicarse bajo presion${online}.` },
    motivacion: { titulo: 'Dinamicas de Grupo', desc: `Actividades para${grande ? ' grandes grupos' : ' tu equipo'} que generan energia y motivacion real.` },
    celebracion: { titulo: 'Evento de Fin de Ano', desc: `Una experiencia memorable para cerrar el ano con todo el equipo por todo lo alto.` },
  };

  const rec = recomendaciones[objetivo] || { titulo: 'Experiencia Personalizada', desc: 'Contactanos y disenaremos la experiencia perfecta para tu equipo.' };

  resultEl.innerHTML = `
  <h3>Te recomendamos: <span>${rec.titulo}</span></h3>
  <p>${rec.desc}</p>
  <a href="#contacto" class="btn">Solicitar esta experiencia</a>
`;
  document.getElementById('resultado').classList.add('active');
}

function resetQuiz() {
  for (const k in quizAnswers) delete quizAnswers[k];
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-personas').classList.add('active');
}

// ── Filtro de catalogo ──
function filterExp(obj, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#catalogo .exp-card').forEach(card => {
    const cardObj = card.dataset.obj || '';
    card.style.display = (obj === 'todos' || cardObj.includes(obj)) ? 'flex' : 'none';
  });
}
