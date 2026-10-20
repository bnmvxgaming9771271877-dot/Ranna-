import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Trophy, Home, Swords, Wallet, UserRound, Bell, Search, ChevronRight, Clock3, Users, Flame, Plus, Menu, X, ShieldCheck, Medal, Settings, LogOut } from 'lucide-react'
import './style.css'

const seed = [
  { id: 1, game: 'FREE FIRE MAX', title: 'Squad Showdown', mode: 'Squad • Bermuda', date: 'Today, 8:30 PM', prize: '₹2,000', entry: '₹20', slots: '36/48', status: 'Filling fast', color: 'orange' },
  { id: 2, game: 'BGMI', title: 'Night Ops Championship', mode: 'Squad • Erangel', date: 'Today, 9:00 PM', prize: '₹5,000', entry: '₹50', slots: '21/100', status: 'Open', color: 'blue' },
  { id: 3, game: 'FREE FIRE MAX', title: 'Solo Rush Cup', mode: 'Solo • Bermuda', date: 'Tomorrow, 6:00 PM', prize: '₹750', entry: 'Free', slots: '72/100', status: 'Free entry', color: 'purple' }
]

function App() {
  const [tab, setTab] = useState('Home')
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [joined, setJoined] = useState([])
  const [notice, setNotice] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  const [tournaments, setTournaments] = useState(seed)
  const [newTitle, setNewTitle] = useState('')
  const [newGame, setNewGame] = useState('FREE FIRE MAX')
  const [newPrize, setNewPrize] = useState('₹1,000')
  const filtered = useMemo(() => tournaments.filter(t =>
    (filter === 'All' || t.game === filter) &&
    `${t.title} ${t.game} ${t.mode}`.toLowerCase().includes(query.toLowerCase())
  ), [filter, query, tournaments])

  function join(t) {
    if (joined.includes(t.id)) { setNotice('You have already joined this tournament.'); return }
    setJoined([...joined, t.id])
    setNotice(`Join request saved for ${t.title}. Connect a backend to register players online.`)
  }
  function createTournament(e) {
    e.preventDefault()
    if (!newTitle.trim()) return
    setTournaments([{ id: Date.now(), game: newGame, title: newTitle.trim(), mode: 'Squad • Custom map', date: 'Schedule to be announced', prize: newPrize, entry: 'Free', slots: '0/48', status: 'New', color: newGame === 'BGMI' ? 'blue' : 'orange' }, ...tournaments])
    setNewTitle('')
    setNotice('Demo tournament created. Online publishing needs backend setup.')
  }
  const nav = [
    { label: 'Home', icon: Home }, { label: 'Tournaments', icon: Swords },
    { label: 'My Matches', icon: Trophy }, { label: 'Wallet', icon: Wallet }, { label: 'Profile', icon: UserRound }
  ]
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Trophy size={23}/></div><div><b>TTP<span> ARENA</span></b><small>TOURNAMENT HUB</small></div></div>
      <div className="side-label">MENU</div>
      {nav.map(n => <button key={n.label} className={`nav-item ${tab===n.label?'active':''}`} onClick={()=>setTab(n.label)}><n.icon size={18}/>{n.label}{n.label==='My Matches' && joined.length>0 && <i>{joined.length}</i>}</button>)}
      <div className="sidebar-bottom"><div className="online-dot"/> <span>ARENA STATUS</span><b>READY TO PLAY</b><button className="admin-link" onClick={()=>setShowAdmin(!showAdmin)}><Settings size={15}/> Admin tools</button></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="mobile-brand" onClick={()=>setTab('Home')}><Trophy size={20}/> TTP ARENA</button><div className="crumb">ARENA <ChevronRight size={13}/> <b>{tab.toUpperCase()}</b></div><div className="top-actions"><button className="icon-btn" onClick={()=>setNotice('You are all caught up!')} aria-label="Notifications"><Bell size={18}/></button><div className="avatar">P</div><div className="user-meta"><b>Player One</b><small>Rookie player</small></div></div></header>
      <div className="content">
        {tab==='Home' && <>
          <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> THE NEXT LEVEL STARTS HERE</div><h1>PLAY TO WIN.<br/><em>RISE TO GLORY.</em></h1><p>Join the arena. Challenge the best players. Make your mark on the leaderboard.</p><button className="primary-btn" onClick={()=>setTab('Tournaments')}>Explore tournaments <ChevronRight size={17}/></button><div className="hero-stats"><div><b>{tournaments.length.toString().padStart(2,'0')}</b><small>TOURNAMENTS</small></div><div><b>24/7</b><small>ARENA ACCESS</small></div><div><b>LIVE</b><small>COMMUNITY</small></div></div></div><div className="hero-art"><div className="ring ring-one"/><div className="ring ring-two"/><div className="hero-trophy"><Trophy size={94} strokeWidth={1.2}/></div><div className="floating-tag tag-top"><Flame size={15}/> COMPETE</div><div className="floating-tag tag-bottom"><Medal size={16}/> CLAIM YOUR CROWN</div></div></section>
          <div className="section-head"><div><div className="eyebrow">DON'T MISS OUT</div><h2>Featured tournaments</h2></div><button className="text-btn" onClick={()=>setTab('Tournaments')}>View all <ChevronRight size={16}/></button></div>
          <TournamentList items={tournaments.slice(0,2)} joined={joined} onJoin={join}/>
          <section className="promo"><div className="promo-icon"><ShieldCheck size={25}/></div><div><b>Play fair. Play smart.</b><p>Always check tournament rules before joining. Never share your account password or OTP.</p></div><ChevronRight size={20}/></section>
        </>}
        {tab==='Tournaments' && <><div className="page-heading"><div className="eyebrow">FIND YOUR NEXT MATCH</div><h1>All tournaments<span>.</span></h1><p>Choose your game, lock in your spot, and compete.</p></div><div className="search-row"><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tournaments..."/></div><div className="filters">{['All','FREE FIRE MAX','BGMI'].map(f=><button className={filter===f?'selected':''} key={f} onClick={()=>setFilter(f)}>{f}</button>)}</div></div><TournamentList items={filtered} joined={joined} onJoin={join}/>{filtered.length===0&&<div className="empty">No tournaments found. Try another search.</div>}</>}
        {tab==='My Matches' && <><div className="page-heading"><div className="eyebrow">YOUR COMPETITION</div><h1>My matches<span>.</span></h1><p>Tournaments you've joined will appear here.</p></div><TournamentList items={tournaments.filter(t=>joined.includes(t.id))} joined={joined} onJoin={join}/>{joined.length===0&&<div className="empty"><Trophy size={32}/><b>No matches yet</b><p>Join a tournament to see it here.</p><button className="primary-btn" onClick={()=>setTab('Tournaments')}>Browse tournaments <ChevronRight size={16}/></button></div>}</>}
        {tab==='Wallet' && <><div className="page-heading"><div className="eyebrow">YOUR REWARDS</div><h1>Wallet<span>.</span></h1><p>Wallet UI preview — connect a trusted payment provider before accepting payments.</p></div><div className="wallet-card"><small>DEMO WALLET BALANCE</small><h2>₹0.00</h2><p>Real deposits and withdrawals are not enabled in this starter project.</p><div className="wallet-actions"><button onClick={()=>setNotice('Payment integration is not configured yet.')}>Add money</button><button onClick={()=>setNotice('Withdrawal feature is not configured yet.')}>Withdraw</button></div></div><div className="promo"><ShieldCheck size={22}/><div><b>Payment safety first</b><p>Do not collect real money until payment verification, refund rules, and applicable legal requirements are implemented.</p></div></div></>}
        {tab==='Profile' && <><div className="page-heading"><div className="eyebrow">PLAYER ID</div><h1>Your profile<span>.</span></h1></div><div className="profile-card"><div className="big-avatar">P</div><h2>Player One</h2><p>Rookie player · TTP Arena</p><div className="profile-stats"><div><b>{joined.length}</b><small>JOINED</small></div><div><b>0</b><small>WINS</small></div><div><b>—</b><small>RANK</small></div></div><button className="secondary-btn" onClick={()=>setNotice('Authentication/profile editing needs backend setup.')}>Edit profile</button></div></>}
        {showAdmin && <section className="admin-panel"><div className="section-head"><div><div className="eyebrow">LOCAL DEMO TOOLS</div><h2>Admin workspace</h2></div><button className="icon-btn" onClick={()=>setShowAdmin(false)}><X size={18}/></button></div><p className="admin-warning">Demo only: this panel is not secured. Do not publish it as a real admin panel until server-side authentication and role checks are implemented.</p><form onSubmit={createTournament} className="admin-form"><label>Tournament name<input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. Sunday Championship" required/></label><label>Game<select value={newGame} onChange={e=>setNewGame(e.target.value)}><option>FREE FIRE MAX</option><option>BGMI</option></select></label><label>Prize pool<input value={newPrize} onChange={e=>setNewPrize(e.target.value)} placeholder="₹1,000"/></label><button className="primary-btn" type="submit"><Plus size={17}/> Create demo tournament</button></form></section>}
      </div>
      <footer>© 2026 TTP ARENA <span>BUILT FOR COMPETITORS</span></footer>
    </main>
    <nav className="mobile-nav">{nav.map(n=><button key={n.label} className={tab===n.label?'active':''} onClick={()=>setTab(n.label)}><n.icon size={19}/><small>{n.label}</small></button>)}</nav>
    {notice && <div className="toast" role="status">{notice}<button onClick={()=>setNotice('')}><X size={15}/></button></div>}
  </div>
}
function TournamentList({items, joined, onJoin}) {
  if (!items.length) return null
  return <div className="tournament-list">{items.map(t=><article className="tournament-card" key={t.id}><div className={`game-art ${t.color}`}><div className="art-lines"/><Swords size={34}/><small>{t.game}</small></div><div className="tour-info"><div className="tour-top"><span className={`status ${t.color}`}>{t.status}</span><span className="game-name">{t.game}</span></div><h3>{t.title}</h3><p>{t.mode}</p><div className="tour-meta"><span><Clock3 size={14}/>{t.date}</span><span><Users size={14}/>{t.slots} slots</span></div></div><div className="tour-prize"><small>PRIZE POOL</small><b>{t.prize}</b><small>ENTRY: {t.entry}</small><button className={joined.includes(t.id)?'joined-btn':'join-btn'} onClick={()=>onJoin(t)}>{joined.includes(t.id)?'Joined ✓':'Join now'}{!joined.includes(t.id)&&<ChevronRight size={15}/>}</button></div></article>)}</div>
}
createRoot(document.getElementById('root')).render(<App />)
