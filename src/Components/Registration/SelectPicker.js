import { TextInput } from "react-native";
import ModalSelector from "react-native-modal-selector";

export const SelectPicker = ({
  data,
  onChangeText,
  text,
  PickerStyle,
  TextStyle,
  placeholder,
}) => {
  return (
    <ModalSelector
      style={PickerStyle}
      data={data}
      initValue="Age Bracket"
      onModalClose={(option) => {
        if (option.key === undefined) {
          return;
        }
        onChangeText(option.key);
      }}
    >
      <TextInput
        style={TextStyle}
        editable={false}
        placeholder={placeholder}
        value={text}
      />
    </ModalSelector>
  );
};
