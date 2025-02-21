document.addEventListener('DOMContentLoaded', function() {
    const anggotaContainer = document.getElementById('anggota-container');
    const addMemberForm = document.getElementById('add-member-form');
    const memberNameInput = document.getElementById('member-name');
    const memberPositionInput = document.getElementById('member-position');
    const memberPhotoInput = document.getElementById('member-photo');

    
    function displayMembers() {
        anggotaContainer.innerHTML = ''; 
        const members = JSON.parse(localStorage.getItem('members')) || [];
        members.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'anggota-card';
            memberCard.innerHTML = `
                <img src="${member.photo}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>Jabatan: ${member.position}</p>
                <button class="delete-button" data-index="${index}">Hapus</button>
            `;
            anggotaContainer.appendChild(memberCard);
        });

        
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteMember(index);
            });
        });
    }

    
    addMemberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const newMember = {
            name: memberNameInput.value,
            position: memberPositionInput.value,
            photo: memberPhotoInput.value 
        };
        members.push(newMember);
        localStorage.setItem('members', JSON.stringify(members));
        memberNameInput.value = '';
        memberPositionInput.value = '';
        memberPhotoInput.value = '';
        displayMembers();
    });

   
    function deleteMember(index) {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        members.splice(index, 1); 
        localStorage.setItem('members', JSON.stringify(members)); 
        displayMembers(); 
    }

   
    displayMembers();

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Pesan Anda telah dikirim!');
        this.reset();
    });

   
    function changeBackgroundColor() {
        const colors = ['#6a11cb', '#2575fc', '#ff5722', '#4caf50', '#ffeb3b'];
        let index = 0;

        setInterval(() => {
            document.body.style.background = colors[index];
            index = (index + 1) % colors.length; 
        }, 3000); 
    }

  
    changeBackgroundColor();
});