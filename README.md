# App ausführen
## Vorraussetzungen zur Darstellung im Browser

Folgende Programme müssen vorhanden sein
1. node + npm
2. Ionic und Angular CLI: `npm i -g @ionic/cli @angular/cli`

Anschließend den Befehl 'npm install' im Projektordner einmalig laufen lassen
Außerdem muss in hosts die Alias-URL u25-app.caritas.de für localhost eingerichtet sein

### Darstellung im Browser
1. `npm run serve` im Browser ausführen und den Anweisungen in der Konsole folgen

## Zusätzliche Vorausstzungen für Android-Entwicklung
3. Java
4. Gradle
5. Android Studio
6. Bei Node-Gyp und Python Fehler: Windows Build Tools installieren (beinhaltet Python)

### Darstellung auf Android
1. `ionic capacitor run android` ausführen
2. Im sich öffnenden Android Studio die App builden und deployen
