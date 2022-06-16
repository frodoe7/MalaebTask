import Contacts, {Contact} from 'react-native-contacts';
import {IContact, CONTACT_TYPE} from '../interfaces/contacts';

export const fetchDeviceContacts = (): Promise<{
  success: boolean;
  contacts?: Contact[];
  error?: string;
}> => {
  return Contacts.getAll()
    .then(contacts => {
      return {
        success: true,
        contacts: contacts.sort((a, b) =>
          a.displayName > b.displayName ? 1 : -1,
        ),
      };
    })
    .catch(error => {
      return {success: false, error};
    });
};

export const convertListToContacts = (contacts: Contact[]): IContact[] => {
  let output: IContact[] = [];
  contacts.map((contact, index) => {
    const name: string = contact.displayName;
    const firstChar: string = name[0];
    const headerInserted: boolean = checkIfExist(output, firstChar);

    if (!headerInserted) {
      output.push({
        name: firstChar,
        id: index + 1000000,
        selected: false,
        type: CONTACT_TYPE.HEADER,
        number: undefined,
      });
    }

    output.push({
      name,
      id: index,
      selected: false,
      type: CONTACT_TYPE.CONTACT,
      number: contact.phoneNumbers[0]?.number,
    });
  });

  return output;
};

const checkIfExist = (list: IContact[], searchKey: string): boolean => {
  let added: boolean = false;
  list.map(item => {
    if (item.type === CONTACT_TYPE.HEADER && item.name === searchKey) {
      added = true;
    }
  });

  return added;
};
