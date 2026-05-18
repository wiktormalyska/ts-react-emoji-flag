declare module 'ts-react-emoji-flag' {
    import * as React from 'react';

    export interface CountryFlagProps {
        countryCode: string;
        title?: string;
        className?: string;
        forceLoadFont?: boolean;
    }

    export interface UseCountryFlagOptions {
        className?: string;
        forceLoadFont?: boolean;
    }

    export const CountryFlag: React.FC<CountryFlagProps>;
    export function useCountryFlag(options?: UseCountryFlagOptions): void;
    export function flag(countryCode: string): React.ReactElement;

    export default CountryFlag;
}
