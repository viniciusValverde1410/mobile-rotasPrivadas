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
    ActivityIndicator
} from 'react-native';

import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

    setLoading(true);
    try {
        const result = await signIn(email, password);

        if (!result.success) {
            Alert.alert('Erro', result.message || 'Falha no login. Tente novamente.');
        }
    } catch (error) {
        Alert.alert('Erro', 'Falha ao fazer login ');
    } finally {
        setLoading(false);
    }
}


return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
            <Text style={styles.emoji}>🔒</Text>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

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

            <TextInput
            style={styles.input}
            placeholder='Senha'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            />

            <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}>
                {loading ? (
                    <ActivityIndicator color='#FFF' />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Não tem uma conta?</Text>
                <Link href="/(auth)/register" asChild>
                <TouchableOpacity disabled={loading}>
                    <Text style={styles.registerLink}>Registrar-se</Text>
                </TouchableOpacity>
                </Link>
            </View>

            <Text style={styles.infoText}>
                💡 Dica: Se não tiver conta, crie uma nova!
            </Text>

        </View>
    </KeyboardAvoidingView>
)

}

const styles = StyleSheet.create({
    contaiiner: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    }
})