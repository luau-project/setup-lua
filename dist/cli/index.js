import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "node:os"
const external_node_os_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:os");
;// CONCATENATED MODULE: external "node:path"
const external_node_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");
;// CONCATENATED MODULE: external "node:crypto"
const external_node_crypto_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:crypto");
;// CONCATENATED MODULE: external "node:fs/promises"
const promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");
;// CONCATENATED MODULE: ./src/Util/CompareVersions.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function compareVersions(v1, v2) {
    let result = 0;
    const l1 = v1.length;
    const l2 = v2.length;
    let i = 0;
    if (l1 <= l2) {
        while (result === 0 && i < l2) {
            result = (i < l1 ? v1[i] : 0) - v2[i];
            i++;
        }
    }
    else {
        while (result === 0 && i < l1) {
            result = v1[i] - (i < l2 ? v2[i] : 0);
            i++;
        }
    }
    return result;
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/PucLuaVersion.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

const LATEST_LUA_RELEASE_VERSION = "5.5.1";
const CONVERT_LUA_RELEASE_VERSION = {
    "5.1": "5.1.5",
    "5.2": "5.2.4",
    "5.3": "5.3.6",
    "5.4": "5.4.9",
    "5.5": LATEST_LUA_RELEASE_VERSION
};
const LUA_RELEASES = {
    "5.5.1": { "version": "5.5.1", "hash": { "algorithm": "sha256", "value": "1c4b4068d67061f2a2231ad2b5422e77acea1487ea9890f6320af614f4373dce" } },
    "5.5.0": { "version": "5.5.0", "hash": { "algorithm": "sha256", "value": "57ccc32bbbd005cab75bcc52444052535af691789dba2b9016d5c50640d68b3d" } },
    "5.4.9": { "version": "5.4.9", "hash": { "algorithm": "sha256", "value": "2335b6c582a52654f94612bf10d2f4672805d05329aa6568b1d8cd9e5c6fb8e6" } },
    "5.4.8": { "version": "5.4.8", "hash": { "algorithm": "sha256", "value": "4f18ddae154e793e46eeab727c59ef1c0c0c2b744e7b94219710d76f530629ae" } },
    "5.4.7": { "version": "5.4.7", "hash": { "algorithm": "sha256", "value": "9fbf5e28ef86c69858f6d3d34eccc32e911c1a28b4120ff3e84aaa70cfbf1e30" } },
    "5.4.6": { "version": "5.4.6", "hash": { "algorithm": "sha256", "value": "7d5ea1b9cb6aa0b59ca3dde1c6adcb57ef83a1ba8e5432c0ecd06bf439b3ad88" } },
    "5.4.5": { "version": "5.4.5", "hash": { "algorithm": "sha256", "value": "59df426a3d50ea535a460a452315c4c0d4e1121ba72ff0bdde58c2ef31d6f444" } },
    "5.4.4": { "version": "5.4.4", "hash": { "algorithm": "sha256", "value": "164c7849653b80ae67bec4b7473b884bf5cc8d2dca05653475ec2ed27b9ebf61" } },
    "5.4.3": { "version": "5.4.3", "hash": { "algorithm": "sha256", "value": "f8612276169e3bfcbcfb8f226195bfc6e466fe13042f1076cbde92b7ec96bbfb" } },
    "5.4.2": { "version": "5.4.2", "hash": { "algorithm": "sha256", "value": "11570d97e9d7303c0a59567ed1ac7c648340cd0db10d5fd594c09223ef2f524f" } },
    "5.4.1": { "version": "5.4.1", "hash": { "algorithm": "sha256", "value": "4ba786c3705eb9db6567af29c91a01b81f1c0ac3124fdbf6cd94bdd9e53cca7d" } },
    "5.4.0": { "version": "5.4.0", "hash": { "algorithm": "sha256", "value": "eac0836eb7219e421a96b7ee3692b93f0629e4cdb0c788432e3d10ce9ed47e28" } },
    "5.3.6": { "version": "5.3.6", "hash": { "algorithm": "sha256", "value": "fc5fd69bb8736323f026672b1b7235da613d7177e72558893a0bdcd320466d60" } },
    "5.3.5": { "version": "5.3.5", "hash": { "algorithm": "sha256", "value": "0c2eed3f960446e1a3e4b9a1ca2f3ff893b6ce41942cf54d5dd59ab4b3b058ac" } },
    "5.3.4": { "version": "5.3.4", "hash": { "algorithm": "sha256", "value": "f681aa518233bc407e23acf0f5887c884f17436f000d453b2491a9f11a52400c" } },
    "5.3.3": { "version": "5.3.3", "hash": { "algorithm": "sha256", "value": "5113c06884f7de453ce57702abaac1d618307f33f6789fa870e87a59d772aca2" } },
    "5.3.2": { "version": "5.3.2", "hash": { "algorithm": "sha256", "value": "c740c7bb23a936944e1cc63b7c3c5351a8976d7867c5252c8854f7b2af9da68f" } },
    "5.3.1": { "version": "5.3.1", "hash": { "algorithm": "sha256", "value": "072767aad6cc2e62044a66e8562f51770d941e972dc1e4068ba719cd8bffac17" } },
    "5.3.0": { "version": "5.3.0", "hash": { "algorithm": "sha256", "value": "ae4a5eb2d660515eb191bfe3e061f2b8ffe94dce73d32cfd0de090ddcc0ddb01" } },
    "5.2.4": { "version": "5.2.4", "hash": { "algorithm": "sha256", "value": "b9e2e4aad6789b3b63a056d442f7b39f0ecfca3ae0f1fc0ae4e9614401b69f4b" } },
    "5.2.3": { "version": "5.2.3", "hash": { "algorithm": "sha256", "value": "13c2fb97961381f7d06d5b5cea55b743c163800896fd5c5e2356201d3619002d" } },
    "5.2.2": { "version": "5.2.2", "hash": { "algorithm": "sha256", "value": "3fd67de3f5ed133bf312906082fa524545c6b9e1b952e8215ffbd27113f49f00" } },
    "5.2.1": { "version": "5.2.1", "hash": { "algorithm": "sha256", "value": "64304da87976133196f9e4c15250b70f444467b6ed80d7cfd7b3b982b5177be5" } },
    "5.2.0": { "version": "5.2.0", "hash": { "algorithm": "sha256", "value": "cabe379465aa8e388988073d59b69e76ba0025429d2c1da80821a252cdf6be0d" } },
    "5.1.5": { "version": "5.1.5", "hash": { "algorithm": "sha256", "value": "2640fc56a795f29d28ef15e13c34a47e223960b0240e8cb0a82d9b0738695333" } },
    "5.1.4": { "version": "5.1.4", "hash": { "algorithm": "sha256", "value": "b038e225eaf2a5b57c9bcc35cd13aa8c6c8288ef493d52970c9545074098af3a" } },
    "5.1.3": { "version": "5.1.3", "hash": { "algorithm": "sha256", "value": "6b5df2edaa5e02bf1a2d85e1442b2e329493b30b0c0780f77199d24f087d296d" } },
    "5.1.2": { "version": "5.1.2", "hash": { "algorithm": "sha256", "value": "5cf098c6fe68d3d2d9221904f1017ff0286e4a9cc166a1452a456df9b88b3d9e" } },
    "5.1.1": { "version": "5.1.1", "hash": { "algorithm": "sha256", "value": "c5daeed0a75d8e4dd2328b7c7a69888247868154acbda69110e97d4a6e17d1f0" } }
};
const LUA_WORKS = {
    "5.5.1-rc2": { "version": "5.5.1-rc2", "hash": { "algorithm": "sha256", "value": "1c4b4068d67061f2a2231ad2b5422e77acea1487ea9890f6320af614f4373dce" } },
    "5.5.1-rc1": { "version": "5.5.1-rc1", "hash": { "algorithm": "sha256", "value": "c1dbdbb5be08bbd0589edd786b8878620a05cba09cbcc4275e65d1f384ef18e6" } },
    "5.5.0-rc4": { "version": "5.5.0-rc4", "hash": { "algorithm": "sha256", "value": "57ccc32bbbd005cab75bcc52444052535af691789dba2b9016d5c50640d68b3d" } },
    "5.5.0-rc3": { "version": "5.5.0-rc3", "hash": { "algorithm": "sha256", "value": "f1a812cdcc3916f7441aec725014403177e0ef08ace097189548208f9605b2b3" } },
    "5.5.0-rc2": { "version": "5.5.0-rc2", "hash": { "algorithm": "sha256", "value": "50b24b8fce4644a4590af0f23c65945836161515b9e87c45ee1f0e62b0255a1d" } },
    "5.5.0-rc1": { "version": "5.5.0-rc1", "hash": { "algorithm": "sha256", "value": "34a4dcca0c04877fbce4baff54054b9793b70bca5d8c676ca4d3504dd47c3772" } },
    "5.5.0-beta": { "version": "5.5.0-beta", "hash": { "algorithm": "sha256", "value": "30897f95fc72565cb6c1792f721ad44e1a42e7ac587f62f7587807b3cbff1645" } },
    "5.4.9-rc1": { "version": "5.4.9-rc1", "hash": { "algorithm": "sha256", "value": "2335b6c582a52654f94612bf10d2f4672805d05329aa6568b1d8cd9e5c6fb8e6" } },
    "5.4.8-rc1": { "version": "5.4.8-rc1", "hash": { "algorithm": "sha256", "value": "4f18ddae154e793e46eeab727c59ef1c0c0c2b744e7b94219710d76f530629ae" } },
    "5.4.7-rc4": { "version": "5.4.7-rc4", "hash": { "algorithm": "sha256", "value": "9fbf5e28ef86c69858f6d3d34eccc32e911c1a28b4120ff3e84aaa70cfbf1e30" } },
    "5.4.7-rc3": { "version": "5.4.7-rc3", "hash": { "algorithm": "sha256", "value": "9bfdb269aefaa8a8c671cb509943bb2bac0704ea3fce3e6c00d92908326cd144" } },
    "5.4.7-rc2": { "version": "5.4.7-rc2", "hash": { "algorithm": "sha256", "value": "047417676188278ee86a15c2136f400f9f2a0c21ff2b0d30ab8e2c9e217853ac" } },
    "5.4.7-rc1": { "version": "5.4.7-rc1", "hash": { "algorithm": "sha256", "value": "9f51aeeaba66df34df7b63dfb8f94cb33000aad4d8788f66ac913a9efb5a64f7" } },
    "5.4.6-rc1": { "version": "5.4.6-rc1", "hash": { "algorithm": "sha256", "value": "7d5ea1b9cb6aa0b59ca3dde1c6adcb57ef83a1ba8e5432c0ecd06bf439b3ad88" } },
    "5.4.5-rc2": { "version": "5.4.5-rc2", "hash": { "algorithm": "sha256", "value": "59df426a3d50ea535a460a452315c4c0d4e1121ba72ff0bdde58c2ef31d6f444" } },
    "5.4.5-rc1": { "version": "5.4.5-rc1", "hash": { "algorithm": "sha256", "value": "6fedab336aeae90ea4eed1f0b86ac3e0367d58176153a97323c9098a6fe9daad" } },
    "5.4.4-rc3": { "version": "5.4.4-rc3", "hash": { "algorithm": "sha256", "value": "164c7849653b80ae67bec4b7473b884bf5cc8d2dca05653475ec2ed27b9ebf61" } },
    "5.4.4-rc2": { "version": "5.4.4-rc2", "hash": { "algorithm": "sha256", "value": "2c4460fa5ef62c54111323a59b510dffe8a76148da3d48cbc2b32234019ad105" } },
    "5.4.4-rc1": { "version": "5.4.4-rc1", "hash": { "algorithm": "sha256", "value": "9f93b571e287c76541b0ed4ec54a815ecb5d5bf481285ca8170ac6c8294efaa5" } },
    "5.4.3-rc2": { "version": "5.4.3-rc2", "hash": { "algorithm": "sha256", "value": "f8612276169e3bfcbcfb8f226195bfc6e466fe13042f1076cbde92b7ec96bbfb" } },
    "5.4.3-rc1": { "version": "5.4.3-rc1", "hash": { "algorithm": "sha256", "value": "989c98e30452d60adc6820f5323205e77ee22f6f88403fedb21a69d262107a92" } },
    "5.4.2-rc1": { "version": "5.4.2-rc1", "hash": { "algorithm": "sha256", "value": "11570d97e9d7303c0a59567ed1ac7c648340cd0db10d5fd594c09223ef2f524f" } },
    "5.4.1-rc1": { "version": "5.4.1-rc1", "hash": { "algorithm": "sha256", "value": "4ba786c3705eb9db6567af29c91a01b81f1c0ac3124fdbf6cd94bdd9e53cca7d" } },
    "5.3.6-rc3": { "version": "5.3.6-rc3", "hash": { "algorithm": "sha256", "value": "fc5fd69bb8736323f026672b1b7235da613d7177e72558893a0bdcd320466d60" } },
    "5.3.6-rc2": { "version": "5.3.6-rc2", "hash": { "algorithm": "sha256", "value": "e2047dc90cc654671f615c04cffbfe4a281648ab9474a82a27d68d45d6442302" } },
    "5.3.6-rc1": { "version": "5.3.6-rc1", "hash": { "algorithm": "sha256", "value": "94e86efb1141b57b270f7e75d5b76ddf12089bf570153e1d1189442cdb9487f4" } },
    "5.4.0-rc6": { "version": "5.4.0-rc6", "hash": { "algorithm": "sha256", "value": "eac0836eb7219e421a96b7ee3692b93f0629e4cdb0c788432e3d10ce9ed47e28" } },
    "5.4.0-rc5": { "version": "5.4.0-rc5", "hash": { "algorithm": "sha256", "value": "a8c31d95d1eaea2acc14472fdf917bec1fd39a333c0bf03bc2a4124f7844a4e5" } },
    "5.4.0-rc4": { "version": "5.4.0-rc4", "hash": { "algorithm": "sha256", "value": "51321a019b27e09d3f00cda2c52d185ecb0fb453c904a3e4aab1d118f9c77992" } },
    "5.4.0-rc3": { "version": "5.4.0-rc3", "hash": { "algorithm": "sha256", "value": "092087dbf519f31ff9bc74ae7560edd8ee934b6f16e37f63fc6236e1bf9a853c" } },
    "5.4.0-rc2": { "version": "5.4.0-rc2", "hash": { "algorithm": "sha256", "value": "632855309ed55e3fdd8236869b40b11ca6010e70115dd85fb2c6ab146be8677a" } },
    "5.4.0-rc1": { "version": "5.4.0-rc1", "hash": { "algorithm": "sha256", "value": "0a4fb4cb9281d924799650a768e61723fac3f0329bca39e51b90d1acc4228e71" } },
    "5.4.0-beta": { "version": "5.4.0-beta", "hash": { "algorithm": "sha256", "value": "5eb2824bc08469be9d9282c7298f001830ea013179ad0ae8a50600332568ebb9" } },
    "5.4.0-beta-rc1": { "version": "5.4.0-beta-rc1", "hash": { "algorithm": "sha256", "value": "ecd1deedca3ab604b746e42466b43e1cefbfafb1556e1ac95a92664368d5a6ec" } },
    "5.4.0-alpha-rc2": { "version": "5.4.0-alpha-rc2", "hash": { "algorithm": "sha256", "value": "d8504506ede2dbac73c5a74235feaabb2101caff59c7f87efe774b24a10e8407" } },
    "5.4.0-alpha": { "version": "5.4.0-alpha", "hash": { "algorithm": "sha256", "value": "d8504506ede2dbac73c5a74235feaabb2101caff59c7f87efe774b24a10e8407" } },
    "5.4.0-alpha-rc1": { "version": "5.4.0-alpha-rc1", "hash": { "algorithm": "sha256", "value": "6dce98f6a5b19eef9e5090db09a82e1653425fd9886671c3041ab356491f2ef8" } },
    "5.3.5-rc2": { "version": "5.3.5-rc2", "hash": { "algorithm": "sha256", "value": "0c2eed3f960446e1a3e4b9a1ca2f3ff893b6ce41942cf54d5dd59ab4b3b058ac" } },
    "5.3.5-rc1": { "version": "5.3.5-rc1", "hash": { "algorithm": "sha256", "value": "23372e52138419459460ce576449b901086222e2c1f68812a89400391eb575f2" } },
    "5.4.0-work2": { "version": "5.4.0-work2", "hash": { "algorithm": "sha256", "value": "68b7e8f1ff561b9a7e1c29de26ff99ac2a704773c0965a4fe1800b7657d5a057" } },
    "5.4.0-work1": { "version": "5.4.0-work1", "hash": { "algorithm": "sha256", "value": "ada03980481110bfde44b3bd44bde4b03d72c84318b34d657b5b5a91ddb3912c" } },
    "5.3.4-rc3": { "version": "5.3.4-rc3", "hash": { "algorithm": "sha256", "value": "f681aa518233bc407e23acf0f5887c884f17436f000d453b2491a9f11a52400c" } },
    "5.3.4-rc2": { "version": "5.3.4-rc2", "hash": { "algorithm": "sha256", "value": "9c034489170cb0b4d0899f6cb833630ed4deeaea04f5ccb384d4c9125a43b2e9" } },
    "5.3.4-rc1": { "version": "5.3.4-rc1", "hash": { "algorithm": "sha256", "value": "84818084e005e874b701f4aa6791659f5b39f23ac4a5eaa7b9a99d0734c6564d" } },
    "5.3.3-rc3": { "version": "5.3.3-rc3", "hash": { "algorithm": "sha256", "value": "5113c06884f7de453ce57702abaac1d618307f33f6789fa870e87a59d772aca2" } },
    "5.3.3-rc2": { "version": "5.3.3-rc2", "hash": { "algorithm": "sha256", "value": "0701c6e9063adce208c22313f5a516d5ed46a1b227581b3e905117504a7ecf2d" } },
    "5.3.3-rc1": { "version": "5.3.3-rc1", "hash": { "algorithm": "sha256", "value": "247a09870ee5a8027f3848fd06fb9ce98821a6f2b443fdb863daf1bf38d23334" } },
    "5.3.2-rc2": { "version": "5.3.2-rc2", "hash": { "algorithm": "sha256", "value": "c740c7bb23a936944e1cc63b7c3c5351a8976d7867c5252c8854f7b2af9da68f" } },
    "5.3.2-rc1": { "version": "5.3.2-rc1", "hash": { "algorithm": "sha256", "value": "edcd5dc637824e71a98392be9ebc67e806fc93d84b89877086428a6b0be08c42" } },
    "5.3.1-rc2": { "version": "5.3.1-rc2", "hash": { "algorithm": "sha256", "value": "072767aad6cc2e62044a66e8562f51770d941e972dc1e4068ba719cd8bffac17" } },
    "5.3.1-rc1": { "version": "5.3.1-rc1", "hash": { "algorithm": "sha256", "value": "57cb83791cae679f5b04abfe43f9c85d2ad8e8ae47864484b511fd455adae50d" } },
    "5.2.4-rc1": { "version": "5.2.4-rc1", "hash": { "algorithm": "sha256", "value": "b9e2e4aad6789b3b63a056d442f7b39f0ecfca3ae0f1fc0ae4e9614401b69f4b" } },
    "5.3.0-rc4": { "version": "5.3.0-rc4", "hash": { "algorithm": "sha256", "value": "ae4a5eb2d660515eb191bfe3e061f2b8ffe94dce73d32cfd0de090ddcc0ddb01" } },
    "5.3.0-rc3": { "version": "5.3.0-rc3", "hash": { "algorithm": "sha256", "value": "f03d91872689d818888ab6cde4c15f5fd319a7fa483ccdb2797796a86063a0a5" } },
    "5.3.0-rc2": { "version": "5.3.0-rc2", "hash": { "algorithm": "sha256", "value": "a6a30ea6548089821e4ddd7586624f9ef0da0186312951c00d7e300c1ca8e314" } },
    "5.3.0-rc1": { "version": "5.3.0-rc1", "hash": { "algorithm": "sha256", "value": "25c2123c9bd58e658145bad31732a0b12f218d6e56e0fd9b53ed32d3cf181062" } },
    "5.3.0-rc0": { "version": "5.3.0-rc0", "hash": { "algorithm": "sha256", "value": "1c5788211d4b1a7147e1f7bcc4dae752910cd1a62af1c74e6686a1f2ce13b144" } },
    "5.3.0-beta": { "version": "5.3.0-beta", "hash": { "algorithm": "sha256", "value": "a1137c07e58bcc3e9b270a6b8dc42623ae8addba1a5c0da2239e7e65645bce90" } },
    "5.3.0-alpha": { "version": "5.3.0-alpha", "hash": { "algorithm": "sha256", "value": "23ef23ef74da2cc057b68078e2085f6c12a2f8160229449d4cf2c30b22537846" } },
    "5.3.0-work3": { "version": "5.3.0-work3", "hash": { "algorithm": "sha256", "value": "c42d633c237e9a3a237496559fbb28627fc72c3298480ac05b4210b1dee0f32c" } },
    "5.3.0-work2": { "version": "5.3.0-work2", "hash": { "algorithm": "sha256", "value": "a33d42f327e875b85b4d6d84cb62161a246af860fef1ce29d8d2fea825876423" } },
    "5.2.3-rc1": { "version": "5.2.3-rc1", "hash": { "algorithm": "sha256", "value": "13c2fb97961381f7d06d5b5cea55b743c163800896fd5c5e2356201d3619002d" } },
    "5.3.0-work1": { "version": "5.3.0-work1", "hash": { "algorithm": "sha256", "value": "d1435aded81c313592c4cbbc6cc1ffa63706fdb19c6c353aed1fec142cd73cfd" } },
    "5.2.2-rc4": { "version": "5.2.2-rc4", "hash": { "algorithm": "sha256", "value": "3fd67de3f5ed133bf312906082fa524545c6b9e1b952e8215ffbd27113f49f00" } },
    "5.2.2-rc3": { "version": "5.2.2-rc3", "hash": { "algorithm": "sha256", "value": "8ca83f7daa52750d2b49a032619b2e992d8867c4f2232f7c6a740fd3e40bfd32" } },
    "5.2.2-rc2": { "version": "5.2.2-rc2", "hash": { "algorithm": "sha256", "value": "433b1245b1689e59ca531ba66de2834c2d63a932d71b5decca307708645da8c6" } },
    "5.2.2-rc1": { "version": "5.2.2-rc1", "hash": { "algorithm": "sha256", "value": "433e7ca1a7590a8ad132b7583748c8d3e329929cc97163cf2d4be79e53b66c16" } },
    "5.2.1-rc4": { "version": "5.2.1-rc4", "hash": { "algorithm": "sha256", "value": "64304da87976133196f9e4c15250b70f444467b6ed80d7cfd7b3b982b5177be5" } },
    "5.2.1-rc3": { "version": "5.2.1-rc3", "hash": { "algorithm": "sha256", "value": "849733c3e125395e8c94debb5130555e979be76fd2767f6fcf3b03a3d9a22b3d" } },
    "5.2.1-rc2": { "version": "5.2.1-rc2", "hash": { "algorithm": "sha256", "value": "938c2da29e04651b0cb614b41417dcbd6679e7c400ce79f57938100430e7bc9a" } },
    "5.2.1-rc1": { "version": "5.2.1-rc1", "hash": { "algorithm": "sha256", "value": "7a895c3341683075436e86fe3a44325ab8cd3f29731cf057d41155f5ec9ec72d" } },
    "5.2.1-work1": { "version": "5.2.1-work1", "hash": { "algorithm": "sha256", "value": "acdfef8c61524e3c1c047418a6beaab33da166fa83fb4a2f07d5519ef6fa5922" } },
    "5.1.5-rc2": { "version": "5.1.5-rc2", "hash": { "algorithm": "sha256", "value": "2640fc56a795f29d28ef15e13c34a47e223960b0240e8cb0a82d9b0738695333" } },
    "5.1.5-rc1": { "version": "5.1.5-rc1", "hash": { "algorithm": "sha256", "value": "8a619dfd05c80a687f8fe9c01e66200577aa4f3962b2a4c71525fad78efb5ba5" } },
    "5.2.0-rc8": { "version": "5.2.0-rc8", "hash": { "algorithm": "sha256", "value": "cabe379465aa8e388988073d59b69e76ba0025429d2c1da80821a252cdf6be0d" } },
    "5.2.0-rc7": { "version": "5.2.0-rc7", "hash": { "algorithm": "sha256", "value": "c5ece090e005b9fbceb4b7dca0a191dac248590059ba3119ba6ac451883db5b3" } },
    "5.2.0-rc6": { "version": "5.2.0-rc6", "hash": { "algorithm": "sha256", "value": "ad80dca436d983caeec6bac6cd22aeafc2cfda9ded22b902dd042b77b164d968" } },
    "5.2.0-rc5": { "version": "5.2.0-rc5", "hash": { "algorithm": "sha256", "value": "4e4bfeeba3c7207fec825dd7971c76fe5825ec7663ea71ead11648f454325f72" } },
    "5.2.0-rc4": { "version": "5.2.0-rc4", "hash": { "algorithm": "sha256", "value": "d0c8dcd5ce94d59ead8866a2d2481145789c8aab592ed99e1bb0890c898ee356" } },
    "5.2.0-rc3": { "version": "5.2.0-rc3", "hash": { "algorithm": "sha256", "value": "fb2db80b5448601c8c6ccbd651d471be07d94465cd0c24f999d0e1a55ee2a31d" } },
    "5.2.0-rc2": { "version": "5.2.0-rc2", "hash": { "algorithm": "sha256", "value": "fcf77ed357b154295471fc16ff64362a1170825441aeae62dcc185bc5eb87d28" } },
    "5.2.0-rc1": { "version": "5.2.0-rc1", "hash": { "algorithm": "sha256", "value": "8f3835d6167101eff95a7f34df513337269f1a9934a5593e79e546427423e4b5" } },
    "5.2.0-beta-rc7": { "version": "5.2.0-beta-rc7", "hash": { "algorithm": "sha256", "value": "e7e49a1cc1d03ca24caed0cd8d7b76b6fb88a96bf8814f609ddc821d9813cdc6" } },
    "5.2.0-beta": { "version": "5.2.0-beta", "hash": { "algorithm": "sha256", "value": "e7e49a1cc1d03ca24caed0cd8d7b76b6fb88a96bf8814f609ddc821d9813cdc6" } },
    "5.2.0-beta-rc6": { "version": "5.2.0-beta-rc6", "hash": { "algorithm": "sha256", "value": "30f0948723fd306ad344bf52e9e393a2a64b26900abad37aacafa45a547915ea" } },
    "5.2.0-beta-rc5": { "version": "5.2.0-beta-rc5", "hash": { "algorithm": "sha256", "value": "9c1e5e240e36535d21d3dc53dd2b3f62b1fef737fdb4e9183ed0b71a77163963" } },
    "5.2.0-beta-rc4": { "version": "5.2.0-beta-rc4", "hash": { "algorithm": "sha256", "value": "2983f5e2bccbb7ea23512d79e697d253f06509e9077a6663956f3ae71b33c658" } },
    "5.2.0-beta-rc3": { "version": "5.2.0-beta-rc3", "hash": { "algorithm": "sha256", "value": "51edfebdc1f4a31c41c1a320ccf09ab35fa3f2921025ab1ad0a6b50140a05ed0" } },
    "5.2.0-beta-rc2": { "version": "5.2.0-beta-rc2", "hash": { "algorithm": "sha256", "value": "a334806a8e785f19bfd6acc15e636a8d1d2184e9ccd31a96cfab6f22cf6e746d" } },
    "5.2.0-beta-rc1": { "version": "5.2.0-beta-rc1", "hash": { "algorithm": "sha256", "value": "9370b606cfbf2e730ebc9669837bc1643ece222fd214bfbcc0a81075f5f556ee" } },
    "5.2.0-alpha-rc4": { "version": "5.2.0-alpha-rc4", "hash": { "algorithm": "sha256", "value": "8d08193f8819db49827c1687e1cf73be45268478b0aa2c99b791576d68646aa0" } },
    "5.2.0-alpha": { "version": "5.2.0-alpha", "hash": { "algorithm": "sha256", "value": "8d08193f8819db49827c1687e1cf73be45268478b0aa2c99b791576d68646aa0" } },
    "5.2.0-alpha-rc3": { "version": "5.2.0-alpha-rc3", "hash": { "algorithm": "sha256", "value": "e1b466477945367f0fbb16ba0271f8a1609206f6352e909eddb9f5adbbc852c7" } },
    "5.2.0-alpha-rc2": { "version": "5.2.0-alpha-rc2", "hash": { "algorithm": "sha256", "value": "9562008561caa63422a1369df03271b4a205de826aa0cf03b6a354b34854d344" } },
    "5.2.0-alpha-rc1": { "version": "5.2.0-alpha-rc1", "hash": { "algorithm": "sha256", "value": "37ca7c4cb232c0954268446a234240e678de0f3691aeda2848dbd12bd4024a91" } },
    "5.2.0-work5": { "version": "5.2.0-work5", "hash": { "algorithm": "sha256", "value": "fc6a2c730dc8fadf156fc3632a6a02713c4926f157ef34fa2f6bb4082f4e4a9b" } },
    "5.2.0-work4": { "version": "5.2.0-work4", "hash": { "algorithm": "sha256", "value": "8b2539bc6d417dc85e76c956f7630e3629c8412605db047f38bbfe7b29030b0c" } },
    "5.2.0-work3": { "version": "5.2.0-work3", "hash": { "algorithm": "sha256", "value": "c5c5e06b36fd0097ff8b65489a24391631009c816417798108f7103772977b4b" } },
    "5.2.0-work2": { "version": "5.2.0-work2", "hash": { "algorithm": "sha256", "value": "5344b821acfe3d623b12a2c4c454837fd3b15e9c5a96a65781663053fd05cd0a" } },
    "5.2.0-work1": { "version": "5.2.0-work1", "hash": { "algorithm": "sha256", "value": "c1af40891fa432af6bca1ed0d163c4f24f7997c4babbffa451f24f95bd54927a" } },
    "5.1.4-rc3": { "version": "5.1.4-rc3", "hash": { "algorithm": "sha256", "value": "b038e225eaf2a5b57c9bcc35cd13aa8c6c8288ef493d52970c9545074098af3a" } },
    "5.1.4-rc2": { "version": "5.1.4-rc2", "hash": { "algorithm": "sha256", "value": "64a8f099248064ebbd418e0efdc4de6aa10982ad3a4011acc9a58c8f37a4fce5" } },
    "5.1.4-rc1": { "version": "5.1.4-rc1", "hash": { "algorithm": "sha256", "value": "8b903c7f64c2595cd7fad7a63c828dd184c29ef426ad4c3e850f8a2594549778" } },
    "5.1.3-rc5": { "version": "5.1.3-rc5", "hash": { "algorithm": "sha256", "value": "6b5df2edaa5e02bf1a2d85e1442b2e329493b30b0c0780f77199d24f087d296d" } },
    "5.1.3-rc4": { "version": "5.1.3-rc4", "hash": { "algorithm": "sha256", "value": "65a157f49993ad93016b2f7301543024d6939e29da5e9d081a3c8c93d0796224" } },
    "5.1.3-rc3": { "version": "5.1.3-rc3", "hash": { "algorithm": "sha256", "value": "d26f27272d4064df9756ae3ba308edd00432f1558d99b757378ffc3f0b5da49f" } },
    "5.1.3-rc2": { "version": "5.1.3-rc2", "hash": { "algorithm": "sha256", "value": "5da201797c131bca05072028f45d7168d1aceb3ea45d0195aa23874aa78059aa" } },
    "5.1.3-rc1": { "version": "5.1.3-rc1", "hash": { "algorithm": "sha256", "value": "232219e6d26722047c52310fead85849b15480194fc47693c676670cd61bcc55" } },
    "5.1.2-rc5": { "version": "5.1.2-rc5", "hash": { "algorithm": "sha256", "value": "5cf098c6fe68d3d2d9221904f1017ff0286e4a9cc166a1452a456df9b88b3d9e" } },
    "5.1.2-rc4": { "version": "5.1.2-rc4", "hash": { "algorithm": "sha256", "value": "153911c46eb71e78c08eee39c8469e8e117a6fdf3ec656d4412c7c33841a0fd1" } },
    "5.1.2-rc3": { "version": "5.1.2-rc3", "hash": { "algorithm": "sha256", "value": "ca5730f14e5daab90d7dbd457ebd556d38206f7d0c1b5d238b740355ac91dbde" } },
    "5.1.2-rc2": { "version": "5.1.2-rc2", "hash": { "algorithm": "sha256", "value": "3f31cdfbc983c1aad7b439f2122cb15d168bce028b97992b66f9e4b1056a8d16" } },
    "5.1.2-rc1": { "version": "5.1.2-rc1", "hash": { "algorithm": "sha256", "value": "27c4b24d4536689ddfe3f5fbc0e5db8f922cfcfb6b3e9a30dbfb9d40f8f4658d" } },
    "5.1.1-rc4": { "version": "5.1.1-rc4", "hash": { "algorithm": "sha256", "value": "f9baa3c37915be2e7cb8fa205b042bd403fa0fe854fb92ede1861d9bc999ded9" } },
    "5.1.1-rc3": { "version": "5.1.1-rc3", "hash": { "algorithm": "sha256", "value": "b5eb2b1382716d5755a57e2a19fd919748a8a191fc1a69030f9225b85e6fff6c" } },
    "5.1.1-rc2": { "version": "5.1.1-rc2", "hash": { "algorithm": "sha256", "value": "b14642c7f5f211f8f899ae4e97891d025a72245a3c6938b4d37024513730d71e" } },
    "5.1.1-rc1": { "version": "5.1.1-rc1", "hash": { "algorithm": "sha256", "value": "84dda3f7a03999785488304e9561e4f6771366845d3488efbb8e077b20839c99" } }
};
/*
** Q: How to enable work versions for a future Lua 5.5.2
**    release candidate (lua-5.5.2-rc1)?
**
** A: modify the next function to return to
**    workVersion.startsWith("5.5.2-")
**
** Q: How to disable the current work version?
**
** A: modify the next function to return `false'
*/
function isCurrentWorkVersion(workVersion) {
    return false; /* workVersion.startsWith("5.4.9-") */
}
function isKnownLuaShortVersion(version) {
    return version in CONVERT_LUA_RELEASE_VERSION;
}
function parsePucLuaVersion(version) {
    return new Promise((resolve, reject) => {
        const pucLuaVersion = version in CONVERT_LUA_RELEASE_VERSION ?
            (CONVERT_LUA_RELEASE_VERSION[version]) :
            ((version || LATEST_LUA_RELEASE_VERSION).trim());
        if (pucLuaVersion in LUA_RELEASES) {
            const releaseMatch = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec(pucLuaVersion);
            if (releaseMatch) {
                const major = Number(releaseMatch[1]);
                if (major >= 5) {
                    const minor = Number(releaseMatch[2]);
                    if (major == 5 && minor == 0) {
                        reject(new Error("The minimum supported Lua version is 5.1"));
                    }
                    else {
                        const build = Number(releaseMatch[3]);
                        const v = LUA_RELEASES[pucLuaVersion];
                        resolve(new PucLuaReleaseVersion(major, minor, build, v.hash.algorithm, v.hash.value));
                    }
                }
                else {
                    reject(new Error("Unsupported major version of Lua"));
                }
            }
            else {
                reject(new Error("Internal error: Unknown format for a Lua release version"));
            }
        }
        else if (pucLuaVersion in LUA_WORKS) {
            const workMatch = /^([0-9]+)\.([0-9]+)\.([0-9]+)\-([0-9a-zA-Z\-\.]+)$/.exec(pucLuaVersion);
            if (workMatch) {
                const major = Number(workMatch[1]);
                if (major >= 5) {
                    const minor = Number(workMatch[2]);
                    if (major == 5 && minor == 0) {
                        reject(new Error("The minimum supported Lua version is 5.1"));
                    }
                    else {
                        const build = Number(workMatch[3]);
                        const suffix = workMatch[4];
                        const v = LUA_WORKS[pucLuaVersion];
                        resolve(new PucLuaWorkVersion(major, minor, build, v.hash.algorithm, v.hash.value, suffix, isCurrentWorkVersion(workMatch[0])));
                    }
                }
                else {
                    reject(new Error("Unsupported major version of Lua"));
                }
            }
            else {
                reject(new Error("Internal error: Unknown format for a Lua work version"));
            }
        }
        else {
            reject(new Error("Unsupported version of Lua"));
        }
    });
}
class AbstractPucLuaVersion {
    getMajor() {
        return this.major;
    }
    getMinor() {
        return this.minor;
    }
    getBuild() {
        return this.build;
    }
    getHashAlgorithm() {
        return this.hashAlgorithm;
    }
    getHashValue() {
        return this.hashValue;
    }
    compareTo(other) {
        return compareVersions([this.major, this.minor, this.build], [other.getMajor(), other.getMinor(), other.getBuild()]);
    }
    constructor(major, minor, build, hashAlgorithm, hashValue) {
        this.major = major;
        this.minor = minor;
        this.build = build;
        this.hashAlgorithm = hashAlgorithm;
        this.hashValue = hashValue;
    }
}
class PucLuaReleaseVersion extends AbstractPucLuaVersion {
    getString() {
        const M = this.getMajor();
        const m = this.getMinor();
        const b = this.getBuild();
        return `${M}.${m}.${b}`;
    }
    getDownloadUrl() {
        return `https://lua.org/ftp/lua-${this.getString()}.tar.gz`;
    }
    constructor(major, minor, build, hashAlgorithm, hashValue) {
        super(major, minor, build, hashAlgorithm, hashValue);
    }
}
class PucLuaWorkVersion extends AbstractPucLuaVersion {
    getSuffix() {
        return this.suffix;
    }
    getCurrent() {
        return this.current;
    }
    getString() {
        const M = this.getMajor();
        const m = this.getMinor();
        const b = this.getBuild();
        return `${M}.${m}.${b}-${this.suffix}`;
    }
    getDownloadUrl() {
        return this.current ?
            `https://lua.org/work/lua-${this.getString()}.tar.gz` :
            `https://lua.org/work/old/lua-${this.getString()}.tar.gz`;
    }
    constructor(major, minor, build, hashAlgorithm, hashValue, suffix, current) {
        super(major, minor, build, hashAlgorithm, hashValue);
        this.suffix = suffix;
        this.current = current;
    }
}
const LUA_5_1_1_VERSION = LUA_RELEASES["5.1.1"];
const LUA_5_2_0_VERSION = LUA_RELEASES["5.2.0"];
const LUA_5_3_0_VERSION = LUA_RELEASES["5.3.0"];
const LUA_5_4_0_VERSION = LUA_RELEASES["5.4.0"];
const LUA_5_5_0_VERSION = LUA_RELEASES["5.5.0"];
const LUA_51_VERSION = new PucLuaReleaseVersion(5, 1, 1, LUA_5_1_1_VERSION.hash.algorithm, LUA_5_1_1_VERSION.hash.value);
const LUA_52_VERSION = new PucLuaReleaseVersion(5, 2, 0, LUA_5_2_0_VERSION.hash.algorithm, LUA_5_2_0_VERSION.hash.value);
const LUA_53_VERSION = new PucLuaReleaseVersion(5, 3, 0, LUA_5_3_0_VERSION.hash.algorithm, LUA_5_3_0_VERSION.hash.value);
const LUA_54_VERSION = new PucLuaReleaseVersion(5, 4, 0, LUA_5_4_0_VERSION.hash.algorithm, LUA_5_4_0_VERSION.hash.value);
const LUA_55_VERSION = new PucLuaReleaseVersion(5, 5, 0, LUA_5_5_0_VERSION.hash.algorithm, LUA_5_5_0_VERSION.hash.value);

