(() => {
  const weddingDate = new Date('2026-11-27T09:00:00+03:00').getTime();
  const parts = {days: document.getElementById('days'), hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds')};
  function updateCountdown() {
    const diff = weddingDate - Date.now();
    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<p>Today is the day! We can’t wait to celebrate with you.</p>';
      return;
    }
    parts.days.textContent = Math.floor(diff / 86400000).toLocaleString();
    parts.hours.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, '0');
    parts.minutes.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
    parts.seconds.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
  }
  updateCountdown(); setInterval(updateCountdown, 1000);
  const form = document.getElementById('rsvpForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const attendance = document.getElementById('attendance').value;
    const guests = document.getElementById('guests').value;
    const note = document.getElementById('note').value.trim();
    if (!name || !attendance) return;
    const message = `Hello Victor and Sharon!%0A%0AName: ${encodeURIComponent(name)}%0ARSVP: ${encodeURIComponent(attendance)}%0ANumber attending: ${encodeURIComponent(guests)}${note ? '%0AMessage: ' + encodeURIComponent(note) : ''}%0A%0AWedding: Friday, 27 November 2026.`;
    const url = `https://wa.me/254746428151?text=${message}`;
    document.getElementById('formMessage').textContent = 'WhatsApp is opening with your message. Please press Send in WhatsApp to complete your RSVP.';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), {threshold: .12}) : null;
  if (observer) document.querySelectorAll('.section, .countdown-section').forEach(el => observer.observe(el));
})();
