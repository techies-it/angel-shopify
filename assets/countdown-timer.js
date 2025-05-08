if (!customElements.get('countdown-timer')) {
  class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      this.endDate = new Date(this.dataset.endDate).getTime();
      this.hideOnEnd = this.dataset.hideOnEnd === 'true';
      this.hideDays = this.dataset.hideDays === 'true';
      if (!Number(this.endDate)) return;
      this.init();
    }

    init() {
      this.parts = [
        { el: this.querySelector('.js-days'), label: 'Days' },
        { el: this.querySelector('.js-hours'), label: 'Hours' },
        { el: this.querySelector('.js-mins'), label: 'Min' },
        { el: this.querySelector('.js-secs'), label: 'Sec' }
      ];
      if (this.hideDays) {
        if (this.parts[0].el) this.parts[0].el.style.display = 'none'; // Hide days
        // Hide the first colon after days
        const colons = this.querySelectorAll('.countdown__colon');
        if (colons[0]) colons[0].style.display = 'none';
      }
      this.parts.forEach(part => {
        if (part.el) {
          part.el.innerHTML = `<span class="countdown__value">00</span><span class="countdown__label">${part.label}</span>`;
          part.valueEl = part.el.querySelector('.countdown__value');
        }
      });
      this.second = 1000;
      this.minute = 60 * this.second;
      this.hour = 60 * this.minute;
      this.day = 24 * this.hour;
      this.timer();
      this.interval = setInterval(this.timer.bind(this), this.second);
    }

    pad(num) {
      return String(num).padStart(2, '0');
    }

    timer() {
      const diff = this.endDate - new Date();
      if (diff < 0) {
        clearInterval(this.interval);
        if (this.hideOnEnd) this.style.display = 'none';
        return;
      }
    
      let days = Math.floor(diff / this.day);
      let hours = Math.floor((diff % this.day) / this.hour);
      let mins = Math.floor((diff % this.hour) / this.minute);
      let secs = Math.floor((diff % this.minute) / this.second);
    
      if (this.hideDays) {
        // Add days as hours if days are hidden
        hours += days * 24;
        days = 0;
      }
    
      const vals = [days, hours, mins, secs];
    
      this.parts.forEach((part, i) => {
        // Only update if the part is visible (not hidden)
        if (part.valueEl && (!this.hideDays || i !== 0)) {
          part.valueEl.textContent = this.pad(vals[i]);
        }
      });
    }
  }
  customElements.define('countdown-timer', CountdownTimer);
}