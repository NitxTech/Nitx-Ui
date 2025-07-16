import * as react_jsx_runtime from 'react/jsx-runtime';

declare const ProductSwitcher: () => react_jsx_runtime.JSX.Element | null;

interface UserAccountProps {
    accounts: {
        id: string;
        name: string;
        email: string;
        imageUrl?: string | null;
        active: boolean;
    }[];
    isExpanded: boolean;
}
declare const UserAccount: ({ accounts, isExpanded }: UserAccountProps) => react_jsx_runtime.JSX.Element | null;

export { ProductSwitcher, UserAccount };
