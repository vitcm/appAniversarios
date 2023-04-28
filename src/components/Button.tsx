import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styled.botao} activeOpacity={0.5} {...rest}>
      <Text style={styled.textoBotao}> {title} </Text>
    </TouchableOpacity>
  );
}

const styled = StyleSheet.create({
  botao: {
    backgroundColor: "#FAAA8D",
    padding: 15,
    borderRadius: 15,
    fontSize: 15,
    marginTop: 20,
    borderColor: "#FF4000",
    borderWidth: 3,
  },
  textoBotao: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
