import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebViewQuillJS from 'react-native-webview-quilljs';

export default function Editor() {

    const [ content, setContent ] = useState();

    const [ defaultContent, setDefaultContent ] = useState({
        ops: [
            { insert: "This", attributes: { bold: true } },
            { insert: " is " },
            {
                insert: "react-native-webview-quill-js",
                attributes: { color: "#fcc" }
            }
        ]
    });

    function onMessageReceived(message){
        const { instruction, payload } = message;
        if (payload?.delta) {
          setContent(payload.delta);
        }
    };

    return (
        <>
            <View style={{ flexGrow: 1, width: '100%', padding: 10, marginBottom: 15 }}>
                <WebViewQuillJS
                    content={defaultContent}
                    backgroundColor={"#FAEBD7"}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({});
