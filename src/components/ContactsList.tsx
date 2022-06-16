import React, {ReactElement} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {secondColor} from '../constants/colors';
import {CONTACT_TYPE, IContact} from '../interfaces/contacts';
import Contact from './Contact';

interface IProps {
  contacts: IContact[];
  onClick: (id: number) => void;
}

interface IItem {
  item: IContact;
  index: number;
}

interface IHead {
  name: string;
}

type Style = {
  headContainer: ViewStyle;
  headText: TextStyle;
};

const Head = (head: IHead): ReactElement => {
  return (
    <View style={styles.headContainer}>
      <Text style={styles.headText}>{head.name}</Text>
    </View>
  );
};

const ContactsList = ({contacts, onClick}: IProps) => {
  const renderItem = ({item}: IItem): ReactElement => {
    if (item.type === CONTACT_TYPE.HEADER) {
      return <Head name={item.name} />;
    } else {
      return (
        <Contact
          contact={item}
          onClick={() => {
            onClick(item.id);
          }}
        />
      );
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={contacts}
      renderItem={renderItem}
    />
  );
};

export default ContactsList;

const styles = StyleSheet.create<Style>({
  headContainer: {
    backgroundColor: secondColor,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
});
