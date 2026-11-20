function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No transactions yet. Add one above!</p>
  }

  return (
    <div className="expense-list">
      {expenses.map(expense => (
        <div key={expense.id} className="expense-item">
          <span className="expense-icon">{expense.icon}</span>
          <div className="expense-info">
            <div className="expense-name">
              {expense.name}
              <span className="expense-category-badge">{expense.category}</span>
            </div>
            <div className="expense-meta">
              {new Date(expense.date + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </div>
          </div>
          <span className={`expense-amount ${expense.type}`}>
            {expense.type === 'income' ? '+' : '-'}$
            {expense.amount.toFixed(2)}
          </span>
          <button
            className="btn-delete"
            onClick={() => onDelete(expense.id)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default ExpenseList
