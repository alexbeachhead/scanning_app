import {colors} from '@utils/constants';
import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {MaskType} from 'src/types';

import {Input} from '../Input';
import {Spacer} from '../Spacer';

// Simple helper function to replace the missing stringToDate
const stringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

type Props = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  handleChangeText: (date: Date) => void;
  disabled?: boolean;
  errorMessages?: string[];
};

export const InputWithCalendar = ({
  value,
  placeholder,
  onChangeText,
  handleChangeText,
  disabled,
  errorMessages = [],
}: Props) => {
  const [startDatePickerShow, setStartDatePickerShow] = useState(false);

  return (
    <>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        maskType={MaskType.DateInput}
        // withMovingPlaceholder
        // withIcon
        // icon="calendar"
        onIconPress={() => setStartDatePickerShow(prev => !prev)}
        disabled={disabled}
        errorMessages={errorMessages}
      />
      {startDatePickerShow && (
        <>
          <View
            style={{
              backgroundColor: colors.common.neutral0,
              marginTop: -7,
              borderRadius: 12,
              alignItems: 'center',
            }}>
            <DatePicker date={stringToDate(value)} onDateChange={handleChangeText} theme="light" mode="date" />
          </View>
          <Spacer size="m" />
        </>
      )}
    </>
  );
};
