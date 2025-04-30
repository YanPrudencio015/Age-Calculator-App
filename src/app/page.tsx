import Inputs from "./components/Inputs";
import Submit from "./components/Submit";
import Time from "./components/Time";
import Providers from "./Providers";

export default function Home() {
  return (
    <Providers>
      <main className="bg-[#dbdbdb] h-lvh w-screen flex justify-center items-start pt-10 sm:pt-0 sm:items-center">
        <div className="bg-white h-[30em] sm:h-[70%] w-[90%] sm:w-[40%] rounded-[8vw] sm:rounded-[1vw] rounded-br-[30vw] sm:rounded-br-[10vw]">
          <Inputs/>
          <Submit/>
          <Time/>
        </div>
      </main>
    </Providers>
  );
}