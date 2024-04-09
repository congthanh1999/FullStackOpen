import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const displayNotification = (message, color) => {
    setMessage(message);
    setMessageColor(color);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const newPerson = { id: uuidv4(), name: newName, number: newNumber };

    const addedPerson = persons.find(
      (person) => person.name === newPerson.name
    );
    const updateAddedPerson = { ...addedPerson, number: newNumber };

    if (addedPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        setPersons(
          persons.map((person) =>
            person.name === newName ? updateAddedPerson : person
          )
        );
        personService.update(updateAddedPerson, updateAddedPerson.id);

        displayNotification(
          `Updated ${addedPerson.name}'s information`,
          "hsl(120, 100%, 27%)"
        );
      }
    } else {
      setPersons([...persons, newPerson]);
      personService.create(newPerson);

      displayNotification(
        `Added ${newPerson.name} to phonebook`,
        "hsl(120, 100%, 27%)"
      );
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={messageColor} />
      <Filter searchInput={searchInput} onChange={handleSearchInputChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmitPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchInput={searchInput}
        setPersons={setPersons}
        displayNotification={displayNotification}
      />
    </div>
  );
};

export default App;
