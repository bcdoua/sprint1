// frontend/src/screens/auth/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { authService } from '../../services/api';

const RegisterScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit avoir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.register({ name, email, password });

      if (data.success) {
        Alert.alert(
          'Succès !',
          'Compte créé avec succès ! Vous pouvez maintenant vous connecter.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Erreur', data.message || "Échec de l'inscription");
      }
    } catch (error: any) {
      Alert.alert('Erreur', error.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez Spendio pour gérer vos finances
          </Text>
        </View>

        <View style={styles.form}>
          {/* Nom */}
          <Text style={styles.label}>Nom complet</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Votre nom"
            placeholderTextColor={colors.textLight}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            autoCapitalize="words"
            autoFocus={true} // ← Clavier ouvert automatiquement
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="votre@email.com"
            placeholderTextColor={colors.textLight}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            autoComplete="email"
          />

          {/* Mot de passe */}
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Minimum 6 caractères"
            placeholderTextColor={colors.textLight}
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
            textContentType="password"
            autoComplete="password"
          />

          {/* Confirmer le mot de passe */}
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Retapez votre mot de passe"
            placeholderTextColor={colors.textLight}
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry
            textContentType="password"
            autoComplete="password"
          />

          {/* Bouton Créer */}
          <TouchableOpacity
            style={[globalStyles.button, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? 'Création...' : 'Créer mon compte'}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  linkText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterScreen;
