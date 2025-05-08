function openPinpointModal(el) {
    const image = el.dataset.image || '';
    const title = el.dataset.title || 'No Title';
    const link = el.dataset.link || '#';

    console.log('Opening modal with:', { image, title, link });

    document.getElementById('modalImage').src = image;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalLink').href = link;

    document.getElementById('pinpointModal').classList.add('show');
  }

  function closePinpointModal() {
    document.getElementById('pinpointModal').classList.remove('show');
  }