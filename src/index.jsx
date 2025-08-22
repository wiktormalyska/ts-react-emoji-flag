import React, {useEffect} from "react";
import PropTypes from "prop-types";

const fontUrl = "https://country-flag.proca.app/font/TwemojiCountryFlags.woff2";
const fontName = "countryFlags";
const className = "country-flag";

const nativeFlag = () => {
    const userAgent = window.navigator.userAgent;
    return userAgent.indexOf("Win") === -1;
};

export function useCountryFlag(options) {
    const cn = options?.className || className;
    const forceLoad = options?.forceLoadFont || false;

    useEffect(() => {
        const styleId = "react-emoji-flag-style";
        if (document.getElementById(styleId)) {
            return;
        }
        const css = `.${cn} {font-family: "${fontName}", system-emoji, sans-serif}`;


        const loadFont = async () => {
            console.log("Loading country flag font...");
            const customFont = new FontFace(fontName, "url(" + fontUrl + ")", {
                unicodeRange:
                    "U+1F1E6-1F1FF, U+1F3F4, U+E0062-E0063, U+E0065, U+E0067, U+E006C, U+E006E, U+E0073-E0074, U+E0077, U+E007F",
            });

            try {
                await customFont.load();
                document.fonts.add(customFont);
                console.log("Country flag font loaded successfully");
            } catch (error) {
                console.error("Failed to load country flag font:", error);
            }
        };

        // Load font if we're on Windows or if forceLoad is enabled
        if (nativeFlag() && !forceLoad) {
            console.log("Using native emoji flags");
        } else {
            loadFont();
        }

        const style = document.createElement("style");
        style.textContent = css;
        style.id = styleId;
        document.head.appendChild(style);
    }, [cn, forceLoad]);
}

export const flag = (isoCode) => {
    if (!isoCode) return <span className={className}></span>;
    const code = isoCode.toUpperCase();
    if (code === "ZZ") return <span className={className}></span>;

    if (!/^[A-Z]{2}$/.test(code)) {
        console.warn(`Invalid country code: ${code}`);
        return <span className={className}></span>;
    }

    const offset = 127397;
    const flagEmoji = code.replace(/./g, (char) =>
        String.fromCodePoint(char.charCodeAt(0) + offset)
    );

    return <span className={className}>{flagEmoji}</span>;
};

export const CountryFlag = (props) => {
    const cn = !props.className ? className : `${props.className} ${className}`;
    useCountryFlag({
        className: cn,
        forceLoadFont: props.forceLoadFont
    });

    return (
        <span className={cn} title={props.title || props.countryCode}>
      {flag(props.countryCode)}
    </span>
    );
};

CountryFlag.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    forceLoadFont: PropTypes.bool
};

export default CountryFlag;