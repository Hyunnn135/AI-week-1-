document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const applyTheme = (theme) => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'light-mode';
            const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
            applyTheme(newTheme);
        });
    }

    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);

    // Lotto page specific logic
    if (document.getElementById('generate-btn')) {
        initializeLottoPage();
    }

    // Fortune page specific logic
    if (document.getElementById('fortune-btn')) {
        initializeFortunePage();
    }
});

function initializeLottoPage() {
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
                        width: 50px; height: 50px; border-radius: 50%;
                        display: flex; justify-content: center; align-items: center;
                        font-size: 20px; font-weight: bold; color: white; margin: 5px;
                        background-color: ${this.getColor(number)};
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 -3px 5px rgba(0,0,0,0.3);
                        transition: transform 0.3s ease;
                    }
                    .ball:hover { transform: scale(1.1); }
                    .bonus { background-color: oklch(60% 0.25 80); border: 2px dashed white; }
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
    if (!customElements.get('lotto-ball')) {
        customElements.define('lotto-ball', LottoBall);
    }

    const generateBtn = document.getElementById('generate-btn');
    const lottoSetsContainer = document.getElementById('lotto-sets-container');

    generateBtn.addEventListener('click', () => {
        lottoSetsContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const lottoSet = document.createElement('div');
            lottoSet.className = 'lotto-set';

            const numbers = new Set();
            while(numbers.size < 7) { numbers.add(Math.floor(Math.random() * 45) + 1); }

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
            }, 600 + i * 500);

            lottoSetsContainer.appendChild(lottoSet);
        }
    });
}

function initializeFortunePage() {
    const fortuneBtn = document.getElementById('fortune-btn');
    const birthdateInput = document.getElementById('birthdate-input');
    const resultsContainer = document.getElementById('fortune-results-container');

    const goodDeeds = [
        "새로운 인연을 만날 수 있는 좋은 날입니다.",
        "뜻밖의 재물을 얻게 될 수 있습니다.",
        "오랫동안 고민하던 일이 해결될 기미가 보입니다.",
        "주변 사람들에게 칭찬을 받게 됩니다.",
        "새로운 지식이나 기술을 배우기 좋은 날입니다.",
    ];

    const badDeeds = [
        "사소한 말실수로 오해를 살 수 있으니 주의하세요.",
        "계획에 없던 지출이 생길 수 있습니다.",
        "컨디션 난조로 집중력이 떨어질 수 있습니다.",
        "중요한 물건을 잃어버리지 않도록 주의하세요.",
        "다른 사람과의 갈등이 생길 수 있으니 평정심을 유지하세요.",
    ];

    const summaries = [
        "전반적으로 안정적이고 평온한 하루가 될 것입니다.",
        "도전적인 과제가 주어지지만, 충분히 해결할 수 있습니다.",
        "행운이 따르는 하루! 긍정적인 마음을 유지하세요.",
        "신중한 결정이 필요한 하루입니다. 서두르지 마세요.",
        "인간관계에 신경 쓰면 더 좋은 결과를 얻을 수 있습니다.",
    ];

    fortuneBtn.addEventListener('click', () => {
        if (!birthdateInput.value) {
            alert('생년월일을 입력해주세요.');
            return;
        }

        const birthDate = new Date(birthdateInput.value);
        const today = new Date();
        const seed = birthDate.getTime() + today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        const pseudoRandom = (seed) => {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        resultsContainer.innerHTML = `
            <div class="fortune-section">
                <h3>🌟 오늘의 좋은 일</h3>
                <p>${goodDeeds[Math.floor(pseudoRandom(seed * 2) * goodDeeds.length)]}</p>
            </div>
            <div class="fortune-section">
                <h3>⚠️ 오늘 주의해야 할 일</h3>
                <p>${badDeeds[Math.floor(pseudoRandom(seed * 3) * badDeeds.length)]}</p>
            </div>
            <div class="fortune-section">
                <h3>✨ 요약</h3>
                <p>${summaries[Math.floor(pseudoRandom(seed * 5) * summaries.length)]}</p>
            </div>
        `;
    });
}
