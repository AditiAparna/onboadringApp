import React from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import Pdf from 'react-native-pdf';

export default function PDFViewer() {
  const source = {uri: 'bundle-assets://path/to/Sample.pdf'};

  return (
    <ScrollView style={styles.container}>
      <Pdf trustAllCerts={false} source={source} style={styles.pdf} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
