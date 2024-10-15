import logo from "@/assets/logo.png";

export function Header() {
  return (
    <div className="w-full flex justify-center py-4">
      <img src={logo} alt="logo" className="rounded-full" />
    </div>
  );
}
