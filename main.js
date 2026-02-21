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
        "오늘은 당신의 매력이 한껏 발산되는 날입니다. 예상치 못한 곳에서 새로운 인연이 나타날 수 있으니, 긍정적인 마음으로 사람들을 만나보세요. 스쳐 지나가는 인연도 소중히 여기는 자세가 필요합니다.",
        "금전운이 상승하는 시기입니다. 오랫동안 기다려왔던 보너스나 뜻밖의 수입이 생길 수 있습니다. 현명한 소비 계획을 세워 미래를 위한 투자를 시작하기 좋은 날입니다.",
        "오랫동안 당신을 괴롭혔던 문제가 해결의 실마리를 찾게 됩니다. 혼자 끙끙 앓기보다는 주변에 도움을 요청하는 용기가 필요합니다. 동료나 친구의 조언이 결정적인 역할을 할 것입니다.",
        "당신의 노력이 드디어 빛을 발하는 날입니다. 그동안 묵묵히 걸어온 길이 결코 헛되지 않았음을 증명하게 될 것입니다. 주변 사람들의 칭찬과 인정을 받으며 자신감이 한층 더 높아질 것입니다.",
        "새로운 지식이나 기술을 배우기에 더없이 좋은 날입니다. 호기심을 가지고 새로운 분야에 도전해보세요. 오늘 배운 작은 지식이 훗날 당신의 큰 자산이 될 것입니다.",
    ];

    const badDeeds = [
        "사소한 말 한마디가 오해를 불러일으킬 수 있습니다. 특히 가까운 사이일수록 예의를 지키는 것이 중요합니다. 감정적인 대응보다는 차분하게 자신의 생각을 전달하는 연습이 필요합니다.",
        "예상치 못한 지출이 발생하여 재정 계획에 차질이 생길 수 있습니다. 충동적인 구매를 자제하고, 꼭 필요한 지출인지 다시 한번 생각해보세요. 불필요한 소비를 줄이는 지혜가 필요합니다.",
        "몸과 마음이 지쳐 집중력이 떨어지기 쉬운 날입니다. 무리하게 자신을 몰아붙이기보다는 잠시 휴식을 취하며 재충전의 시간을 갖는 것이 좋습니다. 따뜻한 차 한 잔의 여유를 즐겨보세요.",
        "소중한 물건을 잃어버릴 수 있으니 주의가 필요합니다. 외출 시 소지품을 다시 한번 확인하는 습관을 들이세요. 작은 부주의가 큰 후회로 이어질 수 있음을 명심해야 합니다.",
        "주변 사람들과의 의견 차이로 인해 갈등이 발생할 수 있습니다. 자신의 주장만 내세우기보다는 상대방의 입장을 먼저 이해하려는 노력이 필요합니다. 열린 마음으로 대화에 임하는 자세가 중요합니다.",
    ];

    const summaries = [
        "전반적으로 안정적이고 평화로운 하루가 예상됩니다. 특별한 사건 없이 잔잔하게 흘러가는 시간 속에서 소소한 행복을 찾아보세요. 익숙함 속에서 새로운 감사를 발견하게 될 것입니다.",
        "도전적인 과제가 주어지지만, 당신의 능력이라면 충분히 해결할 수 있습니다. 어려운 문제에 부딪혔을 때, 포기하지 않는 끈기가 빛을 발할 것입니다. 성공의 경험은 당신을 더욱 성장시킬 것입니다.",
        "하늘이 당신의 편이 되어주는 행운 가득한 날입니다. 망설이고 있던 일이 있다면 오늘 과감하게 도전해보세요. 긍정적인 마음과 자신감이 더 큰 행운을 불러올 것입니다.",
        "신중한 판단이 요구되는 중요한 하루입니다. 눈앞의 이익보다는 장기적인 관점에서 결정하는 지혜가 필요합니다. 서두르지 않고 차분하게 상황을 분석하면 최상의 결과를 얻을 수 있습니다.",
        "주변 사람들과의 관계가 당신에게 큰 힘이 되어주는 날입니다. 동료, 친구, 가족들과의 유대감을 돈독히 하세요. 함께하는 즐거움 속에서 긍정적인 에너지를 얻게 될 것입니다.",
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
