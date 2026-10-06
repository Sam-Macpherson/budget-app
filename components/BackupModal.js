import React, {useState} from 'react';
import {Alert, NativeModules, Text, View} from 'react-native';
import moment from 'moment';
import backupModal from '../styles/backupModal.less';
import typography from '../styles/typography.less';
import Button from './Button';
import si from '../storage/storage';

const BackupModal = ({onImported}) => {
  const [status, setStatus] = useState('');

  const exportData = async () => {
    try {
      const fileName = `budget-backup-${moment().format('YYYY-MM-DD')}.json`;
      const saved = await NativeModules.BackupFile.save(fileName, await si.exportAll());
      setStatus(saved ? `Saved ${fileName}.` : '');
    } catch (e) {
      setStatus(`Export failed: ${e.message}`);
    }
  };

  const importData = async () => {
    let months;
    try {
      const contents = await NativeModules.BackupFile.open();
      if (contents === null) {
        return;
      }
      months = si.parseBackup(contents);
    } catch (e) {
      setStatus(`Import failed: ${e.message}`);
      return;
    }
    Alert.alert(
      'Import backup?',
      'Entries missing from this phone will be added. Nothing is deleted.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Import',
          onPress: async () => {
            try {
              const added = await si.importMonths(months);
              setStatus(`Imported ${added} new ${added === 1 ? 'entry' : 'entries'}.`);
            } catch (e) {
              setStatus(`Import failed: ${e.message}`);
            }
            onImported();
          },
        },
      ],
    );
  };

  return (
    <View style={backupModal.backupModalContainer}>
      <Text style={[typography.largest, typography.italics]}>backup</Text>
      <View style={backupModal.backupButtons}>
        <View style={backupModal.backupButton}>
          <Button text="export" style={typography.large} onPress={exportData} />
        </View>
        <View style={backupModal.backupButton}>
          <Button text="import" style={typography.large} onPress={importData} />
        </View>
      </View>
      {status !== '' && <Text style={typography.medium}>{status}</Text>}
    </View>
  );
};

export default BackupModal;
