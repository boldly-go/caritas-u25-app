import { Injectable } from '@angular/core';
import { PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { FCM_TOKEN } from '../storage-keys';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { UtilityService } from './utility.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class PushService {
    public isActive = true;

    constructor(
        private router: Router,
        private platform: Platform,
        private storage: StorageService,
        private utility: UtilityService,
        private userService: UserService
    ) {}

    initialize() {
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermissions().then((result) => {
            if (result.receive === 'granted') {
                PushNotifications.register();
            }
        });

        this.storage.getValue(FCM_TOKEN).then((fcmToken) => {
            if (!fcmToken && environment.initPush) {
                PushNotifications.addListener('registration', (token: Token) => {
                    // Save token on successful registration
                    this.storage.storeValue(FCM_TOKEN, token.value);
                    this.userService.registerFcmToken(token.value).subscribe();
                });
            }
        });

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError', () => {
            this.utility.showAlert(
                'Fehler',
                'Es gab einen Fehler bei der Registrierung von Pushbenachrichtigungen. Wenn du eine Info bekommen möchtest bei neuen Nachrichten, ' +
                    'dann wende dich bitte an den Support.'
            );
        });

        if (this.isActive) {
            this.activate();
        }
    }

    public activate() {
        if (this.platform.is('mobile')) {
            this.storage.getValue(FCM_TOKEN).then((token) => {
                if (token) {
                    this.userService.registerFcmToken(token).subscribe();
                }
            });
            // Create local push notification when app is already open
            PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
                LocalNotifications.schedule({
                    notifications: [
                        {
                            title: notification.title,
                            body: notification.body,
                            id: new Date(Date.now() + 500).getTime(),
                            schedule: { at: new Date(Date.now() + 500) }
                        }
                    ]
                });
            });

            // When tapping on a notification enter your pin and get redirected to message overview afterwards
            const notificationActionPerformed = () => {
                this.router.navigate(['/counselling'], { replaceUrl: true });
            };
            PushNotifications.addListener('pushNotificationActionPerformed', notificationActionPerformed);
            LocalNotifications.addListener('localNotificationActionPerformed', notificationActionPerformed);
            this.isActive = true;
        }
    }

    public deactivate() {
        PushNotifications.removeAllListeners();
        this.userService.registerFcmToken('').subscribe();
        this.isActive = false;
    }
}
