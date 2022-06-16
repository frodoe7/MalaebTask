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
import {secondColor, textBoxBGColor} from '../constants/colors';
import {MAX_PARTICIPANTS} from '../constants/settings';

type Style = {
  container: ViewStyle;
  searchTextBox: ViewStyle;
  row: ViewStyle;
  centralize: ViewStyle;
  addParticipantsText: TextStyle;
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
        <Pressable onPress={onClear}>
          <Text>Clear</Text>
        </Pressable>
        <View style={styles.centralize}>
          <Text style={styles.addParticipantsText}>Add Participants</Text>
          <Text>
            {participantsCount}/{MAX_PARTICIPANTS}
          </Text>
        </View>
      </View>
      <TextInput
        style={styles.searchTextBox}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create<Style>({
  container: {
    height: 128,
    backgroundColor: secondColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextBox: {
    backgroundColor: textBoxBGColor,
    opacity: 0.8,
    borderRadius: 8,
    width: '90%',
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  row: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centralize: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addParticipantsText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
