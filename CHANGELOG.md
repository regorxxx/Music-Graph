# Changelog

## [Table of Contents]
- [Unreleased](#unreleased)
- [1.1.0](#110---2021-12-23)
- [1.0.2](#102---2021-06-07)
- [1.0.1](#101---2021-05-26)
- [1.0.0](#100---2021-05-02)

## [Unreleased][]
### Added
- HTML: Added statistics calculation. To run it, use the associated button, results will be shown on a popup and cached for the current session.
- HTML: Added reset view button.
- HTML: SuperGenre legend is now dragable.
- HTML: Selecting a node and pressing shift while hovering another node shows the distance (+ influences) between them.
- HTML: Selecting a node and pressing shift while hovering another node highlights the shortest path between them.
- HTML: Added favicon.
- Debug: added 'graphStatistics' function which will perform basic statistical analysis over the entire graph, providing variables like: mean, median, standard deviation, distance histogram, etc. Given those values, it's reasonably easy to 'choose' the right values to retrieve nodes for a given distance threshold.
### Changed
### Removed
### Fixed

## [1.1.0] - 2021-12-23
### Added
- Descriptors: Updated descriptors. Added multiple genre and styles to punk, rock, pop, folk, industrial, downtempo and metal super-genres, along their style clusters, substitutions and influence relations.
### Changed
- Influences: Added 4 methods to check influences: 'fullPath', 'adjacentNodes', 'zeroNodes' and 'direct'. 'direct' is the previous behavior ("bugged") checking only the first against the last node. 'zeroNodes' the fix listed below. 'adjacentNodes' works like zeroNodes but without forcing the adjacent nodes to be substitutions (checks (A,B) against (Y,Z), i.e. max. 4 possible links). 'fullPath' checks all consecutive links on the path (A->B), (B->C), ...) and also applies 'adjacentNodes' logic (to check the origin and final nodes). 'adjacentNodes' is now the default behavior.
- Debug: new config to show popup even after test passing (meant to be used along on demand checks). Default behavior remains the same, popup only appears if errors are found.
- Helpers: Moved all external libraries to 'helpers-external'.
### Removed
### Fixed
- Influences: were not being correctly parsed when the original or the final node was a substitution (zero weight). Now adjacent nodes which may be substitutions are also checked at both sides, for ex for this path: Hip-Hop <- Rap_supergenre <- Rap_cluster <- Rythm Music_supercluster <- Blue_Note_cluster <- Blues_supergenre <- Blues. Where Hip-Hop is a substitution for Rap_supergenre, Rap_supergenre is checked against Blues_supergenre and/or Blues for (anti)influences. Note it doesn't check for links at Hip-Hop since the influences link are always added to the generic items by design (in this case Rap_supergenre_supergenre), so there is max. 1 possible link. (note this may be overridden by the default behavior listed at top)

## [1.0.2] - 2021-06-07
### Added
### Changed
- Helpers: Moved all external libraries to 'helpers-external'.
### Removed
### Fixed

## [1.0.1] - 2021-05-26
### Added
- Descriptors: Multiple new additions.
### Changed
- Debug: Greatly expanded the debug functions to check possible errors or inconsistencies in the descriptors. It should be foolproof now.
- Descriptors: Multiple fixes on descriptors found with the new debug code.
### Removed
### Fixed

## [1.0.0] - 2021-05-02
### Added
- First release.
### Changed
### Removed
### Fixed

[Unreleased]: https://github.com/regorxxx/Music-Graph/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/regorxxx/Music-Graph/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/regorxxx/Music-Graph/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/regorxxx/Music-Graph/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/regorxxx/Music-Graph/compare/18ef1d3...v1.0.0
