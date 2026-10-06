import {Alert, NativeModules} from 'react-native';
import moment from 'moment';
import si from '../storage/storage';

const plural = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;

const exportBackup = async () => {
  try {
    const fileName = `budget-backup-${moment().format('YYYY-MM-DD')}.json`;
    const saved = await NativeModules.BackupFile.save(fileName, await si.exportAll());
    if (saved) {
      Alert.alert('Backup saved', fileName);
    }
  } catch (e) {
    Alert.alert('Export failed', e.message);
  }
};

const importBackup = async () => {
  let backup;
  try {
    const contents = await NativeModules.BackupFile.open();
    if (contents === null) {
      return;
    }
    backup = si.parseBackup(contents);
  } catch (e) {
    Alert.alert('Import failed', e.message);
    return;
  }
  Alert.alert(
    'Import backup?',
    'Entries and recurring items missing from this phone will be added. Nothing is deleted.',
    [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Import',
        onPress: async () => {
          try {
            const added = await si.importBackup(backup);
            Alert.alert(
              'Backup imported',
              `Added ${plural(added.entries, 'entry').replace('entrys', 'entries')} and ` +
                `${plural(added.recurring, 'recurring item')}.`,
            );
          } catch (e) {
            Alert.alert('Import failed', e.message);
          }
        },
      },
    ],
  );
};

export {exportBackup, importBackup};
