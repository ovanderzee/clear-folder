# Changelog

## [4.1.0] - 2022-06-05

Better support for using clear-folder logic in a script.

### Changed
- Dependency update
- Access to logic without handling cli process

### Fixed
- Fix typescript declaration


## [4.0.0] - 2022-01-23

Modernise along with NodeJS.

### Changed
- BREAKING: Clear-folder is an es-module now.
- Use recursive method to delete and leave path to conditional deleting


## [3.1.0] - 2022-01-20

### Added
- Typescript support
- Return codes
- Colored program-flow messages

### Changed
- Migrate from travis to circle-ci
- Gentler handling of unwanted situations

### Fixed
- Fix breaking loop when folder was not found
- Replaced vague test skipping by using return codes


## [3.0.0] - 2021-05-14

Deal with various forms a folder-path can have.

### Added
- Handle absolute paths

### Changed
- BREAKING: Path operators ( '.', '..' ) are resolved now
- BREAKING: '~' is now treated as a normal name by the module


## [2.0.0] - 2020-06-05

After a year it was time to mature clear-folder a bit.
The main intention is the scripts section of the package.json,
still bare-bones.

### Added
- Brief alias 'cf' for the command name 'clear-folder'
- Errorhandling and error messages
- CommonJS export of the main function
- Tests
- Formatting

### Changed
- Path operators ( '.', '..', '~' ) are rejected now.
