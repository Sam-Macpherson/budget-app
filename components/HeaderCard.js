import React from 'react';
import {Text, View} from 'react-native';
import typography from '../styles/typography.less';
import Badge from './Badge';
import badgeStyles from '../styles/badge.less';
import cardStyles from '../styles/card.less';
import ColorPalette from '../ColorPalette';

const HeaderCard = ({title, need, want, save, showLabels, showSave}) => {
  return (
    <View style={[cardStyles.card, {backgroundColor: ColorPalette.DARK_GRAY, margin: 2}]}>
      <Text style={typography.italics}>{title}</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {showLabels && (
          <View style={{flexDirection: 'column'}}>
            <Badge style={badgeStyles['badge.white-on-green']} text="need" />
            <Badge style={badgeStyles['badge.white-on-orange']} text="want" />
            {showSave && <Badge style={badgeStyles['badge.transparent']} text="save" />}
          </View>
        )}
        <View style={{flexDirection: 'column'}}>
          <Badge
            style={badgeStyles['badge.white-on-green']}
            textStyle={[typography.fullWidth, typography.rightAlign]}
            text={need}
          />
          <Badge
            style={badgeStyles['badge.white-on-orange']}
            textStyle={[typography.fullWidth, typography.rightAlign]}
            text={want}
          />
          {showSave && (
            <Badge
              style={badgeStyles['badge.transparent']}
              textStyle={[typography.fullWidth, typography.rightAlign]}
              text={save}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderCard;
