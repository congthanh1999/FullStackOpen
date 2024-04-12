import personService from "../services/persons";

const Persons = ({ persons, searchInput, setPersons, displayNotification }) => {
  const handleDeletePerson = (event, person) => {
    event.preventDefault();

    if (window.confirm(`Delete ${person.name}?`)) {
      const filteredPersons = [...persons].filter((p) => p.id !== person.id);
      setPersons(filteredPersons);
      personService.remove(person.id);

      displayNotification(
        `Deleted ${person.name} from phonebook`,
        `hsl(0, 100%, 40%)`
      );
    }
  };

  return (
    <div className="persons">
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={(event) => handleDeletePerson(event, person)}>
              DELETE
            </button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
