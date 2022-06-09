# Review Process

## Status

Open

## Context

Im Rahmen des Projekts sollen etwaige Änderungen von einem oder mehreren Review Buddies kontrolliert werden bevor sie in den Main-Branch gemerged werden.
Dazu werden pull requests von Github verwendet.

## Decision

In jedem Arbeitsschritt wird ein entsprechender issue erzeugt. Änderungen werden zunächst in einem zusätzlichen dev-Branch vorgenommen. Anschließend wird ein pull request für die Review buddies erzeugt damit diese Gelegenheit haben Kommentare/Hinweise zu geben oder Fragen zu stellen.
Nachdem die Review Buddies ihr approval gegeben haben, kann der dev-branch mit dem main-branch gemerged werden.
Es wurde sich darauf verständigt, dass 1 approval eines Review-Buddies ausreicht.

## Consequences

Für jeden Arbeitsschritt muss ein neues issue erstellt werden.
Bevor Änderungen im main-branch erfolgen wird mindestens 1 approval eines Review-Buddies benötigt.