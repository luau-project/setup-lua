# The MIT License (MIT)
#
# Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
# Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

usage()
{
    echo
    echo "usage:"
    echo "    sh pack.sh"
    echo "        to generate a tar.gz"
    echo
}

if [ "$1" = "--help" ];
then
    usage
else
    script_dir="$(dirname "$0")"
    leading_dir="$(basename "$script_dir")"
    if [ "$leading_dir" = "setup-lua" ];
    then
        parent_dir="$(dirname "$script_dir")"
        if [ -d "$parent_dir" ];
        then
            if [ -f "$script_dir/package.json" ];
            then
                initial_dir="$PWD"
                if [ -d "$parent_dir" ];
                then
                    cd $parent_dir
                    tar -czvf "${initial_dir}/setup-lua.tar.gz" \
                        --exclude=.git \
                        --exclude=.vscode \
                        --exclude=src/CacheService.ts \
                        --exclude=src/GitHubCore.ts \
                        --exclude=src/Console.ts \
                        --exclude=package-lock.json \
                        --exclude=node_modules \
                        --exclude=.lua \
                        $leading_dir
                    cd $initial_dir
                else
                    echo "Invalid directory name to pack. Please, rename the pack directory to \`setup-lua'"
                    exit 1
                fi
            else
                echo "This is NOT setup-lua directory"
                exit 1
            fi
        else
            echo "'$parent_dir' is NOT a directory"
            exit 1
        fi
    else
        echo "Invalid directory name to pack. Please, rename the pack directory to \`setup-lua'"
        exit 1
    fi
fi