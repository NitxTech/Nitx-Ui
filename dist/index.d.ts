import * as react_jsx_runtime from 'react/jsx-runtime';

interface ProductSwitcherProps {
    auth_user: number | string;
}
declare const ProductSwitcher: ({ auth_user }: ProductSwitcherProps) => react_jsx_runtime.JSX.Element | null;

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
