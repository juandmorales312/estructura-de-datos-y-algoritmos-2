import { useEffect, useMemo, useRef, useState } from 'react'
import DoublyLinkedList from '../structures/DoublyLinkedList.js'

const mockedPages = [
  { url: 'https://example.com', title: 'Inicio' },
  { url: 'https://news.ycombinator.com', title: 'Hacker News' },
  { url: 'https://developer.mozilla.org', title: 'MDN' },
  { url: 'https://react.dev', title: 'React' },
  { url: 'https://vitejs.dev', title: 'Vite' },
]

export default function DoublyHistory() {
  const listRef = useRef(null)
  const [current, setCurrent] = useState(null)

  const list = useMemo(() => {
    const l = new DoublyLinkedList()
    mockedPages.forEach(p => l.append(p))
    return l
  }, [])

  useEffect(() => { listRef.current = list; setCurrent(list.head) }, [list])

  const back = () => { if (current?.prev) setCurrent(current.prev) }
  const forward = () => { if (current?.next) setCurrent(current.next) }

  return (
    <div className="card">
      <h2 className="title">Historial con Lista Doblemente Enlazada</h2>
      <p className="muted">Se puede ir atrás y adelante.</p>

      {current ? (
        <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div className="pill mono">{current.value.title}</div>
            <h3 style={{margin:'8px 0 0 0'}}>{current.value.url}</h3>
          </div>
          <div className="row">
            <button className="btn" onClick={back} disabled={!current.prev}>◀ Atrás</button>
            <button className="btn" onClick={forward} disabled={!current.next}>Adelante ▶</button>
          </div>
        </div>
      ) : <p>Sin páginas.</p>}

      <hr style={{borderColor:'#1f2937', margin:'16px 0'}}/>
      <p className="muted">Recorrido</p>
      <ul className="list mono">
        {list.toArray().map((p, i) => (
          <li key={p.url}>
            {p.title} — {p.url} {current?.value?.url === p.url ? ' ← actual' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
