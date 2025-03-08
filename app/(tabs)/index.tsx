import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../components/ThemeContext';
import Colors from '../../components/Colors';

export default function ConverterScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const windowWidth = Dimensions.get('window').width;
  const maxWidth = Math.min(450, windowWidth * 0.9); // Limit max width for larger screens
  
  const [millimeters, setMillimeters] = useState('');
  const [inches, setInches] = useState('0.00000');
  const [history, setHistory] = useState<{ mm: string; inches: string }[]>([]);

  // Convert mm to inches when millimeters input changes
  useEffect(() => {
    if (millimeters === '') {
      setInches('0.00000');
      return;
    }

    const mmValue = parseFloat(millimeters);
    if (!isNaN(mmValue)) {
      // 1 mm = 0.0393701 inches
      const inchesValue = mmValue * 0.0393701;
      setInches(inchesValue.toFixed(5));
    }
  }, [millimeters]);

  const handleSaveConversion = () => {
    if (millimeters && !isNaN(parseFloat(millimeters))) {
      const newEntry = { mm: millimeters, inches };
      setHistory([newEntry, ...history.slice(0, 9)]); // Keep only last 10 entries
      setMillimeters('');
    }
  };

  const handleClear = () => {
    setMillimeters('');
    setInches('0.00000');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 30,
      paddingHorizontal: 16,
    },
    cardWrapper: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      width: maxWidth,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      shadowColor: colors.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: colors.text,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 18,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    resultContainer: {
      marginBottom: 20,
    },
    resultBox: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      backgroundColor: colors.resultBackground,
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.tint,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      padding: 14,
      borderRadius: 8,
      backgroundColor: colors.buttonBackground,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    primaryButton: {
      backgroundColor: colors.primaryButton,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.buttonText,
    },
    primaryButtonText: {
      color: colors.primaryButtonText,
      fontWeight: '600',
      fontSize: 16,
    },
    historyCard: {
      width: maxWidth,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginTop: 20,
      shadowColor: colors.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    historyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: colors.text,
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.historyBorder,
    },
    historyText: {
      fontSize: 16,
      color: colors.historyText,
      flex: 1,
    },
    historyArrow: {
      fontSize: 16,
      color: colors.historyArrow,
      marginHorizontal: 10,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.contentContainer}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Millimeters (mm)</Text>
                  <TextInput
                    style={styles.input}
                    value={millimeters}
                    onChangeText={setMillimeters}
                    placeholder="Enter millimeters"
                    placeholderTextColor={isDark ? '#777777' : '#999999'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    autoFocus
                  />
                </View>
                
                <View style={styles.resultContainer}>
                  <Text style={styles.label}>Inches (in)</Text>
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>{inches}</Text>
                  </View>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleClear}>
                    <Text style={styles.buttonText}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.primaryButton]} 
                    onPress={handleSaveConversion}
                    disabled={!millimeters || isNaN(parseFloat(millimeters))}
                  >
                    <Text style={styles.primaryButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {history.length > 0 && (
                <View style={styles.historyCard}>
                  <Text style={styles.historyTitle}>Conversion History</Text>
                  {history.map((item, index) => (
                    <View key={index} style={styles.historyItem}>
                      <Text style={styles.historyText}>{item.mm} mm</Text>
                      <Text style={styles.historyArrow}>→</Text>
                      <Text style={styles.historyText}>{item.inches} in</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}