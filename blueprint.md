# Dinner Recommendation Site

## Overview

This application will provide random dinner recommendations to the user. It will feature a clean, modern, and responsive user interface with Korean localization and a dark/light mode toggle for user preference.

## Design & Features

### Core Functionality:

*   **Random Dinner Recommendation:** Upon user interaction (e.g., button click), the application will display a random dinner recommendation from a predefined list.
*   **Korean Localization:** All user-facing text will be in Korean.
*   **Dark/Light Mode Toggle:** Users can switch between a dark and light theme, with their preference saved locally.

### UI/UX & Aesthetics:

*   **Modern & Responsive Design:** A visually appealing and user-friendly interface that adapts to various screen sizes.
*   **Clear Display:** Recommendations will be displayed prominently.
*   **Interactive Elements:** A clear button to trigger recommendations.

## Implementation Plan

1.  **Update `blueprint.md`:** (Already done - this step is for documentation)
2.  **Clean Up Previous Project Files:**
    *   Remove the `functions` directory as the Cloudflare Function for the lottery API is no longer needed.
    *   Remove `mcpServers` related to Firebase from `.idx/mcp.json`.
3.  **Modify `index.html`:**
    *   Update the title to "저녁 메뉴 추천".
    *   Modify the `<dinner-recommender>` custom element (or a similar name).
4.  **Modify `style.css`:**
    *   Adapt existing global styles (colors, fonts) to suit the new application.
    *   Retain and refine dark/light mode styles.
    *   Add specific styles for the dinner recommender component.
5.  **Modify `main.js`:**
    *   Rename the custom element class (e.g., `LotteryGenerator` to `DinnerRecommender`).
    *   Replace all lottery-specific logic (number generation, forbidden triplets, fetching winning numbers) with dinner recommendation logic.
    *   Create a predefined list of Korean dinner recommendations.
    *   Implement a method to select and display a random recommendation.
    *   Retain and adapt the dark/light mode toggle and `localStorage` preference saving.
    *   Remove any code related to fetching external data.
6.  **Git Deployment:** Stage, commit, and push all changes to the GitHub repository.

## Project Status

*   Initial files were for a Lottery Number Generator. Transitioning to Dinner Recommendation Site.