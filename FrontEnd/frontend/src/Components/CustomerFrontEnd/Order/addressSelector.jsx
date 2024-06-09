import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useState } from 'react';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];

function AddressSelector() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative">
        <ComboboxInput
          className="w-full border border-gray-300 rounded-md p-2"
          aria-label="Assignee"
          displayValue={(person) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredPeople.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No results found
            </div>
          ) : (
            filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100' : 'text-gray-900'
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-blue-600' : 'text-blue-600'
                        }`}
                      >
                        ✔
                      </span>
                    ) : null}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

export default AddressSelector;
