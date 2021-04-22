import 'core-js';

import React, { useRef } from 'react';
import { DevTools, useDevTools, wrapChildrenClassName } from 'flex-wrap-layout';
import ReactDOM from 'react-dom';

import './Bootstrap.html';
import './Bootstrap.scss';

// https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes
// https://gist.github.com/evolkmann/740d24889c509c08484a8ff72af5dd64
enum SomeCountries {
  AR = 'Argentina',
  BE = 'Belgium',
  BR = 'Brazil',
  KH = 'Cambodia',
  DK = 'Denmark',
  FR = 'France',
  DE = 'Germany',
  GG = 'Guernsey',
  HK = 'Hong Kong',
  HU = 'Hungary',
  IE = 'Ireland',
  IT = 'Italy',
  JE = 'Jersey',
  LA = "Lao People's Democratic Republic",
  MY = 'Malaysia',
  MA = 'Morocco',
  MM = 'Myanmar',
  NL = 'Netherlands',
  NO = 'Norway',
  PT = 'Portugal',
  SK = 'Slovakia',
  ES = 'Spain',
  SE = 'Sweden',
  CH = 'Switzerland',
  TZ = 'Tanzania',
  TH = 'Thailand',
  TR = 'Turkey',
  GB = 'United Kingdom',
  US = 'United States'
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  Unknown = 'Unknown'
}

// https://developers.google.com/people/api/rest/v1/people
// https://schema.org/Person
interface Person {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: SomeCountries;
}

function People({ people }: { people: Person[] }) {
  const ref = useRef(null);

  // This example uses the dev tools: replace useDevTools() and <DevTools /> by useDetectWrappedElements()
  const devToolsContext = useDevTools({
    showBordersInit: false,
    detectWrappedElementsInit: true,
    flexFillInit: true
  });

  return (
    <>
      <DevTools detectWrappedElementsRef={ref} context={devToolsContext} className="mb-3" />
      <div ref={ref} className={`people ${devToolsContext.showBordersClassName}`}>
        {people.map(person => (
          <Person
            key={person.id}
            person={person}
            flexFillClassName={devToolsContext.flexFillClassName}
          />
        ))}
      </div>
    </>
  );
}

function ColumnTitle({ children }: { children?: React.ReactNode }) {
  return <div className="column-title font-weight-bold pl-1 mb-2">{children ?? '\u00A0'}</div>;
}

function getSelectOptionsFromEnum(_enum: Record<string, string>) {
  return Object.entries(_enum).map(([key, value]) => (
    <option key={key} value={value}>
      {value}
    </option>
  ));
}

function Person({ person, flexFillClassName }: { person: Person; flexFillClassName: string }) {
  const { id, gender, firstName, lastName, birthDate, nationality } = person;

  const getId = (name: string) => `${name}-${id}`;
  const genderId = getId('gender');
  const firstNameId = getId('firstName');
  const lastNameId = getId('lastName');
  const birthDateId = getId('birthDate');
  const nationalityId = getId('nationality');

  return (
    <div className="person mb-n2">
      <div className={`${wrapChildrenClassName} mr-n2`}>
        <div className={`floating-label mb-3 mr-2 ${flexFillClassName}`}>
          <ColumnTitle>First name</ColumnTitle>
          <input
            id={firstNameId}
            defaultValue={firstName}
            className="form-control"
            placeholder=" "
          />
          <label htmlFor={firstNameId}>First name</label>
        </div>

        <div className={`floating-label mb-3 mr-2 ${flexFillClassName}`}>
          <ColumnTitle>Last name</ColumnTitle>
          <input id={lastNameId} defaultValue={lastName} className="form-control" placeholder=" " />
          <label htmlFor={lastNameId}>Last name</label>
        </div>

        <div className="floating-label mb-3 mr-2">
          <ColumnTitle>Gender</ColumnTitle>
          <select id={genderId} defaultValue={gender} className="custom-select">
            {getSelectOptionsFromEnum(Gender)}
          </select>
          <label htmlFor={genderId}>Gender</label>
        </div>

        <div className="floating-label mb-3 mr-2">
          <ColumnTitle>Birth date</ColumnTitle>
          <input
            type="date"
            id={birthDateId}
            defaultValue={birthDate}
            className="form-control"
            placeholder=" "
          />
          <label htmlFor={birthDateId}>Birth date</label>
        </div>

        <div className="floating-label mb-3 mr-2">
          <ColumnTitle>Nationality</ColumnTitle>
          <select id={nationalityId} defaultValue={nationality} className="custom-select">
            {getSelectOptionsFromEnum(SomeCountries)}
          </select>
          <label htmlFor={nationalityId}>Nationality</label>
        </div>
      </div>

      <hr className="mt-0 mb-4" />
    </div>
  );
}

