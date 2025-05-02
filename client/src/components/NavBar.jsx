import ButtonHomePage from "./ButtonHomePage";

function NavBar() {
  const pages = ["Home", "Profile", "Menu", "History"];
  return (
    <nav className="flex w-full bg-white justify-between px-20 py-5">
      <h1 className="font-playfairDisplay text-2xl font-bold">MINIREST</h1>
      <div className="max-w-lg w-full font-playfairDisplay flex justify-between">
        {pages.map((page) => {
          return <ButtonHomePage key={page} page={page} />;
        })}
      </div>
    </nav>
  );
}

export default NavBar;
