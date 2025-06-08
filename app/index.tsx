import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Send, Zap, Phone, Receipt, CreditCard, Wifi, WifiOff } from 'lucide-react-native';

export default function Home() {
  const [isOnline, setIsOnline] = React.useState(true);
  const balance = 125000; // Francs guinéens

  const quickActions = [
    { id: 1, title: 'Transfert Rapide', icon: Send, color: '#D4AF37' },
    { id: 2, title: 'Recharge', icon: Zap, color: '#FF6B35' },
    { id: 3, title: 'Factures', icon: Receipt, color: '#4ECDC4' },
    { id: 4, title: 'Crédit Tel', icon: Phone, color: '#95E1D3' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Transfert envoyé', amount: -15000, recipient: 'Amadou B.', time: '14:30' },
    { id: 2, type: 'Recharge reçue', amount: 25000, recipient: 'Orange Money', time: '12:15' },
    { id: 3, type: 'Facture EDG', amount: -8500, recipient: 'Électricité', time: '10:00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Bonjour,</Text>
              <Text style={styles.username}>Mamadou Diallo</Text>
            </View>
            <View style={styles.connectionStatus}>
              {isOnline ? (
                <Wifi color="#4ECDC4" size={24} />
              ) : (
                <WifiOff color="#FF6B35" size={24} />
              )}
              <Text style={[styles.statusText, { color: isOnline ? '#4ECDC4' : '#FF6B35' }]}>
                {isOnline ? 'En ligne' : 'Hors ligne'}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Balance Card */}
        <Animated.View 
          style={styles.balanceCard} 
          entering={FadeInDown.duration(400).delay(100)}
        >
          <Text style={styles.balanceLabel}>Solde Principal</Text>
          <Text style={styles.balanceAmount}>
            {balance.toLocaleString('fr-FR')} GNF
          </Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceActionButton}>
              <CreditCard color="#FFFFFF" size={20} />
              <Text style={styles.balanceActionText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceActionButton}>
              <Send color="#FFFFFF" size={20} />
              <Text style={styles.balanceActionText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={styles.quickActionsContainer}
          entering={FadeInDown.duration(400).delay(200)}
        >
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.quickActionCard, { backgroundColor: action.color }]}
              >
                <action.icon color="#FFFFFF" size={28} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View 
          style={styles.transactionsContainer}
          entering={FadeInDown.duration(400).delay(300)}
        >
          <Text style={styles.sectionTitle}>Transactions Récentes</Text>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionRecipient}>{transaction.recipient}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#4ECDC4' : '#FF6B35' }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('fr-FR')} GNF
                </Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Offline Mode Banner */}
        {!isOnline && (
          <Animated.View 
            style={styles.offlineBanner}
            entering={FadeInDown.duration(400).delay(400)}
          >
            <WifiOff color="#FF6B35" size={20} />
            <Text style={styles.offlineText}>
              Mode hors ligne activé. Les transactions seront synchronisées.
            </Text>
          </Animated.View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '400',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 2,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  balanceActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  transactionRecipient: {
    fontSize: 14,
    color: '#8E8E93',
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
  },
  offlineText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
    flex: 1,
  },
});