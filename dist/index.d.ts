import * as react_jsx_runtime from 'react/jsx-runtime';

declare const ProductSwitcher: () => react_jsx_runtime.JSX.Element | null;

interface UserAccountProps {
    accounts: {
        id: number;
        name: string;
        email: string;
        imageUrl?: string;
        active: boolean;
    }[];
    isExpanded: boolean;
    router?: {
        replace: (url: string) => void;
    };
}
declare const UserAccount: ({ accounts, isExpanded, router: routerProp, }: UserAccountProps) => react_jsx_runtime.JSX.Element | null;

export { ProductSwitcher, UserAccount };
