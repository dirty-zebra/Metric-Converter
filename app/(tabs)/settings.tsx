import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform, Dimensions } from 'react-native';
import { Info } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeContext';
import Colors from '../../components/Colors';

export default function SettingsScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;
  const windowWidth = Dimensions.get('window').width;
  const maxWidth = Math.min(450, windowWidth * 0.9); // Limit max width for larger screens

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
    infoBox: {
      flexDirection: 'row',
      backgroundColor: colors.infoBackground,
      padding: 16,
      borderRadius: 8,
      marginBottom: 20,
      alignItems: 'center',
    },
    infoIcon: {
      marginRight: 12,
    },
    infoText: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
      lineHeight: 22,
    },
    section: {
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: colors.text,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    infoLabel: {
      fontSize: 16,
      color: colors.text,
    },
    infoValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    description: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 22,
    },
    listItem: {
      fontSize: 15,
      color: colors.text,
      marginBottom: 8,
      paddingLeft: 8,
    },
    themeInfo: {
      fontSize: 15,
      color: colors.text,
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <View style={styles.infoBox}>
                <Info size={24} color={colors.tint} style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  This app converts millimeters to inches with precision to 5 decimal places.
                </Text>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Version</Text>
                  <Text style={styles.infoValue}>1.0.0</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Conversion Formula</Text>
                  <Text style={styles.infoValue}>1 mm = 0.0393701 in</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Theme</Text>
                  <Text style={styles.infoValue}>{isDark ? 'Dark' : 'Light'}</Text>
                </View>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                <Text style={styles.description}>
                  This app automatically adjusts to your device's theme settings.
                </Text>
                <Text style={styles.themeInfo}>
                  Current theme: <Text style={{fontWeight: 'bold'}}>{isDark ? 'Dark' : 'Light'}</Text>
                </Text>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Precision</Text>
                <Text style={styles.description}>
                  All conversions are displayed with 5 decimal places for maximum precision.
                </Text>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>How to Use</Text>
                <Text style={styles.listItem}>1. Enter a value in millimeters</Text>
                <Text style={styles.listItem}>2. See the converted value in inches</Text>
                <Text style={styles.listItem}>3. Save conversions to view in history</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}