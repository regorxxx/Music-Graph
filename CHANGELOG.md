# Changelog

## [Table of Contents]
- [Unreleased](#unreleased)
- [2.0.0](#200---2023-08-15)
- [1.2.0](#120---2022-04-13)
- [1.1.0](#110---2021-12-23)
- [1.0.2](#102---2021-06-07)
- [1.0.1](#101---2021-05-26)
- [1.0.0](#100---2021-05-02)

## [Unreleased][]
### Added
- Cultural Regions: complete integration of cultural regions; all styles on graph are now added.
- Descriptors: improved debug routines to avoid situations where a substitution term doesn't exist in the graph.
- Descriptors: improved debug tests to avoid duplicates entries in substitutions, influences, etc.
- Descriptors: improved pathfinder routines to throw -with a descriptive error- when a path is not found due to some genre not being connected to the graph.
- Descriptors: updated descriptors with multiple additions: Kuduro, Semba, Kizomba, African Ritual-Tribal, Afro-Latin Ritual-Tribal, Asian Ritual-Tribal, Aboriginal Folk, Pre-Columbian Ritual-Tribal, Mbalax, Melodic Techno-House, Kawaii Metal, Branle, Darksynth, Country Rap, Square Dance, Rodeo, Jug Band, K-Pop, J-Pop, Kayokyoku.
- Descriptors: added 'Chamber Music XL', Orchestral Music XL', 'Ballroom Music XL', 'Poetry-Secular Music XL', 'Choral-Spiritual Music XL' and 'Choral-Orchestral Music XL' classical music style clusters.
- Descriptors: AllMusic support linking their genre/styles to the graph with substitutions.
- HTML: added buttons to directly go to live version or open the GitHub repository.
- Minor speed optimizations when looking for similar tracks.
### Changed
- Pathfinder: updated A* pathfinder with altest version from [ngraph.path](https://github.com/anvaka/ngraph.path).
- Pathfinder: getDistanceFromPath() has a new argument 'bJointGraph' which defaults to true, to indicate wether it should throw for disjoing graphs or not when there is no path.
- Pathfinder: calcGraphDistance() has a new argument 'bJointGraph' which defaults to true, to indicate wether it should throw for disjoing graphs or not when there is no path.
- Pathfinder: pathfinder method is now set only at calcGraphDistance(), so all debug and tests functions found at 'music_graph_xxx.js' and 'music_graph_test_xxx.js' no longer require setting the same pathfinder.
- Pathfinder: calcGraphDistance() now ouputs {distance, influence, path} as result instead of an array. Since now the path is output, there is no longer need to reuse the pathfinder later for debugging/test purposes.
- Descriptors: extended debug tests for accents, ASCII compatibility and capitalization for all entries (including AllMusic).
- Descriptors: updated descriptors with multiple influences.
- Debug: cleanup of debug routines, added comments about symmetries for distance calculation and better logging.
- HTML: minor UI tweaks.
- HTML: moved HTML related scripts to its own folder.
- HTML: updated jquery dependency.
- Code cleanup.
### Removed
### Fixed
- Pathfinder: fix long time bug on A* pathfinder which made it unusable. NBA* was used anyway so it doesn't affect at all current functionality.
- Pathfinder: fix distances output by getDistanceFromPath() due to incorrect handling of multi-edge graphs on [ngraph.graph](https://github.com/anvaka/ngraph.graph), where only the first link found was used. As result new values could be lower in some cases.
- Descriptors: cleanup of duplicates entries and other minor errors in substitutions, influences, etc.

## [2.0.0] - 2023-08-15
### Added
### Changed
- GRAPH: changed distance logic to be invariant to inversion (A->BC = BC -> A) and equivalent tag values (A->B1B2B3 = A-> B1B2) addition; both were lowering the total distance 'for free' in some cases.
- GRAPH: minor performance improvement using non-oriented links.
- Descriptors: updated descriptors with multiple additions.
- Descriptors: all style/genres on the graph use now ASCII only values, so it should be easier to match any value to them if required.
- Descriptors: improved debug checks for the genre/style graph.
- Descriptors: changed style cluster distance.
- Descriptors: updated and improved descriptors documentation (present on .js files).
- HTML: tries to load the user descriptors file from data folder first, then from helpers folder if not found. Will give a warning on console on the latter.
- Reworked files structure.
### Removed
### Fixed

## [1.2.0] - 2022-04-13
### Added
- HTML: Added statistics calculation. To run it, use the associated button, results will be shown on a popup and cached for the current session. Statistics button is now animated while processing
- HTML: Added reset view button.
- HTML: SuperGenre legend is now dragable.
- HTML: Selecting a node and pressing shift while hovering another node shows the distance (+ influences) between them.
- HTML: Selecting a node and pressing shift while hovering another node highlights the shortest path between them.
- HTML: Added favicon.
- Debug: added 'graphStatistics' function which will perform basic statistical analysis over the entire graph, providing variables like: mean, median, standard deviation, distance histogram, etc. Given those values, it's reasonably easy to 'choose' the right values to retrieve nodes for a given distance threshold.
- Debug: added multiple letter case checks at debug.
- Debug: added accent checks (instead of single quotes) at debug.
- Debug: added ASCII compatibility checks at debug.
### Changed
- HTML: Changed CSS layout to adjust sizes according to window.
### Removed
### Fixed
- Descriptors: fixed multiple letter case errors.
- Descriptors: fixed accent usage instead of single quote.
- Cultural Regions: improved capitalization logic.
- Progress code in multiple tools have been fixed to display more accurately the percentage progress in the log.

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

[Unreleased]: https://github.com/regorxxx/Music-Graph/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/regorxxx/Music-Graph/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/regorxxx/Music-Graph/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/regorxxx/Music-Graph/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/regorxxx/Music-Graph/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/regorxxx/Music-Graph/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/regorxxx/Music-Graph/compare/18ef1d3...v1.0.0