class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const isBonus = this.hasAttribute('bonus');
        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
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
                .bonus {
                    background-color: oklch(60% 0.25 80);
                    border: 2px dashed white;
                }
            </style>
            <div class="ball ${isBonus ? 'bonus' : ''}">${number}</div>
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
const lottoSetsContainer = document.getElementById('lotto-sets-container');

generateBtn.addEventListener('click', () => {
    lottoSetsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const lottoSet = document.createElement('div');
        lottoSet.className = 'lotto-set';

        const numbers = new Set();
        while(numbers.size < 7) { // 6 regular + 1 bonus
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        const bonusNumber = sortedNumbers.pop();

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const ball = document.createElement('lotto-ball');
                ball.setAttribute('number', number);
                lottoSet.appendChild(ball);
            }, index * 100 + i * 500);
        });

        setTimeout(() => {
            const bonusBall = document.createElement('lotto-ball');
            bonusBall.setAttribute('number', bonusNumber);
            bonusBall.setAttribute('bonus', '');
            lottoSet.appendChild(bonusBall);
        }, 6 * 100 + i * 500);

        lottoSetsContainer.appendChild(lottoSet);
    }
});
