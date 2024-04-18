"use client";

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
    return (
        <div
            onClick={onClick}
            className="px-4 py-3 hover:bg-white transition font-semibold text-red-500">
            {label}
        </div>
    )
};

export default MenuItem;