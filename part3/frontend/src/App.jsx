import { useEffect, useState, useRef } from "react";
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
  const timerRef = useRef();

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
    clearTimeout(timerRef.current);

    setMessage(message);
    setMessageColor(color);

    timerRef.current = setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };

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
        personService
          .update(updateAddedPerson, updateAddedPerson.id)
          // eslint-disable-next-line no-unused-vars
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? updateAddedPerson : person
              )
            );
            displayNotification(
              `Updated ${updatedPerson.name}'s information`,
              "hsl(120, 100%, 27%)"
            );
            setNewName("");
            setNewNumber("");
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            const errorMessage = !newNumber
              ? error.response.data.error
              : `Information of ${newName} has already been removed from server`;
            displayNotification(errorMessage, `hsl(0, 100%, 40%)`);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          displayNotification(
            `Added ${newPerson.name} to phonebook`,
            "hsl(120, 100%, 27%)"
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) =>
          displayNotification(error.response.data.error, `hsl(0, 100%, 40%)`)
        );
    }
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
