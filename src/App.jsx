import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import './App.css'

const STORAGE_KEY = 'expense-tracker-data'

function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  function addExpense(expense) {
    setExpenses(prev => [{ ...expense, id: crypto.randomUUID() }, ...prev])
  }

  function deleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const categories = ['All', ...Array.from(new Set(expenses.map(e => e.category)))]

  const filtered = filter === 'All' ? expenses : expenses.filter(e => e.category === filter)

  return (
    <div className="app">
      <header className="app-header">
        <h1>💸 Expense Tracker</h1>
      </header>

      <main className="app-main">
        <Summary expenses={expenses} />

        <ExpenseForm onAdd={addExpense} />

        <div className="filter-row">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <ExpenseList expenses={filtered} onDelete={deleteExpense} />
      </main>
    </div>
  )
}

export default App
