# Daten

## Status

ungeklärt

## Context

Die Daten die auf der Website angezeigt werden befinden sich in einer JSON-Datei. Diese soll nicht Teil des Repositorys sein, damit der Inhalt vor fremdem Zugriff geschützt ist.
Um die Datei nicht mit ins Repository zu pushen wird der Dateiname in der .gitignore-Datei eingetragen.



## Decision

Eine Möglichkeit ist es, die Datei auf einem externen Webserver anzubieten, von dem die Daten bei Bedarf übertragen werden.
Eine weitere Möglichkeit ist es einen File-Upload einzubauen, so dass jeder Anwender selbst im Besitz der Datei sein muss.
Eine Verschlüsselung der Datei ist als eine weitere Möglichkeit denkbar.

Bisher nicht abschließend geklärt.

## Consequences

