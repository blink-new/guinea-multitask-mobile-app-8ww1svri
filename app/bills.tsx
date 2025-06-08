import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Zap, Droplets, Wifi, Home, Receipt, Calendar, ArrowRight, CheckCircle } from 'lucide-react-native';

export default function Bills() {
  const [selectedBill, setSelectedBill] = useState(null);
  const [customerNumber, setCustomerNumber] = useState('');
  const [amount, setAmount] = useState('');

  const billTypes = [
    { id: 'edg', name: 'EDG (Électricité)', icon: Zap, color: '#FFD60A', provider: 'Électricité de Guinée' },
    { id: 'seg', name: 'SEG (Eau)', icon: Droplets, color: '#4ECDC4', provider: 'Société des Eaux de Guinée' },
    { id: 'internet', name: 'Internet', icon: Wifi, color: '#007AFF', provider: 'Divers Fournisseurs' },
    { id: 'rent', name: 'Loyer', icon: Home, color: '#FF6B35', provider: 'Gestion Immobilière' },
  ];

  const recentBills = [
    { id: 1, type: 'EDG', amount: 45000, reference: 'EDG123456', status: 'Payée', date: '15/01/2024' },
    { id: 2, type: 'SEG', amount: 28000, reference: 'SEG789012', status: 'En attente', date: '10/01/2024' },
    { id: 3, type: 'Internet', amount: 75000, reference: 'INT345678', status: 'Payée', date: '05/01/2024' },
  ];

  const handlePayBill = () => {
    if (!selectedBill || !customerNumber) {
      Alert.alert('Erreur', 'Veuillez sélectionner une facture et renseigner votre numéro client');
      return;
    }

    Alert.alert(
      'Paiement Confirmé',
      `Facture ${selectedBill.name} payée avec succès\nRéférence: ${customerNumber}`,
      [{ text: 'OK', style: 'default' }]
    );
    
    setSelectedBill(null);
    setCustomerNumber('');
    setAmount('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payée': return '#4ECDC4';
      case 'En attente': return '#FFD60A';
      case 'En retard': return '#FF6B35';
      default: return '#8E8E93';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
          <Text style={styles.title}>Paiement de Factures</Text>
          <Receipt color="#D4AF37" size={28} />
        </Animated.View>

        {/* Bill Types */}
        <Animated.View 
          style={styles.billTypesContainer}
          entering={FadeInDown.duration(400).delay(100)}
        >
          <Text style={styles.sectionTitle}>Type de Facture</Text>
          <View style={styles.billTypesGrid}>
            {billTypes.map((bill) => (
              <TouchableOpacity 
                key={bill.id}
                style={[
                  styles.billTypeCard,
                  selectedBill?.id === bill.id && styles.billTypeCardActive
                ]}
                onPress={() => setSelectedBill(bill)}
              >
                <View style={[styles.billTypeIcon, { backgroundColor: bill.color }]}>
                  <bill.icon color="#FFFFFF" size={24} />
                </View>
                <Text style={styles.billTypeName}>{bill.name}</Text>
                <Text style={styles.billTypeProvider}>{bill.provider}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Payment Form */}
        {selectedBill && (
          <Animated.View 
            style={styles.paymentForm}
            entering={FadeInDown.duration(400).delay(200)}
          >
            <Text style={styles.sectionTitle}>Paiement {selectedBill.name}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Numéro Client / Référence</Text>
              <TextInput
                style={styles.input}
                value={customerNumber}
                onChangeText={setCustomerNumber}
                placeholder="Ex: 123456789"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {selectedBill.id !== 'rent' && (
              <TouchableOpacity style={styles.checkBillButton}>
                <Text style={styles.checkBillText}>Vérifier la Facture</Text>
                <ArrowRight color="#D4AF37" size={20} />
              </TouchableOpacity>
            )}

            {selectedBill.id === 'rent' && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Montant du Loyer (GNF)</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#8E8E93"
                />
              </View>
            )}

            <TouchableOpacity style={styles.payButton} onPress={handlePayBill}>
              <CheckCircle color="#FFFFFF" size={20} />
              <Text style={styles.payButtonText}>Payer la Facture</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Recent Bills */}
        <Animated.View 
          style={styles.recentBillsContainer}
          entering={FadeInDown.duration(400).delay(300)}
        >
          <Text style={styles.sectionTitle}>Factures Récentes</Text>
          {recentBills.map((bill) => (
            <View key={bill.id} style={styles.billItem}>
              <View style={styles.billIcon}>
                {bill.type === 'EDG' && <Zap color="#FFD60A" size={20} />}
                {bill.type === 'SEG' && <Droplets color="#4ECDC4" size={20} />}
                {bill.type === 'Internet' && <Wifi color="#007AFF" size={20} />}
              </View>
              
              <View style={styles.billInfo}>
                <Text style={styles.billType}>{bill.type}</Text>
                <Text style={styles.billReference}>Réf: {bill.reference}</Text>
                <Text style={styles.billDate}>{bill.date}</Text>
              </View>

              <View style={styles.billDetails}>
                <Text style={styles.billAmount}>
                  {bill.amount.toLocaleString('fr-FR')} GNF
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bill.status) }]}>
                  <Text style={styles.statusText}>{bill.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Quick Tips */}
        <Animated.View 
          style={styles.tipsContainer}
          entering={FadeInDown.duration(400).delay(400)}
        >
          <Text style={styles.sectionTitle}>Conseils Rapides</Text>
          <View style={styles.tipCard}>
            <Calendar color="#D4AF37" size={20} />
            <Text style={styles.tipText}>
              Programmez vos paiements récurrents pour ne jamais oublier vos factures
            </Text>
          </View>
          <View style={styles.tipCard}>
            <CheckCircle color="#4ECDC4" size={20} />
            <Text style={styles.tipText}>
              Vérifiez toujours votre numéro client avant de valider le paiement
            </Text>
          </View>
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
  billTypesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  billTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  billTypeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  billTypeCardActive: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9E6',
  },
  billTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  billTypeName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  billTypeProvider: {
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
  },
  paymentForm: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  checkBillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    gap: 8,
    marginBottom: 16,
  },
  checkBillText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 18,
    gap: 12,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recentBillsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  billItem: {
    flexDirection: 'row',
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
  billIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  billInfo: {
    flex: 1,
  },
  billType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  billReference: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  billDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  billDetails: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#1C1C1E',
    flex: 1,
    lineHeight: 20,
  },
});