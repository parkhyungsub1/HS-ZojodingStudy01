function handleApply(e) {
  e.preventDefault();
  e.target.reset();
  document.getElementById('apply-msg').classList.remove('hidden');
}
