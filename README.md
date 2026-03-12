# JS Playground 🖥️

A lightweight, browser-based **JavaScript Console Playground** that lets you write and execute JavaScript code directly in your browser — no installation required.

![JS Playground Screenshot](https://github.com/user-attachments/assets/d97034df-de3f-477d-97db-ad9adadf4d1b)

---

## ✨ Features

- **Live Code Execution** — Write and run JavaScript instantly with a single click or keyboard shortcut.
- **Interactive Console Output** — View `console.log`, `console.warn`, `console.error`, `console.info`, and return values in a styled output pane.
- **Syntax-Colored Output** — Numbers, strings, booleans, objects, `null`, and `undefined` are each rendered in distinct colors for easy readability.
- **Async / Await Support** — Top-level `await` is handled automatically via an async IIFE wrapper.
- **Auto-Save** — Your code is automatically saved to `localStorage` and restored on your next visit.
- **Resizable Panes** — Drag the divider between the editor and console to resize them to your liking.
- **Tab Support** — Press `Tab` inside the editor to insert 4 spaces instead of switching focus.
- **Clear Console** — Wipe the output pane with the **Clear** button.
- **Keyboard Shortcut** — Run your code with `Ctrl + Enter` (or `Cmd + Enter` on macOS).

---

## 🚀 Getting Started

No build step or package installation needed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muhammad-asif10/js_playground.git
   cd js_playground
   ```

2. **Open in your browser:**
   Simply open `index.html` in any modern browser:
   ```bash
   open index.html       # macOS
   start index.html      # Windows
   xdg-open index.html   # Linux
   ```

   Or serve it with a local static server:
   ```bash
   npx serve .
   ```

---

## 🛠️ Usage

| Action | How |
|---|---|
| Run code | Click **Run ▶** or press `Ctrl + Enter` / `Cmd + Enter` (macOS) |
| Clear console | Click **Clear ⊘** |
| Resize panes | Drag the horizontal divider |
| Insert a tab | Press `Tab` inside the editor |

### Example

```js
function add(a, b) {
    return a + b;
}
add(2, 7);
// <- 9
```

---

## 📁 Project Structure

```
js_playground/
├── index.html   # Application markup and layout
├── style.css    # Dark-theme styles and console entry colors
└── script.js    # Code execution engine, console overrides, and UI logic
```

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure and layout |
| **CSS3** | Dark theme, flexbox layout, CSS variables |
| **Vanilla JavaScript** | Code execution, console interception, localStorage |

No frameworks. No dependencies. Pure web standards.

---

## 🌐 Browser Support

Works in all modern browsers that support ES6+:

- Google Chrome / Chromium
- Mozilla Firefox
- Microsoft Edge
- Safari

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
