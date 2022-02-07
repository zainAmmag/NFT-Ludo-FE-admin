import React from "react";
import { StyleSheet, Modal,Text, ActivityIndicator,View, Dimensions} from "react";
const {width,height} =Dimensions.get("screen");
export const Loader = ({ state }) => {
  return (
    <Modal transparent={true} animationType={"none"} visible={state}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={state}/>
          <Text>Please Wait...</Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: "#00000040"
    },
    activityIndicatorWrapper: {
      backgroundColor: "#FFFFFF",
      height: 100,
      width: 100,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around"
    }
});
