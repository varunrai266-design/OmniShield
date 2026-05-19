# EduApply - College Application Portal

A visually stunning, fully functional frontend web application for a fictional university ("Crestwood University"). This project allows prospective students to explore the college, learn about programs, and submit a fully validated multi-step application form.

## 🚀 Technologies Used

This project is built to be a simple, highly-performant, single-page application using pure standard web technologies without the need for heavy frameworks.

*   **HTML5:** Semantic structure emphasizing accessibility and multi-step form layout.
*   **Vanilla CSS3:** 
    *   No external CSS frameworks (like Tailwind or Bootstrap) were used.
    *   Makes extensive use of CSS variables for theming (`--primary-navy`, `--accent-gold`, etc.).
    *   Flexbox and Grid layouts employed for fully responsive design on all screen sizes.
    *   CSS Keyframes used for smooth scroll effects, hover-states, and fade-in animations on scroll.
*   **Vanilla JavaScript (ES6+):**
    *   **Form Logic & Validation:** End-to-end multi-step form navigation with strict field validation before moving between steps.
    *   **Local Storage:** Temporarily saves form text input draft states utilizing `localStorage`.
    *   **DOM Manipulation & Observers:** `IntersectionObserver` used for animated statistics counter and fade-in triggers. Filtering system created for the Programs gallery and a dynamic accordion created for the FAQs.

## 🎨 Resources & Assets Used

*   **Typography:** Google Fonts ([Playfair Display](https://fonts.google.com/specimen/Playfair+Display) for headings, [DM Sans](https://fonts.google.com/specimen/DM+Sans) for body text).
*   **Icons:** [Lucide Icons](https://lucide.dev/) (via CDN) for lightweight, clean SVG iconography.
*   **Images:** Unsplash for placeholder campus photography.

## 📁 File Structure

The project maintains a clean separation of concerns:

*   `index.html` - The main structure containing the navigation, hero, about, programs grid, admissions timeline, campus life, form, and footer.
*   `style.css` - All styling, responsive media queries, UI/UX interaction visual states, and animation.
*   `script.js` - Client-side state logic, smooth scrolling behaviors, number animations, filtering, form progression logic, and success confetti modal.

## ⚙️ How to Run

Because this project uses vanilla web technologies and handles logic client-side, no local server or backend configuration is required:

1.  Simply grab the project directory.
2.  Open `index.html` in any modern web browser (Edge, Chrome, Firefox, Safari).
3.  Scroll through the site and try out the multi-step form in the "Apply" section.
