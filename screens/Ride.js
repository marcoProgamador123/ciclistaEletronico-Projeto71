import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import db from "../config";


const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");

export default class RideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeId: "",
      userId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" é verdadeiro se o usuário concedeu permissão
          status === "granted" é falso se o usuário não concedeu a permissão
        */
      hasCameraPermissions: status === "granted",
      domState: "scanner",
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      bikeId: data,
      domState: "normal",
      scanned: true
    });
  };

  handleTransaction = () => {
    var { bikeId } = this.state;
    db.collection("bicycles")
      .doc(bikeId)
      .get()
      .then(doc => {
        var bike = doc.data();
        if (bike.is_bike_available) {
          this.assignBike();
        } else {
          this.initiateBookReturn();
        }
      });
  };

  assignBike = () => {
    console.log("Você alugou a bicicleta pela próxima 1 hora. Aproveite seu passeio!!");
  };

  returnBike = () => {
    console.log("Esperamos que tenha gostado do seu passeio");
  };

  render() {
    const { bikeId, userId, domState, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Text style={styles.title}>Ciclista Eletrônico</Text>
          <Text style={styles.subtitle}>Um passeio ecologicamente correto</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={[styles.textinput, { width: "82%" }]}
              onChangeText={text => this.setState({ userId: text })}
              placeholder={"Id do Usuário"}
              placeholderTextColor={"#FFFFFF"}
              value={userId}
            />
          </View>
          <View style={[styles.textinputContainer, { marginTop: 25 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={"Id da Bicicleta"}
              placeholderTextColor={"#FFFFFF"}
              value={bikeId}
            />
            <TouchableOpacity
              style={styles.scanbutton}
              onPress={() => this.getCameraPermissions()}
            >
              <Text style={styles.scanbuttonText}>Digitalizar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={this.handleTransaction}
          >
            <Text style={styles.buttonText}>Desbloquear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0E6F0"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  title: {
    fontSize: 40,
    fontFamily: "Rajdhani_600SemiBold",
    paddingTop: 20,
    color: "#4C5D70"
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Rajdhani_600SemiBold",
    color: "#4C5D70",
    marginBottom: 80
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#4C5D70",
    borderColor: "#4C5D70"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#4C5D70",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#F88379",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#FBE5C0",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 20,
    color: "#4C5D70",
    fontFamily: "Rajdhani_600SemiBold"
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBE5C0",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4C5D70"
  },
  buttonText: {
    fontSize: 24,
    color: "#4C5D70",
    fontFamily: "Rajdhani_600SemiBold"
  }
});
