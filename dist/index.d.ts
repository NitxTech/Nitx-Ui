import * as react_jsx_runtime from 'react/jsx-runtime';

interface ProductSwitcherProps {
    auth_user: number | string;
    profilePic?: string;
    profileName?: string;
}
declare const ProductSwitcher: ({ auth_user, profilePic, profileName, }: ProductSwitcherProps) => react_jsx_runtime.JSX.Element | null;

interface UserAccountProps {
    accounts: {
        id: string;
        name: string;
        email: string;
        imageUrl?: string | null;
        active: boolean;
    }[];
    isExpanded: boolean;
    auth_user: string | number;
}
declare const UserAccount: ({ accounts, isExpanded, auth_user, }: UserAccountProps) => react_jsx_runtime.JSX.Element | null;

export { ProductSwitcher, UserAccount };
