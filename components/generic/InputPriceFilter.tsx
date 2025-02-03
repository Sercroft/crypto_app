import React, { useState, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

interface InputPriceFilterProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}
  
const InputContainer = styled.View`
  width: 100%;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin-top: 10;
  elevation: 5;
`;
  
const StyledInput = styled.TextInput`
  flex: 1;
  height: 40px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;
  
  const InputPriceFilter: React.FC<InputPriceFilterProps> = ({ placeholder, value, onChangeText, keyboardType }) => {
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
  
    return (
      <Animated.View style={[animatedStyle]}>
        <InputContainer>
          <StyledInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType={keyboardType}
          />
        </InputContainer>
      </Animated.View>
    );
};

export default InputPriceFilter;