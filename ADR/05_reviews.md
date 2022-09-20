# Review Process

## Status

Accepted

## Context

Im Rahmen des Projekts sollen Änderungen von einem oder mehreren Review Buddies kontrolliert werden bevor sie in den Main-Branch gemerged werden.
Dazu werden pull requests von Github verwendet.

## Decision

In jedem Arbeitsschritt wird ein entsprechender issue erzeugt. Änderungen werden zunächst in einem zusätzlichen dev-Branch vorgenommen. Anschließend wird ein pull request für die Review Buddies erzeugt damit diese Gelegenheit haben Kommentare/Hinweise zu geben oder Fragen zu stellen.
Nachdem die Review Buddies ihr approval gegeben haben, kann der dev-branch mit dem main-branch gemerged werden.
Es wurde sich darauf verständigt, dass 1 approval eines Review-Buddies ausreicht. Es besteht zudem die Vereinbarung, dass die Review Buddies per Discord in Kontakt bleiben und regelmäßige Meetings veranstalten.

## Consequences

Für jeden Arbeitsschritt muss ein neues issue erstellt werden.
Bevor Änderungen im main-branch erfolgen wird mindestens 1 approval eines Review-Buddies benötigt.