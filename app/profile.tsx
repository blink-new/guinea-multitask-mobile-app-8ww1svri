import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Smartphone,
  History,
  CreditCard,
  Moon,
  Wifi,
  Download
} from 'lucide-react-native';

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const userInfo = {
    name: 'Mamadou Diallo',
    phone: '+224 622 123 456',
    email: 'mamadou.diallo@gmail.com',
    accountNumber: 'GNP001234567',
    balance: 125000,
    memberSince: 'Janvier 2024'
  };

  const menuSections = [
    {
      title: 'Mon Compte',
      items: [
        { id: 'account', title: 'Informations du Compte', icon: User, action: 'navigate' },
        { id: 'cards', title: 'Mes Cartes', icon: CreditCard, action: 'navigate' },
        { id: 'history', title: 'Historique des Transactions', icon: History, action: 'navigate' },
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { 
          id: 'notifications', 
          title: 'Notifications', 
          icon: Bell, 
          action: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled
        },
        { 
          id: 'offline', 
          title: 'Mode Hors Ligne', 
          icon: Wifi, 
          action: 'toggle',
          value: offlineModeEnabled,
          onToggle: setOfflineModeEnabled
        },
        { 
          id: 'darkmode', 
          title: 'Mode Sombre', 
          icon: Moon, 
          action: 'toggle',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled
        },
        { id: 'security', title: 'Sécurité', icon: Shield, action: 'navigate' },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', title: 'Centre d\'Aide', icon: HelpCircle, action: 'navigate' },
        { id: 'settings', title: 'Paramètres Avancés', icon: Settings, action: 'navigate' },
        { id: 'sync', title: 'Synchroniser les Données', icon: Download, action: 'action' },
      ]
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => {
          Alert.alert('Déconnecté', 'Vous avez été déconnecté avec succès');
        }}
      ]
    );
  };

  const handleMenuAction = (item: any) => {
    switch (item.action) {
      case 'navigate':
        Alert.alert('Navigation', `Ouverture de ${item.title}`);
        break;
      case 'action':
        if (item.id === 'sync') {
          Alert.alert('Synchronisation', 'Données synchronisées avec succès');
        }
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
          <Text style={styles.title}>Mon Profil</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* User Info Card */}
        <Animated.View 
          style={styles.userCard}
          entering={FadeInDown.duration(400).delay(100)}
        >
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userPhone}>{userInfo.phone}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            
            <View style={styles.accountDetails}>
              <View style={styles.accountItem}>
                <Text style={styles.accountLabel}>Numéro de Compte</Text>
                <Text style={styles.accountValue}>{userInfo.accountNumber}</Text>
              </View>
              
              <View style={styles.accountItem}>
                <Text style={styles.accountLabel}>Solde Actuel</Text>
                <Text style={styles.accountBalance}>
                  {userInfo.balance.toLocaleString('fr-FR')} GNF
                </Text>
              </View>
              
              <View style={styles.accountItem}>
                <Text style={styles.accountLabel}>Membre depuis</Text>
                <Text style={styles.accountValue}>{userInfo.memberSince}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          style={styles.statsContainer}
          entering={FadeInDown.duration(400).delay(200)}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Transferts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Factures</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Recharges</Text>
          </View>
        </Animated.View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <Animated.View 
            key={section.title}
            style={styles.menuSection}
            entering={FadeInDown.duration(400).delay(300 + sectionIndex * 100)}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuAction(item)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <item.icon color="#D4AF37" size={20} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                
                {item.action === 'toggle' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#E5E5EA', true: '#D4AF37' }}
                    thumbColor="#FFFFFF"
                  />
                ) : (
                  <ChevronRight color="#8E8E93" size={20} />
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        ))}

        {/* Offline Mode Info */}
        {offlineModeEnabled && (
          <Animated.View 
            style={styles.offlineInfo}
            entering={FadeInDown.duration(400).delay(600)}
          >
            <Wifi color="#4ECDC4" size={20} />
            <View style={styles.offlineInfoContent}>
              <Text style={styles.offlineInfoTitle}>Mode Hors Ligne Activé</Text>
              <Text style={styles.offlineInfoText}>
                Vos transactions seront automatiquement synchronisées lors de la reconnexion
              </Text>
            </View>
          </Animated.View>
        )}

        {/* App Info */}
        <Animated.View 
          style={styles.appInfo}
          entering={FadeInDown.duration(400).delay(700)}
        >
          <View style={styles.appInfoItem}>
            <Smartphone color="#8E8E93" size={16} />
            <Text style={styles.appInfoText}>GuinéePay v1.0.0</Text>
          </View>
          <Text style={styles.appInfoText}>Développé avec ❤️ pour la Guinée</Text>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View 
          style={styles.logoutContainer}
          entering={FadeInDown.duration(400).delay(800)}
        >
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut color="#FF6B35" size={20} />
            <Text style={styles.logoutButtonText}>Se Déconnecter</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  editButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  userAvatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 20,
  },
  accountDetails: {
    width: '100%',
    gap: 12,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  accountLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  accountValue: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '600',
  },
  accountBalance: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D4AF37',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  offlineInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FFF4',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
  },
  offlineInfoContent: {
    flex: 1,
  },
  offlineInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  offlineInfoText: {
    fontSize: 12,
    color: '#4ECDC4',
    lineHeight: 16,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  appInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appInfoText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF6B35',
    gap: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
});