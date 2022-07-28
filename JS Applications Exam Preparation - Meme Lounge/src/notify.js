const container = document.getElementById('errorBox');
const spanEl = container.querySelector('span');

export function notify(message) {
    spanEl.textContent = message;
    container.style.display = 'block'

    setTimeout(() => container.style.display = 'none', 3000)
}