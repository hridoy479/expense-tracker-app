import { useState } from 'react'

const CATEGORIES = [
  'Food', 'Transport', 'Housing', 'Health',
  'Entertainment', 'Shopping', 'Education', 'Other',
]

const CATEGORY_ICONS = {
  Food: '🍔', Transport: '🚗', Housing: '🏠', Health: '💊',
  Entertainment: '🎬', Shopping: '🛍️', Education: '📚', Other: '📌',
}

const DEFAULT_FORM = {
  name: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  type: 'expense',
}

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('Please enter a description.')
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0) return setError('Please enter a valid amount.')

    onAdd({
      name: form.name.trim(),
      amount,
      category: form.category,
      date: form.date,
      type: form.type,
      icon: CATEGORY_ICONS[form.category] ?? '📌',
    })
    setForm(DEFAULT_FORM)
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <div className="form-grid">
        <div className="form-group full">
          <label>Type</label>
          <div className="type-toggle">
            <button
              type="button"
              className={form.type === 'income' ? 'active-income' : ''}
              onClick={() => setForm(p => ({ ...p, type: 'income' }))}
            >
              ➕ Income
            </button>
            <button
              type="button"
              className={form.type === 'expense' ? 'active-expense' : ''}
              onClick={() => setForm(p => ({ ...p, type: 'expense' }))}
            >
              ➖ Expense
            </button>
          </div>
        </div>

        <div className="form-group full">
          <label htmlFor="name">Description</label>
          <input
            id="name"
            name="name"
            placeholder="e.g. Grocery run"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
      <button type="submit" className="btn-add">Add Transaction</button>
    </form>
  )
}

export default ExpenseForm
