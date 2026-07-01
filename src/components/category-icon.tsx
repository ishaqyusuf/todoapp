import {
  LucideIcon,
  Square,
  Calendar,
  Car,
  CheckCircle,
  Home,
  ShoppingBag,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  today: Calendar,
  roadTripList: Car,
  completed: CheckCircle,
  home: Home,
  errand: ShoppingBag,
};

export function CategoryIcon({
  icon,
  color = "gray",
}: {
  icon?: string;
  color?: string;
}) {
  const IconComponent = icon ? icons[icon] : null;
  if (IconComponent) {
    return <IconComponent color="darkGray" />;
  }
  if (icon && icon !== "square") {
    return (
      <span className="flex items-center justify-center w-4 h-4 text-sm">
        {icon}
      </span>
    );
  }
  return (
    <>
      <Square color={color} className="text" strokeWidth={3} />
    </>
  );
}
