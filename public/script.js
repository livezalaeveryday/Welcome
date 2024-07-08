document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const memberList = document.getElementById('memberList');
    const filePath = 'data.txt';

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fname = form.fname.value;
        const lname = form.lname.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const member = {
            fname,
            lname,
            phone,
            email
        };

        addMemberToTable(member);
        saveMemberToFile(member);
        form.reset();
    });

    const addMemberToTable = (member) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.fname}</td>
            <td>${member.lname}</td>
            <td>${member.phone}</td>
            <td>${member.email}</td>
            <td><button onclick="deleteMember(this)">ลบ</button></td>
        `;
        memberList.appendChild(row);
    };

    const saveMemberToFile = (member) => {
        fetch(filePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        }).catch(error => console.error('Error:', error));
    };

    const deleteMember = (button) => {
        const row = button.closest('tr');
        const member = {
            fname: row.cells[0].innerText,
            lname: row.cells[1].innerText,
            phone: row.cells[2].innerText,
            email: row.cells[3].innerText
        };

        row.remove();
        deleteMemberFromFile(member);
    };

    const deleteMemberFromFile = (member) => {
        fetch(filePath, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        }).catch(error => console.error('Error:', error));
    };
});