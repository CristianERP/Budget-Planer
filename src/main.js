const formDOM = document.querySelector('.formExpense')
const addBtnDOM = document.querySelector('.btnAdd')
const inputNameDOM = document.querySelector('.inputName')
const inputPriceDOM = document.querySelector('.inputPrice')
const valueBudgetDOM = document.querySelector('.valueBudget')
const valueRemainingDOM = document.querySelector('.valueRemaining')
const valueSpendDOM = document.querySelector('.valueSpend')
const listExpensesDOM = document.querySelector('.listExpenses')
const expenseItemDeleteDOM = document.querySelector('.expenseItemDelete')
const minicardRemainingDOM = document.querySelector('.minicardRemaining')
const btnEditDOM = document.querySelector('.btnEdit')
const inputSearchDOM = document.querySelector('.inputSearch')

let valueBudget = Number(valueBudgetDOM.innerHTML)
let listExpense = []

formDOM.addEventListener('submit', (e) => {
    e.preventDefault()
    let expenseName = inputNameDOM.value
    let expensePrice = Number(inputPriceDOM.value)
    if(!expenseName || !expensePrice) return
    const newExpense = {
        id: Date.now(),
        expenseName,
        expensePrice
    }
    listExpense = [...listExpense, newExpense]
    inputNameDOM.value = ''
    inputPriceDOM.value = ''
    updateValues(valueBudget, listExpense)
    renderNewExpense(newExpense)
})

listExpensesDOM.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return
    listExpensesDOM.removeChild(e.target.parentElement.parentElement)
    listExpense = listExpense.filter(exp => exp.id !== Number(e.target.id))
    updateValues(valueBudget, listExpense)
})

btnEditDOM.addEventListener('click', () => {
    if (btnEditDOM.textContent === 'Edit') {
        btnEditDOM.textContent = 'Save'
        const newInput = document.createElement('input')
        newInput.classList.add('newValue')
        newInput.value = valueBudget
        valueBudgetDOM.appendChild(newInput)
    } else {
        valueBudget = Number(document.querySelector('.newValue').value)
        valueBudgetDOM.removeChild(valueBudgetDOM.lastChild)
        valueBudgetDOM.textContent = valueBudget
        btnEditDOM.textContent = 'Edit'
        updateValues(valueBudget, listExpense)
    }
   

})

inputSearchDOM.addEventListener('keyup', (e) => {
    let renderExpense = ''
    let filterExpense = listExpense
        .filter(item => item.expenseName.toUpperCase().startsWith(e.target.value.toUpperCase()))
    
    filterExpense.forEach(exp => {
        renderExpense +=  `<li class="expenseItem"> ${exp.expenseName}
        <div>
            <span class="expenseItemPrice">${exp.expensePrice}</span>
            <button class="expenseItemDelete" id="${exp.id}">x</button>
        </div>
    </li>`
    })
    listExpensesDOM.innerHTML = renderExpense
})

function updateValues(budgetInit, expenses) {
    let valueSpend = expenses.reduce((acu, cur) => {
        return acu + cur.expensePrice
    }, 0)
    if ((budgetInit - valueSpend) < 0) {
        minicardRemainingDOM.classList.add('danger')
        minicardRemainingDOM.classList.remove('success')
    } else {
        minicardRemainingDOM.classList.remove('danger')
        minicardRemainingDOM.classList.add('success')
    }

    valueRemainingDOM.textContent = budgetInit - valueSpend
    valueSpendDOM.textContent = valueSpend
}

function renderNewExpense(expense) {
    const LI = document.createElement('li')
    const DIV = document.createElement('div')
    const SPAN = document.createElement('span')
    const BUTTON = document.createElement('button')
    LI.classList.add('expenseItem')
    SPAN.classList.add('expenseItemPrice')
    BUTTON.classList.add('expenseItemDelete')
    SPAN.textContent = expense.expensePrice
    BUTTON.textContent = 'x'
    DIV.appendChild(SPAN)
    DIV.appendChild(BUTTON)
    LI.textContent = expense.expenseName
    LI.appendChild(DIV)
    BUTTON.setAttribute('id', expense.id)
    listExpensesDOM.appendChild(LI)
}
