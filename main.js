class LotteryGenerator extends HTMLElement {
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
                }

                h1 {
                    font-family: var(--font-display);
                    font-size: 3rem;
                    text-align: center;
                    color: var(--primary-color);
                    margin-bottom: 30px;
                    letter-spacing: 2px;
                    text-shadow: 0 0 15px var(--glow-color);
                }

                .input-section, .output-section {
                    margin-bottom: 30px;
                }

                h2 {
                    font-family: var(--font-display);
                    font-size: 1.5rem;
                    color: var(--secondary-color);
                    border-bottom: 2px solid var(--secondary-color);
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }

                .number-inputs {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .number-inputs input {
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    font-size: 1.5rem;
                    font-family: var(--font-body);
                    background: var(--input-bg-color);
                    color: var(--text-color);
                    border: 2px solid #444;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }

                .number-inputs input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 10px var(--glow-color);
                }

                .controls {
                    text-align: center;
                }

                button {
                    font-family: var(--font-display);
                    font-size: 1.2rem;
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

                .result-display {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    padding: 20px;
                    background: var(--input-bg-color);
                    border-radius: 10px;
                }

                .result-number {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.8rem;
                    font-weight: bold;
                    border-radius: 50%;
                    background: var(--primary-color);
                    color: #111;
                    box-shadow: 0 0 15px var(--glow-color);
                }
            </style>

            <div class="theme-toggle">
                <button id="theme-toggle-btn">다크 모드 전환</button>
            </div>

            <h1>로또 번호 생성기</h1>
            
            <div class="input-section">
                <h2>지난주 로또 당첨 번호 입력</h2>
                <div class="number-inputs">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                </div>
                <div class="controls">
                    <button id="generate-btn">번호 생성</button>
                </div>
            </div>

            <div class="output-section">
                <h2>나의 로또 번호</h2>
                <div class="generated-numbers-container">
                    <!-- Generated numbers will be injected here -->
                </div>
            </div>

            <div class="latest-winning-numbers-section">
                <h2>최신 로또 당첨 번호</h2>
                <div class="latest-numbers-display">
                    <!-- Latest winning numbers will be injected here -->
                    <p>로딩 중...</p>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => this.generateLotteryNumbers());
        
        const themeToggleBtn = this.shadowRoot.getElementById('theme-toggle-btn');
        themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Apply saved theme or system preference on load
        this.applyTheme();

        this.fetchLatestWinningNumbers(); // Call to fetch latest numbers on load
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

    async fetchLatestWinningNumbers() {
        const latestNumbersDisplay = this.shadowRoot.querySelector('.latest-numbers-display');
        latestNumbersDisplay.innerHTML = '<p>로딩 중...</p>'; // Show loading message

        // Start from a reasonably high number and decrement to find the latest successful draw
        let drwNo = 1210; // Based on current date, this should be close to the latest
        let found = false;
        const maxAttempts = 10; // Prevent infinite loops

        for (let i = 0; i < maxAttempts; i++) {
            try {
                const response = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`);
                const data = await response.json();

                if (data.returnValue === 'success') {
                    const winningNumbers = [
                        data.drwtNo1, data.drwtNo2, data.drwtNo3,
                        data.drwtNo4, data.drwtNo5, data.drwtNo6
                    ].sort((a, b) => a - b);
                    const bonusNumber = data.bnusNo;
                    const roundNumber = data.drwNo;
                    const drawDate = data.drwNoDate;

                    // Auto-populate previous numbers input fields
                    const inputElements = this.shadowRoot.querySelectorAll('.number-inputs input');
                    winningNumbers.forEach((num, index) => {
                        if (inputElements[index]) {
                            inputElements[index].value = num;
                        }
                    });

                    latestNumbersDisplay.innerHTML = `
                        <p>${roundNumber}회차 로또 당첨 번호 (${drawDate}):</p>
                        <div class="result-display">
                            ${winningNumbers.map(num => `<div class="result-number">${num}</div>`).join('')}
                            <div class="bonus-number-label">+ 보너스</div>
                            <div class="result-number bonus-number">${bonusNumber}</div>
                        </div>
                    `;
                    found = true;
                    break;
                }
            } catch (error) {
                console.error('Error fetching lottery numbers:', error);
            }
            drwNo--; // Decrement round number and try again
        }

        if (!found) {
            latestNumbersDisplay.innerHTML = '<p>최신 당첨 번호를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
        }
    }

    generateLotteryNumbers() {
        const inputs = Array.from(this.shadowRoot.querySelectorAll('.number-inputs input'));
        const previousNumbers = inputs.map(input => parseInt(input.value)).filter(val => !isNaN(val) && val >= 1 && val <= 45);

        if (previousNumbers.length !== 6) {
            alert('지난주 당첨 번호 6개를 모두 입력해 주세요.');
            return;
        }

        const forbiddenTriplets = this.getCombinations(previousNumbers, 3);
        const generatedSets = [];

        for (let i = 0; i < 5; i++) { // Generate 5 sets
            let newNumbers;
            let isValid = false;

            while (!isValid) {
                newNumbers = this.generateRandomNumbers();
                const newTriplets = this.getCombinations(newNumbers, 3);
                
                isValid = !newTriplets.some(newTriplet => 
                    forbiddenTriplets.some(forbiddenTriplet => this.isSameCombination(newTriplet, forbiddenTriplet))
                );
            }
            generatedSets.push(newNumbers);
        }

        this.displayMultipleNumbers(generatedSets);
    }

    generateRandomNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    getCombinations(arr, size) {
        const result = [];
        function combinationUtil(start, chosen) {
            if (chosen.length === size) {
                result.push([...chosen]);
                return;
            }
            for (let i = start; i < arr.length; i++) {
                chosen.push(arr[i]);
                combinationUtil(i + 1, chosen);
                chosen.pop();
            }
        }
        combinationUtil(0, []);
        return result;
    }

    isSameCombination(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = [...arr1].sort((a, b) => a - b);
        const sorted2 = [...arr2].sort((a, b) => a - b);
        return sorted1.every((val, index) => val === sorted2[index]);
    }

    displayMultipleNumbers(numberSets) {
        const container = this.shadowRoot.querySelector('.generated-numbers-container');
        container.innerHTML = ''; // Clear previous results

        numberSets.forEach((numbers, index) => {
            const setDisplay = document.createElement('div');
            setDisplay.classList.add('result-set');
            setDisplay.innerHTML = `
                <span class="set-label">세트 ${index + 1}:</span>
                <div class="result-display">
                    ${numbers.map(num => `<div class="result-number">${num}</div>`).join('')}
                </div>
            `;
            container.appendChild(setDisplay);
        });
    }
}

customElements.define('lottery-generator', LotteryGenerator);


