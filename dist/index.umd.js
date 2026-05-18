(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = global || self, factory(global.tsReactEmojiFlag = {}, global.react));
})(this, (function (exports, React) {
    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    function _catch(body, recover) {
      try {
        var result = body();
      } catch (e) {
        return recover(e);
      }
      if (result && result.then) {
        return result.then(void 0, recover);
      }
      return result;
    }
    var fontUrl = "https://country-flag.proca.app/font/TwemojiCountryFlags.woff2";
    var fontName = "countryFlags";
    var className = "country-flag";
    var nativeFlag = function nativeFlag() {
      var userAgent = window.navigator.userAgent;
      return userAgent.indexOf("Win") === -1;
    };
    function useCountryFlag(options) {
      var cn = (options == null ? void 0 : options.className) || className;
      var forceLoad = (options == null ? void 0 : options.forceLoadFont) || false;
      React.useEffect(function () {
        var styleId = "react-emoji-flag-style";
        if (document.getElementById(styleId)) {
          return;
        }
        var css = "." + cn + " {font-family: \"" + fontName + "\", system-emoji, sans-serif}";
        var loadFont = function loadFont() {
          try {
            console.log("Loading country flag font...");
            var customFont = new FontFace(fontName, "url(" + fontUrl + ")", {
              unicodeRange: "U+1F1E6-1F1FF, U+1F3F4, U+E0062-E0063, U+E0065, U+E0067, U+E006C, U+E006E, U+E0073-E0074, U+E0077, U+E007F"
            });
            var _temp = _catch(function () {
              return Promise.resolve(customFont.load()).then(function () {
                document.fonts.add(customFont);
                console.log("Country flag font loaded successfully");
              });
            }, function (error) {
              console.error("Failed to load country flag font:", error);
            });
            return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
          } catch (e) {
            return Promise.reject(e);
          }
        };

        // Load font if we're on Windows or if forceLoad is enabled
        if (nativeFlag() && !forceLoad) {
          console.log("Using native emoji flags");
        } else {
          loadFont();
        }
        var style = document.createElement("style");
        style.textContent = css;
        style.id = styleId;
        document.head.appendChild(style);
      }, [cn, forceLoad]);
    }
    var flag = function flag(isoCode) {
      if (!isoCode) return /*#__PURE__*/React__default["default"].createElement("span", {
        className: className
      });
      var code = isoCode.toUpperCase();
      if (code === "ZZ") return /*#__PURE__*/React__default["default"].createElement("span", {
        className: className
      });
      if (!/^[A-Z]{2}$/.test(code)) {
        console.warn("Invalid country code: " + code);
        return /*#__PURE__*/React__default["default"].createElement("span", {
          className: className
        });
      }
      var offset = 127397;
      var flagEmoji = code.replace(/./g, function (_char) {
        return String.fromCodePoint(_char.charCodeAt(0) + offset);
      });
      return /*#__PURE__*/React__default["default"].createElement("span", {
        className: className
      }, flagEmoji);
    };
    var CountryFlag = function CountryFlag(props) {
      var cn = !props.className ? className : props.className + " " + className;
      useCountryFlag({
        className: cn,
        forceLoadFont: props.forceLoadFont
      });
      return /*#__PURE__*/React__default["default"].createElement("span", {
        className: cn,
        title: props.title || props.countryCode
      }, flag(props.countryCode));
    };

    exports.CountryFlag = CountryFlag;
    exports["default"] = CountryFlag;
    exports.flag = flag;
    exports.useCountryFlag = useCountryFlag;

}));
//# sourceMappingURL=index.umd.js.map
