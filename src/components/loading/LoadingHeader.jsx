// import StartHeader from "../start/StartHeader";
import logo from "../../assets/logo.png";

export default function LoadingHeader() {
  return (
    <header className="bg-[#0e0e0f] flex justify-left items-center w-full py-6 px-8 z-50">
      {/* <div className="font-headline font-black text-2xl text-primary tracking-tighter">
        Quizly
      </div> */}
      <div className="flex items-center gap-1.5">
        <img src={logo} alt="Quizly logo" className="h-9 w-9 object-contain" />
        <span className="text-2xl font-black text-white font-headline tracking-tight translate-y-0.5">
          Quizly
        </span>
      </div>
    </header>
  );
}
