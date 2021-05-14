# Changelog


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
