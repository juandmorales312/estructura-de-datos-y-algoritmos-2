import React, { useMemo, useRef, useState } from 'react'
import Stack from './lib/Stack.js'

const MOCK = [
  { name: 'Clean Code', isbn: '9780132350884', author: 'Robert C. Martin', editorial: 'Prentice Hall' },
  { name: 'You Don\'t Know JS Yet', isbn: '9781098124045', author: 'Kyle Simpson', editorial: 'O\'Reilly' },
  { name: 'Eloquent JavaScript', isbn: '9781593279509', author: 'Marijn Haverbeke', editorial: 'No Starch Press' },
]

export default function App(){
  const stackRef = useRef(new Stack())
  const [, setVersion] = useState(0)

  useMemo(() => {
    const s = stackRef.current
    if (s.size() === 0){
      MOCK.forEach(b => s.push(b))
    }
  }, [])

  const formRef = useRef(null)

  function force(){
    setVersion(v => v + 1)
  }

  function handleAdd(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const book = {
      name: (form.get('name') || '').trim(),
      isbn: (form.get('isbn') || '').trim(),
      author: (form.get('author') || '').trim(),
      editorial: (form.get('editorial') || '').trim(),
    }
    if (!book.name || !book.isbn || !book.author || !book.editorial){
      alert('Por favor complete todos los campos.')
      return
    }
    if (book.isbn.replace(/[-\s]/g, '').length < 10){
      alert('El ISBN es demasiado corto. Use ISBN-10 o ISBN-13.')
      return
    }
    stackRef.current.push(book)
    e.currentTarget.reset()
    force()
  }

  function handlePop(){
    if (stackRef.current.isEmpty()) return
    stackRef.current.pop()
    force()
  }

  const top = stackRef.current.peek()
  const list = stackRef.current.toArrayTopFirst()

  return (
    <div className="container">
      <div className="card">
        <h1>Pila de Libros (LIFO)</h1>

        <form className="form" onSubmit={handleAdd} ref={formRef}>
          <div className="input">
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" placeholder="Ej: El programador pragmático" />
          </div>
          <div className="input">
            <label htmlFor="isbn">ISBN</label>
            <input id="isbn" name="isbn" placeholder="ISBN-10 o ISBN-13" />
          </div>
          <div className="input">
            <label htmlFor="author">Autor</label>
            <input id="author" name="author" placeholder="Nombre completo del autor" />
          </div>
          <div className="input">
            <label htmlFor="editorial">Editorial</label>
            <input id="editorial" name="editorial" placeholder="Editorial o casa publicadora" />
          </div>
          <div className="actions full">
            <button className="btn-primary" type="submit">Agregar libro (push)</button>
            <button className="btn-warn" type="button" onClick={handlePop}>Eliminar arriba (pop)</button>
          </div>
        </form>

        <div className="stack">
          <div className="stack-header">
            <strong>Tope de la pila →</strong>
            {top ? <span className="tag"></span> : <span className="tag">La pila está vacía</span>}
          </div>
          <hr />
          <div className="list" aria-live="polite">
            {list.length === 0 && <p className="tag">No hay libros aún. ¡Agrega algunos!</p>}
            {list.map((b, i) => (
              <div key={b.isbn + i} className="item">
                <div>
                  <div className="tag">Nombre</div>
                  <div>{b.name}</div>
                </div>
                <div>
                  <div className="tag">ISBN</div>
                  <div>{b.isbn}</div>
                </div>
                <div>
                  <div className="tag">Autor</div>
                  <div>{b.author}</div>
                </div>
                <div>
                  <div className="tag">Editorial</div>
                  <div>{b.editorial}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
