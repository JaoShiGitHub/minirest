import { ButtonHomePage } from "../components/Buttons";

function HomePage() {
  return (
    <section className="flex flex-col items-center h-screen">
      <header className="flex flex-col items-center">
        <h1 className="text-black  uppercase text-[86px] font-['playfairDisplay'] mt-20">
          MINIREST
        </h1>
        <p className="font-['caveat'] text-2xl">
          Welcome to the place where your favorite drink gives you a wonderful
          day.
        </p>
      </header>
      <nav className="flex gap-16 font-playfairDisplay absolute bottom-0 mb-48">
        <ButtonHomePage page="Home" />
        <ButtonHomePage page="Profile" />
        <ButtonHomePage page="Menu" />
        <ButtonHomePage page="History" />
      </nav>
    </section>
  );
}

export default HomePage;
