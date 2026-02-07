# Dinner Recommendation Site

## Overview

This application will provide random dinner recommendations to the user. It features a clean, modern, and responsive user interface with Korean localization and a dark/light mode toggle for user preference.

## Design & Features

### Core Functionality:

*   **Random Dinner Recommendation:** Upon user interaction (e.g., button click), the application will display a random dinner recommendation from a predefined list.
*   **Korean Localization:** All user-facing text is in Korean.
*   **Dark/Light Mode Toggle:** Users can switch between a dark and light theme, with their preference saved locally.

### UI/UX & Aesthetics:

*   **Modern & Responsive Design:** A visually appealing and user-friendly interface that adapts to various screen sizes.
*   **Clear Display:** Recommendations are displayed prominently.
*   **Interactive Elements:** A clear button to trigger recommendations.

### Implemented Features:

*   **Clean Up Previous Project Files:** The `functions` directory (for the Cloudflare Function) and `mcpServers` related to Firebase from `.idx/mcp.json` have been removed.
*   **Modify `index.html`:** The title has been updated to "저녁 메뉴 추천", and the custom element changed to `<dinner-recommender>`.
*   **Modify `style.css`:** Existing global styles have been adapted, lottery-specific styles removed, and styles for the new `.recommendation-display` added. Dark/light mode styles have been retained and refined.
*   **Modify `main.js`:** The custom element class has been renamed to `DinnerRecommender`. All lottery-specific logic has been replaced with dinner recommendation logic, including a predefined list of Korean dinner recommendations and methods to select and display a random one. Dark/light mode toggle and `localStorage` preference saving have been retained and adapted.
*   **Git Deployment:** All changes have been committed and pushed to the GitHub repository.

## Project Status

*   The project has been successfully transformed from a Lottery Number Generator to a Dinner Recommendation Site. All new features and modifications have been implemented and deployed to the GitHub repository: `https://github.com/chlwltnshtkddn/sangwoo_practice`.

