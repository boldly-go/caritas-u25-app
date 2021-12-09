export class LockServiceMock {
    isUnlocked = true;

    hasPin() {
        return Promise.resolve(true);
    }
    initializePinLock(form: any) {
        return Promise.resolve(null);
    }
    changePin(newPin: string) {}
    unlockApp(pin: string) {}
    activatePinSecurity() {}
}
