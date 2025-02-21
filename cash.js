document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('incomeForm');
    const incomeTable = document.getElementById('incomeTable').getElementsByTagName('tbody')[0];
    const backToDashboardButton = document.getElementById('backToDashboard');

    
    loadIncomeData();

    incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        addIncome(description, amount);
        incomeForm.reset();
    });

    backToDashboardButton.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });

    function addIncome(description, amount) {
        const row = incomeTable.insertRow();
        row.insertCell(0).innerText = description;
        row.insertCell(1).innerText = amount;
        const deleteCell = row.insertCell(2);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => {
            incomeTable.deleteRow(row.rowIndex - 1);
            saveIncomeData();
        };
        deleteCell.appendChild(deleteButton);

        saveIncomeData();
    }

    function saveIncomeData() {
        const incomeData = [];
        for (let i = 0; i < incomeTable.rows.length; i++) {
            const row = incomeTable.rows[i];
            const description = row.cells[0].innerText;
            const amount = row.cells[1].innerText;
            incomeData.push({ description, amount });
        }
        localStorage.setItem('incomeData', JSON.stringify(incomeData));
    }

    function loadIncomeData() {
        const incomeData = JSON.parse(localStorage.getItem('incomeData')) || [];
        incomeData.forEach(item => {
            addIncome(item.description, item.amount);
        });
    }
});