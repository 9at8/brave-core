/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// clang-format off
// #import {addSingletonGetter, sendWithPromise} from 'chrome://resources/js/cr.m.js';
// clang-format on

cr.define('settings', function () {
  /** @interface */
  /* #export */ class BraveIPFSBrowserProxy {
    /**
     * @param {boolean} value name.
     */
    setIPFSCompanionEnabled (value) {}
    getIPFSResolveMethodList () {}
    getIPFSEnabled () {}
  }

  /**
   * @implements {settings.BraveIPFSBrowserProxy}
   */
  /* #export */ class BraveIPFSBrowserProxyImpl {
    setIPFSCompanionEnabled (value) {
      chrome.send('setIPFSCompanionEnabled', [value])
    }

    /** @override */
    getIPFSResolveMethodList () {
      return new Promise(resolve => {
        if (!chrome.ipfs) {
          resolve(false)
          return
        }
        chrome.ipfs.getResolveMethodList(resolve)
      })
    }

    /** @override */
    getIPFSEnabled () {
      return new Promise(resolve => {
        if (!chrome.ipfs) {
          resolve(false)
          return
        }
        chrome.ipfs.getIPFSEnabled(resolve)
      })
    }
  }

  cr.addSingletonGetter(BraveIPFSBrowserProxyImpl)

  // #cr_define_end
  return {
    BraveIPFSBrowserProxy,
    BraveIPFSBrowserProxyImpl
  }
})
