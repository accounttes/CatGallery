# Настройка CatGallery

## Настройка Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)
2. Добавьте приложение для Android и iOS
3. Скачайте файлы конфигурации:
   - Для Android: `google-services.json`
   - Для iOS: `GoogleService-Info.plist`
4. Поместите файлы в соответствующие директории:
   - Android: `android/app/google-services.json`
   - iOS: `ios/CatGallery/GoogleService-Info.plist`
5. Замените значения в `src/config/firebase.ts`

## Настройка Google Sign-In

1. Включите Google Sign-In в Firebase Console
2. Получите Web Client ID из Google Cloud Console
3. Замените значение в `src/services/socialAuth.ts`

## Настройка TheCatAPI

1. Зарегистрируйтесь на [TheCatAPI](https://thecatapi.com/)
2. Получите API ключ
3. Замените значение в `src/config/api.ts`

## Настройка Push-уведомлений

1. Включите Cloud Messaging в Firebase Console
2. Настройте сертификаты для iOS
3. Убедитесь, что у вас есть необходимые разрешения в манифестах:
   - Android: `android/app/src/main/AndroidManifest.xml`
   - iOS: `ios/CatGallery/Info.plist`

## Запуск приложения

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите приложение:
   ```bash
   npm start
   ```

3. Для Android:
   ```bash
   npm run android
   ```

4. Для iOS:
   ```bash
   npm run ios
   ``` 