;// CONCATENATED MODULE: ./src/Projects/Targets/TargetPipeline.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class TargetPipeline {
    constructor(initialTarget) {
        this.initialTarget = initialTarget;
    }
    init() {
        return new Promise((resolve, reject) => {
            resolve(this.initialTarget);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            let failed = false;
            let finished = false;
            let err;
            this.init()
                .then(tgt => {
                const iter = (target) => {
                    if (!(failed || finished)) {
                        target.init()
                            .then(() => {
                            target.execute()
                                .then(() => {
                                target.finalize()
                                    .then(() => {
                                    const nextTarget = target.getNext();
                                    if (!nextTarget) {
                                        finished = true;
                                    }
                                    iter(nextTarget);
                                })
                                    .catch(finalizeErr => {
                                    failed = true;
                                    err = finalizeErr;
                                    iter(target);
                                });
                            })
                                .catch(execErr => {
                                target.finalize()
                                    .then(() => {
                                    failed = true;
                                    err = execErr;
                                    iter(target);
                                })
                                    .catch(finalizeErr => {
                                    failed = true;
                                    err = finalizeErr;
                                    iter(target);
                                });
                            });
                        })
                            .catch(initErr => {
                            failed = true;
                            err = initErr;
                            iter(target);
                        });
                    }
                    else if (err) {
                        this.finalize()
                            .then(() => {
                            reject(err);
                        })
                            .catch(reject);
                    }
                    else {
                        this.finalize()
                            .then(resolve)
                            .catch(reject);
                    }
                };
                iter(tgt);
            })
                .catch(reject);
        });
    }
}

;// CONCATENATED MODULE: ./src/Util/GetSetProperty.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class GetSetProperty {
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    constructor(value) {
        this.value = value;
    }
}

;// CONCATENATED MODULE: ./src/Util/ReadOnlyArray.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class ReadOnlyArray {
    constructor(array) {
        this.ar = array.slice();
    }
    getLenght() {
        return this.ar.length;
    }
    getItem(i) {
        if (!(0 <= i && i <= this.ar.length)) {
            throw new Error(`index ${i} is out of range`);
        }
        return this.ar[i];
    }
    createCopy() {
        return this.ar.slice();
    }
    copyTo(array) {
        if (array) {
            this.ar.forEach(value => array.push(value));
        }
        else {
            throw new Error("array expected as argument");
        }
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/IWin32ImportLibraryDecorator.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function hasWin32ImportLibraryDecorator(linker) {
    return ('setImportLibrary' in linker && 'getImportLibraryExtension' in linker);
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/IGccLikeToolchain.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function isGccLikeToolchain(toolchain) {
    return ('getRanlib' in toolchain && 'getStrip' in toolchain);
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaBuildInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class PucLuaBuildInfo {
    constructor(sourcesInfo, sharedLibrary, staticLibrary, interpreter, compiler, pkgConfigFiles, importLibrary) {
        this.sourcesInfo = sourcesInfo;
        this.sharedLibrary = sharedLibrary;
        this.staticLibrary = staticLibrary;
        this.interpreter = interpreter;
        this.compiler = compiler;
        this.pkgConfigFiles = new ReadOnlyArray(pkgConfigFiles);
        this.importLibrary = importLibrary;
    }
    getSourcesInfo() {
        return this.sourcesInfo;
    }
    getSharedLibrary() {
        return this.sharedLibrary;
    }
    getStaticLibrary() {
        return this.staticLibrary;
    }
    getInterpreter() {
        return this.interpreter;
    }
    getCompiler() {
        return this.compiler;
    }
    getPkgConfigFiles() {
        return this.pkgConfigFiles;
    }
    getImportLibrary() {
        return this.importLibrary;
    }
}

;// CONCATENATED MODULE: ./src/CliConsole.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class CliConsole {
    static instance() {
        if (!CliConsole._instance) {
            CliConsole._instance = new CliConsole();
        }
        return CliConsole._instance;
    }
    write(message) {
        process.stdout.write(message);
    }
    writeLine(message) {
        console.log(message);
    }
    constructor() {
    }
}

;// CONCATENATED MODULE: ./src/Console.ts

const Console = CliConsole;

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaFinishBuildingTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class PucLuaFinishBuildingTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish the build of Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const buildInfo = this.project.buildResult().getValue();
            Console.instance().writeLine(`Shared Library: ${buildInfo.getSharedLibrary()}`);
            Console.instance().writeLine(`Static Library: ${buildInfo.getStaticLibrary()}`);
            Console.instance().writeLine(`Interpreter: ${buildInfo.getInterpreter()}`);
            Console.instance().writeLine(`Compiler: ${buildInfo.getCompiler()}`);
            Console.instance().writeLine(`pkg-config files:`);
            const pkgConfigFiles = buildInfo.getPkgConfigFiles();
            const len = pkgConfigFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`    ${pkgConfigFiles.getItem(i)}`);
            }
            const impLib = buildInfo.getImportLibrary();
            if (impLib) {
                Console.instance().writeLine(`Import Library: ${impLib}`);
            }
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish the build of Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaCreatePkgConfigFilesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






class PucLuaCreatePkgConfigFilesTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.rawPkgConfigFiles = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Create pkgconfig file for Lua ${this.project.getVersion().getString()} building`);
            resolve();
        });
    }
    getNext() {
        return new PucLuaFinishBuildingTarget(this.project, this);
    }
    setBuildResult() {
        this.project.buildResult().setValue(new PucLuaBuildInfo(this.parent.getSourcesInfo(), this.parent.getSharedLibrary(), this.parent.getStaticLibrary(), this.parent.getInterpreter(), this.parent.getCompiler(), this.rawPkgConfigFiles, this.parent.getImportLibrary()));
    }
    execute() {
        return new Promise((resolve, reject) => {
            const lines = [];
            const version = this.project.getVersion();
            const compatFlag = this.parent.getSourcesInfo().getCompatFlag();
            const libname = `lua${version.getMajor()}${version.getMinor()}`;
            let prefix = this.project.getInstallDir();
            let incdir = this.project.getInstallIncludeDir();
            let bindir = this.project.getInstallBinDir();
            let libdir = this.project.getInstallLibDir();
            let lmod = this.project.getInstallLuaModulesDir();
            let cmod = this.project.getInstallCModulesDir();
            let mandir = this.project.getInstallManDir();
            this.rawPkgConfigFiles.splice(0, this.rawPkgConfigFiles.length);
            if (process.platform === "win32") {
                prefix = prefix.replace(/\\/g, "/");
                incdir = incdir.replace(/\\/g, "/");
                bindir = bindir.replace(/\\/g, "/");
                libdir = libdir.replace(/\\/g, "/");
                lmod = lmod.replace(/\\/g, "/");
                cmod = cmod.replace(/\\/g, "/");
                mandir = mandir.replace(/\\/g, "/");
            }
            lines.push(`prefix=${prefix}`);
            lines.push(`exec_prefix=${prefix}`);
            lines.push(`lib_name=${libname}`);
            lines.push(`includedir=${incdir}`);
            lines.push(`bindir=${bindir}`);
            lines.push(`libdir=${libdir}`);
            lines.push(`V=${version.getMajor()}.${version.getMinor()}`);
            lines.push(`R=${version.getMajor()}.${version.getMinor()}.${version.getBuild()}`);
            lines.push("");
            lines.push(`INSTALL_BIN=${bindir}`);
            lines.push(`INSTALL_INC=${incdir}`);
            lines.push(`INSTALL_LIB=${libdir}`);
            lines.push(`INSTALL_MAN=${mandir}`);
            lines.push(`INSTALL_LMOD=${lmod}`);
            lines.push(`INSTALL_CMOD=${cmod}`);
            lines.push("");
            lines.push("Name: Lua");
            lines.push("Description: An Extensible Extension Language");
            lines.push("Version: ${R}");
            lines.push("Requires:");
            lines.push("Libs: -L${libdir} -l${lib_name}");
            let syslibs = '';
            if (process.platform === 'win32') {
                const toolchain = this.project.getToolchain();
                if (isGccLikeToolchain(toolchain)) {
                    syslibs = "-lm";
                }
            }
            else if (process.platform === 'linux' || process.platform === 'cygwin') {
                syslibs = "-lm -ldl -lreadline";
            }
            else if (process.platform === "darwin") {
                syslibs = "-lm -lreadline";
            }
            else if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                syslibs = "-lm -ledit";
            }
            else if (process.platform === 'sunos' || process.platform === 'aix') {
                syslibs = '-lm -ldl';
            }
            lines.push(`Libs.private: ${syslibs}`);
            if (compatFlag) {
                lines.push("Cflags: -I${includedir} " + `-D${compatFlag}`);
            }
            else {
                lines.push("Cflags: -I${includedir}");
            }
            const pkgConfigContent = lines.join("\n");
            const pkgConfigBaseNames = [
                `lua${version.getMajor()}.${version.getMinor()}.pc`,
                `lua-${version.getMajor()}.${version.getMinor()}.pc`,
                `lua${version.getMajor()}${version.getMinor()}.pc`,
                `lua-${version.getMajor()}${version.getMinor()}.pc`
            ];
            const pkgConfigIter = (i) => {
                if (i < pkgConfigBaseNames.length) {
                    const pkgConfigBaseName = pkgConfigBaseNames[i];
                    const pkgConfigFileName = (0,external_node_path_namespaceObject.join)(this.project.getSharedLibBuildDir(), pkgConfigBaseName);
                    (0,promises_namespaceObject.writeFile)(pkgConfigFileName, pkgConfigContent, { encoding: "utf8" })
                        .then(() => {
                        this.rawPkgConfigFiles.push(pkgConfigFileName);
                        pkgConfigIter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    this.setBuildResult();
                    resolve();
                }
            };
            pkgConfigIter(0);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Create pkgconfig file for Lua ${this.project.getVersion().getString()} building`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/CliGitHubCore.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



function appendContentToGitHubFile(fileKey, content) {
    return new Promise((resolve, reject) => {
        const githubSpecialFile = process.env[fileKey];
        if (githubSpecialFile) {
            (0,promises_namespaceObject.stat)(githubSpecialFile)
                .then(fileStat => {
                if (fileStat.isFile()) {
                    const newline = external_node_os_namespaceObject.EOL;
                    (0,promises_namespaceObject.appendFile)(githubSpecialFile, `${newline}${content}`, { flush: true })
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    reject(new Error(`\`${githubSpecialFile}' is not a file`));
                }
            })
                .catch(reject);
        }
        else {
            resolve();
        }
    });
}
function appendKeyValueToGitHubFile(fileKey, key, value) {
    return appendContentToGitHubFile(fileKey, `${key.toUpperCase().replace(/\-/g, "_").replace(/\r\n|\r|\n/g, "")}=${value.replace(/\r\n|\r|\n/g, "")}`);
}
class CliGitHubCore {
    static instance() {
        if (!CliGitHubCore._instance) {
            CliGitHubCore._instance = new CliGitHubCore();
        }
        return CliGitHubCore._instance;
    }
    getInput(variable) {
        return process.env[`INPUT_${variable.replace(/ /g, "_").toUpperCase()}`];
    }
    appendToGitHubEnvironmentVariables(key, value) {
        return key.toUpperCase() === "PATH" ? this.appendToGitHubPath(value) : appendKeyValueToGitHubFile("GITHUB_ENV", key, value);
    }
    appendToGitHubPath(value) {
        return new Promise((resolve, reject) => {
            const githubPath = process.env["GITHUB_PATH"];
            if (githubPath) {
                (0,promises_namespaceObject.stat)(githubPath)
                    .then(fileStat => {
                    if (fileStat.isFile()) {
                        const safeValue = value.replace(/\r\n|\r|\n/g, "");
                        const parts = safeValue.split(external_node_path_namespaceObject.delimiter).filter(v => v !== "");
                        const newline = external_node_os_namespaceObject.EOL;
                        const content = parts.reverse().join(newline);
                        (0,promises_namespaceObject.appendFile)(githubPath, `${newline}${content}`)
                            .then(resolve)
                            .catch(reject);
                    }
                    else {
                        reject(new Error(`\`${githubPath}' is not a file`));
                    }
                })
                    .catch(reject);
            }
            else {
                resolve();
            }
        });
    }
    constructor() {
    }
}

;// CONCATENATED MODULE: ./src/GitHubCore.ts

const GitHubCore = CliGitHubCore;

;// CONCATENATED MODULE: ./src/Util/GitHubInput.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class GitHubInput {
    static instance() {
        if (!GitHubInput._instance) {
            GitHubInput._instance = new GitHubInput();
        }
        return GitHubInput._instance;
    }
    getInputDebugSetupLua() {
        const debugMode = GitHubCore.instance().getInput("debug-setup-lua");
        return debugMode === "true" ||
            debugMode === "True" ||
            debugMode === "TRUE" ||
            debugMode === "1" ||
            debugMode === "on" ||
            debugMode === "On" ||
            debugMode === "ON" ||
            debugMode === "y" ||
            debugMode === "Y" ||
            debugMode === "yes" ||
            debugMode === "Yes" ||
            debugMode === "YES";
    }
    getInputCC() {
        return GitHubCore.instance().getInput("cc");
    }
    getInputLD() {
        return GitHubCore.instance().getInput("ld");
    }
    getInputAR() {
        return GitHubCore.instance().getInput("ar");
    }
    getInputSTRIP() {
        return GitHubCore.instance().getInput("strip");
    }
    getInputRANLIB() {
        return GitHubCore.instance().getInput("ranlib");
    }
    getInputRC() {
        return GitHubCore.instance().getInput("rc");
    }
    getInputMake() {
        return GitHubCore.instance().getInput("make");
    }
    getInputToolchainPrefix() {
        return GitHubCore.instance().getInput("toolchain-prefix");
    }
    getInputLuaVersion() {
        return GitHubCore.instance().getInput("lua-version");
    }
    getInputLuaRocksVersion() {
        return GitHubCore.instance().getInput("luarocks-version");
    }
    getInputMacOSXDeploymentTarget() {
        return GitHubCore.instance().getInput("macosx-deployment-target");
    }
    getInputUseCache() {
        const useCache = GitHubCore.instance().getInput("use-cache");
        return useCache === undefined ||
            useCache === '' ||
            useCache === "true" ||
            useCache === "True" ||
            useCache === "TRUE" ||
            useCache === "1" ||
            useCache === "on" ||
            useCache === "On" ||
            useCache === "ON" ||
            useCache === "y" ||
            useCache === "Y" ||
            useCache === "yes" ||
            useCache === "Yes" ||
            useCache === "YES";
    }
    getInputCflagsExtra() {
        return GitHubCore.instance().getInput("cflags-extra");
    }
    getInputIncDirsExtra() {
        return GitHubCore.instance().getInput("incdirs-extra");
    }
    getInputLdflagsExtra() {
        return GitHubCore.instance().getInput("ldflags-extra");
    }
    getInputLibDirsExtra() {
        return GitHubCore.instance().getInput("libdirs-extra");
    }
    getInputLibsExtra() {
        return GitHubCore.instance().getInput("libs-extra");
    }
    getInputLuaPatches() {
        return GitHubCore.instance().getInput("lua-patches");
    }
    getInputLuaRocksPatches() {
        return GitHubCore.instance().getInput("luarocks-patches");
    }
}

;// CONCATENATED MODULE: ./src/Util/ParseInputSemiColon.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function coreParseInputSemiColon(input) {
    const l = input.length;
    const tokens = [];
    if (l > 0) {
        let i = 0;
        let s = 0;
        while (i < l) {
            if (input[i] === ";") {
                if (i + 1 < l) {
                    if (input[i + 1] === ";") {
                        i += 2;
                    }
                    else {
                        tokens.push(input.substring(s, i).replace(";;", ";"));
                        i++;
                        s = i;
                    }
                }
                else {
                    tokens.push(input.substring(s, i).replace(";;", ";"));
                    i++;
                    s = i;
                }
            }
            else {
                i++;
            }
        }
        tokens.push(input.substring(s).replace(";;", ";"));
    }
    return tokens;
}
function parseInputSemiColon(input) {
    return input ? coreParseInputSemiColon(input.trim()) : [];
}

;// CONCATENATED MODULE: ./src/Toolchains/ToolchainEnvironmentVariables.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


