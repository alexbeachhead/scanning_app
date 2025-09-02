import React, {useState} from 'react';
import {Platform} from 'react-native';
import {MaskType} from 'src/types';

import DateTimePicker from '@react-native-community/datetimepicker';
import {stringToDate} from '@utils/helpers/formatDateToDDMMYYYY';
import {Input} from '../Input';

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
  const [date, setDate] = useState(stringToDate(value));
  const [show, setShow] = useState(false);

  const onChange = (event: unknown, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate || new Date());
    const year = currentDate?.getFullYear();
    const month = String((currentDate?.getMonth() || 0) + 1).padStart(2, '0');
    const day = String(currentDate?.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}-${year}`;
    onChangeText(formattedDate);
    handleChangeText(currentDate || new Date());
  };

  const handleWebDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setDate(selectedDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}-${year}`;
    onChangeText(formattedDate);
    handleChangeText(selectedDate);

    // Reset show state for web so it can be triggered again
    if (Platform.OS === 'web') {
      setShow(false);
    }
  };

  const showDatepicker = () => {
    if (Platform.OS === 'web') {
      // On web, show the date input and trigger it
      setShow(true);
      // Use setTimeout to ensure the input is rendered before trying to click it
      setTimeout(() => {
        const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
        if (dateInput) {
          dateInput.showPicker?.() || dateInput.click();
        }
      }, 100);
    } else {
      setShow(true);
    }
  };

  // Convert MM-DD-YYYY to YYYY-MM-DD for HTML date input
  const getWebDateValue = () => {
    if (!value) return '';
    try {
      const [month, day, year] = value.split('-').map(Number);
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    } catch {
      return '';
    }
  };

  return (
    <>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        maskType={MaskType.DateInput}
        withMovingPlaceholder
        withIcon
        icon="calendar"
        onIconPress={showDatepicker}
        disabled={disabled}
        errorMessages={errorMessages}
      />

      {/* Web date input (shown when icon is pressed) */}
      {Platform.OS === 'web' && show && (
        <input
          type="date"
          value={getWebDateValue()}
          onChange={handleWebDateChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      )}

      {/* Native date picker for mobile */}
      {Platform.OS !== 'web' && show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          display="spinner"
        />
      )}
    </>
  );
};
