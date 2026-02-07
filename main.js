class DinnerRecommender extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 40px;
                    background: var(--background-color);
                    border-radius: 20px;
                    box-shadow: 
                        0 10px 25px var(--shadow-color), 
                        0 5px 15px var(--shadow-color);
                    color: var(--text-color);
                    text-align: center;
                    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
                }

                h1 {
                    font-family: var(--font-display);
                    font-size: 3rem;
                    text-align: center;
                    color: var(--primary-color);
                    margin-bottom: 30px;
                    letter-spacing: 2px;
                    text-shadow: 0 0 15px var(--glow-color);
                    transition: color 0.3s ease, text-shadow 0.3s ease;
                }

                .recommendation-display {
                    margin-top: 40px;
                    padding: 30px;
                    background: var(--input-bg-color);
                    border-radius: 15px;
                    box-shadow: 0 5px 15px var(--shadow-color);
                    min-height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--text-color);
                    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
                }

                .controls {
                    margin-top: 40px;
                }

                button {
                    font-family: var(--font-display);
                    font-size: 1.5rem;
                    padding: 15px 40px;
                    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                    color: #111;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px var(--shadow-color);
                }

                button:hover, button:focus {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px var(--glow-color);
                    outline: none;
                }
            </style>

            <div class="theme-toggle">
                <button id="theme-toggle-btn">다크 모드 전환</button>
            </div>

            <h1>저녁 메뉴 추천</h1>
            
            <div class="recommendation-display">
                오늘 저녁은 무엇을 드실까요?
            </div>

            <div class="controls">
                <button id="get-recommendation-btn">메뉴 추천받기</button>
            </div>
        `;

        const themeToggleBtn = this.shadowRoot.getElementById('theme-toggle-btn');
        themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        this.applyTheme(); // Apply saved theme or system preference on load

        this.shadowRoot.getElementById('get-recommendation-btn').addEventListener('click', () => this.getDinnerRecommendation());

        this.dinnerOptions = [
            "치킨", "피자", "족발", "보쌈", "회", "초밥",
            "삼겹살", "갈비", "떡볶이", "순대", "김치찌개", "된장찌개",
            "부대찌개", "파스타", "스테이크", "햄버거", "국밥", "짜장면",
            "짬뽕", "탕수육", "카레", "돈까스", "비빔밥", "불고기"
        ];
    }

    applyTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            this.shadowRoot.getElementById('theme-toggle-btn').textContent = '라이트 모드 전환';
        } else {
            document.body.classList.remove('dark-mode');
            this.shadowRoot.getElementById('theme-toggle-btn').textContent = '다크 모드 전환';
        }
    }

    toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            this.shadowRoot.getElementById('theme-toggle-btn').textContent = '다크 모드 전환';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            this.shadowRoot.getElementById('theme-toggle-btn').textContent = '라이트 모드 전환';
        }
    }

    getDinnerRecommendation() {
        const randomIndex = Math.floor(Math.random() * this.dinnerOptions.length);
        const recommendation = this.dinnerOptions[randomIndex];
        this.displayRecommendation(recommendation);
    }

    displayRecommendation(recommendation) {
        const display = this.shadowRoot.querySelector('.recommendation-display');
        display.textContent = recommendation;
    }
}

customElements.define('dinner-recommender', DinnerRecommender);