class ToolchainEnvironmentVariables {
    static instance() {
        if (!ToolchainEnvironmentVariables._instance) {
            ToolchainEnvironmentVariables._instance = new ToolchainEnvironmentVariables();
        }
        return ToolchainEnvironmentVariables._instance;
    }
    getRawCC() {
        let msystem = process.env["MSYSTEM"] || "";
        if (msystem) {
            msystem = msystem.toUpperCase().trim();
        }
        return (GitHubInput.instance().getInputCC() || process.env["CC"] ||
            (process.env["VCINSTALLDIR"] ? "cl" :
                ((process.platform === 'win32' && !msystem.startsWith("CLANG")) ? "gcc" : "cc"))).trim();
    }
    getRawLD() {
        let msystem = process.env["MSYSTEM"] || "";
        if (msystem) {
            msystem = msystem.toUpperCase().trim();
        }
        return (GitHubInput.instance().getInputLD() || process.env["LD"] ||
            (process.env["VCINSTALLDIR"] ? "link" :
                ((process.platform === 'win32' && !msystem.startsWith("CLANG")) ? "gcc" : "cc"))).trim();
    }
    getRawAR() {
        return (GitHubInput.instance().getInputAR() || process.env["AR"] || (process.env["VCINSTALLDIR"] ? "lib" : "ar")).trim();
    }
    getRawSTRIP() {
        return (GitHubInput.instance().getInputSTRIP() || process.env["STRIP"] || "strip").trim();
    }
    getRawRANLIB() {
        return (GitHubInput.instance().getInputRANLIB() || process.env["RANLIB"] || "ranlib").trim();
    }
    getRawRC() {
        return (GitHubInput.instance().getInputRC() || process.env["RC"] || (process.env["VCINSTALLDIR"] ? "rc" : "windres")).trim();
    }
    getCC() {
        return this.getToolchainPrefix() + this.getRawCC();
    }
    getLD() {
        return this.getToolchainPrefix() + this.getRawLD();
    }
    getAR() {
        return this.getToolchainPrefix() + this.getRawAR();
    }
    getSTRIP() {
        return this.getToolchainPrefix() + this.getRawSTRIP();
    }
    getRANLIB() {
        return this.getToolchainPrefix() + this.getRawRANLIB();
    }
    getRC() {
        return this.getToolchainPrefix() + this.getRawRC();
    }
    getMake() {
        return (GitHubInput.instance().getInputMake() || process.env["MAKE"] ||
            (process.env["VCINSTALLDIR"] ? "nmake" :
                (process.platform === 'win32' ?
                    "mingw32-make" :
                    (process.platform === 'freebsd' || process.platform === 'openbsd' || process.platform === 'netbsd') ?
                        "gmake" : "make"))).trim();
    }
    getToolchainPrefix() {
        return (GitHubInput.instance().getInputToolchainPrefix() || process.env["TOOLCHAIN_PREFIX"] || "");
    }
    getSemiColonSeparatedInput(inputGetter, inputName) {
        const rawInput = inputGetter() || process.env[inputName];
        return parseInputSemiColon(rawInput);
    }
    getCflagsExtra() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputCflagsExtra(), "CFLAGS_EXTRA");
    }
    getIncDirsExtra() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputIncDirsExtra(), "INCDIRS_EXTRA");
    }
    getLdFlagsExtra() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputLdflagsExtra(), "LDFLAGS_EXTRA");
    }
    getLibDirsExtra() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputLibDirsExtra(), "LIBDIRS_EXTRA");
    }
    getLibsExtra() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputLibsExtra(), "LIBS_EXTRA");
    }
    getLuaPatches() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputLuaPatches(), "LUA_PATCHES");
    }
    getLuaRocksPatches() {
        return this.getSemiColonSeparatedInput(() => GitHubInput.instance().getInputLuaRocksPatches(), "LUAROCKS_PATCHES");
    }
    constructor() {
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaLinkCompilerTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class PucLuaLinkCompilerTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.objFiles = parent.getCompilerObjectFiles();
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Link Lua ${this.project.getVersion().getString()} compiler`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaCreatePkgConfigFilesTarget(this.project, this);
    }
    getStaticLibrary() {
        return this.parent.getStaticLibrary();
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getSharedLibrary() {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary() {
        return this.parent.getImportLibrary();
    }
    getInterpreter() {
        return this.parent.getInterpreter();
    }
    getCompiler() {
        return this.compiler;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const toolchain = this.project.getToolchain();
            const linker = toolchain.getLinker();
            linker.reset();
            const isGccLike = isGccLikeToolchain(toolchain);
            const compilerExt = (process.platform === 'win32' || process.platform === 'cygwin') ? ".exe" : "";
            const compilerFile = (0,external_node_path_namespaceObject.join)(this.project.getCompilerBuildDir(), `luac${compilerExt}`);
            const version = this.project.getVersion();
            linker.setOutputFile(compilerFile);
            const len = this.objFiles.getLenght();
            for (let i = 0; i < len; i++) {
                linker.addObjectFile(this.objFiles.getItem(i));
            }
            if (process.platform === 'win32' || process.platform === 'cygwin') {
                linker.addLibrary(this.parent.getStaticLibrary());
                if (isGccLike) {
                    linker.addLinkLibrary("m");
                }
            }
            else {
                linker.addLinkLibrary("m");
                linker.addLibrary(this.parent.getStaticLibrary());
                if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                    linker.addFlag("-Wl,-E");
                    linker.addLinkLibrary("edit");
                }
                else if (process.platform === 'linux') {
                    linker.addFlag("-Wl,-E");
                    linker.addLinkLibrary("dl");
                    linker.addLinkLibrary("readline");
                }
                else if (process.platform === 'aix') {
                    linker.addLinkLibrary("dl");
                    linker.addFlag("-brtl");
                    linker.addFlag("-bexpall");
                }
                else if (process.platform === 'darwin') {
                    linker.addLinkLibrary("readline");
                }
                else if (process.platform === "sunos") {
                    linker.addLinkLibrary("dl");
                }
                else {
                    linker.addLinkLibrary("dl");
                }
            }
            const libDirs = ToolchainEnvironmentVariables.instance().getLibDirsExtra();
            for (const libDir of libDirs) {
                linker.addLibDir(libDir);
            }
            const libs = ToolchainEnvironmentVariables.instance().getLibsExtra();
            for (const lib of libs) {
                linker.addLinkLibrary(lib);
            }
            const ldFlags = ToolchainEnvironmentVariables.instance().getLdFlagsExtra();
            for (const flag of ldFlags) {
                linker.addFlag(flag);
            }
            linker.execute()
                .then(() => {
                this.compiler = compilerFile;
                resolve();
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Link Lua ${this.project.getVersion().getString()} compiler`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaCompileCompilerTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class PucLuaCompileCompilerTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.sourcesInfo = parent.getSourcesInfo();
        this.rawCompilerObjectFiles = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Compile Lua ${this.project.getVersion().getString()} compiler`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaLinkCompilerTarget(this.project, this);
    }
    getCompilerObjectFiles() {
        return new ReadOnlyArray(this.rawCompilerObjectFiles);
    }
    getStaticLibrary() {
        return this.parent.getStaticLibrary();
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getSharedLibrary() {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary() {
        return this.parent.getImportLibrary();
    }
    getInterpreter() {
        return this.parent.getInterpreter();
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.rawCompilerObjectFiles.splice(0, this.rawCompilerObjectFiles.length);
            const version = this.project.getVersion();
            const toolchain = this.project.getToolchain();
            const isGccLike = isGccLikeToolchain(toolchain);
            const compiler = toolchain.getCompiler();
            const objExt = compiler.getObjectFileExtension();
            const compilerSrcFiles = this.sourcesInfo.getCompilerSrcFiles();
            const len = compilerSrcFiles.getLenght();
            const file_iter = (i) => {
                if (i < len) {
                    const file = compilerSrcFiles.getItem(i);
                    compiler.reset();
                    if (isGccLike) {
                        const compilerPath = compiler.path().getValue() || "";
                        const compilerName = (0,external_node_path_namespaceObject.basename)(compilerPath, (0,external_node_path_namespaceObject.extname)(compilerPath)).toLowerCase();
                        if (["gcc", "cc", "clang"].includes(compilerName)) {
                            compiler.addFlag("-std=gnu99");
                        }
                    }
                    compiler.setSpeedOptimizationSwitch();
                    compiler.setWarningSwitch();
                    if (process.platform === 'win32') {
                        if (isGccLike) {
                            /* do nothing */
                        }
                        else {
                            compiler.addFlag("/MD");
                        }
                    }
                    else if (process.platform === 'linux') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if ((version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) < 0) ||
                            (version.compareTo(LUA_55_VERSION) > 0)) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'darwin') {
                        compiler.addDefine("LUA_USE_MACOSX");
                        if (version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) <= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'sunos') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                        compiler.addDefine("_REENTRANT");
                    }
                    else if (process.platform === 'aix') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                    }
                    else if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if (version.compareTo(LUA_54_VERSION) >= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                        compiler.addIncludeDir("/usr/include/edit");
                    }
                    else if (process.platform === 'cygwin') {
                        compiler.addDefine("LUA_USE_LINUX");
                    }
                    const compatFlag = this.sourcesInfo.getCompatFlag();
                    if (compatFlag) {
                        compiler.addDefine(compatFlag);
                    }
                    compiler.addIncludeDir(this.sourcesInfo.getHeadersDir());
                    const fileBaseName = (0,external_node_path_namespaceObject.basename)(file);
                    const outputFile = (0,external_node_path_namespaceObject.join)(this.project.getCompilerBuildDir(), fileBaseName.substring(0, fileBaseName.length - 2) + objExt);
                    compiler.setOutputFile(outputFile);
                    compiler.setInputFile(file);
                    const incDirsExtra = ToolchainEnvironmentVariables.instance().getIncDirsExtra();
                    for (const incDir of incDirsExtra) {
                        compiler.addIncludeDir(incDir);
                    }
                    const cflagsExtra = ToolchainEnvironmentVariables.instance().getCflagsExtra();
                    for (const cflag of cflagsExtra) {
                        compiler.addFlag(cflag);
                    }
                    compiler.execute()
                        .then(() => {
                        this.rawCompilerObjectFiles.push(outputFile);
                        file_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            file_iter(0);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Compile Lua ${this.project.getVersion().getString()} compiler`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaLinkInterpreterTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class PucLuaLinkInterpreterTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.objFiles = parent.getInterpreterObjectFiles();
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Link Lua ${this.project.getVersion().getString()} interpreter`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaCompileCompilerTarget(this.project, this);
    }
    getStaticLibrary() {
        return this.parent.getStaticLibrary();
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getSharedLibrary() {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary() {
        return this.parent.getImportLibrary();
    }
    getInterpreter() {
        return this.interpreter;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const toolchain = this.project.getToolchain();
            const linker = toolchain.getLinker();
            linker.reset();
            const isGccLike = isGccLikeToolchain(toolchain);
            const interpreterExt = (process.platform === 'win32' || process.platform === 'cygwin') ? ".exe" : "";
            const interpreterFile = (0,external_node_path_namespaceObject.join)(this.project.getInterpreterBuildDir(), `lua${interpreterExt}`);
            const version = this.project.getVersion();
            linker.setOutputFile(interpreterFile);
            const len = this.objFiles.getLenght();
            for (let i = 0; i < len; i++) {
                linker.addObjectFile(this.objFiles.getItem(i));
            }
            if (process.platform === 'win32' || process.platform === 'cygwin') {
                const impLib = this.parent.getImportLibrary();
                if (impLib) {
                    linker.addLibrary(impLib);
                }
                else {
                    linker.addLibrary(this.parent.getSharedLibrary());
                }
                if (isGccLike) {
                    linker.addLinkLibrary("m");
                }
            }
            else {
                linker.addLinkLibrary("m");
                linker.addLibrary(this.parent.getStaticLibrary());
                if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                    linker.addFlag("-Wl,-E");
                    linker.addLinkLibrary("edit");
                }
                else if (process.platform === 'linux') {
                    linker.addFlag("-Wl,-E");
                    linker.addLinkLibrary("dl");
                    linker.addLinkLibrary("readline");
                }
                else if (process.platform === 'aix') {
                    linker.addLinkLibrary("dl");
                    linker.addFlag("-brtl");
                    linker.addFlag("-bexpall");
                }
                else if (process.platform === 'darwin') {
                    linker.addLinkLibrary("readline");
                }
                else if (process.platform === "sunos") {
                    linker.addLinkLibrary("dl");
                }
                else {
                    linker.addLinkLibrary("dl");
                }
            }
            const libDirs = ToolchainEnvironmentVariables.instance().getLibDirsExtra();
            for (const libDir of libDirs) {
                linker.addLibDir(libDir);
            }
            const libs = ToolchainEnvironmentVariables.instance().getLibsExtra();
            for (const lib of libs) {
                linker.addLinkLibrary(lib);
            }
            const ldFlags = ToolchainEnvironmentVariables.instance().getLdFlagsExtra();
            for (const flag of ldFlags) {
                linker.addFlag(flag);
            }
            linker.execute()
                .then(() => {
                this.interpreter = interpreterFile;
                resolve();
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Link Lua ${this.project.getVersion().getString()} interpreter`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaCompileInterpreterTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class PucLuaCompileInterpreterTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.sourcesInfo = parent.getSourcesInfo();
        this.rawInterpreterObjectFiles = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Compile Lua ${this.project.getVersion().getString()} interpreter`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaLinkInterpreterTarget(this.project, this);
    }
    getInterpreterObjectFiles() {
        return new ReadOnlyArray(this.rawInterpreterObjectFiles);
    }
    getStaticLibrary() {
        return this.parent.getStaticLibrary();
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getSharedLibrary() {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary() {
        return this.parent.getImportLibrary();
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.rawInterpreterObjectFiles.splice(0, this.rawInterpreterObjectFiles.length);
            const version = this.project.getVersion();
            const toolchain = this.project.getToolchain();
            const isGccLike = isGccLikeToolchain(toolchain);
            const compiler = toolchain.getCompiler();
            const objExt = compiler.getObjectFileExtension();
            const interpreterSrcFiles = this.sourcesInfo.getInterpreterSrcFiles();
            const len = interpreterSrcFiles.getLenght();
            const file_iter = (i) => {
                if (i < len) {
                    const file = interpreterSrcFiles.getItem(i);
                    compiler.reset();
                    if (isGccLike) {
                        const compilerPath = compiler.path().getValue() || "";
                        const compilerName = (0,external_node_path_namespaceObject.basename)(compilerPath, (0,external_node_path_namespaceObject.extname)(compilerPath)).toLowerCase();
                        if (["gcc", "cc", "clang"].includes(compilerName)) {
                            compiler.addFlag("-std=gnu99");
                        }
                    }
                    compiler.setSpeedOptimizationSwitch();
                    compiler.setWarningSwitch();
                    if (process.platform === 'win32') {
                        if (isGccLike) {
                            /* do nothing */
                        }
                        else {
                            compiler.addFlag("/MD");
                        }
                        compiler.addDefine("LUA_BUILD_AS_DLL");
                    }
                    else if (process.platform === 'linux') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if ((version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) < 0) ||
                            (version.compareTo(LUA_55_VERSION) > 0)) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'darwin') {
                        compiler.addDefine("LUA_USE_MACOSX");
                        if (version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) <= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'sunos') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                        compiler.addDefine("_REENTRANT");
                    }
                    else if (process.platform === 'aix') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                    }
                    else if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if (version.compareTo(LUA_54_VERSION) >= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                        compiler.addIncludeDir("/usr/include/edit");
                    }
                    else if (process.platform === 'cygwin') {
                        compiler.addDefine("LUA_USE_LINUX");
                    }
                    const compatFlag = this.sourcesInfo.getCompatFlag();
                    if (compatFlag) {
                        compiler.addDefine(compatFlag);
                    }
                    compiler.addIncludeDir(this.sourcesInfo.getHeadersDir());
                    const fileBaseName = (0,external_node_path_namespaceObject.basename)(file);
                    const outputFile = (0,external_node_path_namespaceObject.join)(this.project.getInterpreterBuildDir(), fileBaseName.substring(0, fileBaseName.length - 2) + objExt);
                    compiler.setOutputFile(outputFile);
                    compiler.setInputFile(file);
                    const incDirsExtra = ToolchainEnvironmentVariables.instance().getIncDirsExtra();
                    for (const incDir of incDirsExtra) {
                        compiler.addIncludeDir(incDir);
                    }
                    const cflagsExtra = ToolchainEnvironmentVariables.instance().getCflagsExtra();
                    for (const cflag of cflagsExtra) {
                        compiler.addFlag(cflag);
                    }
                    compiler.execute()
                        .then(() => {
                        this.rawInterpreterObjectFiles.push(outputFile);
                        file_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            file_iter(0);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Compile Lua ${this.project.getVersion().getString()} interpreter`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaArchiveStaticLibTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/




class PucLuaArchiveStaticLibTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.objFiles = parent.getStaticLibObjectFiles();
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Archive Lua ${this.project.getVersion().getString()} static library`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaCompileInterpreterTarget(this.project, this);
    }
    getStaticLibObjectFiles() {
        return this.objFiles;
    }
    getStaticLibrary() {
        return this.staticLibrary;
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getSharedLibrary() {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary() {
        return this.parent.getImportLibrary();
    }
    execute() {
        return new Promise((resolve, reject) => {
            const version = this.project.getVersion();
            const libName = `lua${version.getMajor()}${version.getMinor()}`;
            const toolchain = this.project.getToolchain();
            const archiver = toolchain.getArchiver();
            const isGccLike = isGccLikeToolchain(toolchain);
            const archivePrefix = isGccLike ? "lib" : "";
            const archiveSuffix = isGccLike ? "" : "-static";
            const archiveExt = archiver.getArchiveExtension();
            const archiveName = `${archivePrefix}${libName}${archiveSuffix}${archiveExt}`;
            const archive = (0,external_node_path_namespaceObject.join)(this.project.getStaticLibBuildDir(), archiveName);
            archiver.reset();
            if (isGccLike) {
                archiver.addFlag("cru");
            }
            const len = this.objFiles.getLenght();
            for (let i = 0; i < len; i++) {
                archiver.addInputFile(this.objFiles.getItem(i));
            }
            archiver.setOutputFile(archive);
            archiver.execute()
                .then(() => {
                if (isGccLike) {
                    const gccLikeToolchain = toolchain;
                    const ranlib = gccLikeToolchain.getRanlib();
                    ranlib.reset();
                    ranlib.setInputFile(archive);
                    ranlib.execute()
                        .then(() => {
                        this.staticLibrary = archive;
                        resolve();
                    })
                        .catch(reject);
                }
                else {
                    this.staticLibrary = archive;
                    resolve();
                }
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Archive Lua ${this.project.getVersion().getString()} static library`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaCompileStaticLibTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class PucLuaCompileStaticLibTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.sourcesInfo = parent.getSourcesInfo();
        this.rawStaticLibObjectFiles = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Compile Lua ${this.project.getVersion().getString()} static library`);
            resolve();
        });
    }
    getSourcesInfo() {
        return this.sourcesInfo;
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaArchiveStaticLibTarget(this.project, this);
    }
    getStaticLibObjectFiles() {
        return new ReadOnlyArray(this.rawStaticLibObjectFiles);
    }
    getSharedLibrary() {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary() {
        return this.parent.getImportLibrary();
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.rawStaticLibObjectFiles.splice(0, this.rawStaticLibObjectFiles.length);
            const version = this.project.getVersion();
            const toolchain = this.project.getToolchain();
            const isGccLike = isGccLikeToolchain(toolchain);
            const compiler = toolchain.getCompiler();
            const objExt = compiler.getObjectFileExtension();
            const libSrcFiles = this.sourcesInfo.getLibSrcFiles();
            const len = libSrcFiles.getLenght();
            const file_iter = (i) => {
                if (i < len) {
                    const file = libSrcFiles.getItem(i);
                    compiler.reset();
                    if (isGccLike) {
                        const compilerPath = compiler.path().getValue() || "";
                        const compilerName = (0,external_node_path_namespaceObject.basename)(compilerPath, (0,external_node_path_namespaceObject.extname)(compilerPath)).toLowerCase();
                        if (["gcc", "cc", "clang"].includes(compilerName)) {
                            compiler.addFlag("-std=gnu99");
                        }
                    }
                    compiler.setSpeedOptimizationSwitch();
                    compiler.setWarningSwitch();
                    if (process.platform === 'win32') {
                        if (isGccLike) {
                            if (version.compareTo(LUA_52_VERSION) >= 0) {
                                compiler.addDefine("l_fseek", "fseeko64");
                                compiler.addDefine("l_ftell", "ftello64");
                                compiler.addDefine("l_seeknum", "off64_t");
                            }
                        }
                        else {
                            compiler.addFlag("/MD");
                        }
                        compiler.addDefine("LUA_BUILD_AS_DLL");
                    }
                    else if (process.platform === 'linux') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if ((version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) < 0) ||
                            (version.compareTo(LUA_55_VERSION) > 0)) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'darwin') {
                        compiler.addDefine("LUA_USE_MACOSX");
                        if (version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) <= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'sunos') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                        compiler.addDefine("_REENTRANT");
                    }
                    else if (process.platform === 'aix') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                    }
                    else if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if (version.compareTo(LUA_54_VERSION) >= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                        compiler.addIncludeDir("/usr/include/edit");
                    }
                    else if (process.platform === 'cygwin') {
                        compiler.addDefine("LUA_USE_LINUX");
                    }
                    const compatFlag = this.sourcesInfo.getCompatFlag();
                    if (compatFlag) {
                        compiler.addDefine(compatFlag);
                    }
                    compiler.addIncludeDir(this.sourcesInfo.getHeadersDir());
                    const fileBaseName = (0,external_node_path_namespaceObject.basename)(file);
                    const outputFile = (0,external_node_path_namespaceObject.join)(this.project.getStaticLibBuildDir(), fileBaseName.substring(0, fileBaseName.length - 2) + objExt);
                    compiler.setOutputFile(outputFile);
                    compiler.setInputFile(file);
                    const incDirsExtra = ToolchainEnvironmentVariables.instance().getIncDirsExtra();
                    for (const incDir of incDirsExtra) {
                        compiler.addIncludeDir(incDir);
                    }
                    const cflagsExtra = ToolchainEnvironmentVariables.instance().getCflagsExtra();
                    for (const cflag of cflagsExtra) {
                        compiler.addFlag(cflag);
                    }
                    compiler.execute()
                        .then(() => {
                        this.rawStaticLibObjectFiles.push(outputFile);
                        file_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            file_iter(0);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Compile Lua ${this.project.getVersion().getString()} static library`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaLinkSharedLibTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






class PucLuaLinkSharedLibTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.objFiles = parent.getSharedLibObjectFiles();
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Link Lua ${this.project.getVersion().getString()} shared library`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaCompileStaticLibTarget(this.project, this);
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getSharedLibObjectFiles() {
        return this.objFiles;
    }
    getSharedLibrary() {
        return this.sharedLibrary;
    }
    getImportLibrary() {
        return this.importLibrary;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const version = this.project.getVersion();
            const libName = `lua${version.getMajor()}${version.getMinor()}`;
            const toolchain = this.project.getToolchain();
            const linker = toolchain.getLinker();
            linker.reset();
            const isGccLike = isGccLikeToolchain(toolchain);
            if (process.platform === 'win32' || process.platform === 'cygwin') {
                const libBaseName = process.platform === 'cygwin' ?
                    `cyg${libName}.dll` :
                    `${libName}.dll`;
                let libraryPath = (0,external_node_path_namespaceObject.join)(this.project.getSharedLibBuildDir(), libBaseName);
                let impLib;
                if (hasWin32ImportLibraryDecorator(linker)) {
                    const win32Linker = linker;
                    const implibExt = win32Linker.getImportLibraryExtension();
                    const implibBaseName = isGccLike ?
                        `lib${libName}${implibExt}` :
                        `${libName}${implibExt}`;
                    impLib = (0,external_node_path_namespaceObject.join)(this.project.getSharedLibBuildDir(), implibBaseName);
                    win32Linker.setImportLibrary(impLib);
                }
                linker.setOutputFile(libraryPath);
                linker.setOutputMode("shared");
                const len = this.objFiles.getLenght();
                for (let i = 0; i < len; i++) {
                    linker.addObjectFile(this.objFiles.getItem(i));
                }
                if (isGccLike) {
                    linker.addLinkLibrary("m");
                }
                linker.execute()
                    .then(() => {
                    if (isGccLike) {
                        const gccLikeToolchain = toolchain;
                        const strip = gccLikeToolchain.getStrip();
                        strip.reset();
                        strip.addStripUnneeded();
                        strip.setInputFile(libraryPath);
                        strip.execute()
                            .then(() => {
                            this.sharedLibrary = libraryPath;
                            this.importLibrary = impLib;
                            resolve();
                        })
                            .catch(reject);
                    }
                    else {
                        this.sharedLibrary = libraryPath;
                        this.importLibrary = impLib;
                        resolve();
                    }
                })
                    .catch(reject);
            }
            else {
                const libExt = process.platform === 'darwin' ? 'dylib' : 'so';
                const libBaseName = `lib${libName}.${libExt}`;
                const libraryPath = (0,external_node_path_namespaceObject.join)(this.project.getSharedLibBuildDir(), libBaseName);
                linker.setOutputFile(libraryPath);
                linker.setOutputMode("shared");
                linker.addLinkLibrary("m");
                const len = this.objFiles.getLenght();
                for (let i = 0; i < len; i++) {
                    linker.addObjectFile(this.objFiles.getItem(i));
                }
                if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                    linker.addLinkLibrary("edit");
                }
                else if (process.platform === 'linux') {
                    linker.addLinkLibrary("dl");
                    linker.addLinkLibrary("readline");
                }
                else if (process.platform === 'aix') {
                    linker.addLinkLibrary("dl");
                    linker.addFlag("-brtl");
                    linker.addFlag("-bexpall");
                }
                else if (process.platform === 'darwin') {
                    linker.addLinkLibrary("readline");
                }
                else if (process.platform === "sunos") {
                    linker.addLinkLibrary("dl");
                }
                else {
                    linker.addLinkLibrary("dl");
                }
                const libDirs = ToolchainEnvironmentVariables.instance().getLibDirsExtra();
                for (const libDir of libDirs) {
                    linker.addLibDir(libDir);
                }
                const libs = ToolchainEnvironmentVariables.instance().getLibsExtra();
                for (const lib of libs) {
                    linker.addLinkLibrary(lib);
                }
                const ldFlags = ToolchainEnvironmentVariables.instance().getLdFlagsExtra();
                for (const flag of ldFlags) {
                    linker.addFlag(flag);
                }
                linker.execute()
                    .then(() => {
                    if (process.platform === 'darwin') {
                        this.sharedLibrary = libraryPath;
                        resolve();
                    }
                    else {
                        if (isGccLike) {
                            const gccLikeToolchain = toolchain;
                            const strip = gccLikeToolchain.getStrip();
                            strip.reset();
                            strip.addStripUnneeded();
                            strip.setInputFile(libraryPath);
                            strip.execute()
                                .then(() => {
                                this.sharedLibrary = libraryPath;
                                resolve();
                            })
                                .catch(reject);
                        }
                        else {
                            this.sharedLibrary = libraryPath;
                            resolve();
                        }
                    }
                })
                    .catch(reject);
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Link Lua ${this.project.getVersion().getString()} shared library`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Building/PucLuaCompileSharedLibTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class PucLuaCompileSharedLibTarget {
    constructor(project, parent, sourcesInfo) {
        this.project = project;
        this.parent = parent;
        this.sourcesInfo = sourcesInfo;
        this.rawSharedLibObjectFiles = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Compile Lua ${this.project.getVersion().getString()} shared library`);
            resolve();
        });
    }
    getSourcesInfo() {
        return this.sourcesInfo;
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaLinkSharedLibTarget(this.project, this);
    }
    getSharedLibObjectFiles() {
        return new ReadOnlyArray(this.rawSharedLibObjectFiles);
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.rawSharedLibObjectFiles.splice(0, this.rawSharedLibObjectFiles.length);
            const version = this.project.getVersion();
            const toolchain = this.project.getToolchain();
            const isGccLike = isGccLikeToolchain(toolchain);
            const compiler = toolchain.getCompiler();
            const objExt = compiler.getObjectFileExtension();
            const libSrcFiles = this.sourcesInfo.getLibSrcFiles();
            const len = libSrcFiles.getLenght();
            const file_iter = (i) => {
                if (i < len) {
                    const file = libSrcFiles.getItem(i);
                    compiler.reset();
                    if (isGccLike) {
                        const compilerPath = compiler.path().getValue() || "";
                        const compilerName = (0,external_node_path_namespaceObject.basename)(compilerPath, (0,external_node_path_namespaceObject.extname)(compilerPath)).toLowerCase();
                        if (["gcc", "cc", "clang"].includes(compilerName)) {
                            compiler.addFlag("-std=gnu99");
                        }
                    }
                    compiler.setSpeedOptimizationSwitch();
                    compiler.setWarningSwitch();
                    if (process.platform === 'win32') {
                        if (isGccLike) {
                            if (version.compareTo(LUA_52_VERSION) >= 0) {
                                compiler.addDefine("l_fseek", "fseeko64");
                                compiler.addDefine("l_ftell", "ftello64");
                                compiler.addDefine("l_seeknum", "off64_t");
                            }
                        }
                        else {
                            compiler.addFlag("/MD");
                        }
                        compiler.addDefine("LUA_BUILD_AS_DLL");
                    }
                    else if (process.platform === 'linux') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if ((version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) < 0) ||
                            (version.compareTo(LUA_55_VERSION) > 0)) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'darwin') {
                        compiler.addDefine("LUA_USE_MACOSX");
                        if (version.compareTo(LUA_54_VERSION) >= 0 && version.compareTo(LUA_55_VERSION) <= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                    }
                    else if (process.platform === 'sunos') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                        compiler.addDefine("_REENTRANT");
                    }
                    else if (process.platform === 'aix') {
                        compiler.addDefine("LUA_USE_POSIX");
                        compiler.addDefine("LUA_USE_DLOPEN");
                    }
                    else if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                        compiler.addDefine("LUA_USE_LINUX");
                        if (version.compareTo(LUA_54_VERSION) >= 0) {
                            compiler.addDefine("LUA_USE_READLINE");
                        }
                        compiler.addIncludeDir("/usr/include/edit");
                    }
                    else if (process.platform === 'cygwin') {
                        compiler.addDefine("LUA_USE_LINUX");
                    }
                    if (process.platform !== "win32" && isGccLike) {
                        compiler.addFlag("-fPIC");
                    }
                    const compatFlag = this.sourcesInfo.getCompatFlag();
                    if (compatFlag) {
                        compiler.addDefine(compatFlag);
                    }
                    compiler.addIncludeDir(this.sourcesInfo.getHeadersDir());
                    const fileBaseName = (0,external_node_path_namespaceObject.basename)(file);
                    const outputFile = (0,external_node_path_namespaceObject.join)(this.project.getSharedLibBuildDir(), fileBaseName.substring(0, fileBaseName.length - 2) + objExt);
                    compiler.setOutputFile(outputFile);
                    compiler.setInputFile(file);
                    const incDirsExtra = ToolchainEnvironmentVariables.instance().getIncDirsExtra();
                    for (const incDir of incDirsExtra) {
                        compiler.addIncludeDir(incDir);
                    }
                    const cflagsExtra = ToolchainEnvironmentVariables.instance().getCflagsExtra();
                    for (const cflag of cflagsExtra) {
                        compiler.addFlag(cflag);
                    }
                    compiler.execute()
                        .then(() => {
                        this.rawSharedLibObjectFiles.push(outputFile);
                        file_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            file_iter(0);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Compile Lua ${this.project.getVersion().getString()} shared library`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: external "fs/promises"
const external_fs_promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs/promises");
;// CONCATENATED MODULE: ./src/Projects/Targets/AbstractCreateDirectoriesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


class AbstractCreateDirectoriesTarget {
    constructor(dirs) {
        this.directories = new ReadOnlyArray(dirs);
    }
    getDirectories() {
        return this.directories;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const len = this.directories.getLenght();
            const dir_iter = (i) => {
                if (i < len) {
                    const dir = this.directories.getItem(i);
                    (0,external_fs_promises_namespaceObject.stat)(dir)
                        .then(s => {
                        if (s.isDirectory()) {
                            dir_iter(i + 1);
                        }
                        else {
                            reject(new Error("The chosen path is already on disk, but it is not a directory"));
                        }
                    })
                        .catch(() => {
                        (0,external_fs_promises_namespaceObject.mkdir)(dir, { recursive: true })
                            .then(() => {
                            dir_iter(i + 1);
                        })
                            .catch(reject);
                    });
                }
                else {
                    resolve();
                }
            };
            dir_iter(0);
        });
    }
}

;// CONCATENATED MODULE: ./src/Util/CheckFiles.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function checkFiles(files) {
    return new Promise((resolve, reject) => {
        const len = files.length;
        const file_iter = (i) => {
            if (i < len) {
                const f = files[i];
                (0,promises_namespaceObject.stat)(f)
                    .then(s => {
                    if (s.isFile()) {
                        file_iter(i + 1);
                    }
                    else {
                        reject(new Error(`${f} is not a file`));
                    }
                })
                    .catch(err => {
                    if (err.code === 'ENOENT') {
                        reject(new Error(`The expected file \`${f}' was not found`));
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                resolve();
            }
        };
        file_iter(0);
    });
}

;// CONCATENATED MODULE: external "node:child_process"
const external_node_child_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");
;// CONCATENATED MODULE: ./src/Util/ExecuteProcess.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


function executeProcess(tool, opts) {
    return new Promise((resolve, reject) => {
        const spawnOpts = { cwd: opts === null || opts === void 0 ? void 0 : opts.cwd };
        const p = (opts && opts.args) ? (0,external_node_child_process_namespaceObject.spawn)(tool, opts.args, spawnOpts) : (0,external_node_child_process_namespaceObject.spawn)(tool, spawnOpts);
        if (opts && opts.args && opts.verbose) {
            const values = [`"${tool}"`];
            for (const a of opts.args) {
                values.push(`"${a.replace(/"/g, "\\\"")}"`);
            }
            Console.instance().writeLine(values.join(" "));
        }
        if (opts && opts.stdout) {
            p.stdout.on("data", opts.stdout);
        }
        if (opts && opts.stderr) {
            p.stderr.on("data", opts.stderr);
        }
        p.on("close", code => {
            if (code === 0) {
                resolve(code);
            }
            else {
                reject(code);
            }
        });
        p.on("error", err => {
            reject(err);
        });
    });
}
function getStdOutFromProcessExecution(tool, opts) {
    return new Promise((resolve, reject) => {
        const spawnOpts = { cwd: opts === null || opts === void 0 ? void 0 : opts.cwd };
        const p = (opts && opts.args) ? (0,external_node_child_process_namespaceObject.spawn)(tool, opts.args, spawnOpts) : (0,external_node_child_process_namespaceObject.spawn)(tool, spawnOpts);
        const stdOutput = [];
        if (opts && opts.args && opts.verbose) {
            const values = [`"${tool}"`];
            for (const a of opts.args) {
                values.push(`"${a.replace(/"/g, "\\\"")}"`);
            }
            Console.instance().writeLine(values.join(" "));
        }
        p.stdout.on("data", (chunk) => {
            stdOutput.push((chunk.toString()));
        });
        if (opts && opts.stderr) {
            p.stderr.on("data", opts.stderr);
        }
        p.on("close", code => {
            if (code === 0) {
                resolve({ code: code, lines: stdOutput.join('').split(/\r\n|\r|\n/) });
            }
            else {
                reject(code);
            }
        });
        p.on("error", err => {
            reject(err);
        });
    });
}
function getFirstLineFromProcessExecution(tool, args, verbose) {
    return new Promise((resolve, reject) => {
        getStdOutFromProcessExecution(tool, { args: args, verbose: verbose })
            .then(result => {
            resolve(result.lines[0]);
        })
            .catch(reject);
    });
}

;// CONCATENATED MODULE: ./src/Util/WindowsRegQuery.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function windowsRegQuery(key) {
    return new Promise((resolve, reject) => {
        getStdOutFromProcessExecution("reg", {
            args: ["query", key]
        })
            .then(result => {
            resolve(result.lines);
        })
            .catch(reject);
    });
}

;// CONCATENATED MODULE: ./src/Util/FindGitForWindowsInstallDir.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function findGitForWindowsInstallDir() {
    return new Promise((resolve, reject) => {
        windowsRegQuery("HKEY_LOCAL_MACHINE\\SOFTWARE\\GitForWindows")
            .then(lines => {
            if (lines.length > 0) {
                let i = 0;
                let gitInstallDir = undefined;
                while (!gitInstallDir && i < lines.length) {
                    const match = /\s*InstallPath\s+REG_SZ\s+(.*)(\r\n|\r|\n)?/i.exec(lines[i]);
                    if (match) {
                        const path = match[1].trim();
                        gitInstallDir = path;
                    }
                    i++;
                }
                if (gitInstallDir) {
                    resolve(gitInstallDir);
                }
                else {
                    reject(new Error("Unable to find Git For Windows installation patch"));
                }
            }
            else {
                reject(new Error("Git For Windows installation directory was not set"));
            }
        })
            .catch(err => {
            reject(new Error("Unable to query Git For Windows installation path"));
        });
    });
}

;// CONCATENATED MODULE: ./src/Util/ExtractTarGz.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/




function getWin32TarPath() {
    return new Promise((resolve, reject) => {
        const cmdPath = (process.env["COMSPEC"] || "cmd.exe").trim();
        const cmdDir = (0,external_node_path_namespaceObject.dirname)(cmdPath);
        const tarPath = cmdDir === "." ? "tar.exe" : (0,external_node_path_namespaceObject.join)(cmdDir, "tar.exe");
        checkFiles([tarPath])
            .then(() => {
            resolve(tarPath);
        })
            .catch(reject);
    });
}
function getGitTarPath() {
    return new Promise((resolve, reject) => {
        findGitForWindowsInstallDir()
            .then(gitDir => {
            const tarPath = (0,external_node_path_namespaceObject.join)(gitDir, "usr", "bin", "tar.exe");
            const cygpath = (0,external_node_path_namespaceObject.join)(gitDir, "usr", "bin", "cygpath.exe");
            checkFiles([tarPath, cygpath])
                .then(() => {
                resolve({
                    program: tarPath,
                    cygpath: cygpath
                });
            })
                .catch(reject);
        })
            .catch(reject);
    });
}
function win32ExtractTarGz(inputFile, opts) {
    return new Promise((resolve, reject) => {
        getWin32TarPath()
            .then(win32Tar => {
            executeProcess(win32Tar, {
                args: opts && opts.cwd ?
                    ["-C", opts.cwd, "-xf", inputFile] :
                    ["-xf", inputFile], verbose: opts === null || opts === void 0 ? void 0 : opts.verbose
            })
                .then(resolve)
                .catch(reject);
        })
            .catch(win32TarErr => {
            getGitTarPath()
                .then(gitTargetProgram => {
                getFirstLineFromProcessExecution(gitTargetProgram.cygpath, ["-u", inputFile], opts === null || opts === void 0 ? void 0 : opts.verbose)
                    .then(inputFileUnixPath => {
                    if (opts && opts.cwd) {
                        getFirstLineFromProcessExecution(gitTargetProgram.cygpath, ["-u", opts.cwd], opts === null || opts === void 0 ? void 0 : opts.verbose)
                            .then(cwdUnixPath => {
                            executeProcess(gitTargetProgram.program, {
                                args: ["-C", cwdUnixPath, "-xf", inputFileUnixPath],
                                verbose: opts === null || opts === void 0 ? void 0 : opts.verbose
                            })
                                .then(resolve)
                                .catch(reject);
                        });
                    }
                    else {
                        executeProcess(gitTargetProgram.program, {
                            args: ["-xf", inputFileUnixPath],
                            verbose: opts === null || opts === void 0 ? void 0 : opts.verbose
                        })
                            .then(resolve)
                            .catch(reject);
                    }
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    });
}
function extractTarGz(inputFile, opts) {
    return (process.platform === "win32") ?
        win32ExtractTarGz(inputFile, opts) :
        executeProcess("tar", {
            args: opts && opts.cwd ?
                ["-C", opts.cwd, "-xf", inputFile] :
                ["-xf", inputFile], verbose: opts === null || opts === void 0 ? void 0 : opts.verbose
        });
}

;// CONCATENATED MODULE: external "node:stream"
const external_node_stream_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:stream");
;// CONCATENATED MODULE: external "node:fs"
const external_node_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");
;// CONCATENATED MODULE: external "node:timers/promises"
const external_node_timers_promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:timers/promises");
;// CONCATENATED MODULE: ./src/Util/DownloadFile.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



const DEFAULT_MAX_TRIES = 5;
const DOWNLOAD_MIN_BASE = 1.7;
const DOWNLOAD_MAX_BASE = 2.3;
function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}
function getWaitingTimeInMilliseconds(retries) {
    let waitingTimeInMilliseconds = 0;
    if (retries > 0) {
        const B = randomBetween(DOWNLOAD_MIN_BASE, DOWNLOAD_MAX_BASE);
        const waitingTimeInSeconds = Math.pow(B, retries);
        waitingTimeInMilliseconds = Math.floor(waitingTimeInSeconds * 1000);
    }
    return waitingTimeInMilliseconds;
}
function downloadFile(url, outFile, maxTries) {
    return new Promise((resolve, reject) => {
        const tries = (maxTries && maxTries > 0 ? maxTries : DEFAULT_MAX_TRIES) + 1;
        let succeed = false;
        let execErr;
        const iter = (i) => {
            if (!succeed && i < tries) {
                (0,external_node_timers_promises_namespaceObject.setTimeout)(getWaitingTimeInMilliseconds(i))
                    .then(() => {
                    fetch(url).then(response => {
                        if (!response.ok) {
                            execErr = new Error("Response is not ok");
                            iter(i + 1);
                        }
                        else {
                            const body = response.body;
                            if (body === null) {
                                execErr = new Error("Response body is null");
                                iter(i + 1);
                            }
                            else {
                                external_node_stream_namespaceObject.Readable.fromWeb(body)
                                    .pipe((0,external_node_fs_namespaceObject.createWriteStream)(outFile))
                                    .on("error", err => {
                                    execErr = err;
                                    iter(i + 1);
                                })
                                    .on("finish", () => {
                                    succeed = true;
                                    iter(i + 1);
                                });
                            }
                        }
                    })
                        .catch(err => {
                        execErr = err;
                        iter(i + 1);
                    });
                })
                    .catch(timeoutErr => {
                    execErr = timeoutErr;
                    iter(i + 1);
                });
            }
            else if (succeed) {
                resolve(outFile);
            }
            else if (execErr) {
                reject(execErr);
            }
            else {
                reject(new Error("Download failed"));
            }
        };
        iter(0);
    });
}

;// CONCATENATED MODULE: ./src/Util/FileHash.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



function getFileHash(file, algorithm) {
    return new Promise((resolve, reject) => {
        const hashOutput = [];
        const hashOutputStream = new external_node_stream_namespaceObject.Writable({
            write(chunk, encoding, callback) {
                hashOutput.push(chunk.toString());
                callback();
            }
        });
        (0,external_node_fs_namespaceObject.createReadStream)(file)
            .pipe((0,external_node_crypto_namespaceObject.createHash)(algorithm))
            .setEncoding("hex")
            .pipe(hashOutputStream)
            .on("close", () => {
            resolve(hashOutput.join(""));
        })
            .on("error", reject);
    });
}
function verifyFileHash(file, algorithm, expectedHash) {
    return new Promise((resolve, reject) => {
        getFileHash(file, algorithm)
            .then(value => {
            resolve(expectedHash.toLowerCase() == value);
        })
            .catch(reject);
    });
}

;// CONCATENATED MODULE: ./src/CliCacheService.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class CliCacheService {
    static instance() {
        if (!CliCacheService._instance) {
            CliCacheService._instance = new CliCacheService();
        }
        return CliCacheService._instance;
    }
    getCacheDirName() {
        return "setup-lua-cache";
    }
    getConfigHomeDir() {
        const configHomeEnvVar = process.platform === 'win32' ? "LOCALAPPDATA" : "XDG_CACHE_HOME";
        return (process.env[configHomeEnvVar] || "").trim();
    }
    useCache() {
        let result = true;
        const useCacheEnvVar = process.env['USE_CACHE'];
        if (useCacheEnvVar === undefined ||
            useCacheEnvVar === "" ||
            useCacheEnvVar === "true" ||
            useCacheEnvVar === "True" ||
            useCacheEnvVar === "TRUE" ||
            useCacheEnvVar === "1" ||
            useCacheEnvVar === "on" ||
            useCacheEnvVar === "ON" ||
            useCacheEnvVar === "y" ||
            useCacheEnvVar === "Y" ||
            useCacheEnvVar === "yes" ||
            useCacheEnvVar === "Yes" ||
            useCacheEnvVar === "YES") {
            /* do nothing */
        }
        else if (useCacheEnvVar === "false" ||
            useCacheEnvVar === "False" ||
            useCacheEnvVar === "FALSE" ||
            useCacheEnvVar === "0" ||
            useCacheEnvVar === "off" ||
            useCacheEnvVar === "Off" ||
            useCacheEnvVar === "OFF" ||
            useCacheEnvVar === "n" ||
            useCacheEnvVar === "N" ||
            useCacheEnvVar === "no" ||
            useCacheEnvVar === "No" ||
            useCacheEnvVar === "NO") {
            result = false;
        }
        return result;
    }
    getCacheDirectory(key) {
        return new Promise((resolve, reject) => {
            const baseDirs = [
                this.getConfigHomeDir(),
                (process.platform === "darwin") ?
                    (0,external_node_path_namespaceObject.join)((0,external_node_os_namespaceObject.homedir)(), "Library", "Caches") :
                    (0,external_node_path_namespaceObject.join)((0,external_node_os_namespaceObject.homedir)(), ".cache")
            ];
            const dir_iter = (i) => {
                if (i < baseDirs.length) {
                    const dir = baseDirs[i];
                    if (dir) {
                        (0,promises_namespaceObject.stat)(dir)
                            .then(baseDirStat => {
                            const setupLuaDir = (0,external_node_path_namespaceObject.join)(dir, this.getCacheDirName());
                            const furtherProcessing = () => {
                                const keyDir = (0,external_node_path_namespaceObject.join)(setupLuaDir, key);
                                (0,promises_namespaceObject.stat)(keyDir)
                                    .then(keyDirStat => {
                                    if (keyDirStat.isDirectory()) {
                                        resolve(keyDir);
                                    }
                                    else {
                                        dir_iter(i + 1);
                                    }
                                })
                                    .catch(keyDirStatErr => {
                                    if (keyDirStatErr.code === "ENOENT") {
                                        (0,promises_namespaceObject.mkdir)(keyDir)
                                            .then(() => {
                                            resolve(keyDir);
                                        })
                                            .catch(keyDirMkdirErr => {
                                            dir_iter(i + 1);
                                        });
                                    }
                                    else {
                                        dir_iter(i + 1);
                                    }
                                });
                            };
                            (0,promises_namespaceObject.stat)(setupLuaDir)
                                .then(setupLuaDirStat => {
                                if (setupLuaDirStat.isDirectory()) {
                                    furtherProcessing();
                                }
                                else {
                                    dir_iter(i + 1);
                                }
                            })
                                .catch(setupLuaDirStatErr => {
                                if (setupLuaDirStatErr.code === "ENOENT") {
                                    (0,promises_namespaceObject.mkdir)(setupLuaDir)
                                        .then(() => {
                                        furtherProcessing();
                                    })
                                        .catch(setupLuaDirMkdirErr => {
                                        dir_iter(i + 1);
                                    });
                                }
                                else {
                                    dir_iter(i + 1);
                                }
                            });
                        })
                            .catch(baseDirStatErr => {
                            dir_iter(i + 1);
                        });
                    }
                    else {
                        dir_iter(i + 1);
                    }
                }
                else {
                    reject(new Error("Unable to find a directory to store cache files"));
                }
            };
            dir_iter(0);
        });
    }
    save(path, key) {
        return new Promise((resolve, reject) => {
            this.getCacheDirectory(key)
                .then(cacheDir => {
                const cachedFile = (0,external_node_path_namespaceObject.join)(cacheDir, (0,external_node_path_namespaceObject.basename)(path));
                (0,promises_namespaceObject.cp)(path, cachedFile, { force: true })
                    .then(resolve)
                    .catch(cpErr => {
                    reject(new Error("Failed to copy the download file to the proper cache location"));
                });
            })
                .catch(reject);
        });
    }
    restore(path, primaryKey) {
        return new Promise((resolve, reject) => {
            this.getCacheDirectory(primaryKey)
                .then(cacheDir => {
                const cachedFile = (0,external_node_path_namespaceObject.join)(cacheDir, (0,external_node_path_namespaceObject.basename)(path));
                (0,promises_namespaceObject.cp)(cachedFile, path, { force: true })
                    .then(resolve)
                    .catch(cpErr => {
                    reject(new Error("Failed to copy the cached file to the proper location"));
                });
            })
                .catch(reject);
        });
    }
    constructor() {
    }
}

;// CONCATENATED MODULE: ./src/CacheService.ts

const CacheService = CliCacheService;

;// CONCATENATED MODULE: ./src/Projects/Targets/Fetch/AbstractFetchCompressedTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/




class AbstractFetchCompressedTarget {
    getUrl() {
        return this.url;
    }
    getWorkDir() {
        return this.workDir;
    }
    getCacheKey() {
        return this.cacheKey;
    }
    constructor(url, workDir, cacheKey, handler, opts) {
        var _a;
        this.url = url;
        this.workDir = workDir;
        this.cacheKey = cacheKey;
        this.handler = handler;
        this.opts = {};
        this.opts.filename = (_a = opts === null || opts === void 0 ? void 0 : opts.filename) !== null && _a !== void 0 ? _a : (0,external_node_path_namespaceObject.basename)(url.toString());
        this.opts.maxTries = opts === null || opts === void 0 ? void 0 : opts.maxTries;
        if (opts === null || opts === void 0 ? void 0 : opts.fileHash) {
            this.opts.fileHash = {
                algorithm: opts.fileHash.algorithm,
                expectedHash: opts.fileHash.expectedHash
            };
        }
    }
    processArchive(file) {
        return new Promise((resolve, reject) => {
            const fileHash = this.opts.fileHash;
            if (fileHash) {
                verifyFileHash(file, fileHash.algorithm, fileHash.expectedHash)
                    .then(match => {
                    if (match) {
                        this.handler(file, { cwd: this.workDir, verbose: true })
                            .then(code => {
                            if (code === 0) {
                                resolve();
                            }
                            else {
                                reject(new Error(`Failed to extract ${(0,external_node_path_namespaceObject.basename)(file)}`));
                            }
                        })
                            .catch(reject);
                    }
                    else {
                        reject(new Error("File hash mismatch"));
                    }
                })
                    .catch(reject);
            }
            else {
                this.handler(file, { cwd: this.workDir, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Failed to extract ${(0,external_node_path_namespaceObject.basename)(file)}`));
                    }
                })
                    .catch(reject);
            }
        });
    }
    saveOnCache(file, useCache) {
        return new Promise((resolve, reject) => {
            this.processArchive(file)
                .then(() => {
                if (useCache && this.cacheKey !== null) {
                    CacheService.instance().save(file, this.cacheKey)
                        .then(resolve)
                        .catch(() => {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            const filename = this.opts.filename;
            const outFile = (0,external_node_path_namespaceObject.join)(this.workDir, filename);
            const performDownload = (useCache) => {
                downloadFile(this.url, outFile, this.opts.maxTries)
                    .then(file => {
                    this.saveOnCache(file, useCache)
                        .then(resolve)
                        .catch(reject);
                })
                    .catch(reject);
            };
            if (CacheService.instance().useCache() && this.cacheKey !== null) {
                CacheService.instance().restore(outFile, this.cacheKey)
                    .then(() => {
                    this.processArchive(outFile)
                        .then(resolve)
                        .catch(reject);
                })
                    .catch(err => {
                    performDownload(true);
                });
            }
            else {
                performDownload(false);
            }
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/Targets/Fetch/AbstractFetchTarballTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


class AbstractFetchTarballTarget extends AbstractFetchCompressedTarget {
    constructor(url, workDir, cacheKey, opts) {
        super(url, workDir, cacheKey, extractTarGz, opts);
    }
}

;// CONCATENATED MODULE: ./src/Util/DefaultStdOutHandler.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function defaultStdOutHandler(chunk) {
    Console.instance().write(chunk.toString());
}

;// CONCATENATED MODULE: ./src/Util/FindProgram.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function findProgram(program, verbose) {
    return new Promise((resolve, reject) => {
        if (process.platform === 'win32') {
            getStdOutFromProcessExecution((process.env["COMSPEC"] || "cmd").trim(), {
                args: ["/C", "where", program],
                verbose: verbose
            })
                .then(result => {
                const lines = result.lines;
                if (lines.length > 0) {
                    resolve(lines[0]);
                }
                else {
                    reject(new Error("Internal error: the expected program path was not found."));
                }
            })
                .catch(err => {
                reject(new Error(`Unable to find ${program}`));
            });
        }
        else {
            getStdOutFromProcessExecution("which", {
                args: [program],
                verbose: verbose
            })
                .then(result => {
                const lines = result.lines;
                if (lines.length > 0) {
                    resolve(lines[0]);
                }
                else {
                    reject(new Error("Internal error: the expected program path was not found."));
                }
            })
                .catch(err => {
                reject(new Error(`Unable to find ${program}`));
            });
        }
    });
}

;// CONCATENATED MODULE: ./src/Projects/Targets/AbstractApplyPatchesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/









class AbstractApplyPatchesTarget {
    constructor(project, parent, dir, remotePatchesDir, patches) {
        this.project = project;
        this.parent = parent;
        this.dir = dir;
        this.remotePatchesDir = remotePatchesDir;
        this.patches = new ReadOnlyArray(patches);
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getDirectory() {
        return this.dir;
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.patches.getLenght() > 0) {
                const applyPatches = (patch) => {
                    const patches_iter = (i) => {
                        if (i < this.patches.getLenght()) {
                            const patchName = this.patches.getItem(i);
                            const processPatch = (patchPath) => {
                                checkFiles([patchPath])
                                    .then(() => {
                                    executeProcess(patch, {
                                        cwd: this.dir,
                                        args: [
                                            "-Np1",
                                            "--force",
                                            "-i",
                                            (process.platform === "win32") ?
                                                patchPath.replace(/\\/g, "/") :
                                                patchPath
                                        ],
                                        verbose: true,
                                        stdout: defaultStdOutHandler
                                    })
                                        .then(code => {
                                        patches_iter(i + 1);
                                    })
                                        .catch(reject);
                                })
                                    .catch(reject);
                            };
                            if (/^https?:\/\//.test(patchName)) {
                                const patchPrefix = (0,external_node_path_namespaceObject.join)(this.remotePatchesDir, "p-");
                                (0,promises_namespaceObject.mkdtemp)(patchPrefix)
                                    .then(patchDir => {
                                    downloadFile(patchName, (0,external_node_path_namespaceObject.join)(patchDir, "main.patch"))
                                        .then(patchPath => {
                                        processPatch(patchPath);
                                    })
                                        .catch(reject);
                                })
                                    .catch(reject);
                            }
                            else {
                                const patchPath = (0,external_node_path_namespaceObject.isAbsolute)(patchName) ? patchName : (0,external_node_path_namespaceObject.join)(process.cwd(), patchName);
                                processPatch(patchPath);
                            }
                        }
                        else {
                            resolve();
                        }
                    };
                    patches_iter(0);
                };
                if (process.platform === 'win32') {
                    findProgram("patch", true)
                        .then(applyPatches)
                        .catch(err => {
                        findGitForWindowsInstallDir()
                            .then(gitInstallDir => {
                            const patch = (0,external_node_path_namespaceObject.join)(gitInstallDir, "usr", "bin", "patch.exe");
                            checkFiles([patch])
                                .then(() => {
                                applyPatches(patch);
                            })
                                .catch(reject);
                        })
                            .catch(err => {
                            reject(new Error("Unable to find Git For Windows install dir"));
                        });
                    });
                }
                else {
                    findProgram("patch", true)
                        .then(applyPatches)
                        .catch(err => {
                        reject(new Error("Unable to find patch program required to apply patches"));
                    });
                }
            }
            else {
                resolve();
            }
        });
    }
}

;// CONCATENATED MODULE: external "node:readline/promises"
const external_node_readline_promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:readline/promises");
;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaSourcesInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class PucLuaSourcesInfo {
    constructor(headersDir, headerFiles, manFiles, libSrcFiles, interpreterSrcFiles, compilerSrcFiles, compatFlag) {
        this.headersDir = headersDir;
        this.headerFiles = new ReadOnlyArray(headerFiles);
        this.manFiles = new ReadOnlyArray(manFiles);
        this.libSrcFiles = new ReadOnlyArray(libSrcFiles);
        this.interpreterSrcFiles = new ReadOnlyArray(interpreterSrcFiles);
        this.compilerSrcFiles = new ReadOnlyArray(compilerSrcFiles);
        this.compatFlag = compatFlag;
    }
    getCompatFlag() {
        return this.compatFlag;
    }
    getHeadersDir() {
        return this.headersDir;
    }
    getHeaderFiles() {
        return this.headerFiles;
    }
    getManFiles() {
        return this.manFiles;
    }
    getLibSrcFiles() {
        return this.libSrcFiles;
    }
    getInterpreterSrcFiles() {
        return this.interpreterSrcFiles;
    }
    getCompilerSrcFiles() {
        return this.compilerSrcFiles;
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaFinishConfigurationTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class PucLuaFinishConfigurationTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish Lua ${this.project.getVersion().getString()} configuration`);
            resolve();
        });
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const srcInfo = this.project.configurationResult().getValue();
            const compat = srcInfo.getCompatFlag();
            if (compat) {
                Console.instance().writeLine(`[Compat] ${compat}`);
            }
            const libSrcFiles = srcInfo.getLibSrcFiles();
            let len = libSrcFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Library] ${libSrcFiles.getItem(i)}`);
            }
            Console.instance().writeLine(`[Header Dir] ${srcInfo.getHeadersDir()}`);
            const headerFiles = srcInfo.getHeaderFiles();
            len = headerFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Header] ${headerFiles.getItem(i)}`);
            }
            const interpreterSrcFiles = srcInfo.getInterpreterSrcFiles();
            len = interpreterSrcFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Interpreter] ${interpreterSrcFiles.getItem(i)}`);
            }
            const compilerFiles = srcInfo.getCompilerSrcFiles();
            len = compilerFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Compiler] ${compilerFiles.getItem(i)}`);
            }
            const manFiles = srcInfo.getManFiles();
            len = manFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[MAN] ${manFiles.getItem(i)}`);
            }
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish Lua ${this.project.getVersion().getString()} configuration`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaConfigureSourcesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/








class PucLuaConfigureSourcesTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.rawlibFiles = [];
        this.rawHeaderFiles = [];
        this.rawManFiles = [];
        this.compatFlag = undefined;
        this.rawInterpreterFiles = [];
        this.rawCompilerFiles = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Configure source code for the Lua ${this.project.getVersion().getString()} library`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaFinishConfigurationTarget(this.project, this);
    }
    setConfigurationResult() {
        this.project.configurationResult().setValue(new PucLuaSourcesInfo(this.headersDir, this.rawHeaderFiles, this.rawManFiles, this.rawlibFiles, this.rawInterpreterFiles, this.rawCompilerFiles, this.compatFlag));
    }
    execute() {
        return new Promise((resolve, reject) => {
            let hasluah = false;
            let hasluahpp = false;
            let hasluaconfh = false;
            let haslauxlibh = false;
            let haslualibh = false;
            const targetHeaders = {
                "lua.h": () => { hasluah = true; },
                "lua.hpp": () => { hasluahpp = true; },
                "luaconf.h": () => { hasluaconfh = true; },
                "lauxlib.h": () => { haslauxlibh = true; },
                "lualib.h": () => { haslualibh = true; }
            };
            let hasManLua = false;
            let hasManLuac = false;
            const targetManFiles = {
                "lua.1": () => { hasManLua = true; },
                "luac.1": () => { hasManLuac = true; }
            };
            this.rawHeaderFiles.splice(0, this.rawHeaderFiles.length);
            this.rawManFiles.splice(0, this.rawManFiles.length);
            this.rawlibFiles.splice(0, this.rawHeaderFiles.length);
            this.rawCompilerFiles.splice(0, this.rawCompilerFiles.length);
            this.rawInterpreterFiles.splice(0, this.rawInterpreterFiles.length);
            this.compatFlag = undefined;
            this.headersDir = undefined;
            const extractedDir = this.parent.getDirectory();
            const srcDir = (0,external_node_path_namespaceObject.join)(extractedDir, "src");
            const docDir = (0,external_node_path_namespaceObject.join)(extractedDir, "doc");
            this.headersDir = srcDir;
            const makeFile = (0,external_node_path_namespaceObject.join)(srcDir, "Makefile");
            (0,promises_namespaceObject.stat)(makeFile)
                .then(makeFileStat => {
                if (makeFileStat.isFile()) {
                    const rl = (0,external_node_readline_promises_namespaceObject.createInterface)({
                        input: (0,external_node_fs_namespaceObject.createReadStream)(makeFile),
                        crlfDelay: Infinity
                    });
                    const lines = [];
                    rl.on("line", line => {
                        lines.push(line);
                    });
                    rl.on("close", () => {
                        const line_iter = (j) => {
                            if (j < lines.length) {
                                const pattern = /\-D(LUA_COMPAT[A-Za-z0-9_]+)/;
                                const match = pattern.exec(lines[j]);
                                if (match) {
                                    this.compatFlag = match[1];
                                    line_iter(lines.length);
                                }
                                else {
                                    line_iter(j + 1);
                                }
                            }
                            else { /* starting to process each expected file */
                                (0,promises_namespaceObject.readdir)(docDir)
                                    .then(docFiles => {
                                    const docfile_iter = (k) => {
                                        if (k < docFiles.length) {
                                            const docFile = docFiles[k];
                                            if (targetManFiles[docFile]) {
                                                const docFilePath = (0,external_node_path_namespaceObject.join)(docDir, docFile);
                                                (0,promises_namespaceObject.stat)(docFilePath)
                                                    .then(docStat => {
                                                    if (docStat.isFile()) {
                                                        targetManFiles[docFile]();
                                                        this.rawManFiles.push(docFilePath);
                                                        docfile_iter(k + 1);
                                                    }
                                                    else {
                                                        reject(new Error(`${docFile} is not a file`));
                                                    }
                                                })
                                                    .catch(reject);
                                            }
                                            else {
                                                docfile_iter(k + 1);
                                            }
                                        }
                                        else if (!hasManLua) {
                                            reject(new Error("lua.1 man file missing"));
                                        }
                                        else if (!hasManLuac) {
                                            reject(new Error("luac.1 man file missing"));
                                        }
                                        else { /* All man files were found. Now, iterating source files */
                                            (0,promises_namespaceObject.readdir)(srcDir)
                                                .then(files => {
                                                const file_iter = (i) => {
                                                    if (i < files.length) {
                                                        const f = files[i];
                                                        if (f.endsWith(".c")) {
                                                            const fpath = (0,external_node_path_namespaceObject.join)(srcDir, f);
                                                            (0,promises_namespaceObject.stat)(fpath)
                                                                .then(s => {
                                                                if (s.isFile()) {
                                                                    if (f === "lua.c") {
                                                                        this.rawInterpreterFiles.push(fpath);
                                                                    }
                                                                    else if (f.startsWith("l") && f !== "luac.c") {
                                                                        this.rawlibFiles.push(fpath);
                                                                    }
                                                                    else {
                                                                        this.rawCompilerFiles.push(fpath);
                                                                    }
                                                                }
                                                                file_iter(i + 1);
                                                            })
                                                                .catch(reject);
                                                        }
                                                        else if (targetHeaders[f]) {
                                                            const fpath = (0,external_node_path_namespaceObject.join)(srcDir, f);
                                                            (0,promises_namespaceObject.stat)(fpath)
                                                                .then(s => {
                                                                if (s.isFile()) {
                                                                    targetHeaders[f]();
                                                                    this.rawHeaderFiles.push(fpath);
                                                                }
                                                                file_iter(i + 1);
                                                            })
                                                                .catch(reject);
                                                        }
                                                        else {
                                                            file_iter(i + 1);
                                                        }
                                                    }
                                                    else if (!hasluah) {
                                                        reject(new Error("lua.h missing"));
                                                    }
                                                    else if (!hasluaconfh) {
                                                        reject(new Error("luaconf.h missing"));
                                                    }
                                                    else if (!haslauxlibh) {
                                                        reject(new Error("lauxlib.h missing"));
                                                    }
                                                    else if (!haslualibh) {
                                                        reject(new Error("lualib.h missing"));
                                                    }
                                                    else if (this.rawInterpreterFiles.length === 0) {
                                                        reject(new Error("lua.c missing"));
                                                    }
                                                    else if (this.rawCompilerFiles.length === 0) {
                                                        reject(new Error("luac files missing"));
                                                    }
                                                    else if (!hasluahpp) {
                                                        if (this.project.getVersion().compareTo(LUA_52_VERSION) < 0) {
                                                            /*
                                                            ** Note: on Lua 5.1 - Lua 5.1.5,
                                                            **       lua.hpp is stored at
                                                            **       ${lua-sources}/etc/lua.hpp
                                                            */
                                                            const f = "lua.hpp";
                                                            const fpath = (0,external_node_path_namespaceObject.join)(extractedDir, "etc", f);
                                                            (0,promises_namespaceObject.stat)(fpath)
                                                                .then(s => {
                                                                if (s.isFile()) {
                                                                    targetHeaders[f]();
                                                                    this.rawHeaderFiles.push(fpath);
                                                                    this.setConfigurationResult();
                                                                    resolve();
                                                                }
                                                                else {
                                                                    reject(new Error("lua.hpp is not a file"));
                                                                }
                                                            })
                                                                .catch(reject);
                                                        }
                                                        else {
                                                            reject(new Error("lua.hpp missing"));
                                                        }
                                                    }
                                                    else {
                                                        this.setConfigurationResult();
                                                        resolve();
                                                    }
                                                };
                                                file_iter(0);
                                            })
                                                .catch(reject);
                                        }
                                    };
                                    docfile_iter(0);
                                })
                                    .catch(reject);
                            }
                        };
                        line_iter(0);
                    });
                }
                else {
                    reject(new Error(`${makeFile} is not a file`));
                }
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Configure source code for the Lua ${this.project.getVersion().getString()} library`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaApplyPatchesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/




class PucLuaApplyPatchesTarget extends AbstractApplyPatchesTarget {
    constructor(project, parent) {
        super(project, parent, parent.getExtractedDir(), project.getRemotePatchesBuildDir(), ToolchainEnvironmentVariables.instance().getLuaPatches());
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Apply patches on Lua ${this.getProject().getVersion().getString()}`);
            resolve();
        });
    }
    getNext() {
        return new PucLuaConfigureSourcesTarget(this.getProject(), this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Apply patches on Lua ${this.getProject().getVersion().getString()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaFetchTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class PucLuaFetchTarget extends AbstractFetchTarballTarget {
    constructor(project, parent) {
        super(project.getVersion().getDownloadUrl(), project.getBuildDir(), `lua-${project.getVersion().getString()}`, {
            fileHash: {
                algorithm: project.getVersion().getHashAlgorithm(),
                expectedHash: project.getVersion().getHashValue()
            }
        });
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Fetch Lua ${this.project.getVersion().getString()} source code`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getExtractedDir() {
        const version = this.project.getVersion();
        let dirName = `lua-${version.getString()}`;
        if (version instanceof PucLuaWorkVersion) {
            const match = /^(lua\-.*)\-rc\d+$/.exec(dirName);
            if (match) {
                dirName = match[1];
            }
        }
        return (0,external_node_path_namespaceObject.join)(this.getWorkDir(), dirName);
    }
    getNext() {
        return new PucLuaApplyPatchesTarget(this.project, this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Fetch Lua ${this.project.getVersion().getString()} source code`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Util/CiDetection.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function isRunningOnCi() {
    return ((process.env["CI"] ||
        process.env["GITHUB_ACTIONS"] ||
        "").toLowerCase() === "true");
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaCheckDependenciesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/








class PucLuaCheckDependenciesTarget {
    constructor(project, parent) {
        this.parent = parent;
        this.project = project;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Check dependencies for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaFetchTarget(this.project, this);
    }
    unixCheckReadline(isRetest) {
        return new Promise((resolve, reject) => {
            const githubTryInstallReadline = (errorMsg) => {
                if (isRetest) {
                    reject(new Error(errorMsg));
                }
                else if (isRunningOnCi()) {
                    if (process.platform === "darwin") {
                        executeProcess("brew", {
                            args: ["install", "readline"],
                            verbose: true,
                            stdout: defaultStdOutHandler
                        })
                            .then(code => {
                            this.unixCheckReadline(true)
                                .then(resolve)
                                .catch(reject);
                        })
                            .catch(reject);
                    }
                    else if (process.platform === "linux") {
                        /* assume Debian-based distro */
                        executeProcess("sudo", {
                            args: ["apt", "install", "-y", "libreadline-dev"],
                            verbose: true,
                            stdout: defaultStdOutHandler
                        })
                            .then(code => {
                            this.unixCheckReadline(true)
                                .then(resolve)
                                .catch(reject);
                        })
                            .catch(reject);
                    }
                    else {
                        reject(new Error(errorMsg));
                    }
                }
                else if (process.env["RUNNER_OS"] === "macOS") {
                    executeProcess("brew", {
                        args: ["install", "readline"],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                        this.unixCheckReadline(true)
                            .then(resolve)
                            .catch(reject);
                    })
                        .catch(reject);
                }
                else if (process.env["RUNNER_OS"] === "Linux") {
                    executeProcess("sudo", {
                        args: ["apt", "install", "-y", "libreadline-dev"],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                        this.unixCheckReadline(true)
                            .then(resolve)
                            .catch(reject);
                    })
                        .catch(reject);
                }
                else {
                    reject(new Error(errorMsg));
                }
            };
            const testReadLine = [
                "#include <stdio.h>",
                "#include <stdlib.h>",
                "#include <readline/readline.h>",
                "int main(int argc, const char **argv) {",
                "\tchar *input = readline(\"enter text > \");",
                "\tif (input) {",
                "\t\tprintf(\"Entered input: %s\\n\", input);",
                "\t\tfree(input);",
                "\t}",
                "\treturn 0;",
                "}"
            ];
            const sourceCode = testReadLine.join(external_node_os_namespaceObject.EOL);
            const readlineLibrary = (process.platform === 'freebsd' ||
                process.platform === 'netbsd' ||
                process.platform === 'openbsd') ? "edit" : "readline";
            const testFileBasename = `test-${readlineLibrary}`;
            (0,promises_namespaceObject.mkdtemp)((0,external_node_path_namespaceObject.join)(this.project.getBuildDir(), testFileBasename + "-"))
                .then(tmpDir => {
                const testFile = (0,external_node_path_namespaceObject.join)(tmpDir, testFileBasename + ".c");
                (0,promises_namespaceObject.writeFile)(testFile, sourceCode, { encoding: "utf-8" })
                    .then(() => {
                    const toolchain = this.project.getToolchain();
                    const compiler = toolchain.getCompiler();
                    compiler.reset();
                    const testOutputObjectFile = (0,external_node_path_namespaceObject.join)(tmpDir, testFileBasename + compiler.getObjectFileExtension());
                    if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                        compiler.addIncludeDir("/usr/include/edit");
                    }
                    compiler.setInputFile(testFile);
                    compiler.setOutputFile(testOutputObjectFile);
                    compiler.execute()
                        .then(() => {
                        const readlineProgram = (0,external_node_path_namespaceObject.join)(tmpDir, testFileBasename);
                        const linker = toolchain.getLinker();
                        linker.reset();
                        linker.addObjectFile(testOutputObjectFile);
                        linker.addLinkLibrary(readlineLibrary);
                        linker.setOutputFile(readlineProgram);
                        linker.execute()
                            .then(resolve)
                            .catch(linkErr => {
                            githubTryInstallReadline(`Failed to link a test program for the ${readlineLibrary} library. Please, install the ${readlineLibrary} library`);
                        });
                    })
                        .catch(compileErr => {
                        githubTryInstallReadline(`Failed to compile a test program for the ${readlineLibrary} library. Please, install the ${readlineLibrary} library`);
                    });
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (process.platform === 'win32') {
                resolve();
            }
            else {
                this.unixCheckReadline(false)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Check dependencies for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Configuration/PucLuaCreateBuildDirectoriesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class PucLuaCreateBuildDirectoriesTarget extends AbstractCreateDirectoriesTarget {
    constructor(project, parent) {
        super([
            project.getBuildDir(),
            project.getLibBuildDir(),
            project.getSharedLibBuildDir(),
            project.getStaticLibBuildDir(),
            project.getRemotePatchesBuildDir(),
            project.getInterpreterBuildDir(),
            project.getCompilerBuildDir()
        ]);
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Create build directories for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaCheckDependenciesTarget(this.project, this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Create build directories for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Util/SequentialPromises.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function sequentialPromises(values) {
    return new Promise((resolve, reject) => {
        const results = [];
        const copy = values.slice();
        const len = copy.length;
        const iter = (i) => {
            if (i < len) {
                copy[i]()
                    .then(partialResult => {
                    results.push(partialResult);
                    iter(i + 1);
                })
                    .catch(reject);
            }
            else {
                resolve(results);
            }
        };
        iter(0);
    });
}

;// CONCATENATED MODULE: ./src/Util/GitHub.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function appendToGitHubEnvironmentVariables(key, value) {
    return GitHubCore.instance().appendToGitHubEnvironmentVariables(key, value);
}
function appendToGitHubPath(value) {
    return GitHubCore.instance().appendToGitHubPath(value);
}

;// CONCATENATED MODULE: ./src/Util/CygwinDetection.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

function isCygwin() {
    return ((process.env["MSYSTEM"] || "").trim() !== "");
}
function isCygwinOnCI() {
    return isCygwin() && isRunningOnCi();
}

;// CONCATENATED MODULE: ./src/Util/CygwinPath.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


function getCygpathFromCygwin() {
    return new Promise((resolve, reject) => {
        const shell = (process.env["SHELL"] || "").trim();
        const shellDir = (0,external_node_path_namespaceObject.dirname)(shell);
        const cygPath = (0,external_node_path_namespaceObject.join)(shellDir, "cygpath.exe");
        checkFiles([cygPath])
            .then(() => {
            resolve(cygPath);
        })
            .catch(reject);
    });
}

;// CONCATENATED MODULE: ./src/Util/CygwinEnvVars.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





function getCygwinProfilePath(baseDir) {
    return (0,external_node_path_namespaceObject.join)(baseDir, "etc", "profile.d", "setup-lua.sh");
}
function coreExportEnvVarOnCygwinFile(filepath, key, value, isRawVar) {
    return new Promise((resolve, reject) => {
        (0,promises_namespaceObject.appendFile)(filepath, [
            isRawVar ? `${key}='${value}'` : `${key}='${value}'":\${${key}}";`,
            `export ${key};`,
            ""
        ].join("\n"), { encoding: "utf-8" })
            .then(resolve)
            .catch(reject);
    });
}
function exportLuaEnvVarsOnCygwinProfile(pkgConfigPath, cmakePrefixPath, binDir) {
    return new Promise((resolve, reject) => {
        getCygpathFromCygwin()
            .then(cygPath => {
            sequentialPromises([
                () => getFirstLineFromProcessExecution(cygPath, ["-w", "/"], true),
                () => getFirstLineFromProcessExecution(cygPath, ["-p", "-u", pkgConfigPath], true),
                () => getFirstLineFromProcessExecution(cygPath, ["-p", "-u", cmakePrefixPath], true),
                () => getFirstLineFromProcessExecution(cygPath, ["-u", binDir], true)
            ])
                .then(paths => {
                const profile = getCygwinProfilePath(paths[0]);
                sequentialPromises([
                    () => coreExportEnvVarOnCygwinFile(profile, "PKG_CONFIG_PATH", paths[1], false),
                    () => coreExportEnvVarOnCygwinFile(profile, "CMAKE_PREFIX_PATH", paths[2], false),
                    () => coreExportEnvVarOnCygwinFile(profile, "PATH", paths[3], false)
                ]).then(() => {
                    resolve();
                })
                    .catch(reject);
            })
                .catch(reject);
        })
            .catch(reject);
    });
}
function exportLuaRocksEnvVarsOnCygwinProfile(luaPath, luaCPath, luaRocksBinPath) {
    return new Promise((resolve, reject) => {
        getCygpathFromCygwin()
            .then(cygPath => {
            sequentialPromises([
                () => getFirstLineFromProcessExecution(cygPath, ["-w", "/"], true),
                () => getFirstLineFromProcessExecution(cygPath, ["-p", "-u", luaRocksBinPath], true)
            ])
                .then(paths => {
                const profile = getCygwinProfilePath(paths[0]);
                sequentialPromises([
                    () => coreExportEnvVarOnCygwinFile(profile, "LUA_PATH", luaPath, true),
                    () => coreExportEnvVarOnCygwinFile(profile, "LUA_CPATH", luaCPath, true),
                    () => coreExportEnvVarOnCygwinFile(profile, "PATH", paths[1], false)
                ]).then(_values => {
                    resolve();
                })
                    .catch(reject);
            })
                .catch(reject);
        })
            .catch(reject);
    });
}

;// CONCATENATED MODULE: ./src/Projects/Targets/AbstractUpdateLuaEnvVarsTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class AbstractUpdateLuaEnvVarsTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    setConfigPathToGitHub(envVar, targetDir) {
        return new Promise((resolve, reject) => {
            const currentEnvVar = (process.env[envVar] || "").trim();
            const newEnvVar = currentEnvVar ?
                `${currentEnvVar}${external_node_path_namespaceObject.delimiter}${targetDir}` :
                `${targetDir}`;
            appendToGitHubEnvironmentVariables(envVar, newEnvVar)
                .then(resolve)
                .catch(reject);
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            const pkgConfigPath = this.getProjectInstallPkgConfigDir();
            const cmakePrefixPath = this.getProjectInstallDir();
            const binDir = this.getProjectInstallBinDir();
            const changes = [
                () => this.setConfigPathToGitHub("PKG_CONFIG_PATH", pkgConfigPath),
                () => this.setConfigPathToGitHub("CMAKE_PREFIX_PATH", cmakePrefixPath)
            ];
            if (process.platform === "darwin") {
                changes.push(() => this.setConfigPathToGitHub("DYLD_LIBRARY_PATH", this.getProjectInstallLibDir()));
            }
            else if (process.platform !== "win32") {
                changes.push(() => this.setConfigPathToGitHub("LD_LIBRARY_PATH", this.getProjectInstallLibDir()));
            }
            changes.push(() => appendToGitHubPath(binDir));
            sequentialPromises(changes)
                .then(_ => {
                if (isCygwinOnCI()) {
                    /* we are on a GitHub action inside MSYS2 */
                    exportLuaEnvVarsOnCygwinProfile(pkgConfigPath, cmakePrefixPath, binDir)
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Installation/PucLuaFinishInstallationTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class PucLuaFinishInstallationTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish Lua ${this.project.getVersion().getString()} installation`);
            resolve();
        });
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine("<< done >>");
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish Lua ${this.project.getVersion().getString()} installation`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/ILuaInstallation.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class LuaInstallation {
    constructor(installDir, luaInterpreter, luaShortVersion) {
        this.installDir = installDir;
        this.luaInterpreter = luaInterpreter;
        this.luaShortVersion = luaShortVersion;
    }
    getInstallDir() {
        return this.installDir;
    }
    getLuaInterpreter() {
        return this.luaInterpreter;
    }
    getLuaShortVersion() {
        return this.luaShortVersion;
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Installation/PucLuaPostInstallTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/








class PucLuaPostInstallTarget extends AbstractUpdateLuaEnvVarsTarget {
    constructor(project, parent) {
        super(project, parent);
    }
    getProjectInstallDir() {
        return this.getProject().getInstallDir();
    }
    getProjectInstallLibDir() {
        return this.getProject().getInstallLibDir();
    }
    getProjectInstallBinDir() {
        return this.getProject().getInstallBinDir();
    }
    getProjectInstallPkgConfigDir() {
        return this.getProject().getInstallPkgConfigDir();
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.getProject().getVersion();
            Console.instance().writeLine(`[Start] Post install for Lua ${projectVersion.getString()}`);
            resolve();
        });
    }
    getNext() {
        return new PucLuaFinishInstallationTarget(this.getProject(), this);
    }
    setInstallationResult(installDir, luaInterpreter, luaShortVersion) {
        this.getProject().installationResult().setValue(new LuaInstallation(installDir, luaInterpreter, luaShortVersion));
    }
    execute() {
        return new Promise((resolve, reject) => {
            super.execute()
                .then(() => {
                const installDir = this.getProjectInstallDir();
                const binDir = this.getProjectInstallBinDir();
                const ext = process.platform === "win32" ? ".exe" : "";
                const luaInterpreter = (0,external_node_path_namespaceObject.join)(binDir, `lua${ext}`);
                checkFiles([luaInterpreter])
                    .then(() => {
                    getFirstLineFromProcessExecution(luaInterpreter, ["-e", "print(_VERSION:sub(5))"], true)
                        .then(luaShortVersion => {
                        if (isKnownLuaShortVersion(luaShortVersion)) {
                            this.setInstallationResult(installDir, luaInterpreter, luaShortVersion);
                            resolve();
                        }
                        else {
                            reject(new Error("Unexpected Lua short version"));
                        }
                    })
                        .catch(reject);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.getProject().getVersion();
            Console.instance().writeLine(`[End] Post install for Lua ${projectVersion.getString()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Installation/PucLuaCopyInstallableArtifactsTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class PucLuaCopyInstallableArtifactsTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Copy Lua ${this.project.getVersion().getString()} installation files`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaPostInstallTarget(this.project, this);
    }
    copyInterpreter() {
        return new Promise((resolve, reject) => {
            const builtInterpreter = this.parent.getBuildInfo().getInterpreter();
            const binDir = this.project.getInstallBinDir();
            const interpreter = (0,external_node_path_namespaceObject.join)(binDir, (0,external_node_path_namespaceObject.basename)(builtInterpreter));
            (0,promises_namespaceObject.cp)(builtInterpreter, interpreter, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    copyCompiler() {
        return new Promise((resolve, reject) => {
            const builtCompiler = this.parent.getBuildInfo().getCompiler();
            const binDir = this.project.getInstallBinDir();
            const compiler = (0,external_node_path_namespaceObject.join)(binDir, (0,external_node_path_namespaceObject.basename)(builtCompiler));
            (0,promises_namespaceObject.cp)(builtCompiler, compiler, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    copySharedLibrary() {
        return new Promise((resolve, reject) => {
            const builtSharedLib = this.parent.getBuildInfo().getSharedLibrary();
            const targetInstallDir = process.platform === 'win32' || process.platform === 'cygwin' ?
                this.project.getInstallBinDir() :
                this.project.getInstallLibDir();
            const sharedLib = (0,external_node_path_namespaceObject.join)(targetInstallDir, (0,external_node_path_namespaceObject.basename)(builtSharedLib));
            (0,promises_namespaceObject.cp)(builtSharedLib, sharedLib, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    copyStaticLibrary() {
        return new Promise((resolve, reject) => {
            const builtStaticLib = this.parent.getBuildInfo().getStaticLibrary();
            const libDir = this.project.getInstallLibDir();
            const staticLib = (0,external_node_path_namespaceObject.join)(libDir, (0,external_node_path_namespaceObject.basename)(builtStaticLib));
            (0,promises_namespaceObject.cp)(builtStaticLib, staticLib, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    copyImportLibrary() {
        return new Promise((resolve, reject) => {
            const builtImpLib = this.parent.getBuildInfo().getImportLibrary();
            if (builtImpLib) {
                const libDir = this.project.getInstallLibDir();
                const impLib = (0,external_node_path_namespaceObject.join)(libDir, (0,external_node_path_namespaceObject.basename)(builtImpLib));
                (0,promises_namespaceObject.cp)(builtImpLib, impLib, { force: true })
                    .then(resolve)
                    .catch(reject);
            }
            else {
                resolve();
            }
        });
    }
    copyHeaders() {
        return new Promise((resolve, reject) => {
            const includeDir = this.project.getInstallIncludeDir();
            const headers = this.parent.getBuildInfo().getSourcesInfo().getHeaderFiles();
            const len = headers.getLenght();
            const header_iter = (i) => {
                if (i < len) {
                    const sourceHeader = headers.getItem(i);
                    const h = (0,external_node_path_namespaceObject.join)(includeDir, (0,external_node_path_namespaceObject.basename)(sourceHeader));
                    (0,promises_namespaceObject.cp)(sourceHeader, h, { force: true })
                        .then(() => {
                        header_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            header_iter(0);
        });
    }
    copyManFiles() {
        return new Promise((resolve, reject) => {
            const manDir = this.project.getInstallManDir();
            const manFiles = this.parent.getBuildInfo().getSourcesInfo().getManFiles();
            const len = manFiles.getLenght();
            const man_iter = (i) => {
                if (i < len) {
                    const sourceMan = manFiles.getItem(i);
                    const man = (0,external_node_path_namespaceObject.join)(manDir, (0,external_node_path_namespaceObject.basename)(sourceMan));
                    (0,promises_namespaceObject.cp)(sourceMan, man, { force: true })
                        .then(() => {
                        man_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            man_iter(0);
        });
    }
    copyPkgConfigFiles() {
        return new Promise((resolve, reject) => {
            const builtPkgConfigFiles = this.parent.getBuildInfo().getPkgConfigFiles();
            const pkgConfigDir = this.project.getInstallPkgConfigDir();
            const pkgConfigIter = (i) => {
                if (i < builtPkgConfigFiles.getLenght()) {
                    const builtPkgConfigFile = builtPkgConfigFiles.getItem(i);
                    const pkgConfigBaseName = (0,external_node_path_namespaceObject.basename)(builtPkgConfigFile);
                    const pkgConfigFile = (0,external_node_path_namespaceObject.join)(pkgConfigDir, pkgConfigBaseName);
                    (0,promises_namespaceObject.cp)(builtPkgConfigFile, pkgConfigFile, { force: true })
                        .then(() => {
                        pkgConfigIter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            pkgConfigIter(0);
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            sequentialPromises([
                () => this.copyInterpreter(),
                () => this.copyCompiler(),
                () => this.copySharedLibrary(),
                () => this.copyStaticLibrary(),
                () => this.copyImportLibrary(),
                () => this.copyHeaders(),
                () => this.copyManFiles(),
                () => this.copyPkgConfigFiles()
            ])
                .then(value => {
                resolve();
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Copy Lua ${this.project.getVersion().getString()} installation files`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/Installation/PucLuaCreateInstallationDirectoriesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class PucLuaCreateInstallationDirectoriesTarget extends AbstractCreateDirectoriesTarget {
    constructor(project, parent, buildInfo) {
        super([
            project.getInstallDir(),
            project.getInstallIncludeDir(),
            project.getInstallBinDir(),
            project.getInstallLibDir(),
            project.getInstallManDir(),
            project.getInstallPkgConfigDir(),
            project.getInstallLuaModulesDir(),
            project.getInstallCModulesDir()
        ]);
        this.project = project;
        this.parent = parent;
        this.buildInfo = buildInfo;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Create installation directories for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new PucLuaCopyInstallableArtifactsTarget(this.project, this);
    }
    getBuildInfo() {
        return this.buildInfo;
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Create installation directories for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/PucLua/PucLuaProject.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class PucLuaProject {
    getVersion() {
        return this.version;
    }
    getBuildDir() {
        return this.buildDir;
    }
    getInstallDir() {
        return this.installDir;
    }
    getToolchain() {
        return this.toolchain;
    }
    getInterpreterBuildDir() {
        return this.interpreterBuildDir;
    }
    getCompilerBuildDir() {
        return this.compilerBuildDir;
    }
    getLibBuildDir() {
        return this.libBuildDir;
    }
    getSharedLibBuildDir() {
        return this.sharedLibBuildDir;
    }
    getStaticLibBuildDir() {
        return this.staticLibBuildDir;
    }
    getRemotePatchesBuildDir() {
        return this.remotePatchesBuildDir;
    }
    getInstallIncludeDir() {
        return this.installIncludeDir;
    }
    getInstallBinDir() {
        return this.installBinDir;
    }
    getInstallLibDir() {
        return this.installLibDir;
    }
    getInstallManDir() {
        return this.installManDir;
    }
    getInstallPkgConfigDir() {
        return this.installPkgConfigDir;
    }
    getInstallLuaModulesDir() {
        return this.installLuaModulesDir;
    }
    getInstallCModulesDir() {
        return this.installCModulesDir;
    }
    configurationResult() {
        return this._configurationResult;
    }
    buildResult() {
        return this._buildResult;
    }
    installationResult() {
        return this._installationResult;
    }
    constructor(version, buildDir, installDir, toolchain) {
        this.version = version;
        this.buildDir = buildDir;
        this.installDir = installDir;
        this.toolchain = toolchain;
        this.interpreterBuildDir = (0,external_node_path_namespaceObject.join)(buildDir, "interpreter");
        this.compilerBuildDir = (0,external_node_path_namespaceObject.join)(buildDir, "compiler");
        this.libBuildDir = (0,external_node_path_namespaceObject.join)(buildDir, "lib");
        this.sharedLibBuildDir = (0,external_node_path_namespaceObject.join)(this.libBuildDir, "shared");
        this.staticLibBuildDir = (0,external_node_path_namespaceObject.join)(this.libBuildDir, "static");
        this.remotePatchesBuildDir = (0,external_node_path_namespaceObject.join)(this.buildDir, "remote-patches");
        this.installIncludeDir = (0,external_node_path_namespaceObject.join)(installDir, "include");
        this.installBinDir = (0,external_node_path_namespaceObject.join)(installDir, "bin");
        this.installLibDir = (0,external_node_path_namespaceObject.join)(installDir, "lib");
        this.installManDir = (0,external_node_path_namespaceObject.join)(installDir, "share", "man", "man1");
        this.installPkgConfigDir = (0,external_node_path_namespaceObject.join)(this.installLibDir, "pkgconfig");
        if (process.platform === 'win32' && version.compareTo(LUA_53_VERSION) < 0) {
            this.installLuaModulesDir = (0,external_node_path_namespaceObject.join)(this.installBinDir, "lua");
            this.installCModulesDir = this.installBinDir;
        }
        else {
            this.installLuaModulesDir = (0,external_node_path_namespaceObject.join)(installDir, "share", "lua", `${version.getMajor()}.${version.getMinor()}`);
            this.installCModulesDir = (0,external_node_path_namespaceObject.join)(this.installLibDir, "lua", `${version.getMajor()}.${version.getMinor()}`);
        }
        this._configurationResult = new GetSetProperty(null);
        this._buildResult = new GetSetProperty(null);
        this._installationResult = new GetSetProperty(null);
    }
    configure() {
        return new Promise((resolve, reject) => {
            const initialConfigureTarget = new PucLuaCreateBuildDirectoriesTarget(this, null);
            const pipeline = new TargetPipeline(initialConfigureTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    build() {
        return new Promise((resolve, reject) => {
            const initialBuildTarget = new PucLuaCompileSharedLibTarget(this, null, this.configurationResult().getValue());
            const pipeline = new TargetPipeline(initialBuildTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    install() {
        return new Promise((resolve, reject) => {
            const initialInstallTarget = new PucLuaCreateInstallationDirectoriesTarget(this, null, this.buildResult().getValue());
            const pipeline = new TargetPipeline(initialInstallTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/ToolchainCompositeArgument.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class ToolchainCompositeArgument extends ReadOnlyArray {
}

;// CONCATENATED MODULE: ./src/Toolchains/ToolchainRawArgument.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class ToolchainRawArgument {
    getString() {
        return this.value;
    }
    constructor(value) {
        this.value = value;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/GccArchiver.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class GccArchiver {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addInputFile(path) {
        this.inputs.push(new ToolchainCompositeArgument([new ToolchainRawArgument(path)]));
    }
    setOutputFile(path) {
        this.output = new ToolchainCompositeArgument([new ToolchainRawArgument(path)]);
    }
    getArchiveExtension() {
        return ".a";
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.output) {
                const args = [];
                const arrays = [this.flags, [this.output], this.inputs];
                for (const arrayElement of arrays) {
                    for (const commandLineArgument of arrayElement) {
                        const count = commandLineArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(commandLineArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Archiver failed"));
                    }
                })
                    .catch(reject);
            }
            else {
                reject(new Error("Archiver output file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.inputs.splice(0, this.inputs.length);
        this.output = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getAR());
    }
    constructor() {
        this.flags = [];
        this.inputs = [];
        this.output = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getAR());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/GccCompiler.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class GccCompiler {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addDefine(key, value) {
        this.defines.push(new ToolchainCompositeArgument(value ?
            [new ToolchainRawArgument(`-D${key}=${value}`)] :
            [new ToolchainRawArgument(`-D${key}`)]));
    }
    addIncludeDir(dir) {
        this.includeDirs.push(new ToolchainCompositeArgument([new ToolchainRawArgument(`-I${dir}`)]));
    }
    setInputFile(path) {
        this.input = new ToolchainCompositeArgument([new ToolchainRawArgument(path)]);
    }
    setOutputFile(path) {
        this.output = new ToolchainCompositeArgument([
            new ToolchainRawArgument("-o"),
            new ToolchainRawArgument(path)
        ]);
    }
    setSpeedOptimizationSwitch() {
        this.optimization = new ToolchainCompositeArgument([new ToolchainRawArgument("-O2")]);
    }
    setWarningSwitch() {
        this.warnings = new ToolchainCompositeArgument([
            new ToolchainRawArgument("-Wall"),
            new ToolchainRawArgument("-Wextra")
        ]);
    }
    getObjectFileExtension() {
        return ".o";
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.output) {
                if (this.input) {
                    const args = [];
                    const compileOnly = new ToolchainCompositeArgument([new ToolchainRawArgument("-c")]);
                    const arrays = [[compileOnly]];
                    if (this.optimization) {
                        arrays.push([this.optimization]);
                    }
                    if (this.warnings) {
                        arrays.push([this.warnings]);
                    }
                    for (const instruction of [this.flags, this.defines, this.includeDirs, [this.output], [this.input]]) {
                        arrays.push(instruction);
                    }
                    for (const arrayElement of arrays) {
                        for (const compositeArgument of arrayElement) {
                            const count = compositeArgument.getLenght();
                            for (let i = 0; i < count; i++) {
                                args.push(compositeArgument.getItem(i).getString());
                            }
                        }
                    }
                    executeProcess(this._path.getValue(), { args: args, verbose: true })
                        .then(code => {
                        if (code === 0) {
                            resolve();
                        }
                        else {
                            reject(new Error("Compiler failed"));
                        }
                    })
                        .catch(reject);
                }
                else {
                    reject(new Error("Compiler input file was not set"));
                }
            }
            else {
                reject(new Error("Compiler output file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.defines.splice(0, this.defines.length);
        this.includeDirs.splice(0, this.includeDirs.length);
        this.input = undefined;
        this.output = undefined;
        this.optimization = undefined;
        this.warnings = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getCC());
    }
    constructor() {
        this.flags = [];
        this.defines = [];
        this.includeDirs = [];
        this.input = undefined;
        this.output = undefined;
        this.optimization = undefined;
        this.warnings = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getCC());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/GccLinker.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class GccLinker {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addObjectFile(path) {
        this.objectFiles.push(new ToolchainCompositeArgument([new ToolchainRawArgument(path)]));
    }
    addLibDir(dir) {
        this.libDirs.push(new ToolchainCompositeArgument([new ToolchainRawArgument(`-L${dir}`)]));
    }
    addLibrary(path) {
        this.libraries.push(new ToolchainCompositeArgument([new ToolchainRawArgument(path)]));
    }
    addLinkLibrary(name) {
        this.linkLibraries.push(new ToolchainCompositeArgument([new ToolchainRawArgument(`-l${name}`)]));
    }
    setImportLibrary(path) {
        this.outImplib = new ToolchainCompositeArgument([new ToolchainRawArgument(`-Wl,--out-implib,${path}`)]);
    }
    getImportLibraryExtension() {
        return (process.platform === 'win32' || process.platform === 'cygwin' ? ".dll.a" : ".a");
    }
    setOutputFile(path) {
        this.output = new ToolchainCompositeArgument([
            new ToolchainRawArgument("-o"),
            new ToolchainRawArgument(path)
        ]);
    }
    setOutputMode(mode) {
        this.outputMode = mode;
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.output) {
                const args = [];
                const arrays = [];
                if (this.outputMode && this.outputMode === "shared") {
                    arrays.push([new ToolchainCompositeArgument([new ToolchainRawArgument(process.platform === 'darwin' ? "-dynamiclib" : "-shared")])]);
                }
                if (this.outImplib) {
                    arrays.push([this.outImplib]);
                }
                for (const instruction of [this.flags, this.libDirs, [this.output], this.objectFiles, this.libraries, this.linkLibraries]) {
                    arrays.push(instruction);
                }
                for (const arrayElement of arrays) {
                    for (const compositeArgument of arrayElement) {
                        const count = compositeArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(compositeArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Linker failed"));
                    }
                })
                    .catch(reject);
            }
            else {
                reject(new Error("Linker output file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.objectFiles.splice(0, this.objectFiles.length);
        this.libDirs.splice(0, this.libDirs.length);
        this.libraries.splice(0, this.libraries.length);
        this.linkLibraries.splice(0, this.linkLibraries.length);
        this.outImplib = undefined;
        this.output = undefined;
        this.outputMode = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getLD());
    }
    constructor() {
        this.flags = [];
        this.objectFiles = [];
        this.libDirs = [];
        this.libraries = [];
        this.linkLibraries = [];
        this.outImplib = undefined;
        this.output = undefined;
        this.outputMode = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getLD());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/GccRanlib.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class GccRanlib {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    setInputFile(path) {
        this.input = new ToolchainCompositeArgument([new ToolchainRawArgument(path)]);
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.input) {
                const args = [];
                const arrays = [this.flags, [this.input]];
                for (const arrayElement of arrays) {
                    for (const commandLineArgument of arrayElement) {
                        const count = commandLineArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(commandLineArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Ranlib failed"));
                    }
                })
                    .catch(reject);
            }
            else {
                reject(new Error("Ranlib input file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.input = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getRANLIB());
    }
    constructor() {
        this.flags = [];
        this.input = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getRANLIB());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/GccStrip.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class GccStrip {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addStripAll() {
        this.addFlag("--strip-all");
    }
    addStripUnneeded() {
        this.addFlag("--strip-unneeded");
    }
    setInputFile(path) {
        this.input = new ToolchainCompositeArgument([new ToolchainRawArgument(path)]);
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.input) {
                const args = [];
                const arrays = [this.flags, [this.input]];
                for (const arrayElement of arrays) {
                    for (const commandLineArgument of arrayElement) {
                        const count = commandLineArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(commandLineArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Strip failed"));
                    }
                })
                    .catch(reject);
            }
            else {
                reject(new Error("Strip input file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.input = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getSTRIP());
    }
    constructor() {
        this.flags = [];
        this.input = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getSTRIP());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/GCC/GccToolchain.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class GccToolchain {
    constructor() {
        this.compiler = new GccCompiler();
        this.linker = new GccLinker();
        this.archiver = new GccArchiver();
        this.ranlib = new GccRanlib();
        this.strip = new GccStrip();
    }
    getCompiler() {
        return this.compiler;
    }
    getLinker() {
        return this.linker;
    }
    getArchiver() {
        return this.archiver;
    }
    getRanlib() {
        return this.ranlib;
    }
    getStrip() {
        return this.strip;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/MSVC/MsvcArchiver.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class MsvcArchiver {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addInputFile(path) {
        this.inputs.push(new ToolchainCompositeArgument([new ToolchainRawArgument(path)]));
    }
    setOutputFile(path) {
        this.output = new ToolchainCompositeArgument([new ToolchainRawArgument(`/OUT:${path}`)]);
    }
    getArchiveExtension() {
        return ".lib";
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.output) {
                const args = [];
                const arrays = [this.flags, [this.output], this.inputs];
                for (const arrayElement of arrays) {
                    for (const commandLineArgument of arrayElement) {
                        const count = commandLineArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(commandLineArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Archiver failed"));
                    }
                })
                    .catch(reject);
            }
            else {
                reject(new Error("Archiver output file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.inputs.splice(0, this.inputs.length);
        this.output = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getAR());
    }
    constructor() {
        this.flags = [];
        this.inputs = [];
        this.output = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getAR());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/MSVC/MsvcCompiler.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class MsvcCompiler {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addDefine(key, value) {
        this.defines.push(new ToolchainCompositeArgument(value ?
            [new ToolchainRawArgument(`/D${key}=${value}`)] :
            [new ToolchainRawArgument(`/D${key}`)]));
    }
    addIncludeDir(dir) {
        this.includeDirs.push(new ToolchainCompositeArgument([new ToolchainRawArgument(`/I${dir}`)]));
    }
    setInputFile(path) {
        this.input = new ToolchainCompositeArgument([new ToolchainRawArgument(path)]);
    }
    setOutputFile(path) {
        this.output = new ToolchainCompositeArgument([new ToolchainRawArgument(`/Fo${path}`)]);
    }
    setSpeedOptimizationSwitch() {
        this.optimization = new ToolchainCompositeArgument([new ToolchainRawArgument("/O2")]);
    }
    setWarningSwitch() {
        this.warnings = new ToolchainCompositeArgument([new ToolchainRawArgument("/W3")]);
    }
    getObjectFileExtension() {
        return ".obj";
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.output) {
                if (this.input) {
                    const args = [];
                    const compileOnly = new ToolchainCompositeArgument([new ToolchainRawArgument("/c")]);
                    const arrays = [[compileOnly]];
                    if (this.optimization) {
                        arrays.push([this.optimization]);
                    }
                    if (this.warnings) {
                        arrays.push([this.warnings]);
                    }
                    for (const instruction of [this.flags, this.defines, this.includeDirs, [this.output], [this.input]]) {
                        arrays.push(instruction);
                    }
                    for (const arrayElement of arrays) {
                        for (const compositeArgument of arrayElement) {
                            const count = compositeArgument.getLenght();
                            for (let i = 0; i < count; i++) {
                                args.push(compositeArgument.getItem(i).getString());
                            }
                        }
                    }
                    executeProcess(this._path.getValue(), { args: args, verbose: true })
                        .then(code => {
                        if (code === 0) {
                            resolve();
                        }
                        else {
                            reject(new Error("Compiler failed"));
                        }
                    })
                        .catch(reject);
                }
                else {
                    reject(new Error("Compiler input file was not set"));
                }
            }
            else {
                reject(new Error("Compiler output file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.defines.splice(0, this.defines.length);
        this.includeDirs.splice(0, this.includeDirs.length);
        this.input = undefined;
        this.output = undefined;
        this.optimization = undefined;
        this.warnings = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getCC());
    }
    constructor() {
        this.flags = [];
        this.defines = [];
        this.includeDirs = [];
        this.input = undefined;
        this.output = undefined;
        this.optimization = undefined;
        this.warnings = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getCC());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/MSVC/MsvcLinker.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class MsvcLinker {
    addFlag(value) {
        this.flags.push(new ToolchainCompositeArgument([new ToolchainRawArgument(value)]));
    }
    addObjectFile(path) {
        this.objectFiles.push(new ToolchainCompositeArgument([new ToolchainRawArgument(path)]));
    }
    addLibDir(dir) {
        this.libDirs.push(new ToolchainCompositeArgument([new ToolchainRawArgument(`/LIBPATH:${dir}`)]));
    }
    addLibrary(path) {
        this.libraries.push(new ToolchainCompositeArgument([new ToolchainRawArgument(path)]));
    }
    addLinkLibrary(name) {
        this.linkLibraries.push(new ToolchainCompositeArgument([new ToolchainRawArgument(name)]));
    }
    setImportLibrary(path) {
        this.outImplib = new ToolchainCompositeArgument([new ToolchainRawArgument(`/IMPLIB:${path}`)]);
    }
    getImportLibraryExtension() {
        return ".lib";
    }
    setOutputFile(path) {
        this.output = new ToolchainCompositeArgument([new ToolchainRawArgument(`/OUT:${path}`)]);
    }
    setOutputMode(mode) {
        this.outputMode = mode;
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.output) {
                const args = [];
                const arrays = [];
                if (this.outputMode && this.outputMode === "shared") {
                    arrays.push([new ToolchainCompositeArgument([new ToolchainRawArgument("/DLL")])]);
                }
                if (this.outImplib) {
                    arrays.push([this.outImplib]);
                }
                for (const instruction of [this.flags, this.libDirs, [this.output], this.objectFiles, this.libraries, this.linkLibraries]) {
                    arrays.push(instruction);
                }
                for (const arrayElement of arrays) {
                    for (const compositeArgument of arrayElement) {
                        const count = compositeArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(compositeArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Linker failed"));
                    }
                })
                    .catch(reject);
            }
            else {
                reject(new Error("Linker output file was not set"));
            }
        });
    }
    reset() {
        this.flags.splice(0, this.flags.length);
        this.objectFiles.splice(0, this.objectFiles.length);
        this.libDirs.splice(0, this.libDirs.length);
        this.libraries.splice(0, this.libraries.length);
        this.linkLibraries.splice(0, this.linkLibraries.length);
        this.outImplib = undefined;
        this.output = undefined;
        this.outputMode = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getLD());
    }
    constructor() {
        this.flags = [];
        this.objectFiles = [];
        this.libDirs = [];
        this.libraries = [];
        this.linkLibraries = [];
        this.outImplib = undefined;
        this.output = undefined;
        this.outputMode = undefined;
        this._path = new GetSetProperty(ToolchainEnvironmentVariables.instance().getLD());
        this.reset();
    }
    path() {
        return this._path;
    }
}

;// CONCATENATED MODULE: ./src/Toolchains/MSVC/MsvcToolchain.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class MsvcToolchain {
    constructor() {
        this.compiler = new MsvcCompiler();
        this.linker = new MsvcLinker();
        this.archiver = new MsvcArchiver();
    }
    getCompiler() {
        return this.compiler;
    }
    getLinker() {
        return this.linker;
    }
    getArchiver() {
        return this.archiver;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/LuaJitRepositoryVersion.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
const CONVERT_LUAJIT = {
    "openresty": {
        name: "OpenResty",
        repository: "https://github.com/openresty/luajit2",
        ref: "v2.1-agentzh",
        create: (opts) => new OpenRestyRepositoryVersion(opts)
    },
    "luajit": {
        name: "LuaJIT",
        repository: "https://github.com/LuaJIT/LuaJIT",
        ref: "v2.1",
        create: (opts) => new LuaJitRepositoryVersion(opts)
    }
};
function parseLuaJitRepositoryVersion(version) {
    return new Promise((resolve, reject) => {
        if (version in CONVERT_LUAJIT) {
            const details = CONVERT_LUAJIT[version];
            const repository = (details.repository);
            const name = (details.name);
            const defaultBranch = (details.ref);
            const create = details.create;
            resolve(create({ name: name, kind: version, repository: repository, ref: defaultBranch }));
        }
        else {
            const match = /^(openresty|luajit)\@(.*)$/.exec(version);
            if (match) {
                const kind = match[1];
                if (kind in CONVERT_LUAJIT) {
                    const details = CONVERT_LUAJIT[kind];
                    const repository = (details.repository);
                    const name = (details.name);
                    const ref = match[2];
                    const create = details.create;
                    resolve(create({ name: name, kind: kind, repository: repository, ref: ref }));
                }
                else {
                    reject(new Error("Internal error: unexpected condition to convert LuaJIT / OpenResty version to the proper repository"));
                }
            }
            else {
                reject(new Error("Unknown format for the LuaJIT / OpenResty version"));
            }
        }
    });
}
class LuaJitBaseRepositoryVersion {
    getName() {
        return this.options.name;
    }
    getKind() {
        return this.options.kind;
    }
    getRepository() {
        return this.options.repository;
    }
    getRef() {
        return this.options.ref;
    }
    getString() {
        return this.options.ref;
    }
    constructor(opts) {
        this.options = {
            name: opts.name,
            kind: opts.kind,
            repository: opts.repository,
            ref: opts.ref
        };
    }
}
class LuaJitRepositoryVersion extends LuaJitBaseRepositoryVersion {
    constructor(opts) {
        super(opts);
    }
}
class OpenRestyRepositoryVersion extends LuaJitBaseRepositoryVersion {
    constructor(opts) {
        super(opts);
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Configuration/LuaJitSourcesInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaJitSourcesInfo {
    constructor(dir, srcDir, version, unixMakefile, mingwMakefile, msvcBuildBat, delayedHeaderFile, headerFiles, manFiles, jitFiles) {
        this.dir = dir;
        this.srcDir = srcDir;
        this.version = version;
        this.unixMakefile = unixMakefile;
        this.mingwMakefile = mingwMakefile;
        this.msvcBuildBat = msvcBuildBat;
        this.delayedHeaderFile = delayedHeaderFile;
        this.headerFiles = new ReadOnlyArray(headerFiles);
        this.manFiles = new ReadOnlyArray(manFiles);
        this.jitFiles = new ReadOnlyArray(jitFiles);
    }
    getDir() {
        return this.dir;
    }
    getSrcDir() {
        return this.srcDir;
    }
    getVersion() {
        return this.version;
    }
    getUnixMakefile() {
        return this.unixMakefile;
    }
    getMingwMakefile() {
        return this.mingwMakefile;
    }
    getMsvcBuildBat() {
        return this.msvcBuildBat;
    }
    getDelayedHeaderFile() {
        return this.delayedHeaderFile;
    }
    getHeaderFiles() {
        return this.headerFiles;
    }
    getManFiles() {
        return this.manFiles;
    }
    getJitFiles() {
        return this.jitFiles;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/LuaJitVersion.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class LuaJitBaseVersion {
    getMajor() {
        return this.major;
    }
    getMinor() {
        return this.minor;
    }
    getRelease() {
        return this.release;
    }
    getABI() {
        return this.abi;
    }
    constructor(major, minor, release, abi) {
        this.major = major;
        this.minor = minor;
        this.release = release;
        this.abi = abi;
    }
}
class LuaJitVersion extends LuaJitBaseVersion {
    constructor(major, minor, release, abi) {
        super(major, minor, release, abi);
    }
}
class OpenRestyVersion extends LuaJitBaseVersion {
    constructor(major, minor, release, abi) {
        super(major, minor, release, abi);
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Configuration/LuaJitFinishConfigurationTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaJitFinishConfigurationTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Finish ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const srcInfo = (this.project.configurationResult().getValue());
            let len = 0;
            Console.instance().writeLine(`[Delayed Header] ${srcInfo.getDelayedHeaderFile()}`);
            const headerFiles = srcInfo.getHeaderFiles();
            len = headerFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Header] ${headerFiles.getItem(i)}`);
            }
            const jitFiles = srcInfo.getJitFiles();
            len = jitFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[JIT] ${jitFiles.getItem(i)}`);
            }
            const manFiles = srcInfo.getManFiles();
            len = manFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[MAN] ${manFiles.getItem(i)}`);
            }
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Finish ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Configuration/LuaJitConfigureSourcesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/










class LuaJitConfigureSourcesTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
        this.rawHeaderFiles = [];
        this.rawManFiles = [];
        this.rawJitFiles = [];
        this.srcDir = undefined;
        this.majorVer = undefined;
        this.minorVer = undefined;
        this.releaseVer = undefined;
        this.abiVer = undefined;
        this.unixMakefile = undefined;
        this.mingwMakefile = undefined;
        this.msvcBuildBat = undefined;
        this.delayedHeaderFile = undefined;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Configure source code for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaJitFinishConfigurationTarget(this.project, this);
    }
    setConfigurationResult() {
        const projectVersion = this.project.getVersion();
        let luaJitVersion;
        if (projectVersion instanceof LuaJitRepositoryVersion) {
            luaJitVersion = new LuaJitVersion(this.majorVer, this.minorVer, this.releaseVer, this.abiVer);
        }
        else if (projectVersion instanceof OpenRestyRepositoryVersion) {
            luaJitVersion = new OpenRestyVersion(this.majorVer, this.minorVer, this.releaseVer, this.abiVer);
        }
        else {
            throw new Error("Unknown LuaJIT repository version");
        }
        this.project.configurationResult().setValue(new LuaJitSourcesInfo(this.parent.getDirectory(), this.srcDir, luaJitVersion, this.unixMakefile, this.mingwMakefile, this.msvcBuildBat, this.delayedHeaderFile, this.rawHeaderFiles, this.rawManFiles, this.rawJitFiles));
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.rawHeaderFiles.splice(0, this.rawHeaderFiles.length);
            this.rawManFiles.splice(0, this.rawManFiles.length);
            this.rawJitFiles.splice(0, this.rawJitFiles.length);
            this.srcDir = undefined;
            this.majorVer = undefined;
            this.minorVer = undefined;
            this.releaseVer = undefined;
            this.abiVer = undefined;
            this.unixMakefile = undefined;
            this.mingwMakefile = undefined;
            this.msvcBuildBat = undefined;
            this.delayedHeaderFile = undefined;
            const extractedDir = this.parent.getDirectory();
            const _unixMakeFile = (0,external_node_path_namespaceObject.join)(extractedDir, "Makefile");
            const _srcDir = (0,external_node_path_namespaceObject.join)(extractedDir, "src");
            const _etcDir = (0,external_node_path_namespaceObject.join)(extractedDir, "etc");
            const _jitDir = (0,external_node_path_namespaceObject.join)(_srcDir, "jit");
            const _pkgConfigFile = (0,external_node_path_namespaceObject.join)(_etcDir, "luajit.pc");
            const _msvcBuildBat = (0,external_node_path_namespaceObject.join)(_srcDir, "msvcbuild.bat");
            const _mingwMakeFile = (0,external_node_path_namespaceObject.join)(_srcDir, "Makefile");
            const _delayedHeaderFile = (0,external_node_path_namespaceObject.join)(_srcDir, "luajit.h");
            const targetHeaders = [
                /*
                * the delayed header file above (luajit.h)
                * appears in the build phase
                 */
                (0,external_node_path_namespaceObject.join)(_srcDir, "lua.h"),
                (0,external_node_path_namespaceObject.join)(_srcDir, "lua.hpp"),
                (0,external_node_path_namespaceObject.join)(_srcDir, "luaconf.h"),
                (0,external_node_path_namespaceObject.join)(_srcDir, "lauxlib.h"),
                (0,external_node_path_namespaceObject.join)(_srcDir, "lualib.h")
            ];
            const targetManFiles = [
                (0,external_node_path_namespaceObject.join)(_etcDir, "luajit.1")
            ];
            checkFiles(targetHeaders)
                .then(() => {
                for (const header of targetHeaders) {
                    this.rawHeaderFiles.push(header);
                }
                checkFiles(targetManFiles)
                    .then(() => {
                    for (const manFile of targetManFiles) {
                        this.rawManFiles.push(manFile);
                    }
                    let dotrelverContent;
                    const furtherProcessing = () => {
                        checkFiles([
                            _unixMakeFile,
                            _msvcBuildBat,
                            _mingwMakeFile,
                            _pkgConfigFile
                        ])
                            .then(() => {
                            this.srcDir = _srcDir;
                            this.unixMakefile = _unixMakeFile;
                            this.msvcBuildBat = _msvcBuildBat;
                            this.mingwMakefile = _mingwMakeFile;
                            const rl_pkgconfig = (0,external_node_readline_promises_namespaceObject.createInterface)({
                                input: (0,external_node_fs_namespaceObject.createReadStream)(_pkgConfigFile),
                                crlfDelay: Infinity
                            });
                            rl_pkgconfig.on("line", line => {
                                const majorMatch = /^majver\=(\d+)$/.exec(line);
                                if (majorMatch) {
                                    this.majorVer = majorMatch[1];
                                }
                                const minorMatch = /^minver\=(\d+)$/.exec(line);
                                if (minorMatch) {
                                    this.minorVer = minorMatch[1];
                                }
                                const abiMatch = /^abiver\=(\d+\.\d+)$/.exec(line);
                                if (abiMatch) {
                                    this.abiVer = abiMatch[1];
                                }
                                const relMatch = /^relver\=(ROLLING|\d+)$/.exec(line);
                                if (relMatch) {
                                    const pkgConfigRelVer = relMatch[1];
                                    if (pkgConfigRelVer === "ROLLING") {
                                        this.releaseVer = dotrelverContent;
                                    }
                                    else {
                                        this.releaseVer = pkgConfigRelVer;
                                    }
                                }
                            });
                            rl_pkgconfig.on("close", () => {
                                if (this.releaseVer === undefined) {
                                    reject(new Error("Release version not found"));
                                }
                                else if (!this.majorVer) {
                                    reject(new Error("Major version not found"));
                                }
                                else if (!this.minorVer) {
                                    reject(new Error("Minor version not found"));
                                }
                                else if (!this.abiVer) {
                                    reject(new Error("ABI version not found"));
                                }
                                else {
                                    (0,promises_namespaceObject.readdir)(_jitDir)
                                        .then(jitFiles => {
                                        const jitfiles_iter = (j) => {
                                            if (j < jitFiles.length) {
                                                const jf_path = (0,external_node_path_namespaceObject.join)(_jitDir, jitFiles[j]);
                                                (0,promises_namespaceObject.stat)(jf_path)
                                                    .then(jf_s => {
                                                    if (jf_s.isFile()) {
                                                        const ext = (0,external_node_path_namespaceObject.extname)(jf_path);
                                                        if (ext === ".lua") {
                                                            this.rawJitFiles.push(jf_path);
                                                        }
                                                    }
                                                    jitfiles_iter(j + 1);
                                                })
                                                    .catch(reject);
                                            }
                                            else {
                                                this.delayedHeaderFile = _delayedHeaderFile;
                                                this.setConfigurationResult();
                                                resolve();
                                            }
                                        };
                                        jitfiles_iter(0);
                                    })
                                        .catch(reject);
                                }
                            });
                        })
                            .catch(reject);
                    };
                    const topLevelRelVer = (0,external_node_path_namespaceObject.join)(extractedDir, ".relver");
                    (0,promises_namespaceObject.readFile)(topLevelRelVer, { encoding: "utf-8" })
                        .then(s => {
                        const dotrelverMatch = /^(\d+)(\r\n|\r|\n)$/.exec(s);
                        if (dotrelverMatch) {
                            dotrelverContent = dotrelverMatch[1];
                        }
                        else {
                            dotrelverContent = "";
                        }
                        furtherProcessing();
                    })
                        .catch(topLevelRelVerErr => {
                        dotrelverContent = "";
                        furtherProcessing();
                    });
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Configure source code for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Configuration/LuaJitApplyPatchesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/




class LuaJitApplyPatchesTarget extends AbstractApplyPatchesTarget {
    constructor(project, parent) {
        super(project, parent, parent.getExtractedDir(), project.getRemotePatchesBuildDir(), ToolchainEnvironmentVariables.instance().getLuaPatches());
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.getProject().getVersion();
            Console.instance().writeLine(`[Start] Apply patches on ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getNext() {
        return new LuaJitConfigureSourcesTarget(this.getProject(), this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.getProject().getVersion();
            Console.instance().writeLine(`[End] Apply patches on ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Configuration/LuaJitFetchTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






class LuaJitFetchTarget extends AbstractFetchTarballTarget {
    constructor(project, parent) {
        super(`${project.getVersion().getRepository()}/archive/${project.getVersion().getRef()}.tar.gz`, project.getBuildDir(), null);
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Fetch ${projectVersion.getName()} ${projectVersion.getRef()} source code`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getExtractedDir() {
        return (this.extractedDir);
    }
    execute() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            super.execute()
                .then(() => {
                const workDir = this.getWorkDir();
                (0,promises_namespaceObject.readdir)(workDir, { recursive: false })
                    .then(items => {
                    const len = items.length;
                    const dirItem_iter = (i) => {
                        if (i < len) {
                            const dirItem = items[i];
                            if ((projectVersion instanceof LuaJitRepositoryVersion && dirItem.startsWith("LuaJIT-"))
                                ||
                                    (projectVersion instanceof OpenRestyRepositoryVersion && dirItem.startsWith("luajit2-"))) {
                                const dirItemFullPath = (0,external_node_path_namespaceObject.join)(workDir, dirItem);
                                (0,promises_namespaceObject.stat)(dirItemFullPath)
                                    .then(s => {
                                    if (s.isDirectory()) {
                                        this.extractedDir = dirItemFullPath;
                                        resolve();
                                    }
                                    else {
                                        dirItem_iter(i + 1);
                                    }
                                })
                                    .catch(reject);
                            }
                            else {
                                dirItem_iter(i + 1);
                            }
                        }
                        else {
                            reject(new Error(`Extracted directory for ${projectVersion.getName()} ${projectVersion.getRef()} was not found`));
                        }
                    };
                    dirItem_iter(0);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    getNext() {
        return new LuaJitApplyPatchesTarget(this.project, this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Fetch ${projectVersion.getName()} ${projectVersion.getRef()} source code`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Configuration/LuaJitCreateBuildDirectoriesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class LuaJitCreateBuildDirectoriesTarget extends AbstractCreateDirectoriesTarget {
    constructor(project, parent) {
        super([
            project.getBuildDir(),
            project.getRemotePatchesBuildDir()
        ]);
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Create build directories for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaJitFetchTarget(this.project, this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Create build directories for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Building/LuaJitWindowsBuildInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class LuaJitWindowsBuildInfo {
    constructor(sourcesInfo, sharedLibrary, interpreter, pkgConfigFile, importLibrary) {
        this.sourcesInfo = sourcesInfo;
        this.sharedLibrary = sharedLibrary;
        this.interpreter = interpreter;
        this.pkgConfigFile = pkgConfigFile;
        this.importLibrary = importLibrary;
    }
    getSourcesInfo() {
        return this.sourcesInfo;
    }
    getSharedLibrary() {
        return this.sharedLibrary;
    }
    getInterpreter() {
        return this.interpreter;
    }
    getPkgConfigFile() {
        return this.pkgConfigFile;
    }
    getImportLibrary() {
        return this.importLibrary;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Building/LuaJitFinishBuildingTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaJitFinishBuildingTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Finish the build of ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (process.platform === "win32") {
                const buildInfo = this.project.buildResult().getValue();
                Console.instance().writeLine(`Shared Library: ${buildInfo.getSharedLibrary()}`);
                Console.instance().writeLine(`Interpreter: ${buildInfo.getInterpreter()}`);
                Console.instance().writeLine(`PkgConfig: ${buildInfo.getPkgConfigFile()}`);
                Console.instance().writeLine(`Import Library: ${buildInfo.getImportLibrary()}`);
            }
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Finish the build of ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Building/LuaJitUnixBuildInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaJitUnixBuildInfo {
    constructor(make, makeArguments) {
        this.make = make;
        this.makeArguments = new ReadOnlyArray(makeArguments);
    }
    getMake() {
        return this.make;
    }
    getMakeArguments() {
        return this.makeArguments;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Building/LuaJitCreatePkgConfigTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class LuaJitCreatePkgConfigTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Create pkgconfig file for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getSourcesInfo() {
        return this.parent.getSourcesInfo();
    }
    getNext() {
        return new LuaJitFinishBuildingTarget(this.project, this);
    }
    setWindowsBuildResult() {
        this.project.buildResult().setValue(new LuaJitWindowsBuildInfo(this.parent.getSourcesInfo(), this.parent.getSharedLibrary(), this.parent.getInterpreter(), this.pkgConfig, this.parent.getImportLibrary()));
    }
    setUnixBuildResult() {
        this.project.buildResult().setValue(new LuaJitUnixBuildInfo(this.parent.getUnixMake(), this.parent.getUnixMakeArguments().createCopy()));
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (process.platform === 'win32') {
                const sharedLibrary = this.parent.getSharedLibrary();
                if (sharedLibrary) {
                    const interpreter = this.parent.getInterpreter();
                    if (interpreter) {
                        const furtherProcessing = (libname) => {
                            const srcInfo = this.parent.getSourcesInfo();
                            const version = srcInfo.getVersion();
                            const lines = [];
                            lines.push(`majver=${version.getMajor()}`);
                            lines.push(`minver=${version.getMinor()}`);
                            lines.push(`relver=${version.getRelease()}`);
                            lines.push("version=${majver}.${minver}.${relver}");
                            lines.push(`abiver=${version.getABI()}`);
                            lines.push("");
                            const prefix = this.project.getInstallDir().replace(/\\/g, "/");
                            const incdir = this.project.getInstallIncludeDir(version).replace(/\\/g, "/");
                            const bindir = this.project.getInstallBinDir().replace(/\\/g, "/");
                            const libdir = libname ? this.project.getInstallLibDir().replace(/\\/g, "/") : bindir;
                            const lmod = this.project.getInstallLuaModulesDir().replace(/\\/g, "/");
                            const cmod = this.project.getInstallCModulesDir().replace(/\\/g, "/");
                            const mandir = this.project.getInstallManDir().replace(/\\/g, "/");
                            lines.push(`prefix=${prefix}`);
                            lines.push(`exec_prefix=${prefix}`);
                            lines.push(`libname=${libname !== null && libname !== void 0 ? libname : (0,external_node_path_namespaceObject.basename)(sharedLibrary, (0,external_node_path_namespaceObject.extname)(sharedLibrary))}`);
                            lines.push(`includedir=${incdir}`);
                            lines.push(`bindir=${bindir}`);
                            lines.push(`libdir=${libdir}`);
                            lines.push("");
                            lines.push(`INSTALL_BIN=${bindir}`);
                            lines.push(`INSTALL_INC=${incdir}`);
                            lines.push(`INSTALL_LIB=${libdir}`);
                            lines.push(`INSTALL_MAN=${mandir}`);
                            lines.push(`INSTALL_LMOD=${lmod}`);
                            lines.push(`INSTALL_CMOD=${cmod}`);
                            lines.push("");
                            lines.push("Name: LuaJIT");
                            lines.push("Description: Just-in-time compiler for Lua");
                            lines.push("URL: https://luajit.org");
                            lines.push("Version: ${version}");
                            lines.push("Requires:");
                            lines.push("Libs: -L${libdir} -l${libname}");
                            lines.push("Cflags: -I${includedir}");
                            const pkgConfigFileName = (0,external_node_path_namespaceObject.join)(this.project.getBuildDir(), `luajit.pc`);
                            (0,promises_namespaceObject.writeFile)(pkgConfigFileName, lines.join("\n"), { encoding: "utf8" })
                                .then(() => {
                                this.pkgConfig = pkgConfigFileName;
                                this.setWindowsBuildResult();
                                resolve();
                            })
                                .catch(reject);
                        };
                        const importLibrary = this.parent.getImportLibrary();
                        if (importLibrary) {
                            let libname = (0,external_node_path_namespaceObject.basename)(importLibrary);
                            if (libname.startsWith("lib")) {
                                libname = libname.substring(3);
                            }
                            const toolchain = this.project.getToolchain();
                            const linker = toolchain.getLinker();
                            if (hasWin32ImportLibraryDecorator(linker)) {
                                const win32Linker = linker;
                                const implibExt = win32Linker.getImportLibraryExtension();
                                if (libname.endsWith(implibExt)) {
                                    libname = libname.substring(0, libname.length - implibExt.length);
                                    furtherProcessing(libname);
                                }
                                else {
                                    reject(new Error("Unsupported linker: import library extension mismatch."));
                                }
                            }
                            else {
                                reject(new Error("Unsupported linker: linker is expected to implement IWin32ImportLibraryDecorator."));
                            }
                        }
                        else {
                            furtherProcessing();
                        }
                    }
                    else {
                        reject(new Error("Internal error: interpreter has not a value"));
                    }
                }
                else {
                    reject(new Error("Internal error: shared library has not a value"));
                }
            }
            else {
                this.setUnixBuildResult();
                resolve();
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Create pkgconfig file for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Building/LuaJitBuildTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/













class LuaJitBuildTarget {
    constructor(project, parent, sourceInfo) {
        this.project = project;
        this.parent = parent;
        this.srcInfo = sourceInfo;
        this.sharedLibrary = undefined;
        this.interpreter = undefined;
        this.importLibrary = undefined;
        this.rawMake = undefined;
        this.rawMakeArguments = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Build ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getSourcesInfo() {
        return this.srcInfo;
    }
    getSharedLibrary() {
        return this.sharedLibrary;
    }
    getInterpreter() {
        return this.interpreter;
    }
    getImportLibrary() {
        return this.importLibrary;
    }
    getUnixMake() {
        return this.rawMake;
    }
    getUnixMakeArguments() {
        return new ReadOnlyArray(this.rawMakeArguments);
    }
    getNext() {
        return new LuaJitCreatePkgConfigTarget(this.project, this);
    }
    parseMacOSXDeploymentTarget(deploymentTarget) {
        const version = [];
        const swMatch = /^(\d+)\.(\d+)(\.(\d+))?$/.exec(deploymentTarget);
        if (swMatch) {
            const major = Number(swMatch[1]);
            const minor = Number(swMatch[2]);
            const patch = Number(swMatch[4] || "0");
            if (compareVersions([major, minor, patch], [11, 0]) >= 0) {
                version.push(11);
                version.push(0);
            }
            else if (compareVersions([major, minor, patch], [10, 10]) >= 0) {
                version.push(10);
                version.push(8);
            }
            else if (compareVersions([major, minor, patch], [10, 5]) >= 0) {
                version.push(10);
                version.push(5);
            }
            else {
                version.push(10);
                version.push(3);
            }
        }
        else {
            version.push(10);
            version.push(3);
        }
        return `${version[0]}.${version[1]}`;
    }
    getMacOSXDeloymentTarget() {
        return new Promise((resolve, reject) => {
            let deploymentTarget = (GitHubInput.instance().getInputMacOSXDeploymentTarget() || process.env["MACOSX_DEPLOYMENT_TARGET"] || "").trim();
            if (deploymentTarget) {
                resolve(this.parseMacOSXDeploymentTarget(deploymentTarget));
            }
            else {
                getStdOutFromProcessExecution("sw_vers", {
                    args: ["-productVersion"],
                    verbose: true
                })
                    .then(result => {
                    if (result.lines.length > 0) {
                        deploymentTarget = result.lines[0];
                        resolve(this.parseMacOSXDeploymentTarget(deploymentTarget));
                    }
                    else {
                        reject(new Error("Internal error: Unable to set MACOSX_DEPLOYMENT_TARGET"));
                    }
                })
                    .catch(reject);
            }
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.sharedLibrary = undefined;
            this.interpreter = undefined;
            this.importLibrary = undefined;
            this.rawMake = undefined;
            this.rawMakeArguments.splice(0, this.rawMakeArguments.length);
            if (process.platform === 'win32') {
                const toolchain = this.project.getToolchain();
                const luaJitSrcDir = this.srcInfo.getSrcDir();
                const luaJitVersion = this.srcInfo.getVersion();
                const isGccLike = isGccLikeToolchain(toolchain);
                const _sharedLibrary = (0,external_node_path_namespaceObject.join)(luaJitSrcDir, "lua51.dll");
                const _interpreter = (0,external_node_path_namespaceObject.join)(luaJitSrcDir, "luajit.exe");
                const _importLibrary = (0,external_node_path_namespaceObject.join)(luaJitSrcDir, isGccLike ?
                    `libluajit-${luaJitVersion.getABI()}.dll.a` :
                    "lua51.lib");
                const filesToCheck = [
                    _sharedLibrary,
                    _interpreter
                ];
                const cmd = (process.env["COMSPEC"] || "cmd").trim();
                if (isGccLike) {
                    const make = ToolchainEnvironmentVariables.instance().getMake();
                    const cross = ToolchainEnvironmentVariables.instance().getToolchainPrefix();
                    const envCC = ToolchainEnvironmentVariables.instance().getRawCC();
                    const cflags = ToolchainEnvironmentVariables.instance().getCflagsExtra();
                    const incDirs = ToolchainEnvironmentVariables.instance().getIncDirsExtra();
                    const combinedXcflags = [];
                    for (const flag of cflags) {
                        combinedXcflags.push(`"${flag}"`);
                    }
                    for (const incDir of incDirs) {
                        combinedXcflags.push(`"-I${incDir}"`);
                    }
                    const coreBuildForMinGW = (statusLongJump) => {
                        const MACRO_FOR_STATUS_LONGJUMP = statusLongJump ? "" : `-DSTATUS_LONGJUMP=0x80000026UL`;
                        executeProcess(make, {
                            args: (process.env["MSYSTEM"]) ? [
                                "-C",
                                luaJitSrcDir,
                                `DEFAULT_CC=${envCC}`,
                                `CROSS=${cross}`,
                                `XCFLAGS= ${MACRO_FOR_STATUS_LONGJUMP} ${combinedXcflags.join(' ')} `,
                                "all"
                            ] : [
                                "-C",
                                luaJitSrcDir,
                                `SHELL=${cmd}`,
                                `DEFAULT_CC=${envCC}`,
                                `CROSS=${cross}`,
                                `XCFLAGS= ${MACRO_FOR_STATUS_LONGJUMP} ${combinedXcflags.join(' ')} `,
                                "all"
                            ],
                            stdout: defaultStdOutHandler,
                            verbose: true
                        })
                            .then(code => {
                            checkFiles(filesToCheck)
                                .then(() => {
                                this.sharedLibrary = _sharedLibrary;
                                this.interpreter = _interpreter;
                                (0,promises_namespaceObject.stat)(_importLibrary)
                                    .then(_implibStat => {
                                    this.importLibrary = _implibStat.isFile() ? _importLibrary : undefined;
                                    resolve();
                                })
                                    .catch(_implibErr => {
                                    this.importLibrary = undefined;
                                    resolve();
                                });
                            })
                                .catch(reject);
                        })
                            .catch(reject);
                    };
                    const testStatusLongJump = [
                        "#define WIN32_LEAN_AND_MEAN",
                        "#include <windows.h>",
                        "int main() { DWORD value = STATUS_LONGJUMP; return 0; }"
                    ];
                    const sourceCode = testStatusLongJump.join(external_node_os_namespaceObject.EOL);
                    const testFileBasename = "test-status-longjump";
                    (0,promises_namespaceObject.mkdtemp)((0,external_node_path_namespaceObject.join)(this.project.getBuildDir(), testFileBasename + "-"))
                        .then(tmpDir => {
                        const testFile = (0,external_node_path_namespaceObject.join)(tmpDir, testFileBasename + ".c");
                        (0,promises_namespaceObject.writeFile)(testFile, sourceCode, { encoding: "utf-8" })
                            .then(() => {
                            const compiler = this.project.getToolchain().getCompiler();
                            const testOutputObjectFile = (0,external_node_path_namespaceObject.join)(tmpDir, testFileBasename + compiler.getObjectFileExtension());
                            compiler.setInputFile(testFile);
                            compiler.setOutputFile(testOutputObjectFile);
                            compiler.execute()
                                .then(() => {
                                compiler.reset();
                                coreBuildForMinGW(true);
                            })
                                .catch(testErr => {
                                compiler.reset();
                                coreBuildForMinGW(false);
                            });
                        })
                            .catch(reject);
                    })
                        .catch(reject);
                }
                else {
                    filesToCheck.push(_importLibrary);
                    executeProcess(cmd, {
                        args: ["/C", this.srcInfo.getMsvcBuildBat()],
                        cwd: luaJitSrcDir,
                        verbose: true,
                        stdout: defaultStdOutHandler,
                    })
                        .then(code => {
                        checkFiles(filesToCheck)
                            .then(() => {
                            this.sharedLibrary = _sharedLibrary;
                            this.interpreter = _interpreter;
                            this.importLibrary = _importLibrary;
                            resolve();
                        })
                            .catch(reject);
                    })
                        .catch(reject);
                }
            }
            else {
                const make = ToolchainEnvironmentVariables.instance().getMake();
                const cross = ToolchainEnvironmentVariables.instance().getToolchainPrefix();
                const envCC = ToolchainEnvironmentVariables.instance().getCC();
                const cflags = ToolchainEnvironmentVariables.instance().getCflagsExtra();
                const incDirs = ToolchainEnvironmentVariables.instance().getIncDirsExtra();
                const combinedXcflags = [];
                for (const flag of cflags) {
                    combinedXcflags.push(`"${flag}"`);
                }
                for (const incDir of incDirs) {
                    combinedXcflags.push(`"-I${incDir}"`);
                }
                const makeArguments = combinedXcflags.length > 0 ? [
                    "-C",
                    this.srcInfo.getDir(),
                    `PREFIX=${this.project.getInstallDir()}`,
                    `DEFAULT_CC=${envCC}`,
                    `XCFLAGS= ${combinedXcflags.join(' ')} `,
                    `CROSS=${cross}`
                ] : [
                    "-C",
                    this.srcInfo.getDir(),
                    `PREFIX=${this.project.getInstallDir()}`,
                    `DEFAULT_CC=${envCC}`,
                    `CROSS=${cross}`
                ];
                const furtherProcessing = (macOSXDeploymentTarget) => {
                    if (macOSXDeploymentTarget) {
                        makeArguments.push(`MACOSX_DEPLOYMENT_TARGET=${macOSXDeploymentTarget}`);
                    }
                    const buildTarget = "all";
                    const args = makeArguments.slice();
                    args.push(buildTarget);
                    executeProcess(make, {
                        args: args,
                        stdout: defaultStdOutHandler,
                        verbose: true
                    })
                        .then(code => {
                        this.rawMake = make;
                        for (const makeArg of makeArguments) {
                            this.rawMakeArguments.push(makeArg);
                        }
                        resolve();
                    })
                        .catch(reject);
                };
                if (process.platform === 'darwin') {
                    this.getMacOSXDeloymentTarget()
                        .then(furtherProcessing)
                        .catch(reject);
                }
                else {
                    furtherProcessing();
                }
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Build ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Installation/LuaJitFinishInstallationTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaJitFinishInstallationTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Finish the installation of ${projectVersion.getName()} ${projectVersion.getRef()} installation`);
            resolve();
        });
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine("<< done >>");
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Finish the installation of ${projectVersion.getName()} ${projectVersion.getRef()} installation`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Installation/LuaJitPostInstallTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class LuaJitPostInstallTarget extends AbstractUpdateLuaEnvVarsTarget {
    constructor(project, parent) {
        super(project, parent);
    }
    getProjectInstallDir() {
        return this.getProject().getInstallDir();
    }
    getProjectInstallLibDir() {
        return this.getProject().getInstallLibDir();
    }
    getProjectInstallBinDir() {
        return this.getProject().getInstallBinDir();
    }
    getProjectInstallPkgConfigDir() {
        return this.getProject().getInstallPkgConfigDir();
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.getProject().getVersion();
            Console.instance().writeLine(`[Start] Post install for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getNext() {
        return new LuaJitFinishInstallationTarget(this.getProject(), this);
    }
    setInstallationResult(installDir, luaInterpreter, luaShortVersion) {
        this.getProject().installationResult().setValue(new LuaInstallation(installDir, luaInterpreter, luaShortVersion));
    }
    execute() {
        return new Promise((resolve, reject) => {
            super.execute()
                .then(() => {
                const installDir = this.getProjectInstallDir();
                const binDir = this.getProjectInstallBinDir();
                const ext = process.platform === "win32" ? ".exe" : "";
                const luaInterpreter = (0,external_node_path_namespaceObject.join)(binDir, `luajit${ext}`);
                checkFiles([luaInterpreter])
                    .then(() => {
                    getFirstLineFromProcessExecution(luaInterpreter, ["-e", "print(_VERSION:sub(5))"], true)
                        .then(luaShortVersion => {
                        if (luaShortVersion === "5.1") {
                            this.setInstallationResult(installDir, luaInterpreter, luaShortVersion);
                            resolve();
                        }
                        else {
                            reject(new Error("Unexpected LuaJIT / OpenResty short version"));
                        }
                    })
                        .catch(reject);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.getProject().getVersion();
            Console.instance().writeLine(`[End] Post install for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Installation/LuaJitWindowsCopyInstallableArtifactsTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






class LuaJitWindowsCopyInstallableArtifactsTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Copy ${projectVersion.getName()} ${projectVersion.getRef()} installation files`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaJitPostInstallTarget(this.project, this);
    }
    copyInterpreter() {
        return new Promise((resolve, reject) => {
            const builtInterpreter = this.parent.getBuildInfo().getInterpreter();
            const binDir = this.project.getInstallBinDir();
            const filesToCopy = [
                (0,external_node_path_namespaceObject.join)(binDir, (0,external_node_path_namespaceObject.basename)(builtInterpreter))
            ];
            if (isRunningOnCi() || process.env["GITHUB_PATH"]) {
                filesToCopy.push((0,external_node_path_namespaceObject.join)(binDir, "lua.exe"));
            }
            const file_iter = (i) => {
                if (i < filesToCopy.length) {
                    const destFile = filesToCopy[i];
                    (0,promises_namespaceObject.cp)(builtInterpreter, destFile, { force: true })
                        .then(() => {
                        file_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            file_iter(0);
        });
    }
    copySharedLibrary() {
        return new Promise((resolve, reject) => {
            const builtSharedLib = this.parent.getBuildInfo().getSharedLibrary();
            const sharedLib = (0,external_node_path_namespaceObject.join)(this.project.getInstallBinDir(), (0,external_node_path_namespaceObject.basename)(builtSharedLib));
            (0,promises_namespaceObject.cp)(builtSharedLib, sharedLib, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    copyImportLibrary() {
        return new Promise((resolve, reject) => {
            const builtImpLib = this.parent.getBuildInfo().getImportLibrary();
            if (builtImpLib) {
                const libDir = this.project.getInstallLibDir();
                const impLib = (0,external_node_path_namespaceObject.join)(libDir, (0,external_node_path_namespaceObject.basename)(builtImpLib));
                (0,promises_namespaceObject.cp)(builtImpLib, impLib, { force: true })
                    .then(resolve)
                    .catch(reject);
            }
            else {
                resolve();
            }
        });
    }
    copyHeaders() {
        return new Promise((resolve, reject) => {
            const srcInfo = this.parent.getBuildInfo().getSourcesInfo();
            const includeDir = this.project.getInstallIncludeDir(srcInfo.getVersion());
            const headers = srcInfo.getHeaderFiles();
            const len = headers.getLenght();
            const header_iter = (i) => {
                if (i < len) {
                    const sourceHeader = headers.getItem(i);
                    const h = (0,external_node_path_namespaceObject.join)(includeDir, (0,external_node_path_namespaceObject.basename)(sourceHeader));
                    (0,promises_namespaceObject.cp)(sourceHeader, h, { force: true })
                        .then(() => {
                        header_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    const sourceHeader = srcInfo.getDelayedHeaderFile();
                    const h = (0,external_node_path_namespaceObject.join)(includeDir, (0,external_node_path_namespaceObject.basename)(sourceHeader));
                    (0,promises_namespaceObject.cp)(sourceHeader, h, { force: true })
                        .then(resolve)
                        .catch(reject);
                }
            };
            header_iter(0);
        });
    }
    copyJitFiles() {
        return new Promise((resolve, reject) => {
            const srcInfo = this.parent.getBuildInfo().getSourcesInfo();
            const jitFilesInstallDir = this.project.getInstallLuaJitModuleDir();
            const jitFiles = srcInfo.getJitFiles();
            const len = jitFiles.getLenght();
            const jitFile_iter = (i) => {
                if (i < len) {
                    const jitFile = jitFiles.getItem(i);
                    const f = (0,external_node_path_namespaceObject.join)(jitFilesInstallDir, (0,external_node_path_namespaceObject.basename)(jitFile));
                    (0,promises_namespaceObject.cp)(jitFile, f, { force: true })
                        .then(() => {
                        jitFile_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            jitFile_iter(0);
        });
    }
    copyManFiles() {
        return new Promise((resolve, reject) => {
            const manDir = this.project.getInstallManDir();
            const manFiles = this.parent.getBuildInfo().getSourcesInfo().getManFiles();
            const len = manFiles.getLenght();
            const man_iter = (i) => {
                if (i < len) {
                    const sourceMan = manFiles.getItem(i);
                    const man = (0,external_node_path_namespaceObject.join)(manDir, (0,external_node_path_namespaceObject.basename)(sourceMan));
                    (0,promises_namespaceObject.cp)(sourceMan, man, { force: true })
                        .then(() => {
                        man_iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            man_iter(0);
        });
    }
    copyPkgConfigFile() {
        return new Promise((resolve, reject) => {
            const builtPkgConfigFile = this.parent.getBuildInfo().getPkgConfigFile();
            const pkgConfigDir = this.project.getInstallPkgConfigDir();
            const pkgConfigFile = (0,external_node_path_namespaceObject.join)(pkgConfigDir, (0,external_node_path_namespaceObject.basename)(builtPkgConfigFile));
            (0,promises_namespaceObject.cp)(builtPkgConfigFile, pkgConfigFile, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            sequentialPromises([
                () => this.copyInterpreter(),
                () => this.copySharedLibrary(),
                () => this.copyImportLibrary(),
                () => this.copyHeaders(),
                () => this.copyJitFiles(),
                () => this.copyManFiles(),
                () => this.copyPkgConfigFile()
            ])
                .then(_ => {
                resolve();
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Copy ${projectVersion.getName()} ${projectVersion.getRef()} installation files`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Installation/LuaJitWindowsCreateInstallationDirectoriesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class LuaJitWindowsCreateInstallationDirectoriesTarget extends AbstractCreateDirectoriesTarget {
    constructor(project, parent, buildInfo) {
        super([
            project.getInstallDir(),
            project.getInstallIncludeDir(buildInfo.getSourcesInfo().getVersion()),
            project.getInstallBinDir(),
            project.getInstallLibDir(),
            project.getInstallManDir(),
            project.getInstallPkgConfigDir(),
            project.getInstallLuaModulesDir(),
            project.getInstallLuaJitModuleDir(),
            project.getInstallCModulesDir()
        ]);
        this.project = project;
        this.parent = parent;
        this.buildInfo = buildInfo;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Create installation directories for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaJitWindowsCopyInstallableArtifactsTarget(this.project, this);
    }
    getBuildInfo() {
        return this.buildInfo;
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Create installation directories for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/Installation/LuaJitUnixInstall.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






class LuaJitUnixInstall {
    constructor(project, parent, buildInfo) {
        this.project = project;
        this.parent = parent;
        this.buildInfo = buildInfo;
    }
    init() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Install ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaJitPostInstallTarget(this.project, this);
    }
    execute() {
        return new Promise((resolve, reject) => {
            const makeArguments = this.buildInfo.getMakeArguments();
            const makeArgs = makeArguments.createCopy();
            const installTarget = "install";
            makeArgs.push(installTarget);
            executeProcess(this.buildInfo.getMake(), {
                args: makeArgs,
                stdout: defaultStdOutHandler,
                verbose: true
            })
                .then(makeCode => {
                if (isRunningOnCi() || process.env["GITHUB_PATH"]) {
                    const installBinDir = this.project.getInstallBinDir();
                    const luajitInterpreter = (0,external_node_path_namespaceObject.join)(installBinDir, "luajit");
                    const luaSoftLink = (0,external_node_path_namespaceObject.join)(installBinDir, "lua");
                    executeProcess("ln", {
                        args: ["-s", luajitInterpreter, luaSoftLink],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(lnCode => {
                        resolve();
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Install ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaJit/LuaJitProject.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class LuaJitProject {
    getVersion() {
        return this.version;
    }
    getBuildDir() {
        return this.buildDir;
    }
    getRemotePatchesBuildDir() {
        return this.remotePatchesBuildDir;
    }
    getInstallDir() {
        return this.installDir;
    }
    getToolchain() {
        return this.toolchain;
    }
    getInstallBaseIncludeDir() {
        return this.installBaseIncludeDir;
    }
    getInstallIncludeDir(luajitVersion) {
        return (0,external_node_path_namespaceObject.join)(this.installBaseIncludeDir, `luajit-${luajitVersion.getMajor()}.${luajitVersion.getMinor()}`);
    }
    getInstallBinDir() {
        return this.installBinDir;
    }
    getInstallLibDir() {
        return this.installLibDir;
    }
    getInstallManDir() {
        return this.installManDir;
    }
    getInstallPkgConfigDir() {
        return this.installPkgConfigDir;
    }
    getInstallLuaModulesDir() {
        return this.installLuaModulesDir;
    }
    getInstallLuaJitModuleDir() {
        return this.installLuaJitModuleDir;
    }
    getInstallCModulesDir() {
        return this.installCModulesDir;
    }
    configurationResult() {
        return this._configurationResult;
    }
    buildResult() {
        return this._buildResult;
    }
    installationResult() {
        return this._installationResult;
    }
    constructor(version, buildDir, installDir, toolchain) {
        this.version = version;
        this.buildDir = buildDir;
        this.installDir = installDir;
        this.toolchain = toolchain;
        this.remotePatchesBuildDir = (0,external_node_path_namespaceObject.join)(this.buildDir, "remote-patches");
        this.installBaseIncludeDir = (0,external_node_path_namespaceObject.join)(installDir, "include");
        this.installBinDir = (0,external_node_path_namespaceObject.join)(installDir, "bin");
        this.installLibDir = (0,external_node_path_namespaceObject.join)(installDir, "lib");
        this.installManDir = (0,external_node_path_namespaceObject.join)(installDir, "share", "man", "man1");
        this.installPkgConfigDir = (0,external_node_path_namespaceObject.join)(this.installLibDir, "pkgconfig");
        if (process.platform === 'win32') {
            this.installLuaModulesDir = (0,external_node_path_namespaceObject.join)(this.installBinDir, "lua");
            this.installLuaJitModuleDir = (0,external_node_path_namespaceObject.join)(this.installLuaModulesDir, "jit");
            this.installCModulesDir = this.installBinDir;
        }
        else {
            this.installLuaModulesDir = (0,external_node_path_namespaceObject.join)(installDir, "share", "lua", "5.1");
            this.installCModulesDir = (0,external_node_path_namespaceObject.join)(this.installLibDir, "lua", "5.1");
        }
        this._configurationResult = new GetSetProperty(null);
        this._buildResult = new GetSetProperty(null);
        this._installationResult = new GetSetProperty(null);
    }
    configure() {
        return new Promise((resolve, reject) => {
            const initialConfigureTarget = new LuaJitCreateBuildDirectoriesTarget(this, null);
            const pipeline = new TargetPipeline(initialConfigureTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    build() {
        return new Promise((resolve, reject) => {
            const initialBuildTarget = new LuaJitBuildTarget(this, null, this.configurationResult().getValue());
            const pipeline = new TargetPipeline(initialBuildTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    install() {
        return new Promise((resolve, reject) => {
            const initialInstallTarget = process.platform === 'win32' ?
                new LuaJitWindowsCreateInstallationDirectoriesTarget(this, null, this.buildResult().getValue()) :
                new LuaJitUnixInstall(this, null, this.buildResult().getValue());
            const pipeline = new TargetPipeline(initialInstallTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/LuaRocksVersion.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


const LATEST_LUAROCKS = "3.13.0";
const LUAROCKS_RELEASES_WINDOWS_X86 = {
    "3.9.1": { "filename": "luarocks-3.9.1-windows-32.zip", "version": "3.9.1", "hash": { "algorithm": "sha256", "value": "1b473fd3b9494cec31d98f7642babf12cc832551fd69fb7081e8baf4c54e0fa5" } },
    "3.9.2": { "filename": "luarocks-3.9.2-windows-32.zip", "version": "3.9.2", "hash": { "algorithm": "sha256", "value": "e7bf11b9f7d3942db806b3f57d7dfacbe4f7a5b558f3e200b061a1d6e1f62255" } },
    "3.10.0": { "filename": "luarocks-3.10.0-windows-32.zip", "version": "3.10.0", "hash": { "algorithm": "sha256", "value": "51058b21221dd96642de16d8d17967086761409c257c6d6bb32741dc2243ce84" } },
    "3.11.0": { "filename": "luarocks-3.11.0-windows-32.zip", "version": "3.11.0", "hash": { "algorithm": "sha256", "value": "64014ff939510614c5836b678f121b39a626f56bc5c88366ccbc130deacd1637" } },
    "3.11.1": { "filename": "luarocks-3.11.1-windows-32.zip", "version": "3.11.1", "hash": { "algorithm": "sha256", "value": "44c7034d720a3767df964683722bd303311db9dabed11773dafbfa96add2eda7" } },
    "3.12.0": { "filename": "luarocks-3.12.0-windows-32.zip", "version": "3.12.0", "hash": { "algorithm": "sha256", "value": "f70344d7e88102ebe12c1b2b5c153f2e32fcaf663a90d12fb6cc2b994054ffe0" } },
    "3.12.1": { "filename": "luarocks-3.12.1-windows-32.zip", "version": "3.12.1", "hash": { "algorithm": "sha256", "value": "bf73b9f3576f20d47aeeaa5bee5adac8b4cd7ec3bae8534906735b2bd34bba3e" } },
    "3.12.2": { "filename": "luarocks-3.12.2-windows-32.zip", "version": "3.12.2", "hash": { "algorithm": "sha256", "value": "514f8a9700a98ec11a48adc21bb3afa8a8443018640e3221e124834f056bf6f4" } },
    "3.13.0": { "filename": "luarocks-3.13.0-windows-32.zip", "version": "3.13.0", "hash": { "algorithm": "sha256", "value": "84b31cd1c870ee125d7b6ca0052d5c32305ee05d227222bb28a2fbf440ac66b9" } }
};
const LUAROCKS_RELEASES_WINDOWS_X64 = {
    "3.9.1": { "filename": "luarocks-3.9.1-windows-64.zip", "version": "3.9.1", "hash": { "algorithm": "sha256", "value": "f41218504c2c7a0335793cb5e0c0b2295972e261d38d21bdd4045a0c6fc1716d" } },
    "3.9.2": { "filename": "luarocks-3.9.2-windows-64.zip", "version": "3.9.2", "hash": { "algorithm": "sha256", "value": "ab7e34332eedd6270b97f44df462e4584d3a60377205d88ea2806ecc547f074f" } },
    "3.10.0": { "filename": "luarocks-3.10.0-windows-64.zip", "version": "3.10.0", "hash": { "algorithm": "sha256", "value": "fe0bc950187f67e22f237bc144e92a01993128749fd9adfc1764a6b4f4ca900d" } },
    "3.11.0": { "filename": "luarocks-3.11.0-windows-64.zip", "version": "3.11.0", "hash": { "algorithm": "sha256", "value": "a638ea4c8e858106e8e2598e50e9b3fd563c111b44c36d33fe0f0e64d9f42685" } },
    "3.11.1": { "filename": "luarocks-3.11.1-windows-64.zip", "version": "3.11.1", "hash": { "algorithm": "sha256", "value": "c71dba3d03e12305e9ccd022c621c8869aba3d124d9249e214aed5c16f3682a3" } },
    "3.12.0": { "filename": "luarocks-3.12.0-windows-64.zip", "version": "3.12.0", "hash": { "algorithm": "sha256", "value": "76aa3d4943e1d5204f311b232d6b6b72eb00027c54968643b5571d6ec56db57c" } },
    "3.12.1": { "filename": "luarocks-3.12.1-windows-64.zip", "version": "3.12.1", "hash": { "algorithm": "sha256", "value": "8106307ab7fd1a87cc4c6c7898b15231a35ed0353426e15eb0e060cd12ab34ad" } },
    "3.12.2": { "filename": "luarocks-3.12.2-windows-64.zip", "version": "3.12.2", "hash": { "algorithm": "sha256", "value": "d3f4ddda6926618cadf560170a7c18a5ceead5997ba10832cd0e3b624c7de886" } },
    "3.13.0": { "filename": "luarocks-3.13.0-windows-64.zip", "version": "3.13.0", "hash": { "algorithm": "sha256", "value": "0897ade5d459d55cd1962a948153745a6749feb345403c68aaa9207388557ab9" } }
};
const LUAROCKS_RELEASES_UNIX = {
    /*"3.0.0": { "filename": "luarocks-3.0.0.tar.gz", "version": "3.0.0", "hash": { "algorithm": "sha256", "value": "a43fffb997100f11cccb529a3db5456ce8dab18171a5cb3645f948147b6f64a1" } },
    "3.0.1": { "filename": "luarocks-3.0.1.tar.gz", "version": "3.0.1", "hash": { "algorithm": "sha256", "value": "b989c4b60d6c9edcd65169e5e42fcffbd39cdbebe6b138fa5aea45102f8d9ec0" } },
    "3.0.2": { "filename": "luarocks-3.0.2.tar.gz", "version": "3.0.2", "hash": { "algorithm": "sha256", "value": "3836267eff2f85fb552234e966602b1e649c58f81f47c7de3785e071c8127f5a" } },
    "3.0.3": { "filename": "luarocks-3.0.3.tar.gz", "version": "3.0.3", "hash": { "algorithm": "sha256", "value": "f9a3fca236c87db55bc128a182ff605731ca15b43b1c4942d98f5e34acc88a6e" } },
    "3.0.4": { "filename": "luarocks-3.0.4.tar.gz", "version": "3.0.4", "hash": { "algorithm": "sha256", "value": "1236a307ca5c556c4fed9fdbd35a7e0e80ccf063024becc8c3bf212f37ff0edf" } },
    "3.1.0": { "filename": "luarocks-3.1.0.tar.gz", "version": "3.1.0", "hash": { "algorithm": "sha256", "value": "865eae1e49b0f701c955c1c8f7b6fae99287c9cef32227d64177509224908921" } },
    "3.1.1": { "filename": "luarocks-3.1.1.tar.gz", "version": "3.1.1", "hash": { "algorithm": "sha256", "value": "3c26c102f8e69f81e12ea39037c770a00b6244e115a4c832e7a92feffdfad1aa" } },
    "3.1.2": { "filename": "luarocks-3.1.2.tar.gz", "version": "3.1.2", "hash": { "algorithm": "sha256", "value": "72a3b74f05b7fd011eed894dc34193ee80b3235fe58016ac9ffdbfceecc88950" } },
    "3.1.3": { "filename": "luarocks-3.1.3.tar.gz", "version": "3.1.3", "hash": { "algorithm": "sha256", "value": "c573435f495aac159e34eaa0a3847172a2298eb6295fcdc35d565f9f9b990513" } },
    "3.2.0": { "filename": "luarocks-3.2.0.tar.gz", "version": "3.2.0", "hash": { "algorithm": "sha256", "value": "66c1848a25924917ddc1901e865add8f19f2585360c44a001a03a8c234d3e796" } },
    "3.2.1": { "filename": "luarocks-3.2.1.tar.gz", "version": "3.2.1", "hash": { "algorithm": "sha256", "value": "f27e20c9cdb3ffb991ccdb85796c36a0690566676f8e1a59b0d0ee6598907d04" } },
    "3.3.0": { "filename": "luarocks-3.3.0.tar.gz", "version": "3.3.0", "hash": { "algorithm": "sha256", "value": "8de54eb851f5245ed3708d94d8872e825b9704049d3ad4febe8e219f419b427d" } },
    "3.3.1": { "filename": "luarocks-3.3.1.tar.gz", "version": "3.3.1", "hash": { "algorithm": "sha256", "value": "eb20cd9814df05535d9aae98da532217c590fc07d48d90ca237e2a7cdcf284fe" } },
    "3.4.0": { "filename": "luarocks-3.4.0.tar.gz", "version": "3.4.0", "hash": { "algorithm": "sha256", "value": "62ce5826f0eeeb760d884ea8330cd1552b5d432138b8bade0fa72f35badd02d0" } },
    "3.5.0": { "filename": "luarocks-3.5.0.tar.gz", "version": "3.5.0", "hash": { "algorithm": "sha256", "value": "701d0cc0c7e97cc2cf2c2f4068fce45e52a8854f5dc6c9e49e2014202eec9a4f" } },
    "3.6.0": { "filename": "luarocks-3.6.0.tar.gz", "version": "3.6.0", "hash": { "algorithm": "sha256", "value": "b0eaf59e7711ca2a886722c0423dabe22ccbdcdf3a042c3f2615596879f8252f" } },
    "3.7.0": { "filename": "luarocks-3.7.0.tar.gz", "version": "3.7.0", "hash": { "algorithm": "sha256", "value": "9255d97fee95cec5b54fc6ac718b11bf5029e45bed7873e053314919cd448551" } },
    "3.8.0": { "filename": "luarocks-3.8.0.tar.gz", "version": "3.8.0", "hash": { "algorithm": "sha256", "value": "56ab9b90f5acbc42eb7a94cf482e6c058a63e8a1effdf572b8b2a6323a06d923" } },
    "3.9.0": { "filename": "luarocks-3.9.0.tar.gz", "version": "3.9.0", "hash": { "algorithm": "sha256", "value": "5e840f0224891de96be4139e9475d3b1de7af3a32b95c1bdf05394563c60175f" } },
    */ "3.9.1": { "filename": "luarocks-3.9.1.tar.gz", "version": "3.9.1", "hash": { "algorithm": "sha256", "value": "ffafd83b1c42aa38042166a59ac3b618c838ce4e63f4ace9d961a5679ef58253" } },
    "3.9.2": { "filename": "luarocks-3.9.2.tar.gz", "version": "3.9.2", "hash": { "algorithm": "sha256", "value": "bca6e4ecc02c203e070acdb5f586045d45c078896f6236eb46aa33ccd9b94edb" } },
    "3.10.0": { "filename": "luarocks-3.10.0.tar.gz", "version": "3.10.0", "hash": { "algorithm": "sha256", "value": "e9bf06d5ec6b8ecc6dbd1530d2d77bdb3377d814a197c46388e9f148548c1c89" } },
    "3.11.0": { "filename": "luarocks-3.11.0.tar.gz", "version": "3.11.0", "hash": { "algorithm": "sha256", "value": "25f56b3c7272fb35b869049371d649a1bbe668a56d24df0a66e3712e35dd44a6" } },
    "3.11.1": { "filename": "luarocks-3.11.1.tar.gz", "version": "3.11.1", "hash": { "algorithm": "sha256", "value": "c3fb3d960dffb2b2fe9de7e3cb004dc4d0b34bb3d342578af84f84325c669102" } },
    "3.12.0": { "filename": "luarocks-3.12.0.tar.gz", "version": "3.12.0", "hash": { "algorithm": "sha256", "value": "3d4c8acddf9b975e77da68cbf748d5baf483d0b6e9d703a844882db25dd61cdf" } },
    "3.12.1": { "filename": "luarocks-3.12.1.tar.gz", "version": "3.12.1", "hash": { "algorithm": "sha256", "value": "f56b85a2a7a481f0321845807b79a05237860b04e4a9d186da632770029b3290" } },
    "3.12.2": { "filename": "luarocks-3.12.2.tar.gz", "version": "3.12.2", "hash": { "algorithm": "sha256", "value": "b0e0c85205841ddd7be485f53d6125766d18a81d226588d2366931e9a1484492" } },
    "3.13.0": { "filename": "luarocks-3.13.0.tar.gz", "version": "3.13.0", "hash": { "algorithm": "sha256", "value": "245bf6ec560c042cb8948e3d661189292587c5949104677f1eecddc54dbe7e37" } }
};
function parseLuaRocksVersion(version) {
    return new Promise((resolve, reject) => {
        const luaRocksVersion = version === "" ? LATEST_LUAROCKS : version;
        if (luaRocksVersion === "none") {
            resolve(undefined);
        }
        else if (process.platform === 'win32' && !isCygwin()) {
            const osArch = (0,external_node_os_namespaceObject.arch)();
            if (osArch === 'ia32' || osArch === 'arm64') {
                if (luaRocksVersion in LUAROCKS_RELEASES_WINDOWS_X86) {
                    const zipInfo = LUAROCKS_RELEASES_WINDOWS_X86[luaRocksVersion];
                    const downloadUrl = "https://luarocks.github.io/luarocks/releases/" + zipInfo.filename;
                    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(luaRocksVersion);
                    if (match) {
                        const major = Number(match[1]);
                        const minor = Number(match[2]);
                        const patch = Number(match[3]);
                        const hash = zipInfo.hash;
                        resolve(new LuaRocksReleaseVersion(major, minor, patch, downloadUrl, hash.algorithm, hash.value));
                    }
                    else {
                        reject(new Error("Internal error: regex mismatch for a LuaRocks release version"));
                    }
                }
                else {
                    reject(new Error("LuaRocks version is too old"));
                }
            }
            else if (osArch === 'x64') {
                if (luaRocksVersion in LUAROCKS_RELEASES_WINDOWS_X64) {
                    const zipInfo = LUAROCKS_RELEASES_WINDOWS_X64[luaRocksVersion];
                    const downloadUrl = "https://luarocks.github.io/luarocks/releases/" + zipInfo.filename;
                    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(luaRocksVersion);
                    if (match) {
                        const major = Number(match[1]);
                        const minor = Number(match[2]);
                        const patch = Number(match[3]);
                        const hash = zipInfo.hash;
                        resolve(new LuaRocksReleaseVersion(major, minor, patch, downloadUrl, hash.algorithm, hash.value));
                    }
                    else {
                        reject(new Error("Internal error: regex mismatch for a LuaRocks release version"));
                    }
                }
                else {
                    reject(new Error("LuaRocks version is too old"));
                }
            }
            else {
                reject(new Error("Unsupported architecture to install LuaRocks on Windows"));
            }
        }
        else if (luaRocksVersion.startsWith("@")) {
            const ref = luaRocksVersion.substring(1);
            const downloadUrl = `https://github.com/luarocks/luarocks/archive/${ref}.tar.gz`;
            resolve(new LuaRocksRepositoryVersion(ref, downloadUrl));
        }
        else if (luaRocksVersion in LUAROCKS_RELEASES_UNIX) {
            const tarballInfo = LUAROCKS_RELEASES_UNIX[luaRocksVersion];
            const downloadUrl = "https://luarocks.github.io/luarocks/releases/" + tarballInfo.filename;
            const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(luaRocksVersion);
            if (match) {
                const major = Number(match[1]);
                const minor = Number(match[2]);
                const patch = Number(match[3]);
                const hash = tarballInfo.hash;
                resolve(new LuaRocksReleaseVersion(major, minor, patch, downloadUrl, hash.algorithm, hash.value));
            }
            else {
                reject(new Error("Internal error: regex mismatch for a LuaRocks release version"));
            }
        }
        else {
            reject(new Error("Unknown LuaRocks version to install on Unix-like systems"));
        }
    });
}
class LuaRocksBaseVersion {
    getIdentifier() {
        return this.identifier;
    }
    getDownloadUrl() {
        return this.downloadUrl;
    }
    constructor(identifier, downloadUrl) {
        this.identifier = identifier;
        this.downloadUrl = downloadUrl;
    }
}
class LuaRocksReleaseVersion extends LuaRocksBaseVersion {
    getMajor() {
        return this.major;
    }
    getMinor() {
        return this.minor;
    }
    getPatch() {
        return this.patch;
    }
    getHashAlgorithm() {
        return this.hashAlgorithm;
    }
    getHashValue() {
        return this.hashValue;
    }
    constructor(major, minor, patch, downloadUrl, hashAlgorithm, hashValue) {
        super(`${major}.${minor}.${patch}`, downloadUrl);
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.hashAlgorithm = hashAlgorithm;
        this.hashValue = hashValue;
    }
}
class LuaRocksRepositoryVersion extends LuaRocksBaseVersion {
    constructor(identifier, downloadUrl) {
        super(identifier, downloadUrl);
    }
}

;// CONCATENATED MODULE: ./src/Util/Find7z.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



function find7zInstallDir() {
    return new Promise((resolve, reject) => {
        windowsRegQuery("HKEY_LOCAL_MACHINE\\SOFTWARE\\7-Zip")
            .then(lines => {
            if (lines.length > 0) {
                let i = 0;
                let sevenZipPath = undefined;
                while (!sevenZipPath && i < lines.length) {
                    const match = /\s*Path\s+REG_SZ\s+(.*)(\r\n|\r|\n)?/i.exec(lines[i]);
                    if (match) {
                        const path = match[1].trim();
                        sevenZipPath = path;
                    }
                    i++;
                }
                if (sevenZipPath) {
                    resolve(sevenZipPath);
                }
                else {
                    reject(new Error("Unable to find 7-Zip installation path"));
                }
            }
            else {
                reject(new Error("7-Zip installation directory was not set"));
            }
        })
            .catch(err => {
            reject(new Error("Unable to query 7-Zip installation path"));
        });
    });
}
function find7z() {
    return new Promise((resolve, reject) => {
        find7zInstallDir()
            .then(sevenZipInstallDir => {
            const sevenZip = (0,external_node_path_namespaceObject.join)(sevenZipInstallDir, "7z.exe");
            checkFiles([sevenZip])
                .then(() => {
                resolve(sevenZip);
            })
                .catch(reject);
        })
            .catch(reject);
    });
}

;// CONCATENATED MODULE: ./src/Util/ExtractZip.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






function cscriptUnzip(archive, destDir) {
    return new Promise((resolve, reject) => {
        (0,promises_namespaceObject.mkdtemp)((0,external_node_path_namespaceObject.join)(destDir, "unzip-"))
            .then(scriptDir => {
            const unzipScript = [
                "function print(value) { WScript.Echo(value); }",
                "function exit(value) { WScript.Quit(value); }",
                "var argv = WScript.Arguments;",
                "var shell = new ActiveXObject('shell.application');",
                "var fs = new ActiveXObject('scripting.filesystemobject');",
                "var archive = argv.Named('archive');",
                "if (!archive) { print('archive not set'); exit(1); }",
                "if (!fs.FileExists(archive)) { print('archive not found'); exit(1); }",
                "if (archive.length < 4 || archive.substring(archive.length - 4) !== '.zip') { print('archive is not a .zip'); exit(1); }",
                "var destDir = argv.Named('destdir');",
                "if (!destDir) { print('destination directory not set'); exit(1); }",
                "if (!fs.FolderExists(destDir)) { fs.CreateFolder(destDir); }",
                "var shZip = shell.NameSpace(archive);",
                "var shDestDir = shell.NameSpace(destDir);",
                "shDestDir.CopyHere(shZip.Items(), 16 | 256);"
            ];
            const scriptContent = unzipScript.join(" ");
            const unzipJs = (0,external_node_path_namespaceObject.join)(scriptDir, "unzip.js");
            (0,promises_namespaceObject.writeFile)(unzipJs, scriptContent)
                .then(() => {
                executeProcess("cscript", {
                    args: [
                        unzipJs,
                        "/nologo",
                        "/e:JScript",
                        `/archive:${archive}`,
                        `/destdir:${destDir}`
                    ],
                    verbose: true
                })
                    .then(resolve)
                    .catch(reject);
            })
                .catch(reject);
        })
            .catch(reject);
    });
}
function powershellExpandArchive() {
    return new Promise((resolve, reject) => {
        const programs = ["powershell", "pwsh"];
        const len = programs.length;
        const program_iter = (i) => {
            if (i < len) {
                const powershell = programs[i];
                executeProcess(powershell, {
                    args: ["-Command", "Get-Command Expand-Archive"],
                })
                    .then(code => {
                    resolve(powershell);
                })
                    .catch(() => {
                    program_iter(i + 1);
                });
            }
            else {
                reject(new Error("Unable to find a powershell instance capable of extracting zip files."));
            }
        };
        program_iter(0);
    });
}
function findGitUnzipPath() {
    return new Promise((resolve, reject) => {
        findGitForWindowsInstallDir()
            .then(gitInstallDir => {
            const gitUnzip = (0,external_node_path_namespaceObject.join)(gitInstallDir, "usr", "bin", "unzip.exe");
            checkFiles([gitUnzip])
                .then(() => {
                resolve(gitUnzip);
            })
                .catch(reject);
        })
            .catch(reject);
    });
}
function extractZip(path, opts) {
    return new Promise((resolve, reject) => {
        const dir = opts && opts.cwd ? opts.cwd : process.cwd();
        if (process.platform === 'win32') {
            cscriptUnzip(path, dir)
                .then(resolve)
                .catch(cscriptErr => {
                powershellExpandArchive()
                    .then(powershell => {
                    executeProcess(powershell, { args: [
                            "-Command",
                            `\$ProgressPreference = 'SilentlyContinue'; Expand-Archive -Path '${path.replace(/'/g, "''")}' -DestinationPath '${dir.replace(/'/g, "''")}'`
                        ], verbose: opts === null || opts === void 0 ? void 0 : opts.verbose })
                        .then(code => {
                        resolve(code);
                    })
                        .catch(reject);
                })
                    .catch(powershellErr => {
                    findGitUnzipPath()
                        .then(gitUnzip => {
                        executeProcess(gitUnzip, { cwd: dir, args: [path.replace(/\\/g, "/")], verbose: opts === null || opts === void 0 ? void 0 : opts.verbose })
                            .then(code => {
                            resolve(code);
                        })
                            .catch(reject);
                    })
                        .catch(gitUnzipErr => {
                        find7z()
                            .then(sevenZip => {
                            executeProcess(sevenZip, { args: ["-aoa", `-o${dir}`, "x", path], verbose: opts === null || opts === void 0 ? void 0 : opts.verbose })
                                .then(code => {
                                resolve(code);
                            })
                                .catch(reject);
                        })
                            .catch(sevenZipErr => {
                            reject(new Error("You must install the latest PowerShell, Git For Windows or 7-Zip to unzip files"));
                        });
                    });
                });
            });
        }
        else {
            executeProcess("unzip", { cwd: dir, args: [path] })
                .then(code => {
                resolve(code);
            })
                .catch(reject);
        }
    });
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksSourcesInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class LuaRocksWindowsSourcesInfoDetails {
    getLuaRocks() {
        return this.luarocks;
    }
    getLuaRocksAdmin() {
        return this.luarocksAdmin;
    }
    constructor(luarocks, luarocksAdmin) {
        this.luarocks = luarocks;
        this.luarocksAdmin = luarocksAdmin;
    }
}
class LuaRocksUnixSourcesInfoDetails {
    getConfigureScript() {
        return this.configureScript;
    }
    constructor(configureScript) {
        this.configureScript = configureScript;
    }
}
class LuaRocksCygwinUnixSourcesInfoDetails extends LuaRocksUnixSourcesInfoDetails {
    constructor(bash, cygpath, dir, configureScript, installDir) {
        super(configureScript.getWindowsPath());
        this.bash = bash;
        this.cygpath = cygpath;
        this.dirPath = dir;
        this.configureScriptPath = configureScript;
        this.installDirPath = installDir;
    }
    getBash() {
        return this.bash;
    }
    getCygpath() {
        return this.cygpath;
    }
    getDirPath() {
        return this.dirPath;
    }
    getConfigureScriptPath() {
        return this.configureScriptPath;
    }
    getInstallDirPath() {
        return this.installDirPath;
    }
}
class LuaRocksSourcesInfo {
    constructor(dir, details) {
        this.dir = dir;
        this.details = details;
    }
    getDir() {
        return this.dir;
    }
    getDetails() {
        return this.details;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksFinishConfigurationTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


class LuaRocksFinishConfigurationTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish LuaRocks ${this.project.getVersion().getIdentifier()} configuration`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            const srcInfo = (this.project.configurationResult().getValue());
            Console.instance().writeLine(`[Directory] ${srcInfo.getDir()}`);
            const details = srcInfo.getDetails();
            if (details instanceof LuaRocksWindowsSourcesInfoDetails) {
                Console.instance().writeLine(`[LuaRocks] ${details.getLuaRocks()}`);
                Console.instance().writeLine(`[LuaRocks admin] ${details.getLuaRocksAdmin()}`);
            }
            else {
                Console.instance().writeLine(`[Configure script] ${details.getConfigureScript()}`);
            }
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish LuaRocks ${this.project.getVersion().getIdentifier()} configuration`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksConfigureSourcesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class LuaRocksConfigureSourcesTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Configure LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaRocksFinishConfigurationTarget(this.project, this);
    }
    setConfigurationResult() {
        this.project.configurationResult()
            .setValue(this.parent.getLuaRocksSourcesInfo());
    }
    execute() {
        return new Promise((resolve, reject) => {
            const luaInstallation = this.project.getLuaInstallation();
            const interpreter = (0,external_node_path_namespaceObject.basename)(luaInstallation.getLuaInterpreter());
            const luaShortVersion = luaInstallation.getLuaShortVersion();
            const cygwin = isCygwin();
            if (process.platform === 'win32' && !cygwin) {
                this.setConfigurationResult();
                resolve();
            }
            else {
                const sourcesInfo = this.parent.getLuaRocksSourcesInfo();
                const details = sourcesInfo.getDetails();
                if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                    const dirUnix = details.getDirPath().getUnixPath();
                    const configureScriptUnix = details.getConfigureScriptPath().getUnixPath();
                    const installDirUnix = details.getInstallDirPath().getUnixPath();
                    executeProcess(details.getBash(), {
                        args: [
                            "-lc",
                            `cd '${dirUnix}' && '${configureScriptUnix}' '--prefix=${installDirUnix}' '--lua-version=${luaShortVersion}' '--with-lua=${installDirUnix}' '--with-lua-interpreter=${interpreter}'`,
                        ],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                        this.setConfigurationResult();
                        resolve();
                    })
                        .catch(reject);
                }
                else if (details instanceof LuaRocksUnixSourcesInfoDetails) {
                    const installDir = this.project.getInstallDir();
                    executeProcess(details.getConfigureScript(), {
                        cwd: sourcesInfo.getDir(),
                        args: [
                            `--prefix=${installDir}`,
                            `--lua-version=${luaShortVersion}`,
                            `--with-lua=${installDir}`,
                            `--with-lua-interpreter=${interpreter}`
                        ],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                        this.setConfigurationResult();
                        resolve();
                    })
                        .catch(reject);
                }
                else {
                    reject(new Error("Internal error: unexpected LuaRocks sources info details for Unix systems"));
                }
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Configure LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Util/StringReplaceAll.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function replaceAll(input, target, replacement) {
    const l = input.length;
    const tl = target.length;
    const tokens = [];
    if (l > 0) {
        let i = 0;
        let s = 0;
        while (i < l) {
            if (input.startsWith(target, i)) {
                tokens.push(input.substring(s, i));
                tokens.push(replacement);
                i += tl;
                s = i;
            }
            else {
                i++;
            }
        }
        tokens.push(input.substring(s));
    }
    return tokens.join("");
}

;// CONCATENATED MODULE: ./src/Util/ReplaceInFile.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


function replaceFirst(input, targetStr, replacementStr) {
    return input.replace(targetStr, replacementStr);
}
function replacementInFile(callback, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding) {
    return new Promise((resolve, reject) => {
        (0,promises_namespaceObject.readFile)(filePath, { encoding: encoding })
            .then(content => {
            if (numberOfLinesToSkip === 0) {
                const newContent = callback(content.toString(), targetStr, replacementStr);
                (0,promises_namespaceObject.writeFile)(filePath, newContent, { encoding: encoding })
                    .then(resolve)
                    .catch(reject);
            }
            else {
                const s = content.toString();
                const rgx = /\r?\n/g;
                let match;
                let foundStart = false;
                let i = 0;
                let index = 0;
                while (!foundStart && (match = rgx.exec(s)) != null) {
                    index = match.index + match[0].length;
                    i++;
                    foundStart = i == numberOfLinesToSkip;
                }
                if (foundStart) {
                    const newContent = s.substring(0, index) + callback(s.substring(index), targetStr, replacementStr);
                    (0,promises_namespaceObject.writeFile)(filePath, newContent, { encoding: encoding })
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    resolve();
                }
            }
        })
            .catch(reject);
    });
}
function replaceFirstInFile(filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding) {
    return replacementInFile(replaceFirst, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding);
}
function replaceAllInFile(filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding) {
    return replacementInFile(replaceAll, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding);
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksApplyPatchesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/











class LuaRocksApplyPatchesTarget extends AbstractApplyPatchesTarget {
    constructor(project, parent) {
        super(project, parent, parent.getLuaRocksSourcesInfo().getDir(), project.getRemotePatchesBuildDir(), ToolchainEnvironmentVariables.instance().getLuaRocksPatches());
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Apply patches on LuaRocks ${this.getProject().getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getLuaRocksSourcesInfo() {
        return this.getParent().getLuaRocksSourcesInfo();
    }
    getNext() {
        return new LuaRocksConfigureSourcesTarget(this.getProject(), this);
    }
    cygwinEnsureMsys2MinGWw64FsLuaFile(srcDir) {
        return new Promise((resolve, reject) => {
            const msysFsPath = (0,external_node_path_namespaceObject.join)(srcDir, "src", "luarocks", "fs", "msys2_mingw_w64.lua");
            checkFiles([msysFsPath])
                .then(resolve)
                .catch(err => {
                (0,promises_namespaceObject.writeFile)(msysFsPath, [
                    "local msys2_tools = {}",
                    "",
                    "local fs = require(\"luarocks.fs\")",
                    "",
                    "local unix_tools = require(\"luarocks.fs.unix.tools\")",
                    "",
                    "local function uncompress(default_ext, program, infile, outfile)",
                    "   assert(type(infile) == \"string\")",
                    "   assert(outfile == nil or type(outfile) == \"string\")",
                    "   if not outfile then",
                    "      outfile = infile:gsub(\"%.\"..default_ext..\"$\", \"\")",
                    "   end",
                    "   if fs.execute(fs.Q(program)..\" -d -c \"..fs.Q(infile)..\" > \"..fs.Q(outfile)) then",
                    "      return true",
                    "   else",
                    "      return nil, \"failed extracting \" .. infile",
                    "   end",
                    "end",
                    "",
                    "--- Uncompresses a .gz file.",
                    "-- @param infile string: pathname of .gz file to be extracted.",
                    "-- @param outfile string or nil: pathname of output file to be produced.",
                    "-- If not given, name is derived from input file.",
                    "-- @return boolean: true on success; nil and error message on failure.",
                    "function msys2_tools.gunzip(infile, outfile)",
                    "   return uncompress(\"gz\", \"gzip\", infile, outfile)",
                    "end",
                    "",
                    "--- Uncompresses a .bz2 file.",
                    "-- @param infile string: pathname of .bz2 file to be extracted.",
                    "-- @param outfile string or nil: pathname of output file to be produced.",
                    "-- If not given, name is derived from input file.",
                    "-- @return boolean: true on success; nil and error message on failure.",
                    "function msys2_tools.bunzip2(infile, outfile)",
                    "   return uncompress(\"bz2\", \"bzip2\", infile, outfile)",
                    "end",
                    "",
                    "msys2_tools.zip = unix_tools.zip",
                    "msys2_tools.unzip = unix_tools.unzip",
                    "msys2_tools.copy_contents = unix_tools.copy_contents",
                    "",
                    "return msys2_tools"
                ].join(external_node_os_namespaceObject.EOL))
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
    getLuaRocksPersistPath(srcDir) {
        return (0,external_node_path_namespaceObject.join)(srcDir, "src", "luarocks", "persist.lua");
    }
    getLuaRocksGnumakefilePath(srcDir) {
        return (0,external_node_path_namespaceObject.join)(srcDir, "GNUmakefile");
    }
    getLuaRocksCoreCfgFilePath(srcDir) {
        return (0,external_node_path_namespaceObject.join)(srcDir, "src", "luarocks", "core", "cfg.lua");
    }
    cygwinReadLuaRocksVersionFromCoreCfg(cfgPath) {
        return new Promise((resolve, reject) => {
            (0,promises_namespaceObject.readFile)(cfgPath, { encoding: "utf-8" })
                .then(content => {
                const match = /local program_version \= "([0-9]+\.[0-9]+\.[0-9]+)"/.exec(content);
                if (match) {
                    resolve(match[1]);
                }
                else {
                    reject(new Error(`Failed to find LuaRocks version on "${cfgPath}" file`));
                }
            })
                .catch(reject);
        });
    }
    cygwinPatchLuaRocksPersist(persistPath, luaRocksVersion) {
        return new Promise((resolve, reject) => {
            switch (luaRocksVersion) {
                case "3.9.1": {
                    const targetStr = [
                        "-- @return boolean or (nil, string): true if successful, or nil and a",
                        "-- message in case of errors.",
                        "function persist.save_from_table(filename, tbl, field_order)",
                        "   local out = io.open(filename, \"w\")",
                        "   if not out then",
                        "      return nil, \"Cannot create file at \"..filename",
                        "   end",
                        "   local ok, err = write_table_as_assignments(out, tbl, field_order)",
                        "   out:close()",
                        "   if not ok then",
                        "      return nil, err",
                        "   end",
                        "   return true",
                        "end"
                    ].join("\n");
                    const replacementStr = [
                        "-- @return boolean or (nil, string): true if successful, or nil and a",
                        "-- message in case of errors.",
                        "function persist.save_from_table(filename, tbl, field_order)",
                        "   local prefix = dir.dir_name(filename)",
                        "   fs.make_dir(prefix)",
                        "   local out = io.open(filename, \"w\")",
                        "   if not out then",
                        "      return nil, \"Cannot create file at \"..filename",
                        "   end",
                        "   local ok, err = write_table_as_assignments(out, tbl, field_order)",
                        "   out:close()",
                        "   if not ok then",
                        "      return nil, err",
                        "   end",
                        "   return true",
                        "end"
                    ].join("\n");
                    replaceFirstInFile(persistPath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                default: {
                    resolve();
                    break;
                }
            }
        });
    }
    cygwinPatchGNUmakefile(makefilePath, luaRocksVersion) {
        return new Promise((resolve, reject) => {
            switch (luaRocksVersion) {
                case "3.9.1":
                case "3.9.2":
                case "3.10.0": {
                    const targetStr = [
                        "",
                        "# ----------------------------------------",
                        "# Base build",
                        "# ----------------------------------------",
                        "",
                        "build: luarocks luarocks-admin $(builddir)/luarocks $(builddir)/luarocks-admin",
                        "",
                        "config.unix:",
                        "	@echo Please run the \"./configure\" script before building.",
                        "	@echo",
                        "	@exit 1",
                        ""
                    ].join("\n");
                    const replacementStr = [
                        "",
                        "# ----------------------------------------",
                        "# Base build",
                        "# ----------------------------------------",
                        "",
                        "build: config.unix $(builddir)/config-$(LUA_VERSION).lua $(builddir)/luarocks $(builddir)/luarocks-admin",
                        "",
                        "config.unix:",
                        "	@echo Please run the \"./configure\" script before building.",
                        "	@echo",
                        "	@exit 1",
                        ""
                    ].join("\n");
                    replaceFirstInFile(makefilePath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                default: {
                    resolve();
                    break;
                }
            }
        });
    }
    cygwinPatchCoreCfg(cfgPath, luaRocksVersion) {
        return new Promise((resolve, reject) => {
            switch (luaRocksVersion) {
                case "3.9.1":
                case "3.9.2": {
                    const targetStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and hardcoded.WIN_TOOLS then",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. hardcoded.WIN_TOOLS .. \"/\" .. defaults.variables[tool] .. \'.exe\"\'",
                        "      end",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");
                    const replacementStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and not platforms.msys2_mingw_w64 and hardcoded.WIN_TOOLS then",
                        "      local dir = require(\"luarocks.core.dir\")",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. dir.path(hardcoded.WIN_TOOLS, defaults.variables[tool] .. \'.exe\') .. \'\"\'",
                        "      end",
                        "   elseif platforms.msys2_mingw_w64 then",
                        "      defaults.fs_use_modules = false",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");
                    replaceFirstInFile(cfgPath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                case "3.10.0":
                case "3.11.0":
                case "3.11.1": {
                    const targetStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and hardcoded.WIN_TOOLS then",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. dir.path(hardcoded.WIN_TOOLS, defaults.variables[tool] .. \'.exe\') .. \'\"\'",
                        "      end",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");
                    const replacementStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and not platforms.msys2_mingw_w64 and hardcoded.WIN_TOOLS then",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. dir.path(hardcoded.WIN_TOOLS, defaults.variables[tool] .. \'.exe\') .. \'\"\'",
                        "      end",
                        "   elseif platforms.msys2_mingw_w64 then",
                        "      defaults.fs_use_modules = false",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");
                    replaceFirstInFile(cfgPath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                default: {
                    resolve();
                    break;
                }
            }
        });
    }
    execute() {
        return new Promise((resolve, reject) => {
            const sourcesInfo = this.getLuaRocksSourcesInfo();
            const details = sourcesInfo.getDetails();
            if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                super.execute()
                    .then(() => {
                    const srcDir = sourcesInfo.getDir();
                    const cfgPath = this.getLuaRocksCoreCfgFilePath(srcDir);
                    const GNUmakefilePath = this.getLuaRocksGnumakefilePath(srcDir);
                    checkFiles([cfgPath, GNUmakefilePath])
                        .then(() => {
                        this.cygwinReadLuaRocksVersionFromCoreCfg(cfgPath)
                            .then(luaRocksVersion => {
                            const patches = [
                                () => this.cygwinEnsureMsys2MinGWw64FsLuaFile(srcDir),
                                () => this.cygwinPatchCoreCfg(cfgPath, luaRocksVersion),
                                () => this.cygwinPatchGNUmakefile(GNUmakefilePath, luaRocksVersion)
                            ];
                            if (luaRocksVersion === "3.9.1") {
                                const persistPath = this.getLuaRocksPersistPath(srcDir);
                                patches.push(() => checkFiles([persistPath]));
                                patches.push(() => this.cygwinPatchLuaRocksPersist(persistPath, luaRocksVersion));
                            }
                            sequentialPromises(patches)
                                .then(_ => {
                                resolve();
                            })
                                .catch(reject);
                        })
                            .catch(reject);
                    })
                        .catch(reject);
                })
                    .catch(reject);
            }
            else {
                super.execute()
                    .then(resolve)
                    .catch(reject);
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Apply patches on LuaRocks ${this.getProject().getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/CygwinFileSystemPath.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class CygwinFileSystemPath {
    getWindowsPath() {
        return this.windowsPath;
    }
    getUnixPath() {
        return this.unixPath;
    }
    constructor(windowsPath, unixPath) {
        this.windowsPath = windowsPath;
        this.unixPath = unixPath;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksFetchTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/















class LuaRocksFetchTarget extends AbstractFetchCompressedTarget {
    constructor(project, parent) {
        super(project.getVersion().getDownloadUrl(), project.getBuildDir(), project.getVersion() instanceof LuaRocksReleaseVersion ? `luarocks-${project.getVersion().getIdentifier()}` : null, (0,external_node_path_namespaceObject.extname)((0,external_node_path_namespaceObject.basename)(project.getVersion().getDownloadUrl())) === ".zip" ? extractZip : extractTarGz, project.getVersion() instanceof LuaRocksReleaseVersion ? {
            fileHash: {
                algorithm: project.getVersion().getHashAlgorithm(),
                expectedHash: project.getVersion().getHashValue()
            }
        } : undefined);
        this.project = project;
        this.parent = parent;
        this.luaRocksSourcesInfo = undefined;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Fetch LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaRocksApplyPatchesTarget(this.project, this);
    }
    getLuaRocksSourcesInfo() {
        return this.luaRocksSourcesInfo;
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.luaRocksSourcesInfo = undefined;
            super.execute()
                .then(() => {
                const workDir = this.getWorkDir();
                const filename = (0,external_node_path_namespaceObject.basename)(this.project.getVersion().getDownloadUrl());
                if (process.platform === 'win32' && !isCygwin()) {
                    const extension = (0,external_node_path_namespaceObject.extname)(filename);
                    if (extension === ".zip") {
                        const extractedDir = filename.substring(0, filename.length - extension.length);
                        const luarocks = (0,external_node_path_namespaceObject.join)(workDir, extractedDir, "luarocks.exe");
                        const luarocksAdmin = (0,external_node_path_namespaceObject.join)(workDir, extractedDir, "luarocks-admin.exe");
                        checkFiles([luarocks, luarocksAdmin])
                            .then(() => {
                            this.luaRocksSourcesInfo = new LuaRocksSourcesInfo(extractedDir, new LuaRocksWindowsSourcesInfoDetails(luarocks, luarocksAdmin));
                            resolve();
                        })
                            .catch(reject);
                    }
                    else {
                        reject(new Error(".zip extension expected"));
                    }
                }
                else {
                    (0,promises_namespaceObject.readdir)(workDir, { recursive: false })
                        .then(items => {
                        const len = items.length;
                        const dirItem_iter = (i) => {
                            if (i < len) {
                                const dirItem = items[i];
                                if (dirItem.startsWith("luarocks-")) {
                                    const extractedDir = (0,external_node_path_namespaceObject.join)(workDir, dirItem);
                                    (0,promises_namespaceObject.stat)(extractedDir)
                                        .then(s => {
                                        if (s.isDirectory()) {
                                            const configureScript = (0,external_node_path_namespaceObject.join)(extractedDir, "configure");
                                            (0,promises_namespaceObject.stat)(configureScript)
                                                .then(configureScriptStat => {
                                                if (configureScriptStat.isFile()) {
                                                    if (isCygwin()) {
                                                        getCygpathFromCygwin()
                                                            .then(cygPath => {
                                                            const installDir = this.project.getInstallDir();
                                                            sequentialPromises([
                                                                () => getFirstLineFromProcessExecution(cygPath, ["-w", "/usr/bin/bash.exe"], true),
                                                                () => getFirstLineFromProcessExecution(cygPath, ["-u", extractedDir], true),
                                                                () => getFirstLineFromProcessExecution(cygPath, ["-u", configureScript], true),
                                                                () => getFirstLineFromProcessExecution(cygPath, ["-u", installDir], true)
                                                            ])
                                                                .then(paths => {
                                                                const bash = paths[0];
                                                                checkFiles([bash])
                                                                    .then(() => {
                                                                    const extractedDirUnix = paths[1];
                                                                    const configureScriptUnix = paths[2];
                                                                    const installDirUnix = paths[3];
                                                                    this.luaRocksSourcesInfo = new LuaRocksSourcesInfo(extractedDir, new LuaRocksCygwinUnixSourcesInfoDetails(bash, cygPath, new CygwinFileSystemPath(extractedDir, extractedDirUnix), new CygwinFileSystemPath(configureScript, configureScriptUnix), new CygwinFileSystemPath(installDir, installDirUnix)));
                                                                    resolve();
                                                                })
                                                                    .catch(reject);
                                                            })
                                                                .catch(reject);
                                                        })
                                                            .catch(reject);
                                                    }
                                                    else if (configureScriptStat.mode & promises_namespaceObject.constants.X_OK) {
                                                        this.luaRocksSourcesInfo = new LuaRocksSourcesInfo(extractedDir, new LuaRocksUnixSourcesInfoDetails(configureScript));
                                                        resolve();
                                                    }
                                                    else {
                                                        reject(new Error("configure script for LuaRocks is not executable"));
                                                    }
                                                }
                                                else {
                                                    reject(new Error("configure script for LuaRocks is not a file"));
                                                }
                                            })
                                                .catch(configureScriptErr => {
                                                if (configureScriptErr.code === "ENOENT") {
                                                    reject(new Error("configure script for LuaRocks was not found"));
                                                }
                                                else {
                                                    reject(configureScriptErr);
                                                }
                                            });
                                        }
                                        else {
                                            dirItem_iter(i + 1);
                                        }
                                    })
                                        .catch(reject);
                                }
                                else {
                                    dirItem_iter(i + 1);
                                }
                            }
                            else {
                                reject(new Error(`Extracted directory for LuaRocks ${this.project.getVersion().getIdentifier()} was not found`));
                            }
                        };
                        dirItem_iter(0);
                    })
                        .catch(reject);
                }
            })
                .catch(reject);
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Fetch LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksCheckDependenciesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/





class LuaRocksCheckDependenciesTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Check dependencies for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaRocksFetchTarget(this.project, this);
    }
    execute() {
        return new Promise((resolve, reject) => {
            const cygwin = isCygwin();
            if (process.platform === 'win32' && !cygwin) {
                resolve();
            }
            else {
                sequentialPromises(process.platform === 'darwin' || cygwin ? [
                    () => findProgram("unzip")
                ] : [
                    () => findProgram("unzip"),
                    () => findProgram("gmake")
                ])
                    .then(_ => {
                    resolve();
                })
                    .catch(reject);
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Check dependencies for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Configuration/LuaRocksCreateBuildDirectoriesTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



class LuaRocksCreateBuildDirectoriesTarget extends AbstractCreateDirectoriesTarget {
    constructor(project, parent) {
        super([
            project.getBuildDir(),
            project.getRemotePatchesBuildDir()
        ]);
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Create build directories for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaRocksCheckDependenciesTarget(this.project, this);
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Create build directories for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Building/LuaRocksBuildInfo.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


class AbstractLuaRocksBuildInfo {
    constructor(sourcesInfo) {
        this.srcInfo = sourcesInfo;
    }
    getSourcesInfo() {
        return this.srcInfo;
    }
}
class LuaRocksUnixBuildInfo extends AbstractLuaRocksBuildInfo {
    constructor(sourcesInfo, make, makeArguments) {
        super(sourcesInfo);
        if (!(sourcesInfo.getDetails() instanceof LuaRocksUnixSourcesInfoDetails)) {
            throw new Error("Unix sources info details expected");
        }
        this.make = make;
        this.makeArguments = new ReadOnlyArray(makeArguments);
    }
    getMake() {
        return this.make;
    }
    getMakeArguments() {
        return this.makeArguments;
    }
}
class LuaRocksWindowsBuildInfo extends AbstractLuaRocksBuildInfo {
    constructor(sourcesInfo) {
        super(sourcesInfo);
        if (!(sourcesInfo.getDetails() instanceof LuaRocksWindowsSourcesInfoDetails)) {
            throw new Error("Windows sources info details expected");
        }
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Building/LuaRocksFinishBuildingTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaRocksFinishBuildingTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish the building of LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine("LuaRocks was built successfully.");
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish the building of LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Building/LuaRocksBuildTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/







class LuaRocksBuildTarget {
    constructor(project, parent, sourcesInfo) {
        this.parent = parent;
        this.project = project;
        this.srcInfo = sourcesInfo;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Build LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getLuaRocksSourcesInfo() {
        return this.srcInfo;
    }
    getNext() {
        return new LuaRocksFinishBuildingTarget(this.project, this);
    }
    setUnixBuildResult(make, makeArgs) {
        this.project.buildResult().setValue(new LuaRocksUnixBuildInfo(this.srcInfo, make, makeArgs));
    }
    setWindowsBuildResult() {
        this.project.buildResult().setValue(new LuaRocksWindowsBuildInfo(this.srcInfo));
    }
    execute() {
        return new Promise((resolve, reject) => {
            const details = this.srcInfo.getDetails();
            if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                const make = "make";
                const makeArgs = ["-C", `'${details.getDirPath().getUnixPath()}'`];
                executeProcess(details.getBash(), {
                    args: ["-lc", `${make} ${makeArgs.join(" ")}`],
                    verbose: true,
                    stdout: defaultStdOutHandler
                })
                    .then(code => {
                    this.setUnixBuildResult(make, makeArgs);
                    resolve();
                })
                    .catch(reject);
            }
            else if (details instanceof LuaRocksUnixSourcesInfoDetails) {
                const make = ToolchainEnvironmentVariables.instance().getMake();
                const makeArgs = ["-C", this.srcInfo.getDir()];
                executeProcess(make, {
                    args: makeArgs,
                    verbose: true,
                    stdout: defaultStdOutHandler
                })
                    .then(code => {
                    this.setUnixBuildResult(make, makeArgs);
                    resolve();
                })
                    .catch(reject);
            }
            else {
                this.setWindowsBuildResult();
                resolve();
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Build LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Installation/LuaRocksFinishInstallationTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

class LuaRocksFinishInstallationTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finishing the installation of LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return null;
    }
    execute() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine("<< done >>");
            resolve();
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Finishing the installation of LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/ILuaRocksInstallation.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
class LuaRocksInstallation {
    constructor(installDir, luaRocksTool, luaRocksAdminTool) {
        this.installDir = installDir;
        this.luaRocksTool = luaRocksTool;
        this.luaRocksAdminTool = luaRocksAdminTool;
    }
    getInstallDir() {
        return this.installDir;
    }
    getLuaRocksTool() {
        return this.luaRocksTool;
    }
    getLuaRocksAdminTool() {
        return this.luaRocksAdminTool;
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Installation/LuaRocksPostInstallTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
















class LuaRocksPostInstallTarget {
    constructor(project, parent) {
        this.project = project;
        this.parent = parent;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Post install for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getNext() {
        return new LuaRocksFinishInstallationTarget(this.project, this);
    }
    setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix) {
        return new Promise((resolve, reject) => {
            sequentialPromises([
                () => getFirstLineFromProcessExecution(bash, ["-lc", `'${luaRocksUnix}' path --lr-bin`], true),
                () => getFirstLineFromProcessExecution(bash, ["-lc", `'${luaRocksUnix}' path --lr-cpath`], true),
                () => getFirstLineFromProcessExecution(bash, ["-lc", `'${luaRocksUnix}' path --lr-path`], true)
            ])
                .then(values => {
                const lrBinPath = values[0];
                /*
                ** Quoted from Roberto's PIL, second edition, page 140:
                **   https://www.inf.puc-rio.br/~roberto/pil2/chapter15.pdf
                **
                ** > When Lua starts, it initializes this variable with
                ** > the value of the environment variable LUA_PATH or with
                ** > a compiled-defined default path, if this environment
                ** > variable is not defined. When using LUA_PATH, Lua
                ** > substitutes the default path for any substring ";;".
                ** > For instance, if you set LUA_PATH to "mydir/?.lua;;",
                ** > the final path will be the component "mydir/?.lua"
                ** > followed by the default path.
                */
                const lrCPath = values[1] + ";;";
                const lrPath = values[2] + ";;";
                sequentialPromises([
                    () => appendToGitHubEnvironmentVariables("LUA_PATH", lrPath),
                    () => appendToGitHubEnvironmentVariables("LUA_CPATH", lrCPath),
                    () => appendToGitHubPath(lrBinPath)
                ])
                    .then(_values => {
                    if (isCygwinOnCI()) {
                        /* we are on a GitHub action inside MSYS2 */
                        exportLuaRocksEnvVarsOnCygwinProfile(lrPath, lrCPath, lrBinPath)
                            .then(resolve)
                            .catch(reject);
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    setEnvironmentVariablesOnGitHub(luarocks) {
        return new Promise((resolve, reject) => {
            sequentialPromises([
                () => getFirstLineFromProcessExecution(luarocks, ["path", "--lr-bin"], true),
                () => getFirstLineFromProcessExecution(luarocks, ["path", "--lr-cpath"], true),
                () => getFirstLineFromProcessExecution(luarocks, ["path", "--lr-path"], true)
            ])
                .then(values => {
                const lrBinPath = values[0];
                /*
                ** Quoted from Roberto's PIL, second edition, page 140:
                **   https://www.inf.puc-rio.br/~roberto/pil2/chapter15.pdf
                **
                ** > When Lua starts, it initializes this variable with
                ** > the value of the environment variable LUA_PATH or with
                ** > a compiled-defined default path, if this environment
                ** > variable is not defined. When using LUA_PATH, Lua
                ** > substitutes the default path for any substring ";;".
                ** > For instance, if you set LUA_PATH to "mydir/?.lua;;",
                ** > the final path will be the component "mydir/?.lua"
                ** > followed by the default path.
                */
                const lrCPath = values[1] + ";;";
                const lrPath = values[2] + ";;";
                sequentialPromises([
                    () => appendToGitHubEnvironmentVariables("LUA_PATH", lrPath),
                    () => appendToGitHubEnvironmentVariables("LUA_CPATH", lrCPath),
                    () => appendToGitHubPath(lrBinPath)
                ])
                    .then(_values => {
                    if (isCygwinOnCI()) {
                        /* we are on a GitHub action inside MSYS2 */
                        exportLuaRocksEnvVarsOnCygwinProfile(lrPath, lrCPath, lrBinPath)
                            .then(resolve)
                            .catch(reject);
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    setCygwinLuaRocksConfig(bash, luaRocksUnix, key, value) {
        return new Promise((resolve, reject) => {
            executeProcess(bash, {
                args: [
                    "-lc", `'${luaRocksUnix}' config '${key}' '${value}'`
                ],
                verbose: true,
                stdout: defaultStdOutHandler
            })
                .then(_configSetEnvVar => {
                resolve();
            })
                .catch(reject);
        });
    }
    setLuaRocksConfig(luarocks, key, value) {
        return new Promise((resolve, reject) => {
            executeProcess(luarocks, {
                args: [
                    "config",
                    key,
                    value
                ],
                verbose: true,
                stdout: defaultStdOutHandler
            })
                .then(_configSetEnvVar => {
                resolve();
            })
                .catch(reject);
        });
    }
    setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, key, value) {
        return this.setCygwinLuaRocksConfig(bash, luaRocksUnix, `variables.${key}`, value);
    }
    setLuaRocksConfigVariable(luarocks, key, value) {
        return this.setLuaRocksConfig(luarocks, `variables.${key}`, value);
    }
    setCygwinLuaRocksToolchainEnvVars(bash, luaRocksUnix, toolchainEnvVars) {
        return new Promise((resolve, reject) => {
            const iter = (i) => {
                if (i < toolchainEnvVars.length) {
                    const envVar = toolchainEnvVars[i];
                    this.setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, envVar.key, envVar.value)
                        .then(() => {
                        iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            iter(0);
        });
    }
    setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars) {
        return new Promise((resolve, reject) => {
            const iter = (i) => {
                if (i < toolchainEnvVars.length) {
                    const envVar = toolchainEnvVars[i];
                    this.setLuaRocksConfigVariable(luarocks, envVar.key, envVar.value)
                        .then(() => {
                        iter(i + 1);
                    })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            iter(0);
        });
    }
    setLuaRocksConfigSetupOnWindows(luarocks, luaVersion, installDir) {
        return new Promise((resolve, reject) => {
            sequentialPromises([
                () => this.setLuaRocksConfig(luarocks, "lua_version", luaVersion),
                () => this.setLuaRocksConfig(luarocks, "lua_dir", installDir),
            ])
                .then(_values => {
                resolve();
            })
                .catch(reject);
        });
    }
    getWindowsGccExternalDepsDirs() {
        return new Promise((resolve, reject) => {
            const maxDepth = 10;
            const matchFile = (dir, depth, predicate) => {
                return new Promise((_resolve, _reject) => {
                    if (depth > maxDepth) {
                        _reject(new Error(`Not searching further than ${maxDepth} directories deep`));
                    }
                    else {
                        (0,promises_namespaceObject.readdir)(dir)
                            .then(files => {
                            const file_iter = (i) => {
                                if (i < files.length) {
                                    const fileBasename = files[i];
                                    const file = (0,external_node_path_namespaceObject.join)(dir, fileBasename);
                                    (0,promises_namespaceObject.stat)(file)
                                        .then(fileStat => {
                                        if (fileStat.isFile() && predicate(file)) {
                                            _resolve(file);
                                        }
                                        else if (fileStat.isDirectory()) {
                                            matchFile(file, depth + 1, predicate)
                                                .then(_resolve)
                                                .catch(matchErr => {
                                                file_iter(i + 1);
                                            });
                                        }
                                        else {
                                            file_iter(i + 1);
                                        }
                                    })
                                        .catch(fileStatErr => {
                                        file_iter(i + 1);
                                    });
                                }
                                else {
                                    _reject(new Error("Match not found"));
                                }
                            };
                            file_iter(0);
                        })
                            .catch(_reject);
                    }
                });
            };
            const externalDepsDirs = [];
            const systemDrive = process.env["SYSTEMDRIVE"];
            if (systemDrive) {
                const systemDriveTrimmed = systemDrive.trim();
                if (systemDriveTrimmed.toLowerCase() !== "c:") {
                    externalDepsDirs.push((0,external_node_path_namespaceObject.join)(systemDriveTrimmed, "external"));
                }
            }
            externalDepsDirs.push((0,external_node_path_namespaceObject.join)("C:", "external"));
            getFirstLineFromProcessExecution("where", [ToolchainEnvironmentVariables.instance().getCC()], true)
                .then(ccPath => {
                const ccBinDir = (0,external_node_path_namespaceObject.dirname)(ccPath);
                if ((0,external_node_path_namespaceObject.basename)(ccBinDir).toLowerCase() === 'bin') {
                    const ccDir = (0,external_node_path_namespaceObject.dirname)(ccBinDir);
                    const ccInclude = (0,external_node_path_namespaceObject.join)(ccDir, "include");
                    (0,promises_namespaceObject.stat)(ccInclude)
                        .then(ccIncludeStat => {
                        if (ccIncludeStat.isDirectory()) {
                            externalDepsDirs.push(ccDir);
                            getFirstLineFromProcessExecution(ToolchainEnvironmentVariables.instance().getCC(), ["-dumpmachine"])
                                .then(dumpMachine => {
                                matchFile(ccDir, 0, file => (0,external_node_path_namespaceObject.basename)(file).toLowerCase() === 'windows.h')
                                    .then(windowsH => {
                                    const windowsHeadersDir = (0,external_node_path_namespaceObject.dirname)(windowsH);
                                    if ((0,external_node_path_namespaceObject.basename)(windowsHeadersDir).toLowerCase() === "include") {
                                        const windowsHeadersParentDir = (0,external_node_path_namespaceObject.dirname)(windowsHeadersDir);
                                        externalDepsDirs.push(windowsHeadersParentDir);
                                    }
                                    resolve(externalDepsDirs);
                                })
                                    .catch(matchErr => {
                                    resolve(externalDepsDirs);
                                });
                            })
                                .catch(dumpMachineErr => {
                                resolve(externalDepsDirs);
                            });
                        }
                        else {
                            resolve(externalDepsDirs);
                        }
                    })
                        .catch(ccIncludeStatErr => {
                        resolve(externalDepsDirs);
                    });
                }
                else {
                    resolve(externalDepsDirs);
                }
            })
                .catch(whereErr => {
                resolve(externalDepsDirs);
            });
        });
    }
    setInstallationResult(installDir, luaRocksTool, luaRocksAdminTool) {
        this.project.installationResult().setValue(new LuaRocksInstallation(installDir, luaRocksTool, luaRocksAdminTool));
    }
    execute() {
        return new Promise((resolve, reject) => {
            const isGccLike = isGccLikeToolchain(this.project.getToolchain());
            const buildInfo = this.parent.getLuaRocksBuildInfo();
            const srcInfo = buildInfo.getSourcesInfo();
            const infoDetails = srcInfo.getDetails();
            const installDir = this.project.getInstallDir();
            const binDir = this.project.getInstallBinDir();
            const luaInstallation = this.project.getLuaInstallation();
            if (infoDetails instanceof LuaRocksWindowsSourcesInfoDetails) {
                const luarocks = (0,external_node_path_namespaceObject.join)(binDir, (0,external_node_path_namespaceObject.basename)(infoDetails.getLuaRocks()));
                const luarocksAdmin = (0,external_node_path_namespaceObject.join)(binDir, (0,external_node_path_namespaceObject.basename)(infoDetails.getLuaRocksAdmin()));
                checkFiles([luarocks, luarocksAdmin])
                    .then(() => {
                    if (isGccLike) {
                        this.getWindowsGccExternalDepsDirs()
                            .then(externalDepsDirs => {
                            const toolchainEnvVars = [
                                { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() },
                                { key: "STRIP", value: ToolchainEnvironmentVariables.instance().getSTRIP() },
                                { key: "RANLIB", value: ToolchainEnvironmentVariables.instance().getRANLIB() },
                                { key: "RC", value: ToolchainEnvironmentVariables.instance().getRC() }
                            ];
                            const configChanges = [
                                () => this.setLuaRocksConfigSetupOnWindows(luarocks, luaInstallation.getLuaShortVersion(), installDir),
                                () => this.setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars),
                                () => this.setEnvironmentVariablesOnGitHub(luarocks)
                            ];
                            const externalDepsDirsPromisesGen = (k) => {
                                return () => this.setLuaRocksConfig(luarocks, `external_deps_dirs[${k + 1}]`, externalDepsDirs[k]);
                            };
                            for (let idxExternalDepsDirs = 0; idxExternalDepsDirs < externalDepsDirs.length; idxExternalDepsDirs++) {
                                configChanges.push(externalDepsDirsPromisesGen(idxExternalDepsDirs));
                            }
                            sequentialPromises(configChanges)
                                .then(_values => {
                                this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                resolve();
                            })
                                .catch(reject);
                        })
                            .catch(reject);
                    }
                    else { /* MSVC */
                        if ((0,external_node_path_namespaceObject.basename)(luaInstallation.getLuaInterpreter()) === "luajit.exe") {
                            /*
                            ** For a LuaJIT build using MSVC,
                            ** msvcbuild.bat only supports
                            ** cl and link, not clang-cl.
                            ** So, environment variables for
                            ** different toolchains are not set.
                            */
                            sequentialPromises([
                                () => this.setLuaRocksConfigSetupOnWindows(luarocks, luaInstallation.getLuaShortVersion(), installDir),
                                () => this.setEnvironmentVariablesOnGitHub(luarocks)
                            ])
                                .then(_values => {
                                this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                resolve();
                            })
                                .catch(reject);
                        }
                        else {
                            const toolchainEnvVars = [
                                { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() }
                            ];
                            sequentialPromises([
                                () => this.setLuaRocksConfigSetupOnWindows(luarocks, luaInstallation.getLuaShortVersion(), installDir),
                                () => this.setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars),
                                () => this.setEnvironmentVariablesOnGitHub(luarocks)
                            ])
                                .then(_values => {
                                this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                resolve();
                            })
                                .catch(reject);
                        }
                    }
                })
                    .catch(reject);
            }
            else if (infoDetails instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                const luarocks = (0,external_node_path_namespaceObject.join)(binDir, "luarocks");
                const luarocksAdmin = (0,external_node_path_namespaceObject.join)(binDir, "luarocks-admin");
                checkFiles([luarocks, luarocksAdmin])
                    .then(() => {
                    const luarocksConfig = (0,external_node_path_namespaceObject.join)(this.project.getInstallDir(), "etc", "luarocks", `config-${luaInstallation.getLuaShortVersion()}.lua`);
                    checkFiles([luarocksConfig])
                        .then(() => {
                        const installDirUnix = infoDetails.getInstallDirPath().getUnixPath();
                        getFirstLineFromProcessExecution(infoDetails.getCygpath(), [
                            "-m",
                            installDir
                        ], true)
                            .then(installDirMixed => {
                            /*
                            ** for each file listed in the following
                            ** array, we are going to replace
                            ** Lua's install directory (which is written
                            ** as a Unix dir) by the corresponding
                            ** path formatted as Windows directory.
                            ** However, we are going to use
                            ** slash (/) as directory separator.
                            ** In short:
                            ** path/to/lua_dir -> $(cygpath -m "path/to/lua_dir")
                            */
                            const replacements = [
                                {
                                    filepath: luarocks,
                                    linesToSkip: 1 /* skip shebang */
                                },
                                {
                                    filepath: luarocksAdmin,
                                    linesToSkip: 1 /* skip shebang */
                                },
                                {
                                    filepath: luarocksConfig,
                                    linesToSkip: 0
                                }
                            ];
                            const replacement_iter = (i) => {
                                if (i < replacements.length) {
                                    const replacement = replacements[i];
                                    replaceAllInFile(replacement.filepath, replacement.linesToSkip, installDirUnix, installDirMixed)
                                        .then(() => {
                                        replacement_iter(i + 1);
                                    })
                                        .catch(reject);
                                }
                                else {
                                    getFirstLineFromProcessExecution(infoDetails.getCygpath(), ["-u", luarocks], true)
                                        .then(luaRocksUnix => {
                                        const bash = infoDetails.getBash();
                                        if (isGccLike) {
                                            this.getWindowsGccExternalDepsDirs()
                                                .then(externalDepsDirs => {
                                                const toolchainEnvVars = [
                                                    { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                                    { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                                    { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                                    { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() },
                                                    { key: "STRIP", value: ToolchainEnvironmentVariables.instance().getSTRIP() },
                                                    { key: "RANLIB", value: ToolchainEnvironmentVariables.instance().getRANLIB() },
                                                    { key: "RC", value: ToolchainEnvironmentVariables.instance().getRC() }
                                                ];
                                                const configChanges = [
                                                    () => this.setCygwinLuaRocksConfig(bash, luaRocksUnix, "cmake_generator", "MinGW Makefiles"),
                                                    () => this.setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, "PWD", "cd"),
                                                    () => this.setCygwinLuaRocksToolchainEnvVars(bash, luaRocksUnix, toolchainEnvVars),
                                                    () => this.setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix)
                                                ];
                                                const externalDepsDirsPromisesGen = (k) => {
                                                    return () => this.setCygwinLuaRocksConfig(bash, luaRocksUnix, `external_deps_dirs[${k + 1}]`, externalDepsDirs[k]);
                                                };
                                                for (let idxExternalDepsDirs = 0; idxExternalDepsDirs < externalDepsDirs.length; idxExternalDepsDirs++) {
                                                    configChanges.push(externalDepsDirsPromisesGen(idxExternalDepsDirs));
                                                }
                                                sequentialPromises(configChanges)
                                                    .then(_values => {
                                                    this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                                    resolve();
                                                })
                                                    .catch(reject);
                                            })
                                                .catch(reject);
                                        }
                                        else { /* MSVC */
                                            if ((0,external_node_path_namespaceObject.basename)(luaInstallation.getLuaInterpreter()) === "luajit.exe") {
                                                /*
                                                ** For a LuaJIT build using MSVC,
                                                ** msvcbuild.bat only supports
                                                ** cl and link, not clang-cl.
                                                ** So, environment variables for
                                                ** different toolchains are not set.
                                                */
                                                this.setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix)
                                                    .then(() => {
                                                    this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                                    resolve();
                                                })
                                                    .catch(reject);
                                            }
                                            else {
                                                const toolchainEnvVars = [
                                                    { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                                    { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                                    { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                                    { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() }
                                                ];
                                                sequentialPromises([
                                                    () => this.setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, "PWD", "cd"),
                                                    () => this.setCygwinLuaRocksToolchainEnvVars(bash, luaRocksUnix, toolchainEnvVars),
                                                    () => this.setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix)
                                                ])
                                                    .then(_values => {
                                                    this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                                    resolve();
                                                })
                                                    .catch(reject);
                                            }
                                        }
                                    })
                                        .catch(reject);
                                }
                            };
                            replacement_iter(0);
                        })
                            .catch(reject);
                    })
                        .catch(reject);
                })
                    .catch(reject);
            }
            else {
                const luarocks = (0,external_node_path_namespaceObject.join)(binDir, "luarocks");
                const luarocksAdmin = (0,external_node_path_namespaceObject.join)(binDir, "luarocks-admin");
                checkFiles([luarocks, luarocksAdmin])
                    .then(() => {
                    const toolchainEnvVars = [
                        { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                        { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                        { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                        { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() },
                        { key: "STRIP", value: ToolchainEnvironmentVariables.instance().getSTRIP() },
                        { key: "RANLIB", value: ToolchainEnvironmentVariables.instance().getRANLIB() }
                    ];
                    sequentialPromises([
                        () => this.setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars),
                        () => this.setEnvironmentVariablesOnGitHub(luarocks)
                    ])
                        .then(_values => {
                        this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                        resolve();
                    })
                        .catch(reject);
                })
                    .catch(reject);
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Post install for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/Installation/LuaRocksInstallTarget.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/








class LuaRocksInstallTarget {
    constructor(project, parent, buildInfo) {
        this.project = project;
        this.parent = parent;
        this.buildInfo = buildInfo;
    }
    init() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[Start] Install LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject() {
        return this.project;
    }
    getParent() {
        return this.parent;
    }
    getLuaRocksBuildInfo() {
        return this.buildInfo;
    }
    getNext() {
        return new LuaRocksPostInstallTarget(this.project, this);
    }
    execute() {
        return new Promise((resolve, reject) => {
            const info = this.buildInfo;
            const sourcesInfo = info.getSourcesInfo();
            const infoDetails = sourcesInfo.getDetails();
            if (info instanceof LuaRocksUnixBuildInfo) {
                const makeArgs = info.getMakeArguments().createCopy();
                makeArgs.push("install");
                if (infoDetails instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                    executeProcess(infoDetails.getBash(), {
                        args: ["-lc", `${info.getMake()} ${makeArgs.join(" ")}`],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                        resolve();
                    })
                        .catch(reject);
                }
                else {
                    executeProcess(info.getMake(), {
                        args: makeArgs,
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                        resolve();
                    })
                        .catch(reject);
                }
            }
            else {
                if (infoDetails instanceof LuaRocksWindowsSourcesInfoDetails) {
                    const binDir = this.project.getInstallBinDir();
                    const filesToCopy = [
                        infoDetails.getLuaRocks(),
                        infoDetails.getLuaRocksAdmin()
                    ];
                    const file_iter = (i) => {
                        if (i < filesToCopy.length) {
                            const sourceFile = filesToCopy[i];
                            const destinationFile = (0,external_node_path_namespaceObject.join)(binDir, (0,external_node_path_namespaceObject.basename)(sourceFile));
                            (0,promises_namespaceObject.cp)(sourceFile, destinationFile, { force: true })
                                .then(() => {
                                file_iter(i + 1);
                            })
                                .catch(reject);
                        }
                        else {
                            resolve();
                        }
                    };
                    file_iter(0);
                }
                else {
                    reject(new Error("Internal error: LuaRocks sources info details for Windows expected."));
                }
            }
        });
    }
    finalize() {
        return new Promise((resolve, reject) => {
            Console.instance().writeLine(`[End] Install LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}

;// CONCATENATED MODULE: ./src/Projects/LuaRocks/LuaRocksProject.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






class LuaRocksProject {
    getVersion() {
        return this.version;
    }
    getBuildDir() {
        return this.buildDir;
    }
    getRemotePatchesBuildDir() {
        return this.remotePatchesBuildDir;
    }
    getInstallDir() {
        return this.installDir;
    }
    getLuaInstallation() {
        return this.luaInstallation;
    }
    getToolchain() {
        return this.toolchain;
    }
    getInstallBinDir() {
        return this.installBinDir;
    }
    configurationResult() {
        return this._configurationResult;
    }
    buildResult() {
        return this._buildResult;
    }
    installationResult() {
        return this._installationResult;
    }
    constructor(version, buildDir, installDir, luaInstallation, toolchain) {
        this.version = version;
        this.buildDir = buildDir;
        this.installDir = installDir;
        this.luaInstallation = luaInstallation;
        this.toolchain = toolchain;
        this.remotePatchesBuildDir = (0,external_node_path_namespaceObject.join)(this.buildDir, "remote-patches");
        this.installBinDir = (0,external_node_path_namespaceObject.join)(installDir, "bin");
        this._configurationResult = new GetSetProperty(null);
        this._buildResult = new GetSetProperty(null);
        this._installationResult = new GetSetProperty(null);
    }
    configure() {
        return new Promise((resolve, reject) => {
            const initialConfigureTarget = new LuaRocksCreateBuildDirectoriesTarget(this, null);
            const pipeline = new TargetPipeline(initialConfigureTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    build() {
        return new Promise((resolve, reject) => {
            const initialBuildTarget = new LuaRocksBuildTarget(this, null, this.configurationResult().getValue());
            const pipeline = new TargetPipeline(initialBuildTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    install() {
        return new Promise((resolve, reject) => {
            const initialInstallTarget = new LuaRocksInstallTarget(this, null, this.buildResult().getValue());
            const pipeline = new TargetPipeline(initialInstallTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
}

;// CONCATENATED MODULE: ./src/main.ts
/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/















function getTempDir() {
    return new Promise((promiseResolve, reject) => {
        const runnerTemp = process.env["RUNNER_TEMP"];
        if (runnerTemp) {
            (0,promises_namespaceObject.stat)(runnerTemp)
                .then(s => {
                if (s.isDirectory()) {
                    promiseResolve((0,external_node_path_namespaceObject.resolve)(runnerTemp));
                }
                else {
                    reject(new Error("Runner TEMP must be a directory"));
                }
            })
                .catch(reject);
        }
        else {
            promiseResolve((0,external_node_os_namespaceObject.tmpdir)());
        }
    });
}
function readLuaVersionFromEnv(luaVersion) {
    return new Promise((promiseResolve, reject) => {
        const result = [];
        parsePucLuaVersion(luaVersion)
            .then(targetVersion => {
            result.push(targetVersion);
            promiseResolve(result);
        })
            .catch(err => {
            promiseResolve(result);
        });
    });
}
function readLuaJitRepositoryVersionFromEnv(luaVersion) {
    return new Promise((promiseResolve, reject) => {
        const result = [];
        parseLuaJitRepositoryVersion(luaVersion)
            .then(targetVersion => {
            result.push(targetVersion);
            promiseResolve(result);
        })
            .catch(err => {
            promiseResolve(result);
        });
    });
}
function readLuaRocksVersionFromEnv(luaRocksVersion) {
    return new Promise((promiseResolve, reject) => {
        const result = [];
        parseLuaRocksVersion(luaRocksVersion)
            .then(targetVersion => {
            if (targetVersion) {
                result.push(targetVersion);
            }
            promiseResolve(result);
        })
            .catch(err => {
            promiseResolve(result);
        });
    });
}
function installLuaProject(luaProject, buildDir, installDir, toolchain) {
    return new Promise((promiseResolve, reject) => {
        const luaRocksVersion = (GitHubInput.instance().getInputLuaRocksVersion() || process.env["LUAROCKS_VERSION"] || "").trim();
        sequentialPromises([
            () => luaProject.configure(),
            () => luaProject.build(),
            () => luaProject.install()
        ])
            .then(_ => {
            readLuaRocksVersionFromEnv(luaRocksVersion)
                .then(lrVersions => {
                if (lrVersions.length > 0) {
                    const version = lrVersions[0];
                    (0,promises_namespaceObject.mkdtemp)((0,external_node_path_namespaceObject.join)(buildDir, "luarocks-"))
                        .then(luaRocksBuildDir => {
                        const luaRocksProject = new LuaRocksProject(version, luaRocksBuildDir, installDir, luaProject.installationResult().getValue(), toolchain);
                        sequentialPromises([
                            () => luaRocksProject.configure(),
                            () => luaRocksProject.build(),
                            () => luaRocksProject.install()
                        ])
                            .then(__ => {
                            promiseResolve();
                        })
                            .catch(reject);
                    })
                        .catch(reject);
                }
                else {
                    promiseResolve();
                }
            })
                .catch(reject);
        })
            .catch(reject);
    });
}
;
function main() {
    return new Promise((promiseResolve, reject) => {
        getTempDir()
            .then(tmp => {
            const workingDir = process.cwd();
            const uuid = (0,external_node_crypto_namespaceObject.randomUUID)().toString();
            const toolchain = process.env["VCINSTALLDIR"] ? new MsvcToolchain() : new GccToolchain();
            const luaVersion = (GitHubInput.instance().getInputLuaVersion() || process.env["LUA_VERSION"] || "").trim();
            readLuaVersionFromEnv(luaVersion)
                .then(versions => {
                if (versions.length > 0) {
                    const version = versions[0];
                    const buildDir = (0,external_node_path_namespaceObject.join)(tmp, `lua-${version.getString()}-${uuid}-build-dir`);
                    const installDir = GitHubInput.instance().getInputDebugSetupLua() || process.env["DEBUG_SETUP_LUA"] ?
                        (0,external_node_path_namespaceObject.join)(tmp, `lua-${version.getString()}-${uuid}-install-dir`) :
                        (0,external_node_path_namespaceObject.join)(workingDir, ".lua");
                    const project = new PucLuaProject(version, buildDir, installDir, toolchain);
                    installLuaProject(project, buildDir, installDir, toolchain)
                        .then(promiseResolve)
                        .catch(reject);
                }
                else {
                    readLuaJitRepositoryVersionFromEnv(luaVersion)
                        .then(luajitVersions => {
                        if (luajitVersions.length > 0) {
                            const version = luajitVersions[0];
                            const buildDir = (0,external_node_path_namespaceObject.join)(tmp, `${version.getKind()}-${uuid}-build-dir`);
                            const installDir = GitHubInput.instance().getInputDebugSetupLua() || process.env["DEBUG_SETUP_LUA"] ?
                                (0,external_node_path_namespaceObject.join)(tmp, `${version.getKind()}-${uuid}-install-dir`) :
                                (0,external_node_path_namespaceObject.join)(workingDir, ".lua");
                            const project = new LuaJitProject(version, buildDir, installDir, toolchain);
                            installLuaProject(project, buildDir, installDir, toolchain)
                                .then(promiseResolve)
                                .catch(reject);
                        }
                        else {
                            reject(new Error("Unknown Lua / LuaJIT / OpenResty version"));
                        }
                    })
                        .catch(reject);
                }
            })
                .catch(reject);
        })
            .catch(reject);
    });
}
main()
    .then(() => {
    Console.instance().writeLine("finished");
})
    .catch(err => {
    Console.instance().writeLine(err);
    process.exitCode = 1;
});

