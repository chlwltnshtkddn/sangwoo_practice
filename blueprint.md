# Lottery Number Generator

## Overview

This application generates winning number combinations for the Korean 6/45 lottery. It provides users with a strategic way to pick numbers by allowing them to input the previous week's winning numbers. The generator then produces a new set of numbers that specifically excludes any three-number combination (triplet) present in the previous week's results.

This ensures that the generated numbers have a degree of statistical independence from the last draw, catering to lottery players who believe in avoiding recent number patterns.

## Design & Features

### Implemented Features:

*   **Modern & Bold UI:**
    *   **Layout:** A clean, centered layout that is responsive and works on all screen sizes.
    *   **Color Palette:** A vibrant and energetic color scheme with a dark background, using gradients and glowing effects to create a premium feel.
    *   **Typography:** Expressive, bold fonts to create a clear hierarchy for headlines, instructions, and results.
    *   **Iconography:** Uses icons to enhance user understanding and interaction.
    *   **Effects:** Incorporates multi-layered drop shadows for depth and glowing interactive elements. A subtle noise texture on the background adds a tactile feel.
*   **Web Component-Based Architecture:** The entire lottery application is encapsulated within a `<lottery-generator>` custom element for modularity and reusability.
*   **Input for Previous Numbers:** A user-friendly input section with six distinct fields for the user to enter the last week's winning numbers.
*   **Strategic Number Generation:**
    *   The core logic generates a new 6-number combination.
    *   It calculates all 20 possible three-number combinations (triplets) from the user-provided previous winning numbers.
    *   The generator ensures the new combination does not contain *any* of these forbidden triplets.
*   **Result Display:** A dedicated area to clearly display the newly generated, strategy-compliant lottery numbers.
*   **Accessibility:** The application is designed with accessibility in mind, ensuring all users can interact with it.

### Current Plan:

The following features will be implemented:

1.  **Korean Localization:**
    *   Modify `index.html`: Translate all visible English text (labels, buttons, titles, instructions) to Korean.
    *   Modify `main.js`: Translate any dynamic text, console logs, or internal strings that are user-facing.

2.  **Generate 5 Sets of Numbers:**
    *   Modify `main.js`:
        *   Adjust the number generation logic to run 5 times.
        *   Update the `LotteryGenerator` Web Component's rendering logic to display 5 distinct sets of lottery numbers, each in its own container.
    *   Modify `style.css`: Ensure the layout properly accommodates and displays 5 sets of numbers in a visually appealing way (e.g., using flexbox or grid).

3.  **Fetch Latest Winning Numbers:**
    *   Research API/Scraping: Use `google_web_search` to find a reliable source (API or a consistent website structure for scraping) for Korean Lotto 6/45 winning numbers, including the bonus ball.
    *   Modify `main.js`:
        *   Implement `fetch` API call to retrieve the latest winning numbers.
        *   Parse the response to extract the winning numbers and bonus number.
        *   Add a display area within the Web Component for these fetched numbers, formatted as "X,XXX회차 로또 당첨번호 : X,X,X,X,X,X (2등 행운번호: X)".
        *   Handle potential errors during the fetch operation (e.g., network issues, API changes).

4.  **Dark/Light Mode:**
    *   Modify `index.html` (or `main.js` for Shadow DOM):
        *   Add a toggle button (e.g., a switch or a simple button) to activate/deactivate dark mode.
    *   Modify `style.css`:
        *   Define CSS custom properties (variables) for colors (e.g., `--background-color`, `--text-color`, `--primary-color`).
        *   Create a `prefers-color-scheme` media query for initial system theme detection.
        *   Define a `.dark-mode` class (or similar) that overrides these CSS variables for dark mode.
    *   Modify `main.js`:
        *   Implement JavaScript logic to toggle the `.dark-mode` class on the `<body>` or the Web Component's host element.
        *   Store the user's preference in `localStorage` to persist the chosen theme across sessions.

### Project Status

*   Initial project files (`index.html`, `style.css`, `main.js`, `blueprint.md`) have been committed and pushed to the GitHub repository: `https://github.com/chlwltnshtkddn/sangwoo_practice`.