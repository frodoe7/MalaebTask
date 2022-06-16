/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  LogBox,
  useColorScheme,
  Pressable,
  Text,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {convertListToContacts, fetchDeviceContacts} from './helpers/contacts';
import {readPhoneBookPermission} from './helpers/permissions';
import {blue, white} from './constants/colors';
import Header from './components/Header';
import {IContact, ISelectedContact} from './interfaces/contacts';
import ContactsList from './components/ContactsList';
import SelectedList from './components/SelectedList';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [participantsCount, setParticipantsCount] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  // all contacts is a backup for the dynamic contacts
  const [allContacts, setAllContacts] = useState<IContact[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<ISelectedContact[]>(
    [],
  );

  // When the app start ask for permission to read the contacts then fetch it
  useEffect(() => {
    LogBox.ignoreAllLogs();
    if (Platform.OS! === 'android') {
      fetchContacts();
      return;
    }

    readPhoneBookPermission()
      .then(() => {
        fetchContacts();
      })
      .catch(() => {
        Toast.show('Permission needed to read the contacts');
      });
  }, []);

  // A handler to filter the contacts if the searchText changed
  useEffect(() => {
    if (searchText.length > 1) {
      let filteredContacts: IContact[] = [];
      allContacts.map(contact => {
        if (contact.name.includes(searchText)) {
          filteredContacts.push(contact);
        }
      });
      setContacts(filteredContacts);
    } else {
      setContacts(allContacts);
    }
  }, [searchText]);

  // fetch the contacts and assign it to contacts and allContacts as a backup
  const fetchContacts = async () => {
    let result = await fetchDeviceContacts();
    if (result.success) {
      const _contacts = convertListToContacts(result.contacts || []);
      setContacts(_contacts);
      setAllContacts(_contacts);
      Toast.show('Contacts fetched in success');
    } else {
      Toast.show('Error in fetching the contacts');
    }
  };

  // a handler to mark all contacts as not selected and partcipants count as 0
  const onClearSelection = () => {
    setParticipantsCount(0);
    let _allContacts: IContact[] = [...allContacts];

    _allContacts.map((_allContactsItem, index) => {
      _allContacts[index].selected = false;
    });

    setSelectedContacts([]);
    setAllContacts([..._allContacts]);
  };

  // change participants count to increase or decrease by 1
  const changeParticipantsCount = (change: number) => {
    setParticipantsCount(participantsCount + change);
  };

  // a handler for the contact click behavior and change the partcipants count by 1 or -1
  const contactClickHandler = (id: number) => {
    let _contacts: IContact[] = [...contacts];

    _contacts.map((_contactsItem, index) => {
      if (_contactsItem.id === id) {
        if (_contactsItem.selected) {
          removeSelectedContact(id);
          changeParticipantsCount(-1);
        } else {
          addSelectedContact({id: _contactsItem.id, name: _contactsItem.name});
          changeParticipantsCount(1);
        }
        _contacts[index].selected = !_contactsItem.selected;
      }
    });

    setContacts([..._contacts]);
  };

  // add a new contact to the selected contacts
  const addSelectedContact = (item: ISelectedContact) => {
    let _selectedContacts = [...selectedContacts];
    _selectedContacts.push(item);
    setSelectedContacts([..._selectedContacts]);
  };

  // remove exist item from the selected contacts
  const removeSelectedContact = (id: number) => {
    let _selectedContacts = [...selectedContacts];
    let _newSelectedContacts: ISelectedContact[] = [];

    _selectedContacts.map(_selectedContactsItem => {
      if (_selectedContactsItem.id !== id) {
        _newSelectedContacts.push(_selectedContactsItem);
      }
    });

    setSelectedContacts([..._newSelectedContacts]);
  };

  // click handler for the next button
  const onNextButtonClick = () => {
    Toast.show('The demo does not have more screens');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        participantsCount={participantsCount}
        onClear={onClearSelection}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {participantsCount > 0 && (
        <SelectedList
          contacts={selectedContacts}
          onClick={contactClickHandler}
        />
      )}
      <ContactsList contacts={contacts} onClick={contactClickHandler} />
      {participantsCount > 0 && (
        <Pressable onPress={onNextButtonClick} style={styles.button}>
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
  button: {
    position: 'absolute',
    width: 381,
    height: 60,
    backgroundColor: blue,
    bottom: 24,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: white,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
});
