import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextInput,
  Text,
  TextStyle,
  Pressable,
} from 'react-native';
import {blue, gray, white} from '../constants/colors';
import {MAX_PARTICIPANTS} from '../constants/settings';
import IAntDesign from 'react-native-vector-icons/AntDesign';

type Style = {
  container: ViewStyle;
  searchTextBox: ViewStyle;
  row: ViewStyle;
  participantsInfo: ViewStyle;
  addParticipantsText: TextStyle;
  participantsCount: TextStyle;
  cancelText: TextStyle;
  searchInputContainer: ViewStyle;
};

interface IProps {
  participantsCount: number;
  searchText: string;
  onClear: () => void;
  setSearchText: (v: string) => void;
}

const Header = ({
  participantsCount,
  searchText,
  onClear,
  setSearchText,
}: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.participantsInfo}>
          <Text style={styles.addParticipantsText}>Add Participants</Text>
          <Text style={styles.participantsCount}>
            {participantsCount}/{MAX_PARTICIPANTS}
          </Text>
        </View>
        <Pressable onPress={onClear}>
          <Text style={styles.cancelText}>Clear</Text>
        </Pressable>
      </View>
      <View style={styles.searchInputContainer}>
        <IAntDesign name="search1" size={18} color={gray} />
        <TextInput
          style={styles.searchTextBox}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={gray}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create<Style>({
  container: {
    paddingTop: 16,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextBox: {
    backgroundColor: white,
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 24,
    width: '90%',
  },
  row: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participantsInfo: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  addParticipantsText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 27,
    color: white,
  },
  participantsCount: {
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 21,
    color: white,
  },
  cancelText: {
    fontWeight: '200',
    fontSize: 16,
    lineHeight: 27,
    color: white,
  },
  searchInputContainer: {
    backgroundColor: white,
    flexDirection: 'row',
    borderRadius: 2,
    width: '90%',
    maxHeight: 49,
    minHeight: 49,
    alignItems: 'center',
    paddingHorizontal: 21,
    marginTop: 12,
    marginBottom: 21,
  },
});
