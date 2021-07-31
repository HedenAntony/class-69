import React from 'react'
import { Text,View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from "expo-barcode-scanner"


export default class BookTransactionScreen extends React.Component{
    constructor(){
       super()
       this.state={
           hasCameraPermissions: null,
           scanned: false,
           scannedData: '',
           buttonState:"normal",

       }
    }

    getCameraPermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        /*

        status === "granted"---------->true/false
        */ 
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState : "clicked"
        })
    }

    handleBarCodeScanned =async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal"
        })

    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState  
        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned = {
                    scanned ? undefined : this.handleBarCodeScanned
                }
                />
            )
        }
        else if(buttonState === "normal")
        {

        return(
            <View style={styles.container}>

                <Text style={styles.displayText}>
                    {
                        hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
                    }
                </Text>
                <TouchableOpacity style={styles.scanButton}
                onPress={this.getCameraPermission}>
                    <Text>Scan QR Code</Text>
                </TouchableOpacity>

            </View>
        )
                }
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: "underline"
    },
    scanButton: {
        backgroundColor: "green",
        padding:10,
        margin:10
    }
})




