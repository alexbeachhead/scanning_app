import React from "react";
import { View } from "react-native";

import { useStyles } from "./styles";

interface IProps {
  totalSteps: number;
  currentStep: number;
}

export const StepsProgressBar = ({ totalSteps, currentStep }: IProps) => {
  const styles = useStyles();

  const handleStep = (index: number) => {
    if (index < currentStep) {
      return styles.previousStep;
    } else if (index === currentStep) {
      return styles.activeStep;
    } else {
      return styles.inactiveStep;
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View key={index} style={[styles.step, handleStep(index)]} />
      ))}
    </View>
  );
};
