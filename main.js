class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    margin: 5px;
                    background-color: ${this.getColor(number)};
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 -3px 5px rgba(0,0,0,0.3);
                    transition: transform 0.3s ease;
                }
                .ball:hover {
                    transform: scale(1.1);
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return 'oklch(65% 0.25 50)'; // Yellow
        if (num <= 20) return 'oklch(60% 0.25 250)';// Blue
        if (num <= 30) return 'oklch(60% 0.25 15)'; // Red
        if (num <= 40) return 'oklch(60% 0.05 280)';// Grey
        return 'oklch(65% 0.25 150)'; // Green
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('lotto-ball');
            ball.setAttribute('number', number);
            lottoNumbersContainer.appendChild(ball);
        }, index * 300);
    });
});
