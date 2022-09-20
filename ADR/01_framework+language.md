# Framework

## Status

Accepted

## Context

Innerhalb des Projekts wird eine statische Website (HTML/CSS) erstellt.
Es wurden P5.js und VueJS zur Umsetzung des Projekts in Betracht gezogen. Aufgrund der "künstlerischen" Möglichkeiten von P5 bestand im Voraus bereits ein eigenes Interesse. Da die Website im späteren Verlauf eine 3-dimensionale Ansicht erhalten soll, schien P5 eine praktikable Möglichkeit zu sein und möglicherweise interessante Funktionen zur Gestaltung der Website anbzuieten.

## Decision

Das Projekt wird mit P5.js umgesetzt. Da es als Webseite eingebunden werden soll, welche später möglicherweise dynamische Elemente erhält, wird Javascript als Programmiersprache innerhalb von P5 verwendet.


## Consequences

P5 verwendet um zu zeichnen ein "Cursor"-System. Man bewegt sich also immer nur relativ zur vorherigen Position anstatt mit einer festen Positionsmatrix. Es verfügt über keine vorgesehene OnClick-Funktion im klassischen Sinne. Dies erschwert, eine Funktion zu entwicklen um ein Objekt anzuklicken und dadurch eine Anweisung, bezogen auf das Objekt, auszuführen.
Mit Hilfe von Vektoren und den Positionsdaten der Objekte muss berechnet werden, ob sich ein Objekt im Sichtfeld der virtuellen Kamera befindet.
Da von vornherein nicht mit absoluten Positionswerten der Objekte gearbeitet wurde, kann die Funktion aus Zeitgründen nicht umgesetzt werden.