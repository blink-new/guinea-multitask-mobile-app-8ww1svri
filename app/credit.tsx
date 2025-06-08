import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Phone, Smartphone, Radio, Wifi, ArrowRight, CheckCircle } from 'lucide-react-native';

export default function Credit() {
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);

  const operators = [
    { id: 'orange', name: 'Orange', color: '#FF8C00', prefix: '622, 623, 624, 625' },
    { id: 'mtn', name: 'MTN', color: '#FFD700', prefix: '620, 621' },
    { id: 'cellcom', name: 'Cellcom', color: '#00CED1', prefix: '626, 627' },
  ];

  const creditAmounts = [
    { value: 1000, label: '1 000 GNF', bonus: '' },
    { value: 2000, label: '2 000 GNF', bonus: '+200 bonus' },
    { value: 5000, label: '5 000 GNF', bonus: '+750 bonus' },
    { value: 10000, label: '10 000 GNF', bonus: '+2000 bonus' },
    { value: 20000, label: '20 000 GNF', bonus: '+5000 bonus' },
    { value: 50000, label: '50 000 GNF', bonus: '+15000 bonus' },
  ];

  const serviceTypes = [
    { id: 'credit', name: 'Crédit d\'Appel', icon: Phone, description: 'Recharge pour appels et SMS' },
    { id: 'data', name: 'Internet Mobile', icon: Wifi, description: 'Forfaits data internet' },
    { id: 'combo', name: 'Forfait Combo', icon: Smartphone, description: 'Appels + Internet' },
  ];

  const recentTopUps = [
    { id: 1, number: '+224 622 123 456', operator: 'Orange', amount: 10000, date: '14:30', status: 'Réussi' },
    { id: 2, number: '+224 620 789 012', operator: 'MTN', amount: 5000, date: '12:15', status: 'Réussi' },
    { id: 3, number: '+224 626 345 678', operator: 'Cellcom', amount: 2000, date: '10:00', status: 'En cours' },
  ];

  const handleTopUp = () => {
    if (!selectedOperator || !phoneNumber || !selectedAmount) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    Alert.alert(
      'Recharge Confirmée',
      `${selectedAmount.label} envoyé au ${phoneNumber}\nOpérateur: ${selectedOperator.name}`,
      [{ text: 'OK', style: 'default' }]
    );
    
    setPhoneNumber('');
    setSelectedAmount(null);
  };

  const getOperatorFromNumber = (number: string) => {
    const prefix = number.replace('+224 ', '').substring(0, 3);
    if (['622', '623', '624', '625'].includes(prefix)) return operators[0]; // Orange
    if (['620', '621'].includes(prefix)) return operators[1]; // MTN
    if (['626', '627'].includes(prefix)) return operators[2]; // Cellcom
    return null;
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    const detectedOperator = getOperatorFromNumber(text);
    if (detectedOperator) {
      setSelectedOperator(detectedOperator);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
          <Text style={styles.title}>Achat de Crédit</Text>
          <Phone color="#D4AF37" size={28} />
        </Animated.View>

        {/* Service Types */}
        <Animated.View 
          style={styles.serviceTypesContainer}
          entering={FadeInDown.duration(400).delay(100)}
        >
          <Text style={styles.sectionTitle}>Type de Service</Text>
          <View style={styles.serviceTypesGrid}>
            {serviceTypes.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceTypeCard}>
                <service.icon color="#D4AF37" size={24} />
                <Text style={styles.serviceTypeName}>{service.name}</Text>
                <Text style={styles.serviceTypeDescription}>{service.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Phone Number Input */}
        <Animated.View 
          style={styles.phoneInputContainer}
          entering={FadeInDown.duration(400).delay(200)}
        >
          <Text style={styles.sectionTitle}>Numéro de Téléphone</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="+224 6XX XXX XXX"
              keyboardType="phone-pad"
              placeholderTextColor="#8E8E93"
            />
            {selectedOperator && (
              <View style={[styles.operatorIndicator, { backgroundColor: selectedOperator.color }]}>
                <Text style={styles.operatorName}>{selectedOperator.name}</Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Operators */}
        <Animated.View 
          style={styles.operatorsContainer}
          entering={FadeInDown.duration(400).delay(300)}
        >
          <Text style={styles.sectionTitle}>Opérateur</Text>
          <View style={styles.operatorsGrid}>
            {operators.map((operator) => (
              <TouchableOpacity 
                key={operator.id}
                style={[
                  styles.operatorCard,
                  selectedOperator?.id === operator.id && styles.operatorCardActive
                ]}
                onPress={() => setSelectedOperator(operator)}
              >
                <View style={[styles.operatorIcon, { backgroundColor: operator.color }]}>
                  <Radio color="#FFFFFF" size={20} />
                </View>
                <Text style={styles.operatorNameCard}>{operator.name}</Text>
                <Text style={styles.operatorPrefix}>{operator.prefix}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Credit Amounts */}
        <Animated.View 
          style={styles.amountsContainer}
          entering={FadeInDown.duration(400).delay(400)}
        >
          <Text style={styles.sectionTitle}>Montant de Recharge</Text>
          <View style={styles.amountsGrid}>
            {creditAmounts.map((amount) => (
              <TouchableOpacity 
                key={amount.value}
                style={[
                  styles.amountCard,
                  selectedAmount?.value === amount.value && styles.amountCardActive
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[
                  styles.amountValue,
                  selectedAmount?.value === amount.value && styles.amountValueActive
                ]}>
                  {amount.label}
                </Text>
                {amount.bonus && (
                  <Text style={[
                    styles.amountBonus,
                    selectedAmount?.value === amount.value && styles.amountBonusActive
                  ]}>
                    {amount.bonus}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Purchase Button */}
        {selectedOperator && phoneNumber && selectedAmount && (
          <Animated.View 
            style={styles.purchaseContainer}
            entering={FadeInDown.duration(400).delay(500)}
          >
            <TouchableOpacity style={styles.purchaseButton} onPress={handleTopUp}>
              <CheckCircle color="#FFFFFF" size={20} />
              <Text style={styles.purchaseButtonText}>
                Acheter {selectedAmount.label}
              </Text>
              <ArrowRight color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Recent Top-ups */}
        <Animated.View 
          style={styles.recentContainer}
          entering={FadeInDown.duration(400).delay(600)}
        >
          <Text style={styles.sectionTitle}>Recharges Récentes</Text>
          {recentTopUps.map((topup) => (
            <View key={topup.id} style={styles.topupItem}>
              <View style={styles.topupIcon}>
                <Phone color="#D4AF37" size={20} />
              </View>
              
              <View style={styles.topupInfo}>
                <Text style={styles.topupNumber}>{topup.number}</Text>
                <Text style={styles.topupOperator}>{topup.operator}</Text>
                <Text style={styles.topupDate}>{topup.date}</Text>
              </View>

              <View style={styles.topupDetails}>
                <Text style={styles.topupAmount}>
                  {topup.amount.toLocaleString('fr-FR')} GNF
                </Text>
                <View style={[
                  styles.topupStatus,
                  { backgroundColor: topup.status === 'Réussi' ? '#4ECDC4' : '#FFD60A' }
                ]}>
                  <Text style={styles.topupStatusText}>{topup.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={styles.quickActionsContainer}
          entering={FadeInDown.duration(400).delay(700)}
        >
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <TouchableOpacity style={styles.quickActionCard}>
            <Smartphone color="#D4AF37" size={24} />
            <View style={styles.quickActionContent}>
              <Text style={styles.quickActionTitle}>Recharge pour Soi</Text>
              <Text style={styles.quickActionSubtitle}>Utilisez votre numéro automatiquement</Text>
            </View>
            <ArrowRight color="#8E8E93" size={20} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Radio color="#D4AF37" size={24} />
            <View style={styles.quickActionContent}>
              <Text style={styles.quickActionTitle}>Forfaits Internet</Text>
              <Text style={styles.quickActionSubtitle}>Packages data spéciaux</Text>
            </View>
            <ArrowRight color="#8E8E93" size={20} />
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
  serviceTypesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  serviceTypesGrid: {
    gap: 12,
  },
  serviceTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  serviceTypeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  serviceTypeDescription: {
    fontSize: 12,
    color: '#8E8E93',
    flex: 2,
  },
  phoneInputContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputContainer: {
    position: 'relative',
  },
  phoneInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingRight: selectedOperator ? 80 : 16,
  },
  operatorIndicator: {
    position: 'absolute',
    right: 8,
    top: 8,
    bottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  operatorsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  operatorsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  operatorCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  operatorCardActive: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9E6',
  },
  operatorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  operatorNameCard: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  operatorPrefix: {
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
  },
  amountsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amountCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  amountCardActive: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF9E6',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  amountValueActive: {
    color: '#D4AF37',
  },
  amountBonus: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  amountBonusActive: {
    color: '#4ECDC4',
  },
  purchaseContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  purchaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 18,
    gap: 12,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recentContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  topupItem: {
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
  topupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  topupInfo: {
    flex: 1,
  },
  topupNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  topupOperator: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  topupDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  topupDetails: {
    alignItems: 'flex-end',
  },
  topupAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  topupStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topupStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
});