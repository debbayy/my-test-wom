import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, useColorScheme, SafeAreaView,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const t = dark ? dark_colors : light_colors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }
    const token = Math.random().toString(36);
    console.log('TOKEN:', token);
    navigation.replace('Home', { email });
  };

  const handleGoogleLogin = () => {
    // akan diisi setelah setup Firebase
    Alert.alert('Info', 'Google Login belum dikonfigurasi');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]}>
      <View style={styles.container}>

        {/* Logo */}
        <View style={[styles.logoCircle, { backgroundColor: t.logoBg }]}>
          <Text style={[styles.logoText, { color: t.accent }]}>M</Text>
        </View>

        <Text style={[styles.title, { color: t.text }]}>Selamat datang</Text>
        <Text style={[styles.subtitle, { color: t.muted }]}>Masuk ke akun kamu</Text>

        {/* Email */}
        <View style={styles.fieldWrap}>
          <Text style={[styles.label, { color: t.muted }]}>Email</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: t.inputBg,
              borderColor: focusedField === 'email' ? t.accent : t.border,
              color: t.text,
            }]}
            placeholder="contoh@email.com"
            placeholderTextColor={t.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password */}
        <View style={styles.fieldWrap}>
          <Text style={[styles.label, { color: t.muted }]}>Password</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: t.inputBg,
              borderColor: focusedField === 'password' ? t.accent : t.border,
              color: t.text,
            }]}
            placeholder="Masukkan password"
            placeholderTextColor={t.placeholder}
            secureTextEntry
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity>
          <Text style={[styles.forgot, { color: t.accent }]}>Lupa password?</Text>
        </TouchableOpacity>

        {/* Tombol Login */}
        <TouchableOpacity
          style={[styles.btnPrimary, { backgroundColor: t.accent }]}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={[styles.btnPrimaryText, { color: t.btnText }]}>Masuk</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: t.border }]} />
          <Text style={[styles.dividerText, { color: t.placeholder }]}>atau</Text>
          <View style={[styles.dividerLine, { backgroundColor: t.border }]} />
        </View>

        {/* Tombol Google */}
        <TouchableOpacity
          style={[styles.btnGoogle, {
            backgroundColor: t.inputBg,
            borderColor: t.border,
          }]}
          onPress={handleGoogleLogin}
          activeOpacity={0.85}
        >
          {/* ganti ini dengan GoogleIcon component setelah setup */}
          <Text style={{ fontSize: 16 }}>G</Text>
          <Text style={[styles.btnGoogleText, { color: t.text }]}>
            Lanjut dengan Google
          </Text>
        </TouchableOpacity>

        <Text style={[styles.signup, { color: t.muted }]}>
          Belum punya akun?{' '}
          <Text
            style={{ color: t.accent, fontWeight: '600' }}
            onPress={() => navigation.navigate('Register')}
          >
            Daftar
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const light_colors = {
  bg: '#fff',
  text: '#111',
  muted: '#888',
  placeholder: '#bbb',
  inputBg: '#fafafa',
  border: '#e0e0e0',
  accent: '#3B6D11',
  logoBg: '#EAF3DE',
  btnText: '#fff',
};

const dark_colors = {
  bg: '#1a1a1a',
  text: '#f0f0f0',
  muted: '#888',
  placeholder: '#555',
  inputBg: '#262626',
  border: '#333',
  accent: '#97C459',
  logoBg: '#27500A',
  btnText: '#173404',
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  logoCircle: {
    width: 60, height: 60, borderRadius: 30,
    alignSelf: 'center', alignItems: 'center',
    justifyContent: 'center', marginBottom: 16,
  },
  logoText: { fontSize: 26, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center' },
  subtitle: { fontSize: 13, textAlign: 'center', marginTop: 4, marginBottom: 24 },
  fieldWrap: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '500', marginBottom: 6 },
  input: {
    height: 46, borderRadius: 10, borderWidth: 1,
    paddingHorizontal: 14, fontSize: 14,
  },
  forgot: { fontSize: 12, textAlign: 'right', marginBottom: 20 },
  btnPrimary: {
    height: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  btnPrimaryText: { fontSize: 15, fontWeight: '600' },
  divider: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 20, gap: 10,
  },
  dividerLine: { flex: 1, height: 0.5 },
  dividerText: { fontSize: 12 },
  btnGoogle: {
    height: 48, borderRadius: 12, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
  },
  btnGoogleText: { fontSize: 14, fontWeight: '500' },
  signup: { fontSize: 12, textAlign: 'center', marginTop: 24 },
});