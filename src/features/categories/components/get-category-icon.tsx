import { cn } from "@/lib/utils"
import { Category } from "@/types/api"
import { AppleIcon, ArrowRightLeftIcon, BikeIcon, BookOpenIcon, BriefcaseBusinessIcon, BusFrontIcon, CalendarIcon, CardSimIcon, CarFrontIcon, CarTaxiFrontIcon, CircleParkingIcon, CirclePoundSterlingIcon, CircleQuestionMarkIcon, Clapperboard, ConstructionIcon, FolderCodeIcon, FootprintsIcon, FuelIcon, GiftIcon, GraduationCapIcon, HamburgerIcon, HammerIcon, HandCoinsIcon, HandshakeIcon, HeartPlusIcon, HeaterIcon, HouseHeartIcon, HouseIcon, LampIcon, LandmarkIcon, LaughIcon, MonitorSmartphoneIcon, PencilRulerIcon, PhoneCallIcon, PlaneIcon, PodcastIcon, ScanHeartIcon, ShirtIcon, ShoppingCartIcon, TrainFrontIcon, TramFrontIcon, TreePalmIcon, TrendingDownIcon, TrendingUpIcon, UtensilsIcon, VolleyballIcon, WatchIcon, WifiIcon } from "lucide-react"

export const getCategoryIcon = ({
    categoryName
}: {
    categoryName: string
}) => {
    switch (categoryName) {
        case "Food & Drinks":
            return <UtensilsIcon />
        case "Groceries":
            return <AppleIcon />
        case "Restaurant":
            return <HamburgerIcon />
        case "Shopping":
            return <ShoppingCartIcon />
        case "Clothes":
            return <ShirtIcon />
        case "Shoes":
            return <FootprintsIcon />
        case "Electronics":
            return <MonitorSmartphoneIcon />
        case "Gifts":
            return <GiftIcon />
        case "Health":
            return <HeartPlusIcon />
        case "Home":
            return <LampIcon />
        case "Accessories":
            return <WatchIcon />
        case "Tools":
            return <PencilRulerIcon />
        case "Housing":
            return <HouseIcon />
        case "Utilities":
            return <HeaterIcon />
        case "Maintenance":
            return <ConstructionIcon />
        case "Mortgage":
            return <LandmarkIcon />
        case "Property Insurance":
            return <HouseHeartIcon />
        case "Rent":
            return <HandCoinsIcon />
        case "Transportation":
            return <TramFrontIcon />
        case "Business Trips":
            return <BriefcaseBusinessIcon />
        case "Flights":
            return <PlaneIcon />
        case "Train":
            return <TrainFrontIcon />
        case "Bus":
            return <BusFrontIcon />
        case "Taxi":
            return <CarTaxiFrontIcon />
        case "Vehicle":
            return <CarFrontIcon />
        case "Fuel":
            return <FuelIcon />
        case "Parking":
            return <CircleParkingIcon />
        case "Vehicle Insurance":
            return <LandmarkIcon />
        case "Vehicle Maintenance":
            return <HammerIcon />
        case "Life & Entertainment":
            return <Clapperboard />
        case "Sport":
            return <BikeIcon />
        case "Books":
            return <BookOpenIcon />
        case "Events":
            return <CalendarIcon />
        case "Education":
            return <GraduationCapIcon />
        case "Health Care":
            return <ScanHeartIcon />
        case "Hobbies":
            return <VolleyballIcon />
        case "Holiday":
            return <TreePalmIcon />
        case "Beauty":
            return <LaughIcon />
        case "Communication":
            return <PhoneCallIcon />
        case "Internet":
            return <WifiIcon />
        case "Phone Plan":
            return <CardSimIcon />
        case "Software":
            return <FolderCodeIcon />
        case "Income":
            return <CirclePoundSterlingIcon />
        case "Salary":
            return <BriefcaseBusinessIcon />
        case "Gifts":
            return <GiftIcon />
        case "Sales":
            return <HandshakeIcon />
        case "Transfer In":
        case "Transfer Out":
            return <ArrowRightLeftIcon />
        case "Subscription":
            return <PodcastIcon />
        case "Cashback":
            return <HandCoinsIcon />
        case "Investment Losses":
            return <TrendingDownIcon />
        case "Investment Returns":
        case "Interest":
            return <TrendingUpIcon />
        default:
            return <CircleQuestionMarkIcon />
    }
}

export const getCategoryColour = (categoryId: string, prefix?: string) => {
    let className = "";
    switch (categoryId.toString()) {
        case "1":
            className = "bg-[#F97316]";
            break;
        case "2":
            className = "bg-[#EC4899]";
            break;
        case "3":
            className = "bg-[#6366F1]";
            break;
        case "4":
            className = "bg-[#0EA5E9]";
            break;
        case "5":
            className = "bg-[#3B82F6]";
            break;
        case "6":
            className = "bg-[#EAB308]";
            break;
        case "7":
            className = "bg-[#A855F7]";
            break;
        case "8":
            className = "bg-[#22C55E]";
            break;
        case "51":
            className = "bg-[#DC2626]";
            break;
        case "52":
            className = "bg-[#6B7280]";
            break;
        default:
            className = "";
    }

    if (prefix) {
        return `${prefix}${className}`;
    }

    return className;
}

export const CategoryIcon = ({
    category
}: {
    category: Category
}) => {
    const categoryId = category.parentId ? category.parentId : category.id;

    return (
        <div className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full text-primary-foreground",
            getCategoryColour(categoryId)
            )}
        >
            {getCategoryIcon({ categoryName: category.name })}
        </div>
    );
}