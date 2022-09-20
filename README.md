# Web Technologien // begleitendes Projekt Sommersemester 2022

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.

# Inhaber
Stefan Steinhauer

# Aktueller Link
pfropfen.github.io

# Nutzung des Docker Images
Für die Verwendung des Images wird Docker benötigt.
Der Container auf Basis des angebotenen Images lässt sich mit folgendem Befehl starten:

docker run -p 8080:80 -d --name beiboottest pfropfen/meisterwerke:latest

Anschließend kann die Website lokal über localhost:8080 erreicht werden.

# Nutzung lokal mit XAMPP
Das Programm XAMPP (https://www.apachefriends.org/de/download.html) sowie die JSON-Datei des Projekts wird benötigt. 
1. Den Inhalt des Repositorys nach \xampp\htdocs\ kopieren.
2. Die JSON-Datei 'cda-paintings-2022-04-22.de' nach \xampp\htdocs\json\ kopieren.
3. In XAMPP den Apache-Server starten.

Anschließend kann die Website lokal über localhost:80 erreicht werden. 

# Steuerung
L.Maustaste: Betreten (Cursor einfangen)
ESC: Verlassen (Cursor freigeben)

WASD/Cursortasten/Maus: Bewegung
u/j: hoch/runter

1-9: Sichtweite (Jahre)
0: maximale Sichtweite (alle Jahre) 
+/-: Sichtweite erhöhen/veringern (1 Jahr)

r: Related Images ein-/ausblenden





