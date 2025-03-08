import { Tabs } from 'expo-router';
import { Ruler, Settings } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeContext';
import Colors from '../../components/Colors';

export default function TabLayout() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.tint,
      tabBarInactiveTintColor: colors.tabIconDefault,
      tabBarStyle: {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
      },
      headerStyle: {
        backgroundColor: colors.card,
      },
      headerTintColor: colors.text,
      headerShown: false, // Hide the header to make app fullscreen
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color, size }) => <Ruler size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}