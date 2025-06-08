import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Send, Users, QrCode, Phone, Wifi, WifiOff, ArrowRight, Camera } from 'lucide-react-native';

export default function Transfers() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transferMethod, setTransferMethod] = useState('phone'); // 'phone', 'qr', 'contact'
  const [isOnline, setIsOnline] = useState(true);

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  const recentContacts = [
    { id: 1, name: 'Amadou Bah', phone: '+224 622 123 456', avatar: 'AB' },
    { id: 2, name: 'Fatoumata Diallo', phone: '+224 655 789 012', avatar: 'FD' },
    { id: 3, name: 'Ibrahim Camara', phone: '+224 628 345 678', avatar: 'IC' },
  ];

  const handleTransfer = () => {
    if (!amount || !recipient) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (isOnline) {
      Alert.alert(
        'Transfert Confirmé',
        `${amount} GNF envoyé à ${recipient}`,
        [{ text: 'OK', style: 'default' }]
      );
    } else {
      Alert.alert(
        'Transfert Programmé',
        'Votre transfert sera effectué dès que la connexion sera rétablie',
        [{ text: 'OK', style: 'default' }]
      );
    }
    
    setAmount('');
    setRecipient('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeInDown.duration(400)}>
          <Text style={styles.title}>Transfert d'Argent</Text>
          <View style={styles.connectionStatus}>
            {isOnline ? (
              <Wifi color="#4ECDC4" size={20} />
            ) : (
              <WifiOff color="#FF6B35" size={20} />
            )}
            <Text style={[styles.statusText, { color: isOnline ? '#4ECDC4' : '#FF6B35' }]}>
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </Text>
          </View>
        </Animated.View>

        {/* Transfer Methods */}
        <Animated.View 
          style={styles.methodsContainer}
          entering={FadeInDown.duration(400).delay(100)}
        >
          <Text style={styles.sectionTitle}>Méthode de Transfert</Text>
          <View style={styles.methodsGrid}>
            <TouchableOpacity 
              style={[styles.methodCard, transferMethod === 'phone' && styles.methodCardActive]}
              onPress={() => setTransferMethod('phone')}
            >
              <Phone color={transferMethod === 'phone' ? '#FFFFFF' : '#D4AF37'} size={24} />
              <Text style={[styles.methodText, transferMethod === 'phone' && styles.methodTextActive]}>
                Numéro
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.methodCard, transferMethod === 'qr' && styles.methodCardActive]}
              onPress={() => setTransferMethod('qr')}
            >
              <QrCode color={transferMethod === 'qr' ? '#FFFFFF' : '#D4AF37'} size={24} />
              <Text style={[styles.methodText, transferMethod === 'qr' && styles.methodTextActive]}>
                QR Code
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.methodCard, transferMethod === 'contact' && styles.methodCardActive]}
              onPress={() => setTransferMethod('contact')}
            >
              <Users color={transferMethod === 'contact' ? '#FFFFFF' : '#D4AF37'} size={24} />
              <Text style={[styles.methodText, transferMethod === 'contact' && styles.methodTextActive]}>
                Contact
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Transfer Form */}
        <Animated.View 
          style={styles.formContainer}
          entering={FadeInDown.duration(400).delay(200)}
        >
          <Text style={styles.sectionTitle}>Détails du Transfert</Text>
          
          {/* Amount Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Montant (GNF)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountsContainer}>
            <Text style={styles.quickAmountsLabel}>Montants Rapides</Text>
            <View style={styles.quickAmountsGrid}>
              {quickAmounts.map((quickAmount) => (
                <TouchableOpacity 
                  key={quickAmount}
                  style={styles.quickAmountButton}
                  onPress={() => setAmount(quickAmount.toString())}
                >
                  <Text style={styles.quickAmountText}>
                    {quickAmount.toLocaleString('fr-FR')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recipient Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {transferMethod === 'phone' ? 'Numéro de téléphone' : 
               transferMethod === 'qr' ? 'Destinataire (via QR Code)' : 'Destinataire'}
            </Text>
            {transferMethod === 'qr' ? (
              <TouchableOpacity 
                style={styles.qrButton}
                onPress={() => Alert.alert('Scan QR', 'Fonctionnalité de scan QR à implémenter')}
              >
                <Camera color="#D4AF37" size={24} />
                <Text style={styles.qrButtonText}>Scanner un QR Code</Text>
              </TouchableOpacity>
            ) : (
              <TextInput
                style={styles.input}
                value={recipient}
                onChangeText={setRecipient}
                placeholder={transferMethod === 'phone' ? '+224 6XX XXX XXX' : 'Nom du destinataire'}
                keyboardType={transferMethod === 'phone' ? 'phone-pad' : 'default'}
                placeholderTextColor="#8E8E93"
              />
            )}
          </View>

          {/* Transfer Button */}
          <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
            <Send color="#FFFFFF" size={20} />
            <Text style={styles.transferButtonText}>
              {isOnline ? 'Envoyer Maintenant' : 'Programmer le Transfert'}
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </Animated.View>

        {/* Recent Contacts */}
        <Animated.View 
          style={styles.contactsContainer}
          entering={FadeInDown.duration(400).delay(300)}
        >
          <Text style={styles.sectionTitle}>Contacts Récents</Text>
          {recentContacts.map((contact) => (
            <TouchableOpacity 
              key={contact.id} 
              style={styles.contactItem}
              onPress={() => {
                setRecipient(contact.phone);
                setTransferMethod('phone');
              }}
            >
              <View style={styles.contactAvatar}>
                <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <ArrowRight color="#8E8E93" size={20} />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Offline Mode Info */}
        {!isOnline && (
          <Animated.View 
            style={styles.offlineInfo}
            entering={FadeInDown.duration(400).delay(400)}
          >
            <WifiOff color="#FF6B35" size={20} />
            <Text style={styles.offlineText}>
              Mode hors ligne : Les transferts seront traités dès la reconnexion
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
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  methodsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  methodsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  methodCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  methodCardActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  methodText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 8,
  },
  methodTextActive: {
    color: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
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
  quickAmountsContainer: {
    marginBottom: 20,
  },
  quickAmountsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 12,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAmountButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16, // Adjusted padding for consistency
    borderWidth: 1,
    borderColor: '#D4AF37',
    gap: 12,
  },
  qrButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 18,
    gap: 12,
    marginTop: 8,
  },
  transferButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contactsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contactItem: {
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
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#8E8E93',
  },
  offlineInfo: {
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