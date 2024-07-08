document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const memberList = document.getElementById('memberList');
    const downloadBtn = document.getElementById('downloadBtn');

    const getMembersFromLocalStorage = () => {
        const members = localStorage.getItem('members');
        return members ? JSON.parse(members) : [];
    };

    const saveMembersToLocalStorage = (members) => {
        localStorage.setItem('members', JSON.stringify(members));
    };

    const loadMembers = () => {
        const members = getMembersFromLocalStorage();
        members.forEach(addMemberToTable);
    };

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

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fname = form.fname.value;
        const lname = form.lname.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const member = { fname, lname, phone, email };

        addMemberToTable(member);

        const members = getMembersFromLocalStorage();
        members.push(member);
        saveMembersToLocalStorage(members);

        form.reset();
    });

    window.deleteMember = (button) => {
        const row = button.closest('tr');
        const fname = row.cells[0].innerText;
        const lname = row.cells[1].innerText;
        const phone = row.cells[2].innerText;
        const email = row.cells[3].innerText;

        row.remove();

        let members = getMembersFromLocalStorage();
        members = members.filter(member => 
            member.fname !== fname || 
            member.lname !== lname || 
            member.phone !== phone || 
            member.email !== email
        );
        saveMembersToLocalStorage(members);
    };

    downloadBtn.addEventListener('click', () => {
        const members = getMembersFromLocalStorage();
        const data = members.map(member => `${member.fname},${member.lname},${member.phone},${member.email}`).join('\n');
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    loadMembers();
});