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
import { subtract } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

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
        padding: 20,
    },
    emoji: {
        fontSize: 60,
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle : {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    button: {
        backgroundColor: '#8257E5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        minHeight: 50,
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#8257E5',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 30,
        fontSize: 14,
    },

})