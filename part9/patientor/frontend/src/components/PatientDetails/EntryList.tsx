import { Entry } from "../../types";
import EntryDetails from "./EntryDetails";

const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

export default EntryList;
