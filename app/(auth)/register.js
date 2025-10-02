import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
            return;
        }

        setLoading(true);
        try {
            const result = await signUp(name, email, password);

            if (result.success) {
                Alert.alert('Sucesso', 'Registro realizado com sucesso!', [
                    { text: 'OK' }
                ]);
            } else {
                Alert.alert('Erro', result.message || 'Falha no registro. Tente novamente.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao registrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps='handled'>
            <View style={styles.content}>
                <Text style={styles.emoji}>🌟</Text>
                <Text style={styles.title}>Criar conta</Text>
                <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

                <TextInput
                style={styles.input}
                placeholder='Nome completo'
                value={name}
                onChangeText={setName}
                autoCapitalize='words'
                editable={!loading}
                />

                <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                editable={!loading}
                />

                <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color='#fff' />
                    ) : (
                        <Text style={styles.buttonText}>Registrar</Text>
                    )}

                </TouchableOpacity>

                <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                disabled={loading}>
                    <Text style={styles.backButtonText}>Voltar para o login</Text>
                    
                </TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}