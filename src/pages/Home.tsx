import React, { useEffect, useState } from "react";
import { Image } from "react-native";
//import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

//import imagem from "../assets/imagem.png";

import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { Button } from "../components/Button";
//import { BdayCard } from "../components/BdayCard";

interface BdayData {
  id: string;
  name: string;
  date: string;
  dia: number;
  mes: number;
}

export function Home() {
  const [newBday, setNewBday] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const [myBdays, setMyBdays] = useState<BdayData[]>([]);

  const [sortBdays, setSortBdays] = useState<BdayData[]>([]);

  useEffect(() => {
    setSortBdays([...sortBdays]);
  }, [myBdays]);

  function handleAddNewBday() {
    const dia = date.getDate();
    let dias = "";
    if (dia < 10) {
      dias = "0" + dia.toString();
    } else {
      dias = dia.toString();
    }
    const mes = date.getMonth() + 1;
    let meses = "";
    switch (mes) {
      case 1:
        meses = "Janeiro";
        break;
      case 2:
        meses = "Fevereiro";
        break;
      case 3:
        meses = "Março";
        break;
      case 4:
        meses = "Abril";
        break;
      case 5:
        meses = "Maio";
        break;
      case 6:
        meses = "Junho";
        break;
      case 7:
        meses = "Julho";
        break;
      case 8:
        meses = "Agosto";
        break;
      case 9:
        meses = "Setembro";
        break;
      case 10:
        meses = "Outubro";
        break;
      case 11:
        meses = "Novembro";
        break;
      case 12:
        meses = "Dezembro";
        break;
    }
    const aniver = dias + " de " + meses;
    const data = {
      id: String(new Date().getTime()),
      name: newBday,
      date: aniver,
      dia: dia,
      mes: mes,
    };

    setMyBdays((oldState) => [...oldState, data]);
    //console.log(myBdays);
    //console.log("MyBdays:", myBdays);
    const teste = myBdays.sort((a, b) => {
      if (a.mes === b.mes) {
        return a.dia - b.dia;
      }
      return a.mes - b.mes;
    });
    setSortBdays(teste);

    forceUpdate();
  }

  const forceUpdate = () => {
    FlatList.current?.scrollToOffset({ offset: 1 });
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View style={styled.header}>
        <Text style={styled.titulo}> Aniversários </Text>
        <Image
          style={styled.tinyLogo}
          source={require("../assets/imagem.png")}
        />
      </View>
      <View style={styled.container}>
        <TextInput
          style={styled.input}
          placeholder="Nome Aniversariante"
          placeholderTextColor="#838383"
          onChangeText={setNewBday}
        />

        <Button
          style={styled.input}
          title={`Data do aniversário: ${date.getDate()}/${
            date.getMonth() + 1
          }`}
          onPress={showDatepicker}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Button onPress={handleAddNewBday} title="ADICIONAR ANIVERSARIANTE" />

        <FlatList
          //style={styled.Bday}
          data={sortBdays}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styled.textoBday}>
              {item.name + " - " + item.date}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

//position absolut

const styled = StyleSheet.create({
  header: {
    backgroundColor: "#50B2C0",
    height: 160,
  },
  container: {
    padding: 20,
    height: 680,
    //padding: 20,
    backgroundColor: "#FEEFDD",
  },
  titulo: {
    backgroundColor: "#FFE0BA",
    color: "#1E1E1E",
    fontSize: 30,
    textAlign: "right",
    marginTop: 90,
    //maxWidth: 332,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    //borderRadius: 15,
    //marginBottom: 15,
    marginLeft: -40,
    marginRight: 20,
  },
  input: {
    backgroundColor: "#FFF9F1",
    height: 60,
    //padding: 10,
    borderRadius: 15,
    fontSize: 15,
    textAlign: "center",
    //marginTop: 20,
    padding: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#FFE0BA",
  },
  textoBday: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#FFE0BA",
    backgroundColor: "#FFF9F1",
    height: 60,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  tinyLogo: {
    maxHeight: 150,
    maxWidth: 150,
    transform: [{ rotate: "-15deg" }],
    marginLeft: 30,
    //marginTop: 20,
    position: "absolute",
    top: 0,
  },
});
