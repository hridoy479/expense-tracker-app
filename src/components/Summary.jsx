function Summary({ expenses }) {
  const income = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)

  const spent = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  const balance = income - spent

  const fmt = n =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="summary">
      <div className="summary-card income">
        <div className="label">Income</div>
        <div className="value">{fmt(income)}</div>
      </div>
      <div className="summary-card expense">
        <div className="label">Expenses</div>
        <div className="value">{fmt(spent)}</div>
      </div>
      <div className="summary-card balance">
        <div className="label">Balance</div>
        <div className="value">{fmt(balance)}</div>
      </div>
    </div>
  )
}

export default Summary
