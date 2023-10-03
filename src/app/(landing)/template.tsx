import MobileBottomNavigation from "@/components/BottomNavigation/MobileBottomNavigation";

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
      <MobileBottomNavigation />
    </>
  );
}
