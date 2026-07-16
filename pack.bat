REM The MIT License (MIT)
REM
REM Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
REM Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
REM
REM Permission is hereby granted, free of charge, to any person obtaining a copy
REM of this software and associated documentation files (the "Software"), to deal
REM in the Software without restriction, including without limitation the rights
REM to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
REM copies of the Software, and to permit persons to whom the Software is
REM furnished to do so, subject to the following conditions:
REM
REM The above copyright notice and this permission notice shall be included in all
REM copies or substantial portions of the Software.
REM
REM THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
REM IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
REM FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
REM AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
REM LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
REM OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
REM SOFTWARE.

@ECHO OFF
@GOTO :MAIN %*

:USAGE
@ECHO usage:
@ECHO     "%COMSPEC%" /C pack.bat
@ECHO         to generate a tar.gz
@ECHO
@GOTO :SUCCESS

:COMPRESS
@SETLOCAL
@SET _QUOTED_TARGET_DIR=%1
@SET _QUOTED_TARGET_DIRNAME=%2
@SET _QUOTED_CURRENT_DIR=%3
@SET _TARGET_CURRENT_DIR=%_QUOTED_CURRENT_DIR:~1,-1%
@SET _TARGET_DIRNAME=%_QUOTED_TARGET_DIRNAME:~1,-1%
@SET _TARGET_DIR=%_QUOTED_TARGET_DIR:~1,-1%
@IF "%_TARGET_DIRNAME%" EQU "setup-lua" (
    @IF EXIST %_QUOTED_CURRENT_DIR% (
        @IF EXIST %_QUOTED_TARGET_DIR% (
            @IF EXIST "%_TARGET_DIR%%_TARGET_DIRNAME%" (
                @FOR /F "USEBACKQ TOKENS=*" %%G IN (`where TAR`) DO (
                    @IF %ERRORLEVEL% EQU 0 (
                        @PUSHD %_QUOTED_TARGET_DIR%
                        @TAR -czvf "%_TARGET_CURRENT_DIR%\setup-lua.tar.gz" "--exclude=.git" "--exclude=.vscode" "--exclude=src\CacheService.ts" "--exclude=src\GitHubCore.ts" "--exclude=src\Console.ts" "--exclude=package-lock.json" "--exclude=node_modules" "--exclude=.lua" %_QUOTED_TARGET_DIRNAME%
                        @IF %ERRORLEVEL% EQU 0 (
                            @POPD %_QUOTED_TARGET_DIR%
                            @GOTO :SUCCESS
                        ) ELSE (
                            @POPD %_QUOTED_TARGET_DIR%
                            @GOTO :FAIL
                        )
                    ) ELSE (
                        @ECHO Unable to find tar. Please, install tar to pack the source code.
                        @GOTO :FAIL
                    )
                )
            ) ELSE (
                @ECHO Subdirectory %_QUOTED_TARGET_DIRNAME% not found at directory %_QUOTED_TARGET_DIR%
                @GOTO :FAIL
            )
        ) ELSE (
            @ECHO Directory %_QUOTED_TARGET_DIR% not found
            @GOTO :FAIL
        )
    ) ELSE (
        @ECHO Current directory %_QUOTED_CURRENT_DIR% not found
        @GOTO :FAIL
    )
) ELSE (
    @ECHO Invalid directory name to pack. Please, rename the pack directory to `setup-lua'
    @GOTO :FAIL
)
@ENDLOCAL

:MAIN
@IF "%1" EQU "--help" (
    @GOTO :USAGE
) ELSE (
    @FOR %%A IN ("%~dp0.") DO @CALL :COMPRESS "%%~dpA" "%%~nA" "%CD%"
)

:SUCCESS
@EXIT /B 0

:FAIL
@EXIT /B 1
