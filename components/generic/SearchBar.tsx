import React, { useState, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
}

const SearchContainer = styled.View`
  width: 100%;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px; /* Añadir px para evitar advertencias */
  elevation: 5;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

/**
 * SearchBar component renders an animated search input field.
 *
 * @param {string} placeholder - The placeholder text for the search input.
 * @param {string} value - The current value of the search input.
 * @param {(text: string) => void} onChangeText - Callback function to handle text changes in the search input.
 * @param {KeyboardTypeOptions} keyboardType - The type of keyboard to display.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText, keyboardType }) => {
  const [focused, setFocused] = useState(false);
  const inputWidth = useSharedValue(1);

  useEffect(() => {
    inputWidth.value = withTiming(focused ? 1.01 : 1, { duration: 300 });
  }, [focused, inputWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: inputWidth.value }],
    };
  });

  // Filtrar caracteres numéricos y especiales
  const handleTextChange = (text: string) => {
    const textWithoutNumbersAndSpecialChars = text.replace(/[^a-zA-Z\s]/g, '');
    onChangeText(textWithoutNumbersAndSpecialChars);
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <SearchContainer>
        <SearchInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleTextChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="default"
        />
      </SearchContainer>
    </Animated.View>
  );
};

export default SearchBar;