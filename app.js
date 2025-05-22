const form = document.getElementById('contactForm');
const coolul = document.querySelector('.coolul');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
function getdaContacts() {
  coolul.innerHTML = '';
  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.classList.add('contact-card');
    li.innerHTML = `
      <p><strong>${contact.firstName} ${contact.lastName}</strong></p>
      <p>contact ${contact.phone}</p>
      <p>email ${contact.email}</p>
      <button class="buttonrename">Редагувати</button>
      <button class="buttonremove">Видалити</button>
    `;

    li.querySelector('.buttonremove').addEventListener('click', () => {
      contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
      getdaContacts();
    });

    li.querySelector('.buttonrename').addEventListener('click', () => {
      const newFirstName = prompt("Нове ім'я", contact.firstName);
      const newLastName = prompt("Нове прізвище", contact.lastName);
      const newPhone = prompt("Новий телефон", contact.phone);
      const newEmail = prompt("Нова пошта", contact.email);
      if (newFirstName && newLastName && newPhone && newEmail) {
        contacts[index] = {
          firstName: newFirstName,
          lastName: newLastName,
          phone: newPhone,
          email: newEmail
        };
          localStorage.setItem('contacts', JSON.stringify(contacts));
        getdaContacts();
      }
    });

    coolul.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    phone: form.phone.value,
    email: form.email.value
  };
  contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  getdaContacts();
  form.reset();
});

getdaContacts();
