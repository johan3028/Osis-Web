document.addEventListener('DOMContentLoaded', () => {
    const memberForm = document.getElementById('memberForm');
    const memberTable = document.getElementById('memberTable').getElementsByTagName('tbody')[0];
    const backToDashboardButton = document.getElementById('backToDashboard');

  
    loadMembers();

    memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const className = document.getElementById('class').value;
        const position = document.getElementById('position').value;

        addMember(name, className, position);
        memberForm.reset();
    });

    function addMember(name, className, position) {
        const row = memberTable.insertRow();
        const memberNumber = memberTable.rows.length; 
        row.insertCell(0).innerText = memberNumber;
        row.insertCell(1).innerText = name;
        row.insertCell(2).innerText = className;
        row.insertCell(3).innerText = position;
        const deleteCell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => {
            memberTable.deleteRow(row.rowIndex - 1);
            saveMembers();
            updateMemberNumbers(); 
        };
        deleteCell.appendChild(deleteButton);

        saveMembers();
    }

    function saveMembers() {
        const members = [];
        for (let i = 0; i < memberTable.rows.length; i++) {
            const row = memberTable.rows[i];
            const name = row.cells[1].innerText; 
            const className = row.cells[2].innerText;
            const position = row.cells[3].innerText; 
            members.push({ name, className, position });
        }
        localStorage.setItem('members', JSON.stringify(members));
    }

    function loadMembers() {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        members.forEach(member => {
            addMember(member.name, member.className, member.position);
        });
    }

    function updateMemberNumbers() {
        for (let i = 0; i < memberTable.rows.length; i++) {
            memberTable.rows[i].cells[0].innerText = i + 1; 
        }
    }

    backToDashboardButton.addEventListener('click', () => {
        window.location.href = 'dashboard.html'; 
    });
});