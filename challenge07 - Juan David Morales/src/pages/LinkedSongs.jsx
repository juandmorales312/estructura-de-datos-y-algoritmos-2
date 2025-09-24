import { useEffect, useMemo, useRef, useState } from 'react'
import LinkedList from '../structures/LinkedList.js'

const mockedSongs = [
  { id: 1, title: 'Intro', artist: 'The Coders', duration: '0:57' },
  { id: 2, title: 'Pointers', artist: 'JS Band', duration: '2:31' },
  { id: 3, title: 'Head & Tail', artist: 'DataStructs', duration: '3:10' },
  { id: 4, title: 'Next Up', artist: 'Node Crew', duration: '2:48' },
  { id: 5, title: 'Null at the End', artist: 'The Terminators', duration: '4:02' },
]

export default function LinkedSongs() {
  const listRef = useRef(null)
  const [current, setCurrent] = useState(null)
  const [index, setIndex] = useState(0)

  const list = useMemo(() => {
    const l = new LinkedList()
    mockedSongs.forEach(s => l.append(s))
    return l
  }, [])

  useEffect(() => { listRef.current = list; setCurrent(list.head); setIndex(0) }, [list])

  const next = () => {
    if (current?.next) { setCurrent(current.next); setIndex(i => i+1) }
  }
  const restart = () => { setCurrent(listRef.current.head); setIndex(0) }
  const removeCurrent = () => {
    const i = index
    listRef.current.removeAt(i)
    const nextNode = listRef.current.peek(i) || listRef.current.tail
    setCurrent(nextNode)
    if (i >= listRef.current.length) setIndex(listRef.current.length-1)
  }

  return (
    <div className="card">
      <h2 className="title">Reproductor con Lista Enlazada</h2>
      <p className="muted">Se avanza solo hacia adelante.</p>

      {current ? (
        <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div className="pill mono">#{current.value.id}</div>
            <h3 style={{margin:'8px 0 0 0'}}>{current.value.title}</h3>
            <p className="muted">{current.value.artist} • {current.value.duration}</p>
          </div>
          <div className="row">
            <button className="btn" onClick={restart}>Reiniciar</button>
            <button className="btn" onClick={next} disabled={!current.next}>Siguiente ▶</button>
            <button className="btn" onClick={removeCurrent} disabled={listRef.current.length===0}>Eliminar actual</button>
          </div>
        </div>
      ) : <p>Lista vacía.</p>}

      <hr style={{borderColor:'#1f2937', margin:'16px 0'}}/>
      <p className="muted">Cola de reproducción</p>
      <div className="grid">
        {list.toArray().map((s, i) => (
          <div key={s.id} className="card" style={{padding:12}}>
            <div className="pill mono">#{s.id}</div>
            <strong>{s.title}</strong>
            <div className="muted">{s.artist} • {s.duration}</div>
            {i===index && <div className="pill" style={{marginTop:8}}>Reproduciendo</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
