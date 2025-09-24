# Books Stack - Challenge 08

Light-themed React app (Vite) that implements a **Stack (LIFO)** of Books with fields:
**Name, ISBN, Author, Editorial**.

## Scripts
- `npm install`
- `npm run dev`  → open the printed local URL
- `npm run build`
- `npm run preview`

## Features
- Custom `Stack` class with `push`, `pop`, `peek`, `isEmpty`, `size`, `toArrayTopFirst`.
- Form to create a book and **push** it onto the stack.
- Button to **pop** (remove) the top book.
- **Peek** of the top book shown inline.
- Mock data auto-filled on first load.
- Clean, light UI.

## Folder
```
books-stack-ch08/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    App.jsx
    index.css
    lib/Stack.js
```

## Notes
- The stack is stored inside a React `ref` so it persists across rerenders. We force UI updates after mutations.
- The list prints from **top → bottom** to reflect the LIFO order.
