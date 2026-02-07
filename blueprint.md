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

1.  **Create `index.html`:** Set up the main HTML structure, including the `<lottery-generator>` custom element.
2.  **Create `style.css`:** Implement the modern and bold visual design with responsive styles, custom fonts, and color variables.
3.  **Create `main.js`:**
    *   Define the `LotteryGenerator` class as a custom `HTMLElement`.
    *   Implement the Shadow DOM to encapsulate the component's style and structure.
    *   Add event listeners for the "Generate" button.
    *   Write the core lottery number generation logic, including the function to get all triplets from a set of numbers and the validation logic to exclude forbidden triplets.
    *   Dynamically render the generated numbers to the UI.

## Project Status

*   Initial project files (`index.html`, `style.css`, `main.js`, `blueprint.md`) have been committed and pushed to the GitHub repository: `https://github.com/chlwltnshtkddn/sangwoo_practice`.