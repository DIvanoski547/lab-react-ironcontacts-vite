import { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const remainingContacts = contactsData.slice(5);

  // ADD RANDOM CONTACTS
  const addRandomContact = () => {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];

      setContacts((prevContacts) => [...prevContacts, randomContact]);

      const updatedRemainingContacts = remainingContacts.filter(
        (contact) => contact.id !== randomContact.id
      );
    }
  };

  // SORTING BY NAME
  const sortByName = () => {
    const sortedContacts = [...contactsData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  // SORTING BY POPULARITY
  const sortByPopularity = () => {
    const sortedContacts = [...contactsData].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContacts(sortedContacts);
  };

  // DELETE CONTACTS
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <h1>Contact List</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>
                {contact.wonOscar ? (
                  <span role="img" aria-label="Trophy">
                    🏆
                  </span>
                ) : null}
              </td>
              <td>
                {contact.wonEmmy ? (
                  <span role="img" aria-label="Star">
                    🌟
                  </span>
                ) : null}
              </td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
