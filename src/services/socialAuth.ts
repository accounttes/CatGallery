import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebase';
import { store } from '../store';
import { setUser, setError } from '../store/authSlice';

// Настройка Google Sign-In
GoogleSignin.configure({
  webClientId: '123456789-abcdef.apps.googleusercontent.com', // Ваш Web Client ID из Firebase Console
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  try {
    // Получаем ID токен от Google
    const { idToken } = await GoogleSignin.signIn();

    // Создаем учетные данные Google
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Входим в Firebase с учетными данными Google
    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;

    // Сохраняем информацию о пользователе в Redux
    store.dispatch(
      setUser({
        id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        photoURL: user.photoURL || undefined,
      })
    );

    return user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    store.dispatch(setError('Ошибка при входе через Google'));
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    // Реализация входа через Facebook
    // Требуется дополнительная настройка Facebook SDK
    throw new Error('Facebook login not implemented');
  } catch (error) {
    console.error('Facebook Sign-In Error:', error);
    store.dispatch(setError('Ошибка при входе через Facebook'));
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    store.dispatch(setUser(null));
  } catch (error) {
    console.error('Sign Out Error:', error);
    store.dispatch(setError('Ошибка при выходе'));
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth().currentUser;
}; 