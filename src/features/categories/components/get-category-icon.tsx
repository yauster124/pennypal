import { AppleIcon, ArrowRightLeftIcon, BikeIcon, BookOpenIcon, BriefcaseBusinessIcon, BusFrontIcon, CalendarIcon, CardSimIcon, CarFrontIcon, CarTaxiFrontIcon, CircleParkingIcon, CirclePoundSterlingIcon, CircleQuestionMarkIcon, Clapperboard, ConstructionIcon, FolderCodeIcon, FootprintsIcon, FuelIcon, GiftIcon, GraduationCapIcon, HamburgerIcon, HammerIcon, HandCoinsIcon, HandshakeIcon, HeartPlusIcon, HeaterIcon, HouseHeartIcon, HouseIcon, LampIcon, LandmarkIcon, LaughIcon, MonitorSmartphoneIcon, PencilRulerIcon, PhoneCallIcon, PlaneIcon, PodcastIcon, ScanHeartIcon, ShirtIcon, ShoppingCartIcon, TrainFrontIcon, TramFrontIcon, TreePalmIcon, UtensilsIcon, VolleyballIcon, WatchIcon, WifiIcon } from "lucide-react"

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
        case "Interest":
            return <CirclePoundSterlingIcon />
        case "Investment Returns":
            return <CirclePoundSterlingIcon />
        case "Transfer":
            return <ArrowRightLeftIcon />
        case "Subscription":
            return <PodcastIcon />
        default:
            return <CircleQuestionMarkIcon />
    }
}