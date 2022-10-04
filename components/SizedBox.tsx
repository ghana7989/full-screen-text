import React, {FC} from 'react';
import {View} from 'react-native';

interface SizedBoxProps {
  vertical?: string | number | undefined;
  horizontal?: string | number | undefined;
}
const SizedBox: FC<SizedBoxProps> = ({vertical, horizontal}) => {
  return (
    <>
      <View style={{marginVertical: vertical, marginHorizontal: horizontal}} />
    </>
  );
};

export default SizedBox;
