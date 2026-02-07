class LotteryGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 40px;
                    background: #2c2c2c;
                    border-radius: 20px;
                    box-shadow: 
                        0 10px 25px var(--shadow-color), 
                        0 5px 15px rgba(0,0,0,0.2);
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

            <h1>Lottery Number Generator</h1>
            
            <div class="input-section">
                <h2>Enter Last Week's Winning Numbers</h2>
                <div class="number-inputs">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                    <input type="number" min="1" max="45">
                </div>
                <div class="controls">
                    <button id="generate-btn">Generate Numbers</button>
                </div>
            </div>

            <div class="output-section">
                <h2>Your New Numbers</h2>
                <div class="result-display">
                    <!-- Generated numbers will be injected here -->
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => this.generateLotteryNumbers());
    }

    generateLotteryNumbers() {
        const inputs = Array.from(this.shadowRoot.querySelectorAll('.number-inputs input'));
        const previousNumbers = inputs.map(input => parseInt(input.value)).filter(val => !isNaN(val) && val >= 1 && val <= 45);

        if (previousNumbers.length !== 6) {
            alert('Please enter all 6 winning numbers from the previous week.');
            return;
        }

        const forbiddenTriplets = this.getCombinations(previousNumbers, 3);

        let newNumbers;
        let isValid = false;

        while (!isValid) {
            newNumbers = this.generateRandomNumbers();
            const newTriplets = this.getCombinations(newNumbers, 3);
            
            isValid = !newTriplets.some(newTriplet => 
                forbiddenTriplets.some(forbiddenTriplet => this.isSameCombination(newTriplet, forbiddenTriplet))
            );
        }

        this.displayNumbers(newNumbers);
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

    displayNumbers(numbers) {
        const display = this.shadowRoot.querySelector('.result-display');
        display.innerHTML = numbers.map(num => `<div class="result-number">${num}</div>`).join('');
    }
}

customElements.define('lottery-generator', LotteryGenerator);
