import { ButtonHomePage } from "./Buttons";

function NavBar() {
  const pages = ["Home", "Profile", "Menu", "History"];
  return (
    <nav className="flex w-full bg-[#FDFDFA] justify-between px-36 py-8">
      <h1 className="font-playfairDisplay text-3xl font-bold">MINIREST</h1>
      <div className="gap-x-14 max-w-[500px] text-xl w-full font-playfairDisplay flex justify-between">
        {pages.map((page) => {
          return <ButtonHomePage key={page} page={page} />;
        })}
      </div>
    </nav>
  );
}

export default NavBar;