const beatles: Person[] = [
  {
    id: 'beatles-0',
    gender: Gender.Male,
    firstName: 'John',
    lastName: 'Lennon',
    birthDate: '1940-10-09',
    nationality: SomeCountries.GB
  },
  {
    id: 'beatles-1',
    gender: Gender.Male,
    firstName: 'Paul',
    lastName: 'McCartney',
    birthDate: '1942-06-18',
    nationality: SomeCountries.GB
  },
  {
    id: 'beatles-2',
    gender: Gender.Male,
    firstName: 'George',
    lastName: 'Harrison',
    birthDate: '1943-02-25',
    nationality: SomeCountries.GB
  },
  {
    id: 'beatles-3',
    gender: Gender.Male,
    firstName: 'Ringo',
    lastName: 'Starr',
    birthDate: '1940-07-07',
    nationality: SomeCountries.GB
  }
];

function Beatles() {
  return (
    <>
      <h1>Members of the Beatles</h1>
      <People people={beatles} />
    </>
  );
}

// https://en.wikipedia.org/wiki/The_Velvet_Underground#Timeline
const velvetUnderground: Person[] = [
  {
    id: 'velvetunderground-0',
    gender: Gender.Male,
    firstName: 'Lou',
    lastName: 'Reed',
    birthDate: '1942-03-02',
    nationality: SomeCountries.US
  },
  {
    id: 'velvetunderground-1',
    gender: Gender.Female,
    firstName: 'Nico',
    lastName: '',
    birthDate: '1938-10-16',
    nationality: SomeCountries.DE
  },
  {
    id: 'velvetunderground-2',
    gender: Gender.Male,
    firstName: 'Sterling',
    lastName: 'Morrison',
    birthDate: '1942-08-29',
    nationality: SomeCountries.US
  },
  {
    id: 'velvetunderground-3',
    gender: Gender.Male,
    firstName: 'Willie',
    lastName: 'Alexander',
    birthDate: '1943-01-13',
    nationality: SomeCountries.US
  },
  {
    id: 'velvetunderground-4',
    gender: Gender.Male,
    firstName: 'John',
    lastName: 'Cale',
    birthDate: '1942-03-09',
    nationality: SomeCountries.GB
  },
  {
    id: 'velvetunderground-5',
    gender: Gender.Male,
    firstName: 'Doug',
    lastName: 'Yule',
    birthDate: '1947-02-25',
    nationality: SomeCountries.US
  },
  {
    id: 'velvetunderground-6',
    gender: Gender.Male,
    firstName: 'Walter',
    lastName: 'Powers',
    birthDate: '1946-08-04',
    nationality: SomeCountries.US
  },
  {
    id: 'velvetunderground-7',
    gender: Gender.Male,
    firstName: 'Angus',
    lastName: 'MacLise',
    birthDate: '1938-03-14',
    nationality: SomeCountries.US
  },
  {
    id: 'velvetunderground-8',
    gender: Gender.Female,
    firstName: 'Moe',
    lastName: 'Tucker',
    birthDate: '1944-08-26',
    nationality: SomeCountries.US
  }
];

function VelvetUnderground() {
  return (
    <>
      <h1>Members of the Velvet Underground</h1>
      <People people={velvetUnderground} />
    </>
  );
}

ReactDOM.render(
  <div className="container-fluid">
    <Beatles />
    <VelvetUnderground />
  </div>,
  document.getElementById('app')
);
