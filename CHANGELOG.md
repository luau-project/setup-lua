## setup-lua v2.0.4

* Fixed a bug building PUC-Lua on BSD systems (tested with `FreeBSD 15`) that didn't set proper compilation flags. This caused the Lua interpreter to be built without `io.popen`, which `LuaRocks` requires to work properly. Now, BSD systems employ the `LUA_USE_LINUX` macro to build PUC-Lua;
* Upgrade on dependencies:
  * `@vercel/ncc`: from version `0.44.1` to `0.45.0`

## setup-lua v2.0.3

* Added support to install Lua 5.4.9 RC1 (`5.4.9-rc1`);
* Upgrade on dependencies:
  * `@types/node`: from version `26.1.1` to `26.2.0`
  * `undici-types`: from version `8.9.0` to `8.10.0`

## setup-lua v2.0.2

* Added support to install Lua 5.5.1. Now, the `5.5` alias resolves to Lua `5.5.1`;
* Added source code comments explaining how to alter the source code to support release candidates;
* Added a section (`Unique Features`) on docs detailing the functionalities not found on other actions / tools;
* Fixed docs in old changelog entries regarding the installed files for `pkg-config`;
* Fixed CLI docs to include an assignment to `PATH` environment variable on Windows in post-install instructions.

## setup-lua v2.0.1

* Fixed an issue that didn't wrote the `R` variable in the installed `pkg-config` file in the format `X.Y.Z` for work versions of PUC-Lua (e.g.: it was writing `R=5.5.1-rc1` for Lua `5.5.1-rc1`);
* From now on, following the direction of multiple Unix distributions (Debian, Arch Linux), multiple versioned files for `pkg-config` are being installed for PUC-Lua. For instance, `setup-lua` is installing the files `lua-5.5.pc`, `lua5.5.pc`, `lua-55.pc` and `lua55.pc`. Previously, a single file `lua5.5.pc` was installed;
* Added PUC-Lua 5.5.1-rc2 (see [https://groups.google.com/g/lua-l/c/wxeL7VPNLYg](https://groups.google.com/g/lua-l/c/wxeL7VPNLYg)) to the list of available versions to install;
* Added post-install instructions to CLI docs.

## setup-lua v2.0.0

> [!IMPORTANT]
> 
> **BREAKING CHANGE**: This project was converted to be an ESM module.

* All dependencies were upgraded to the latest release, except for `typescript`;
* Due the upgrade of `@actions/core` and `@actions/cache` to ESM modules, `setup-lua` is now also an ESM module. This is a breaking change. Thus, we are bumping the major version;
* Fixed an issue that didn't set PUC-Lua versions dependent on readline on `macOS` and `Linux`;
* Added license to all important files;
* Moved the recommended GitHub Action to setup MSVC from `ilammy/msvc-cmd-dev` to `step-security/msvc-cmd-dev` both on CI and docs. The user `ilammy` does not respond to issues / PRs, and the previous action was emitting warnings due the use of EOL nodejs versions;
* Added support to install Lua 5.5.1 RC1 (see [https://groups.google.com/g/lua-l/c/e6Bp2KbFvPg](https://groups.google.com/g/lua-l/c/e6Bp2KbFvPg));
* Added new issue templates to ease communication:
  * [02-feature-request.yml](.github/ISSUE_TEMPLATE/02-feature-request.yml) to request features to be implemented in `setup-lua`;
  * [03-update-dependencies.yml](.github/ISSUE_TEMPLATE/03-update-dependencies.yml) to request an update on dependencies in `setup-lua`;
  * [04-update-lua.yml](.github/ISSUE_TEMPLATE/04-update-lua.yml) to request an update on PUC-Lua versions in `setup-lua`;
  * [05-update-luarocks.yml](.github/ISSUE_TEMPLATE/05-update-luarocks.yml) to request an update on LuaRocks versions in `setup-lua`.

## setup-lua v1.1.1

* Upgraded dependencies to fix vulnerabilities according to `npm audit fix`;
* Fixed a bug that didn't add the default Lua path defined at compile-time for both `LUA_PATH` and `LUA_CPATH` environment variables;
* Refactored the logic to detect the usage inside a CI environment.

## setup-lua v1.1.0

* Added basic support to install Lua / LuaJIT / OpenResty + LuaRocks on `setup-lua` running in a MSYS2 shell through the CLI interface;
* Added examples on docs showing how to install on MSYS2.

## setup-lua v1.0.9

* Added support for LuaRocks 3.13.0;
* Turned Lua 5.5.0 the default version when it is omitted by the user.

## setup-lua v1.0.8

* Added support to apply remote patches to Lua / LuaJIT / OpenResty / LuaRocks after fetching the source code;
* Fixed a bug that didn't set the environment variables `DYLD_LIBRARY_PATH` on macOS and `LD_LIBRARY_PATH` on Unix-like distros to make the system aware of Lua's shared library;
* Now, as a security measure to avoid leaking secrets, all the output written on GitHub Actions goes through the method `core.info` of the package `@actions/core`;
* Added support to use the latest official release of Lua 5.5.0, available as labels `5.5` or `5.5.0`.

## setup-lua v1.0.7

* Added support to use the latest release candidate of Lua 5.5.0 (`5.5.0-rc4`).

## setup-lua v1.0.6

* Added support to use the latest release candidate of Lua 5.5.0 (`5.5.0-rc3`).

## setup-lua v1.0.5

* Added support to use the latest release candidate of Lua 5.5.0 (`5.5.0-rc2`).

## setup-lua v1.0.4

* Fixed a bug that caused the build of PUC-Lua to fail when the C compiler and linker was chosen as `clang++`;
* Added a CI job to ensure that PUC-Lua, LuaJIT and OpenResty build fine using `clang` as C compiler on Ubuntu;
* Tried to fix trigger conditions to skip CI when pushing tags, and keep ignoring changes on docs and markdown files.

## setup-lua v1.0.3

* Fixed a bug that didn't set `PKG_CONFIG_PATH` and `CMAKE_PREFIX_PATH` to make Lua / LuaJIT / OpenResty discoverable by `pkgconf` and `cmake`.

## setup-lua v1.0.2

* Added support to use the latest release candidate of Lua 5.5.0 (`5.5.0-rc1`).
* Fixed a bug to find the extracted directory name for release candidate versions of Lua.
* Fixed links in the documentation for work versions of Lua.

## setup-lua v1.0.1

* This is a bug-fix release. The main bug fixed lies in the part to set values for the `external_deps_dirs` LuaRocks config variable in order to adjust entries for `GCC`-like toolchains. Now, `C:\external` is going to be the first entry in the table `external_deps_dirs`, together with `%SYSTEMDRIVE%\external` as a second entry when `%SYSTEMDRIVE%` is not `C:`.
* Fixed a bug that didn't add the install bin directory to PATH environment variable when `luarocks-version` was `none`.
* Now, the examples on home page and also on docs for the GitHub Action only show the major version (e.g.: `luau-project/setup-lua@v1`). This has the intent to keep people with up-to-date versions whenever a minor or patch release takes place, removing the need for consumers of this action to update their workflows.

## setup-lua v1.0.0

Initial release.